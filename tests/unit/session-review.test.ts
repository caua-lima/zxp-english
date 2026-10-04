import { describe, expect, it } from "vitest";
import { fromSnapshot, initSession, isRetry, progressOf, sessionReducer, sessionStats, toSnapshot, type ResultSummary, type SessionState } from "@/engine/session";
import { sessionSnapshotSchema } from "@/engine/model";
import { buildConceptIndex, buildReviewPicks, errorNotebook, pickExercise, unitsNeeded } from "@/engine/review-builder";
import { buildReviewQueue } from "@/engine/srs";
import { completeLesson, finishCheckpoint, recordAttempt } from "@/state/actions";
import { gradeResponse } from "@/engine/grading";
import { addDays, dateKey } from "@/engine/dates";
import unit from "@/content/units/a1-u01";
import { exercisesOf } from "@/content/iter";
import { fresh, T0, TZ } from "./helpers";
import type { ProgressState } from "@/engine/model";
import { buildDailyPlan } from "@/engine/plan";
import { CURRICULUM } from "@/content/curriculum";
import { evaluatePlacement, shouldContinue, type PlacementAnswer } from "@/engine/placement";
import { skillStats, weeklySummary } from "@/engine/stats";
import { currentStreak, studyDays } from "@/engine/xp";

const ok: ResultSummary = { outcome: "correct", independent: true, hints: 0, revealed: false };
const bad: ResultSummary = { outcome: "incorrect", independent: false, hints: 0, revealed: false };
const at = (n: number) => new Date(T0.getTime() + n * 86_400_000);

function run(s: SessionState, id: string, r: ResultSummary, allowRequeue = true): SessionState {
  return sessionReducer(sessionReducer(s, { type: "answered", id, result: r, allowRequeue }), { type: "next" });
}

describe("sessão de exercícios", () => {
  it("percorre a fila e termina no resumo", () => {
    let s = initSession(["a", "b"]);
    s = run(s, "a", ok);
    expect(s.phase).toBe("exercises");
    s = run(s, "b", ok);
    expect(s.phase).toBe("summary");
    expect(progressOf(s)).toBe(1);
  });

  it("reapresenta o item errado depois de outros itens, uma única vez", () => {
    let s = initSession(["a", "b", "c", "d", "e", "f"]);
    s = sessionReducer(s, { type: "answered", id: "a", result: bad, allowRequeue: true });
    expect(s.queue).toEqual(["a", "b", "c", "d", "a", "e", "f"]);
    s = sessionReducer(s, { type: "next" });
    s = run(s, "b", ok);
    s = run(s, "c", ok);
    s = run(s, "d", ok);
    expect(isRetry(s)).toBe(true);
    // errar de novo na reapresentação não cria um laço infinito
    s = sessionReducer(s, { type: "answered", id: "a", result: bad, allowRequeue: true });
    expect(s.queue.filter((x) => x === "a")).toHaveLength(2);
  });

  it("em fila curta, o item errado volta no fim", () => {
    const s = sessionReducer(initSession(["a", "b"]), { type: "answered", id: "a", result: bad, allowRequeue: true });
    expect(s.queue).toEqual(["a", "b", "a"]);
  });

  it("checkpoint não reapresenta: vale a primeira tentativa", () => {
    const s = sessionReducer(initSession(["a", "b"]), { type: "answered", id: "a", result: bad, allowRequeue: false });
    expect(s.queue).toEqual(["a", "b"]);
  });

  it("a estatística usa só a primeira tentativa; acertar na reapresentação não apaga o erro", () => {
    let s = initSession(["a", "b"]);
    s = run(s, "a", bad);
    s = run(s, "b", ok);
    s = run(s, "a", ok); // reapresentação
    const st = sessionStats(s);
    expect(st.gradedTotal).toBe(2);
    expect(st.independent).toBe(1);
    expect(st.failedIds).toEqual(["a"]);
  });

  it("resposta revelada também é reapresentada", () => {
    const revealed: ResultSummary = { outcome: "correct", independent: false, hints: 0, revealed: true };
    const s = sessionReducer(initSession(["a", "b", "c"]), { type: "answered", id: "a", result: revealed, allowRequeue: true });
    expect(s.queue).toEqual(["a", "b", "c", "a"]);
  });

  it("tarefas autoavaliadas ficam fora da taxa de acerto", () => {
    let s = initSession(["a", "w"]);
    s = run(s, "a", ok);
    s = run(s, "w", { outcome: "self", independent: false, hints: 0, revealed: false });
    const st = sessionStats(s);
    expect(st.gradedTotal).toBe(1);
    expect(st.selfAssessed).toBe(1);
    expect(st.ratio).toBe(1);
  });

  it("o snapshot é válido e restaura a sessão exatamente (retomada)", () => {
    let s = initSession(["a", "b", "c"], "exercises", "A");
    s = run(s, "a", bad);
    const snap = toSnapshot(s);
    expect(sessionSnapshotSchema.safeParse(snap).success).toBe(true);
    expect(fromSnapshot(JSON.parse(JSON.stringify(snap)))).toEqual(s);
  });
});

// ------------------------------------------------------------------ revisão com dias simulados

function studyLesson(state: ProgressState, lessonIndex: number, when: Date): ProgressState {
  const lesson = unit.lessons[lessonIndex];
  let s = state;
  for (const ex of lesson.exercises) {
    if (ex.kind === "write" || ex.kind === "speak") continue;
    const response =
      ex.kind === "mcq" || ex.kind === "listen"
        ? { kind: ex.kind, choice: ex.answer }
        : ex.kind === "order"
          ? { kind: "order" as const, tokens: ex.answers[0].split(" ") }
          : ex.kind === "match"
            ? { kind: "match" as const, mistakes: 0, complete: true }
            : ex.kind === "dialog"
              ? { kind: "dialog" as const, choices: ex.turns.map((t) => t.options.findIndex((o) => o.ok)) }
              : { kind: ex.kind, text: ex.accepted[0] };
    s = recordAttempt(
      s,
      { attemptId: `l${lessonIndex}:${ex.id}`, exercise: ex, context: "lesson", ref: lesson.id, grade: gradeResponse(ex, response as never), hints: 0, revealed: false },
      when,
    ).state;
  }
  return completeLesson(s, { lessonId: lesson.id, concepts: lesson.summary.concepts.map((id) => ({ id, modes: ["rec", "prod"] })), accuracy: 1 }, when).state;
}

describe("revisão com passagem simulada de dias", () => {
  const s0 = studyLesson(fresh(), 0, T0);
  const today = dateKey(T0, TZ);

  it("no dia do estudo nada está vencido", () => {
    expect(buildReviewQueue(s0.concepts, today, 20).totalDue).toBe(0);
  });

  it("no dia seguinte os conceitos da lição vencem", () => {
    const q = buildReviewQueue(s0.concepts, addDays(today, 1), 50);
    expect(q.totalDue).toBeGreaterThan(0);
    const ids = new Set(q.today.map((i) => i.conceptId));
    expect(ids.has("a1-u01:good-morning")).toBe(true);
  });

  it("escolhe para a revisão um exercício DIFERENTE do que foi visto por último", () => {
    const index = buildConceptIndex([unit], s0);
    const all = index.get("a1-u01:how-are-you")!;
    expect(all.length).toBeGreaterThanOrEqual(2);
    const first = pickExercise("a1-u01:how-are-you", "prod", index, s0.attempts)!;
    // marca esse como recém-usado e pede de novo
    const s1 = recordAttempt(
      s0,
      { attemptId: "rev1", exercise: first.exercise, context: "review", ref: "review", grade: gradeResponse(first.exercise, { kind: first.exercise.kind, text: "x" } as never), hints: 0, revealed: false },
      at(1),
    ).state;
    const candidates = all.filter((L) => ["cloze", "dictation", "fix", "type"].includes(L.ex.kind));
    if (candidates.length > 1) {
      const second = pickExercise("a1-u01:how-are-you", "prod", index, s1.attempts)!;
      expect(second.exercise.id).not.toBe(first.exercise.id);
    }
  });

  it("itens de checkpoint só entram na revisão depois que o checkpoint foi tentado", () => {
    const before = buildConceptIndex([unit], s0);
    const cpIds = new Set(exercisesOf(unit).filter((L) => L.group.startsWith("checkpoint")).map((L) => L.ex.id));
    for (const list of before.values()) for (const L of list) expect(cpIds.has(L.ex.id)).toBe(false);
    const tried = finishCheckpoint(s0, { unitId: "a1-u01", set: "A", total: 10, independentCorrect: 5, passed: false, weakConcepts: [] }, T0).state;
    const after = buildConceptIndex([unit], tried);
    expect([...after.values()].flat().some((L) => cpIds.has(L.ex.id))).toBe(true);
  });

  it("acertar a revisão no vencimento empurra a próxima para 3 dias; errar traz para amanhã", () => {
    const day1 = at(1);
    const index = buildConceptIndex([unit], s0);
    const due = buildReviewQueue(s0.concepts, dateKey(day1, TZ), 50).today;
    const picks = buildReviewPicks(due, index, s0.attempts);
    expect(picks.length).toBeGreaterThan(3);

    const target = picks.find((p) => !p.fallback && p.exercise.concepts.length === 1 && p.mode === "prod")!;
    const exr = target.exercise;
    const right = exr.kind === "cloze" || exr.kind === "type" || exr.kind === "fix" || exr.kind === "dictation" ? exr.accepted[0] : "";
    const okState = recordAttempt(s0, { attemptId: "r-ok", exercise: exr, context: "review", ref: "review", grade: gradeResponse(exr, { kind: exr.kind, text: right } as never), hints: 0, revealed: false }, day1).state;
    const c = okState.concepts[target.conceptId];
    expect(c.prod.due).toBe(addDays(dateKey(day1, TZ), 3));

    const badState = recordAttempt(s0, { attemptId: "r-bad", exercise: exr, context: "review", ref: "review", grade: gradeResponse(exr, { kind: exr.kind, text: "zzz" } as never), hints: 0, revealed: false }, day1).state;
    expect(badState.concepts[target.conceptId].prod.due).toBe(addDays(dateKey(day1, TZ), 1));
  });

  it("as pendências não revisadas se acumulam em vez de sumir", () => {
    const later = addDays(today, 10);
    const q = buildReviewQueue(s0.concepts, later, 5);
    expect(q.today).toHaveLength(5);
    expect(q.deferred).toBe(q.totalDue - 5);
    expect(q.today[0].overdueDays).toBe(9);
  });

  it("unitsNeeded diz quais unidades carregar", () => {
    expect(unitsNeeded([{ conceptId: "a1-u01:a" }, { conceptId: "a2-u03:b" }, { conceptId: "a1-u01:c" }])).toEqual(["a1-u01", "a2-u03"]);
  });
});

describe("caderno de erros", () => {
  const ex = unit.lessons[0].exercises.find((e) => e.kind === "cloze")!;
  const wrong = (s: ProgressState, id: string, when: Date) =>
    recordAttempt(s, { attemptId: id, exercise: ex, context: "lesson", ref: "x", grade: gradeResponse(ex, { kind: "cloze", text: "zzz" }), hints: 0, revealed: false }, when).state;
  const right = (s: ProgressState, id: string, when: Date) =>
    recordAttempt(s, { attemptId: id, exercise: ex, context: "review", ref: "review", grade: gradeResponse(ex, { kind: "cloze", text: (ex as { accepted: string[] }).accepted[0] }), hints: 0, revealed: false }, when).state;
  const day = (iso: string) => dateKey(iso, TZ);

  it("registra o erro com a resposta dada", () => {
    const nb = errorNotebook(wrong(fresh(), "w1", T0), day);
    expect(nb).toHaveLength(1);
    expect(nb[0].status).toBe("pending");
    expect(nb[0].lastAnswers).toEqual(["zzz"]);
    expect(nb[0].wrongCount).toBe(1);
  });

  it("um acerto depois não resolve; dois acertos em dias distintos resolvem", () => {
    let s = wrong(fresh(), "w1", T0);
    s = right(s, "r1", at(1));
    expect(errorNotebook(s, day)[0].status).toBe("recovering");
    s = right(s, "r2", at(1));
    expect(errorNotebook(s, day)[0].status).toBe("recovering"); // mesmo dia
    s = right(s, "r3", at(4));
    expect(errorNotebook(s, day)[0].status).toBe("resolved");
  });

  it("errar de novo reabre o item, sem apagar o histórico", () => {
    let s = wrong(fresh(), "w1", T0);
    s = right(s, "r1", at(1));
    s = right(s, "r2", at(3));
    s = wrong(s, "w2", at(5));
    const e = errorNotebook(s, day)[0];
    expect(e.status).toBe("pending");
    expect(e.wrongCount).toBe(2);
  });
});

describe("plano diário", () => {
  const ALL = () => true;

  it("no primeiro dia propõe a primeira lição", () => {
    const p = buildDailyPlan(fresh(), CURRICULUM, T0, { isPublished: ALL });
    expect(p.items[0]).toMatchObject({ kind: "lesson", href: "/licao/a1-u01-l1" });
    expect(p.reentry).toBeNull();
    expect(p.goal).toBe(80);
  });

  it("com 30 minutos cabem duas lições; com 10, uma", () => {
    const s30 = { ...fresh(), settings: { ...fresh().settings, dailyMinutes: 30 as const } };
    const s10 = { ...fresh(), settings: { ...fresh().settings, dailyMinutes: 10 as const } };
    expect(buildDailyPlan(s30, CURRICULUM, T0, { isPublished: ALL }).items.filter((i) => i.kind === "lesson")).toHaveLength(2);
    expect(buildDailyPlan(s10, CURRICULUM, T0, { isPublished: ALL }).items.filter((i) => i.kind === "lesson")).toHaveLength(1);
  });

  it("no dia seguinte, a revisão vem antes da lição nova", () => {
    const s = studyLesson(fresh(), 0, T0);
    const p = buildDailyPlan(s, CURRICULUM, at(1), { isPublished: ALL });
    expect(p.items[0].kind).toBe("review");
    expect(p.items[1]).toMatchObject({ kind: "lesson", href: "/licao/a1-u01-l2" });
  });

  it("depois de dias sem estudar, o plano encolhe e explica (retomada)", () => {
    const s = studyLesson(fresh(), 0, T0);
    const p = buildDailyPlan(s, CURRICULUM, at(6), { isPublished: ALL });
    expect(p.reentry?.daysAway).toBe(6);
    expect(p.review.today).toBeLessThanOrEqual(10);
    expect(p.review.totalDue).toBeGreaterThanOrEqual(p.review.today);
    expect(p.items.filter((i) => i.kind === "lesson")).toHaveLength(1);
    expect(p.items.some((i) => i.kind === "activity" || i.kind === "errors")).toBe(false);
  });

  it("após pausa longa, propõe rever a última lição em vez de conteúdo novo", () => {
    const s = studyLesson(fresh(), 0, T0);
    const p = buildDailyPlan(s, CURRICULUM, at(20), { isPublished: ALL });
    expect(p.items.some((i) => i.kind === "relearn" && i.href === "/licao/a1-u01-l1")).toBe(true);
    expect(p.items.some((i) => i.kind === "lesson")).toBe(false);
  });

  it("perder a sequência não apaga aprendizado", () => {
    const s = studyLesson(fresh(), 0, T0);
    const days = studyDays(s.xp, TZ);
    expect(currentStreak(days, dateKey(T0, TZ))).toBe(1);
    expect(currentStreak(days, dateKey(at(5), TZ))).toBe(0);
    expect(Object.keys(s.concepts).length).toBeGreaterThan(5);
    expect(s.lessons["a1-u01-l1"].status).toBe("completed");
  });

  it("a sequência de ontem continua viva hoje até o fim do dia", () => {
    const s = studyLesson(fresh(), 0, T0);
    expect(currentStreak(studyDays(s.xp, TZ), dateKey(at(1), TZ))).toBe(1);
  });

  it("uma lição interrompida vira 'continuar de onde parei'", () => {
    const s = { ...fresh(), lessons: { "a1-u01-l1": { id: "a1-u01-l1", status: "in_progress" as const, startedAt: T0.toISOString(), completions: 0, session: { queue: ["x"], cursor: 0, phase: "exercises" as const, results: {}, requeued: [] } } } };
    const p = buildDailyPlan(s, CURRICULUM, T0, { isPublished: ALL });
    expect(p.items[0]).toMatchObject({ kind: "resume", href: "/licao/a1-u01-l1" });
    expect(p.items.some((i) => i.kind === "lesson")).toBe(false);
  });
});

describe("diagnóstico", () => {
  const ans = (unitId: string, independent: boolean, adapted = false): PlacementAnswer => ({ unitId, stage: unitId.slice(0, 2) as PlacementAnswer["stage"], independent, adapted });

  it("errou cedo em A1: sugere a unidade do primeiro erro e para", () => {
    const a = [ans("a1-u01", true), ans("a1-u02", false), ans("a1-u04", false), ans("a1-u06", true)];
    expect(shouldContinue(a, "a1")).toBe(false);
    expect(evaluatePlacement(a, CURRICULUM).suggestedUnit).toBe("a1-u02");
  });

  it("superou A1 e travou em A2: sugere dentro de A2", () => {
    const a = [ans("a1-u01", true), ans("a1-u03", true), ans("a1-u05", true), ans("a1-u08", true), ans("a2-u01", true), ans("a2-u02", false), ans("a2-u05", false), ans("a2-u08", false)];
    const r = evaluatePlacement(a, CURRICULUM);
    expect(r.highestPassed).toBe("a1");
    expect(r.suggestedUnit).toBe("a2-u02");
  });

  it("sem respostas: começa do zero", () => {
    expect(evaluatePlacement([], CURRICULUM).suggestedUnit).toBe("a1-u01");
  });

  it("superou tudo: sugere o início de B2, nunca 'curso concluído'", () => {
    const a = (["a1", "a2", "b1", "b2"] as const).flatMap((st) => [1, 2, 3, 4].map((n) => ans(`${st}-u0${n}`, true)));
    expect(evaluatePlacement(a, CURRICULUM).suggestedUnit).toBe("b2-u01");
  });

  it("perguntas de escuta adaptadas não contam", () => {
    const a = [ans("a1-u01", true), ans("a1-u02", true), ans("a1-u03", true), ans("a1-u04", false, true)];
    expect(shouldContinue(a, "a1")).toBe(true);
  });
});

describe("estatísticas", () => {
  it("poucas respostas = evidência insuficiente, sem inventar porcentagem", () => {
    const s = recordAttempt(fresh(), { attemptId: "x", exercise: unit.lessons[0].exercises[0], context: "lesson", ref: "l", grade: gradeResponse(unit.lessons[0].exercises[0], { kind: "mcq", choice: 0 }), hints: 0, revealed: false }, T0).state;
    const vocab = skillStats(s).find((k) => k.skill === "vocabulary")!;
    expect(vocab.evidence).toBe("insufficient");
    expect(vocab.immediate).toBeNull();
    expect(skillStats(fresh()).every((k) => k.evidence === "none")).toBe(true);
  });

  it("separa desempenho imediato de retenção", () => {
    const s = studyLesson(fresh(), 0, T0);
    const stats = skillStats(s);
    expect(stats.reduce((n, k) => n + k.retentionN, 0)).toBe(0);
    expect(stats.reduce((n, k) => n + k.immediateN, 0)).toBeGreaterThan(5);
  });

  it("resumo semanal soma XP, lições e dias da semana correta", () => {
    const s = studyLesson(fresh(), 0, T0); // 2026-10-01, quinta
    const w = weeklySummary(s, "2026-09-28");
    expect(w.lessonsCompleted).toBe(1);
    expect(w.studyDays).toBe(1);
    expect(w.xp).toBeGreaterThan(15);
    expect(weeklySummary(s, "2026-10-05").xp).toBe(0);
  });
});

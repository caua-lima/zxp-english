import { describe, expect, it } from "vitest";
import {
  completeActivity,
  completeLesson,
  finishCheckpoint,
  recordAttempt,
  setStartUnit,
  submitTask,
  type Change,
} from "@/state/actions";
import { attemptInput, exCloze, exDict, exMc, fresh, T0 } from "./helpers";
import { dateKey } from "@/engine/dates";
import { totalXp, xpOnDate } from "@/engine/xp";
import { CURRICULUM, lessonIdsOf } from "@/content/curriculum";
import { checkpointAccess, lessonAccess, nextCheckpointSet, recommendedNext, scoreCheckpoint, unitStatus } from "@/engine/progression";
import type { ProgressState } from "@/engine/model";

const day = (n: number, h = 15) => new Date(T0.getTime() + n * 86_400_000 + (h - 15) * 3_600_000);
const apply = (s: ProgressState, c: Change) => c.state ?? s;

describe("recordAttempt", () => {
  it("acerto independente: grava tentativa, atualiza o conceito e dá XP uma vez", () => {
    const s0 = fresh();
    const c = recordAttempt(s0, attemptInput(exCloze, { kind: "cloze", text: "afternoon" }), T0);
    expect(c.attempt?.independent).toBe(true);
    expect(c.state.attempts).toHaveLength(1);
    const concept = c.state.concepts["a1-u01:good-afternoon"];
    expect(concept.prod.correct).toBe(1);
    expect(concept.prod.level).toBe(1);
    expect(totalXp(c.state.xp)).toBe(2);
  });

  it("a mesma resposta enviada duas vezes (mesmo ID) não duplica tentativa nem XP", () => {
    const input = attemptInput(exCloze, { kind: "cloze", text: "afternoon" });
    const a = recordAttempt(fresh(), input, T0);
    const b = recordAttempt(a.state, input, T0);
    expect(b.state.attempts).toHaveLength(1);
    expect(totalXp(b.state.xp)).toBe(2);
    expect(b.ops).toHaveLength(0);
  });

  it("refazer o mesmo exercício em outra execução não gera XP novamente", () => {
    const a = recordAttempt(fresh(), attemptInput(exCloze, { kind: "cloze", text: "afternoon" }), T0);
    const b = recordAttempt(a.state, attemptInput(exCloze, { kind: "cloze", text: "afternoon" }, { attemptId: "s2:x:1" }), day(1));
    expect(b.state.attempts).toHaveLength(2);
    expect(totalXp(b.state.xp)).toBe(2);
  });

  it("usar pista torna o acerto assistido: não sobe nível, XP menor", () => {
    const c = recordAttempt(fresh(), attemptInput(exCloze, { kind: "cloze", text: "afternoon" }, { hints: 1 }), T0);
    expect(c.attempt?.independent).toBe(false);
    const concept = c.state.concepts["a1-u01:good-afternoon"];
    expect(concept.prod.level).toBe(0);
    expect(concept.prod.assisted).toBe(1);
    expect(totalXp(c.state.xp)).toBe(1);
  });

  it("revelar a resposta nunca vira acerto independente, mesmo que se digite certo depois", () => {
    const c = recordAttempt(fresh(), attemptInput(exCloze, { kind: "cloze", text: "afternoon" }, { revealed: true }), T0);
    expect(c.attempt?.independent).toBe(false);
    expect(c.state.concepts["a1-u01:good-afternoon"].prod.correct).toBe(0);
  });

  it("erro agenda a revisão para o dia seguinte", () => {
    const c = recordAttempt(fresh(), attemptInput(exCloze, { kind: "cloze", text: "morning" }), T0);
    const concept = c.state.concepts["a1-u01:good-afternoon"];
    expect(concept.prod.wrong).toBe(1);
    expect(concept.prod.due).toBe("2026-10-02");
    expect(c.attempt?.outcome).toBe("incorrect");
  });

  it("revisão: XP uma vez por item e por dia", () => {
    let s = recordAttempt(fresh(), attemptInput(exMc, { kind: "mcq", choice: 0 }), T0).state;
    const r1 = recordAttempt(s, attemptInput(exMc, { kind: "mcq", choice: 0 }, { attemptId: "r1", context: "review", ref: "review" }), day(1));
    s = r1.state;
    const xpAfter = totalXp(s.xp);
    const r2 = recordAttempt(s, attemptInput(exMc, { kind: "mcq", choice: 0 }, { attemptId: "r2", context: "review", ref: "review" }), day(1));
    expect(totalXp(r2.state.xp)).toBe(xpAfter);
    const r3 = recordAttempt(r2.state, attemptInput(exMc, { kind: "mcq", choice: 0 }, { attemptId: "r3", context: "review", ref: "review" }), day(5));
    expect(totalXp(r3.state.xp)).toBeGreaterThan(xpAfter);
  });

  it("diagnóstico não altera a revisão espaçada nem dá XP por exercício", () => {
    const c = recordAttempt(fresh(), attemptInput(exMc, { kind: "mcq", choice: 0 }, { context: "placement", ref: "placement" }), T0);
    expect(Object.keys(c.state.concepts)).toHaveLength(0);
    expect(totalXp(c.state.xp)).toBe(0);
    expect(c.state.attempts).toHaveLength(1);
  });

  it("tarefa autoavaliada não gera nota nem altera conceitos", () => {
    const c = submitTask(fresh(), { id: "a1-u01-l1-e10", unitId: "a1-u01", kind: "speaking", status: "self_assessed", checks: [true, true, false], recorded: true }, T0);
    expect(c.state.tasks["a1-u01-l1-e10"].status).toBe("self_assessed");
    expect(Object.keys(c.state.concepts)).toHaveLength(0);
    // reenvio substitui, conta como nova execução e não duplica XP
    const again = submitTask(c.state, { id: "a1-u01-l1-e10", unitId: "a1-u01", kind: "speaking", status: "self_assessed", checks: [true, true, true] }, day(1));
    expect(again.state.tasks["a1-u01-l1-e10"].runs).toBe(2);
    expect(totalXp(again.state.xp)).toBe(totalXp(c.state.xp));
  });
});

describe("completeLesson", () => {
  it("dá o bônus uma vez e agenda os conceitos para revisão sem inventar acertos", () => {
    const input = { lessonId: "a1-u01-l1", concepts: [{ id: "a1-u01:good-morning", modes: ["rec", "prod"] as ("rec" | "prod")[] }], accuracy: 0.8 };
    const a = completeLesson(fresh(), input, T0);
    expect(a.state.lessons["a1-u01-l1"].status).toBe("completed");
    expect(totalXp(a.state.xp)).toBe(15);
    const c = a.state.concepts["a1-u01:good-morning"];
    expect(c.rec.due).toBe("2026-10-02");
    expect(c.prod.due).toBe("2026-10-02");
    expect(c.rec.correct + c.prod.correct).toBe(0);
    const b = completeLesson(a.state, input, day(2));
    expect(b.state.lessons["a1-u01-l1"].completions).toBe(2);
    expect(totalXp(b.state.xp)).toBe(15);
  });

  it("não sobrescreve um agendamento que já existia", () => {
    let s = recordAttempt(fresh(), attemptInput(exMc, { kind: "mcq", choice: 0 }), T0).state; // rec due 10-02
    s = completeLesson(s, { lessonId: "a1-u01-l1", concepts: [{ id: "a1-u01:good-morning", modes: ["rec", "prod"] }], accuracy: 1 }, T0).state;
    expect(s.concepts["a1-u01:good-morning"].rec.level).toBe(1);
    expect(s.concepts["a1-u01:good-morning"].prod.due).toBe("2026-10-02");
  });
});

describe("fusos horários: metas e dias", () => {
  // 23:30 em São Paulo = 02:30 UTC do dia seguinte
  const late = new Date("2026-10-02T02:30:00Z");

  it("XP às 23h30 de São Paulo conta para o dia local de São Paulo", () => {
    const s = recordAttempt(fresh("America/Sao_Paulo"), attemptInput(exCloze, { kind: "cloze", text: "afternoon" }), late).state;
    expect(dateKey(late, "America/Sao_Paulo")).toBe("2026-10-01");
    expect(xpOnDate(s.xp, "2026-10-01", "America/Sao_Paulo")).toBe(2);
    expect(xpOnDate(s.xp, "2026-10-02", "America/Sao_Paulo")).toBe(0);
  });

  it("o mesmo XP cai no dia seguinte para quem está em UTC ou Tóquio", () => {
    const s = recordAttempt(fresh("UTC"), attemptInput(exCloze, { kind: "cloze", text: "afternoon" }), late).state;
    expect(xpOnDate(s.xp, "2026-10-02", "UTC")).toBe(2);
    expect(xpOnDate(s.xp, "2026-10-01", "UTC")).toBe(0);
    const tokyo = recordAttempt(fresh("Asia/Tokyo"), attemptInput(exCloze, { kind: "cloze", text: "afternoon" }), late).state;
    expect(xpOnDate(tokyo.xp, "2026-10-02", "Asia/Tokyo")).toBe(2);
  });

  it("a data do próximo vencimento depende do fuso do usuário", () => {
    const br = recordAttempt(fresh("America/Sao_Paulo"), attemptInput(exCloze, { kind: "cloze", text: "afternoon" }), late).state;
    const utc = recordAttempt(fresh("UTC"), attemptInput(exCloze, { kind: "cloze", text: "afternoon" }), late).state;
    expect(br.concepts["a1-u01:good-afternoon"].prod.due).toBe("2026-10-02");
    expect(utc.concepts["a1-u01:good-afternoon"].prod.due).toBe("2026-10-03");
  });
});

describe("checkpoint, desbloqueio e pontos de partida", () => {
  const meta = (id: string) => CURRICULUM.find((m) => m.id === id)!;

  function completeAllLessons(s: ProgressState, unitId: string): ProgressState {
    let st = s;
    for (const id of lessonIdsOf(meta(unitId))) st = completeLesson(st, { lessonId: id, concepts: [], accuracy: 1 }, T0).state;
    return st;
  }

  it("começa do zero: só A1·U1 está liberada", () => {
    const s = fresh();
    expect(unitStatus(s, meta("a1-u01"))).toBe("available");
    expect(unitStatus(s, meta("a1-u02"))).toBe("locked");
    expect(recommendedNext(s, CURRICULUM)).toEqual({ unitId: "a1-u01", kind: "lesson", lessonId: "a1-u01-l1", lessonIndex: 0 });
  });

  it("as lições abrem em sequência", () => {
    let s = fresh();
    expect(lessonAccess(s, meta("a1-u01"), 0)).toBe("open");
    expect(lessonAccess(s, meta("a1-u01"), 1)).toBe("locked");
    s = completeLesson(s, { lessonId: "a1-u01-l1", concepts: [], accuracy: 1 }, T0).state;
    expect(lessonAccess(s, meta("a1-u01"), 1)).toBe("open");
    expect(lessonAccess(s, meta("a1-u01"), 2)).toBe("locked");
  });

  it("depois das 4 lições, a unidade fica pronta para o checkpoint", () => {
    const s = completeAllLessons(fresh(), "a1-u01");
    expect(unitStatus(s, meta("a1-u01"))).toBe("checkpoint_ready");
    expect(unitStatus(s, meta("a1-u02"))).toBe("locked"); // ainda não aprovou
    expect(checkpointAccess(s, meta("a1-u01"))).toBe("after-lessons");
  });

  it("critério de 80%: 8/10 passa, 7/10 não", () => {
    expect(scoreCheckpoint(10, 8, 0.8).passed).toBe(true);
    expect(scoreCheckpoint(10, 7, 0.8).passed).toBe(false);
    expect(scoreCheckpoint(10, 7, 0.7).passed).toBe(true);
  });

  it("aprovar no checkpoint libera a próxima unidade e dá XP uma vez", () => {
    let s = completeAllLessons(fresh(), "a1-u01");
    s = finishCheckpoint(s, { unitId: "a1-u01", set: "A", total: 10, independentCorrect: 9, passed: true, weakConcepts: [] }, T0).state;
    expect(unitStatus(s, meta("a1-u01"))).toBe("completed");
    expect(unitStatus(s, meta("a1-u02"))).toBe("available");
    const xp = totalXp(s.xp);
    s = finishCheckpoint(s, { unitId: "a1-u01", set: "B", total: 10, independentCorrect: 10, passed: true, weakConcepts: [] }, day(1)).state;
    expect(totalXp(s.xp)).toBe(xp); // sem XP extra por repetir
    expect(s.units["a1-u01"].attempts).toHaveLength(2);
  });

  it("reprovar não libera, registra os conceitos fracos e alterna A/B na nova tentativa", () => {
    let s = completeAllLessons(fresh(), "a1-u01");
    expect(nextCheckpointSet(s, "a1-u01")).toBe("A");
    s = finishCheckpoint(s, { unitId: "a1-u01", set: "A", total: 10, independentCorrect: 6, passed: false, weakConcepts: ["a1-u01:how-are-you"] }, T0).state;
    expect(unitStatus(s, meta("a1-u02"))).toBe("locked");
    expect(unitStatus(s, meta("a1-u01"))).toBe("checkpoint_ready");
    expect(s.units["a1-u01"].attempts[0].weakConcepts).toEqual(["a1-u01:how-are-you"]);
    expect(nextCheckpointSet(s, "a1-u01")).toBe("B");
  });

  it("teste para pular: aprovar sem fazer as lições vira 'aprovada por teste', não 'concluída'", () => {
    let s = fresh();
    expect(checkpointAccess(s, meta("a1-u01"))).toBe("test-out");
    s = finishCheckpoint(s, { unitId: "a1-u01", set: "A", total: 10, independentCorrect: 10, passed: true, weakConcepts: [] }, T0).state;
    expect(unitStatus(s, meta("a1-u01"))).toBe("tested_out");
    expect(unitStatus(s, meta("a1-u02"))).toBe("available");
    expect(lessonAccess(s, meta("a1-u01"), 3)).toBe("open"); // pode rever depois
  });

  it("ponto de partida manual libera a trilha sem falsificar progresso", () => {
    let s = setStartUnit(fresh(), "a2-u01", "manual", T0).state;
    expect(unitStatus(s, meta("a1-u03"))).toBe("skipped");
    expect(unitStatus(s, meta("a2-u01"))).toBe("available");
    expect(Object.values(s.lessons).filter((l) => l.status === "completed")).toHaveLength(0);
    expect(Object.values(s.units).some((u) => u.passedAt)).toBe(false);
    expect(totalXp(s.xp)).toBe(0);
    expect(recommendedNext(s, CURRICULUM)?.unitId).toBe("a2-u01");
    // voltar o ponto de partida remove as marcas de "pulada"
    s = setStartUnit(s, "a1-u05", "manual", T0).state;
    expect(unitStatus(s, meta("a1-u03"))).toBe("skipped");
    expect(unitStatus(s, meta("a1-u05"))).toBe("available");
    expect(unitStatus(s, meta("a1-u06"))).toBe("locked"); // só abre depois de a1-u05
    expect(unitStatus(s, meta("a2-u01"))).toBe("locked");
    s = setStartUnit(s, null, "zero", T0).state;
    expect(unitStatus(s, meta("a1-u03"))).toBe("locked");
    expect(unitStatus(s, meta("a1-u01"))).toBe("available");
  });

  it("aprovação real não é desfeita ao mudar o ponto de partida", () => {
    let s = finishCheckpoint(fresh(), { unitId: "a1-u01", set: "A", total: 10, independentCorrect: 10, passed: true, weakConcepts: [] }, T0).state;
    s = setStartUnit(s, "a1-u04", "manual", T0).state;
    expect(unitStatus(s, meta("a1-u01"))).toBe("tested_out");
    expect(unitStatus(s, meta("a1-u02"))).toBe("skipped");
  });

  it("atividades da unidade registram uma vez só", () => {
    const p = { unitId: "a1-u01", activityId: "a1-u01-act-reading", kind: "reading" as const };
    const a = completeActivity(fresh(), p, T0);
    const b = completeActivity(a.state, p, day(1));
    expect(b.state.units["a1-u01"].activitiesDone).toEqual(["a1-u01-act-reading"]);
    expect(totalXp(b.state.xp)).toBe(15);
  });
});

describe("independência de ditado", () => {
  it("ditado errado conta como erro de produção no conceito", () => {
    const c = recordAttempt(fresh(), attemptInput(exDict, { kind: "dictation", text: "Good morning" }), T0);
    expect(c.state.concepts["a1-u01:good-evening"].prod.wrong).toBe(1);
  });
  it("apply helper", () => {
    expect(apply(fresh(), { state: fresh(), ops: [] })).toBeTruthy();
  });
});

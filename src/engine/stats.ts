/**
 * Estatísticas por habilidade e resumo semanal.
 *
 * O painel separa quatro coisas que não devem ser confundidas:
 *  - ESTUDADO: conteúdo percorrido (lições concluídas).
 *  - DESEMPENHO IMEDIATO: acertos independentes na primeira tentativa, em lições,
 *    atividades e checkpoints.
 *  - RETENÇÃO: acertos independentes em REVISÕES (dias depois).
 *  - EVIDÊNCIA: quantas respostas existem. Com poucas, o app diz "evidência
 *    insuficiente" em vez de inventar um número.
 * Tarefas de escrita e fala são autoavaliadas e aparecem separadas.
 */
import { SKILLS, type Skill } from "@/content/schema";
import type { Attempt, DateKey, ProgressState } from "./model";
import { addDays, dateKey } from "./dates";
import { MIN_EVIDENCE } from "./defaults";
import { conceptStatus, type MasteryStatus } from "./srs";
import { studyDays, xpByDate } from "./xp";

export type Evidence = "none" | "insufficient" | "some" | "good";

export const EVIDENCE_LABEL: Record<Evidence, string> = {
  none: "Sem evidência",
  insufficient: "Evidência insuficiente",
  some: "Evidência inicial",
  good: "Evidência consistente",
};

export interface SkillStat {
  skill: Skill;
  /** Primeiras tentativas corrigidas (sem reapresentações nem adaptadas). */
  attempts: number;
  independent: number;
  /** Desempenho imediato nas últimas 40 primeiras tentativas fora de revisão. */
  immediate: number | null;
  immediateN: number;
  /** Retenção: acerto independente em revisões. */
  retention: number | null;
  retentionN: number;
  /** Tarefas autoavaliadas (escrita/fala). */
  selfAssessed: number;
  /** Atividades feitas sem áudio/microfone: não contam como evidência. */
  adapted: number;
  evidence: Evidence;
}

const firstTry = (a: Attempt) => a.outcome !== "self" && !a.retry && !a.adapted && a.context !== "placement";

export function skillStats(state: ProgressState): SkillStat[] {
  return SKILLS.map((skill) => {
    const mine = state.attempts.filter((a) => a.skill === skill);
    const valid = mine.filter(firstTry);
    const immediate = valid.filter((a) => a.context !== "review" && a.context !== "notebook").slice(-40);
    const retention = valid.filter((a) => a.context === "review").slice(-40);
    const ratio = (list: Attempt[]) => (list.length ? list.filter((a) => a.independent).length / list.length : null);
    const selfAssessed = Object.values(state.tasks).filter(
      (t) =>
        !t.adapted &&
        ((skill === "writing" && (t.kind === "writing" || (t.kind === "production" && t.text !== undefined))) ||
          (skill === "speaking" && (t.kind === "speaking" || (t.kind === "production" && t.text === undefined)))),
    ).length;
    const adapted = mine.filter((a) => a.adapted).length + Object.values(state.tasks).filter((t) => t.adapted && t.kind === "speaking" && skill === "speaking").length;

    let evidence: Evidence = "none";
    if (valid.length >= 30 && retention.length >= 10) evidence = "good";
    else if (valid.length >= MIN_EVIDENCE) evidence = "some";
    else if (valid.length > 0 || selfAssessed > 0) evidence = "insufficient";

    return {
      skill,
      attempts: valid.length,
      independent: valid.filter((a) => a.independent).length,
      immediate: immediate.length >= 5 ? ratio(immediate) : null,
      immediateN: immediate.length,
      retention: retention.length >= 5 ? ratio(retention) : null,
      retentionN: retention.length,
      selfAssessed,
      adapted,
      evidence,
    };
  });
}

export function masteryCounts(state: ProgressState): Record<MasteryStatus, number> {
  const out: Record<MasteryStatus, number> = { new: 0, learning: 0, practicing: 0, consolidating: 0, retained: 0 };
  for (const c of Object.values(state.concepts)) out[conceptStatus(c)] += 1;
  return out;
}

export interface WeeklySummary {
  weekStart: DateKey;
  weekEnd: DateKey;
  xp: number;
  previousXp: number;
  studyDays: number;
  goalDays: number;
  lessonsCompleted: number;
  reviewsDone: number;
  reviewAccuracy: number | null;
  newConcepts: number;
  tasksDone: number;
  /** Conceitos com mais erros na semana. */
  weakest: { conceptId: string; wrong: number }[];
  /** Habilidade com pior desempenho imediato na semana (mín. 5 tentativas). */
  weakestSkill: { skill: Skill; ratio: number } | null;
}

export function weeklySummary(state: ProgressState, weekStart: DateKey): WeeklySummary {
  const tz = state.settings.timezone;
  const weekEnd = addDays(weekStart, 6);
  const inWeek = (iso: string) => {
    const d = dateKey(iso, tz);
    return d >= weekStart && d <= weekEnd;
  };
  const byDate = xpByDate(state.xp, tz);
  const sum = (from: DateKey) => Array.from({ length: 7 }, (_, i) => byDate.get(addDays(from, i)) ?? 0);
  const week = sum(weekStart);
  const prev = sum(addDays(weekStart, -7));
  const days = studyDays(state.xp, tz);

  const attempts = state.attempts.filter((a) => inWeek(a.ts) && firstTry(a));
  const reviews = attempts.filter((a) => a.context === "review");
  const wrongBy = new Map<string, number>();
  for (const a of attempts) {
    if (a.outcome !== "incorrect" && !a.revealed) continue;
    for (const c of a.concepts) wrongBy.set(c, (wrongBy.get(c) ?? 0) + 1);
  }
  const bySkill = SKILLS.map((skill) => {
    const list = attempts.filter((a) => a.skill === skill && a.context !== "review");
    return { skill, n: list.length, ratio: list.length ? list.filter((a) => a.independent).length / list.length : 1 };
  }).filter((s) => s.n >= 5);
  const worst = bySkill.sort((a, b) => a.ratio - b.ratio)[0];

  return {
    weekStart,
    weekEnd,
    xp: week.reduce((a, b) => a + b, 0),
    previousXp: prev.reduce((a, b) => a + b, 0),
    studyDays: Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)).filter((d) => days.has(d)).length,
    goalDays: week.filter((x) => x >= state.settings.dailyXpGoal).length,
    lessonsCompleted: Object.values(state.lessons).filter((l) => l.completedAt && inWeek(l.completedAt)).length,
    reviewsDone: reviews.length,
    reviewAccuracy: reviews.length >= 5 ? reviews.filter((a) => a.independent).length / reviews.length : null,
    newConcepts: Object.values(state.concepts).filter((c) => c.firstSeen >= weekStart && c.firstSeen <= weekEnd).length,
    tasksDone: Object.values(state.tasks).filter((t) => inWeek(t.ts)).length,
    weakest: [...wrongBy.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([conceptId, wrong]) => ({ conceptId, wrong })),
    weakestSkill: worst && worst.ratio < 0.8 ? { skill: worst.skill, ratio: worst.ratio } : null,
  };
}

/** Revisões (primeiras tentativas) feitas hoje: contam para o limite diário. */
export function reviewsDoneOn(state: ProgressState, date: DateKey): number {
  const tz = state.settings.timezone;
  return state.attempts.filter((a) => a.context === "review" && !a.retry && dateKey(a.ts, tz) === date).length;
}

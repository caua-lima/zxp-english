/**
 * XP, meta diária e sequência de dias.
 *
 * XP mede ATIVIDADE, não proficiência. Para não premiar repetição trivial, cada
 * evento tem um ID determinístico e só pode render XP uma vez:
 *   ex:{exercício}        prática de um exercício (uma vez na vida)
 *   lesson:{lição}        bônus da primeira conclusão
 *   cp:{unidade}:first    primeira tentativa de checkpoint
 *   cp:{unidade}:pass     primeira aprovação
 *   act:{atividade}       atividade da unidade
 *   task:{exercício}      tarefa autoavaliada
 *   outside:{missão}      missão fora do app (autorrelato)
 *   rev:{dia}:{conceito}:{modo}   revisão (uma por item por dia)
 * Reabrir uma lição já feita não gera XP; revisões são limitadas pelo que está vencido.
 */
import type { DateKey, XpEntry } from "./model";
import { addDays, dateKey, diffDays } from "./dates";

export const XP_AMOUNTS = {
  practiceIndependent: 2,
  practiceOther: 1,
  lessonBonus: 15,
  checkpointFirst: 10,
  checkpointPass: 40,
  activity: 15,
  mission: 25,
  task: 10,
  outside: 20,
  placement: 10,
  reviewIndependent: 2,
  reviewOther: 1,
} as const;

/** Um dia só conta como "dia de estudo" com pelo menos este XP. */
export const STUDY_DAY_MIN_XP = 10;

export function totalXp(entries: XpEntry[]): number {
  return entries.reduce((n, e) => n + e.amount, 0);
}

export function xpByDate(entries: XpEntry[], tz: string): Map<DateKey, number> {
  const map = new Map<DateKey, number>();
  for (const e of entries) {
    const d = dateKey(e.ts, tz);
    map.set(d, (map.get(d) ?? 0) + e.amount);
  }
  return map;
}

export function xpOnDate(entries: XpEntry[], date: DateKey, tz: string): number {
  return xpByDate(entries, tz).get(date) ?? 0;
}

export function studyDays(entries: XpEntry[], tz: string, minXp = STUDY_DAY_MIN_XP): Set<DateKey> {
  const out = new Set<DateKey>();
  for (const [d, xp] of xpByDate(entries, tz)) if (xp >= minXp) out.add(d);
  return out;
}

/**
 * Sequência atual. Se hoje ainda não foi estudado, a sequência de ontem continua
 * "viva" até o fim do dia (não é zerada antes da hora).
 */
export function currentStreak(days: Set<DateKey>, today: DateKey): number {
  let cursor = days.has(today) ? today : addDays(today, -1);
  let n = 0;
  while (days.has(cursor)) {
    n += 1;
    cursor = addDays(cursor, -1);
  }
  return n;
}

export function bestStreakOf(days: Set<DateKey>): number {
  const sorted = [...days].sort();
  let best = 0;
  let run = 0;
  let prev: DateKey | null = null;
  for (const d of sorted) {
    run = prev !== null && diffDays(prev, d) === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    prev = d;
  }
  return best;
}

/** Dias desde o último dia de estudo (null se nunca estudou). */
export function daysSinceStudy(days: Set<DateKey>, today: DateKey): number | null {
  if (days.size === 0) return null;
  const last = [...days].sort().at(-1)!;
  return diffDays(last, today);
}

/** Últimos `n` dias (do mais antigo ao de hoje) com XP e se a meta foi cumprida. */
export function lastDays(
  entries: XpEntry[],
  tz: string,
  today: DateKey,
  goal: number,
  n = 7,
): { date: DateKey; xp: number; goalMet: boolean; studied: boolean }[] {
  const map = xpByDate(entries, tz);
  return Array.from({ length: n }, (_, i) => {
    const date = addDays(today, i - (n - 1));
    const xp = map.get(date) ?? 0;
    return { date, xp, goalMet: xp >= goal, studied: xp >= STUDY_DAY_MIN_XP };
  });
}

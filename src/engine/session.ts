/**
 * Sessão de exercícios (lição, checkpoint, atividade, revisão, caderno de erros).
 *
 * Fila linear de exercícios com UMA regra de reapresentação: depois de um erro
 * (ou resposta revelada) o exercício volta uma única vez, após alguns outros itens.
 * Em checkpoint e diagnóstico não há reapresentação, para a nota refletir a primeira tentativa.
 */
import type { SessionSnapshot } from "./model";
import { requeueIndex } from "./srs";

export interface ResultSummary {
  outcome: "correct" | "typo" | "incorrect" | "self";
  independent: boolean;
  hints: number;
  revealed: boolean;
  adapted?: boolean;
}

export interface SessionState {
  queue: string[];
  cursor: number;
  phase: "intro" | "exercises" | "summary";
  /** Resultado da PRIMEIRA vez que cada exercício foi respondido. */
  results: Record<string, ResultSummary>;
  /** Exercícios já reapresentados (cada um volta no máximo uma vez). */
  requeued: string[];
  set?: "A" | "B";
}

export type SessionAction =
  | { type: "answered"; id: string; result: ResultSummary; allowRequeue: boolean }
  | { type: "next" }
  | { type: "phase"; phase: SessionState["phase"] };

export const RETRY_GAP = 3;

export function initSession(ids: string[], phase: SessionState["phase"] = "exercises", set?: "A" | "B"): SessionState {
  return { queue: [...ids], cursor: 0, phase, results: {}, requeued: [], ...(set ? { set } : {}) };
}

export function currentId(s: SessionState): string | undefined {
  return s.queue[s.cursor];
}

/** O item atual é uma reapresentação se o mesmo ID já apareceu antes na fila. */
export function isRetry(s: SessionState): boolean {
  const id = currentId(s);
  return id !== undefined && s.queue.indexOf(id) < s.cursor;
}

export function sessionReducer(s: SessionState, a: SessionAction): SessionState {
  switch (a.type) {
    case "answered": {
      const retry = isRetry(s);
      const results = retry ? s.results : { ...s.results, [a.id]: a.result };
      const failed = a.result.outcome === "incorrect" || a.result.revealed;
      if (!retry && failed && a.allowRequeue && !s.requeued.includes(a.id)) {
        const at = requeueIndex(s.cursor, s.queue.length, RETRY_GAP);
        const queue = [...s.queue.slice(0, at), a.id, ...s.queue.slice(at)];
        return { ...s, results, queue, requeued: [...s.requeued, a.id] };
      }
      return { ...s, results };
    }
    case "next": {
      const cursor = s.cursor + 1;
      return cursor >= s.queue.length ? { ...s, cursor, phase: "summary" } : { ...s, cursor };
    }
    case "phase":
      return { ...s, phase: a.phase };
  }
}

export interface SessionStats {
  gradedTotal: number;
  independent: number;
  /** independent / gradedTotal (0 se não houver itens corrigidos). */
  ratio: number;
  selfAssessed: number;
  hinted: number;
  revealed: number;
  /** Respostas dadas sem áudio: certas ou não, não contam como acerto independente. */
  adapted: number;
  failedIds: string[];
}

/** Estatísticas pela primeira tentativa de cada exercício. */
export function sessionStats(s: SessionState): SessionStats {
  const all = Object.entries(s.results);
  const graded = all.filter(([, r]) => r.outcome !== "self");
  const independent = graded.filter(([, r]) => r.independent).length;
  return {
    gradedTotal: graded.length,
    independent,
    ratio: graded.length ? independent / graded.length : 0,
    selfAssessed: all.length - graded.length,
    hinted: graded.filter(([, r]) => r.hints > 0).length,
    revealed: graded.filter(([, r]) => r.revealed).length,
    adapted: graded.filter(([, r]) => r.adapted).length,
    failedIds: graded.filter(([, r]) => r.outcome === "incorrect" || r.revealed).map(([id]) => id),
  };
}

export function toSnapshot(s: SessionState): SessionSnapshot {
  return {
    queue: s.queue,
    cursor: Math.min(s.cursor, s.queue.length),
    phase: s.phase,
    results: s.results,
    requeued: s.requeued,
    ...(s.set ? { set: s.set } : {}),
  };
}

export function fromSnapshot(snap: SessionSnapshot): SessionState {
  return {
    queue: snap.queue,
    cursor: snap.cursor,
    phase: snap.phase,
    results: snap.results,
    requeued: snap.requeued,
    ...(snap.set ? { set: snap.set } : {}),
  };
}

export function progressOf(s: SessionState): number {
  if (s.phase === "summary") return 1;
  return s.queue.length ? Math.min(1, s.cursor / s.queue.length) : 0;
}

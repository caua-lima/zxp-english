/**
 * Monta sessões de revisão e de prática de erros a partir do conteúdo carregado.
 *
 * Regra de variedade: o mesmo conceito reaparece em frases e contextos diferentes.
 * Para cada item vencido (conceito + modo) escolhemos o exercício tagueado com aquele
 * conceito que foi visto há mais tempo (ou nunca), evitando o último usado.
 */
import { GRADED_KINDS, type Exercise, type UnitContent } from "@/content/schema";
import { exercisesOf, type Located } from "@/content/iter";
import { unitOfConcept } from "@/content/curriculum";
import type { Attempt, Mode, ProgressState } from "./model";
import { modeOfKind, type DueItem } from "./srs";

export type ConceptIndex = Map<string, Located[]>;

/**
 * Índice conceito → exercícios disponíveis para revisão. Itens de checkpoint só entram
 * depois que a pessoa já tentou aquele checkpoint (antes disso eles são "inéditos").
 */
export function buildConceptIndex(units: UnitContent[], state: ProgressState): ConceptIndex {
  const index: ConceptIndex = new Map();
  for (const u of units) {
    const cpTried = (state.units[u.id]?.attempts.length ?? 0) > 0;
    for (const L of exercisesOf(u)) {
      if (!GRADED_KINDS.includes(L.ex.kind)) continue;
      if ((L.group === "checkpoint-a" || L.group === "checkpoint-b") && !cpTried) continue;
      for (const c of L.ex.concepts) {
        const list = index.get(c) ?? [];
        list.push(L);
        index.set(c, list);
      }
    }
  }
  return index;
}

/** Grupos de exercício que a revisão pode usar sem depender do checkpoint. */
const isReviewable = (L: Located) => L.group === "lesson" || L.group === "activity";

/**
 * Para cada conceito, os modos (reconhecer/produzir) que têm exercício nas lições e
 * atividades da unidade. Só esses são agendados ao concluir uma lição: agendar um modo
 * que a revisão não consegue atender criaria uma pendência impossível de cumprir.
 */
export function reviewModesByConcept(unit: UnitContent): Map<string, Mode[]> {
  const map = new Map<string, Set<Mode>>();
  for (const L of exercisesOf(unit)) {
    if (!isReviewable(L)) continue;
    const m = modeOfKind(L.ex.kind);
    if (!m) continue;
    for (const c of L.ex.concepts) map.set(c, (map.get(c) ?? new Set<Mode>()).add(m));
  }
  return new Map([...map].map(([k, v]) => [k, [...v]]));
}

function lastAttemptTimes(attempts: Attempt[]): Map<string, string> {
  const m = new Map<string, string>();
  for (const a of attempts) m.set(a.exerciseId, a.ts); // attempts já vêm em ordem cronológica
  return m;
}

export interface ReviewPick {
  conceptId: string;
  mode: Mode;
  exercise: Exercise;
  /** Se foi preciso usar o outro modo por falta de exercício. */
  fallback: boolean;
}

export function pickExercise(
  conceptId: string,
  mode: Mode,
  index: ConceptIndex,
  attempts: Attempt[],
  avoid: Set<string> = new Set(),
): ReviewPick | null {
  const all = index.get(conceptId) ?? [];
  if (all.length === 0) return null;
  const times = lastAttemptTimes(attempts);
  const rank = (L: Located) => {
    const t = times.get(L.ex.id);
    return [avoid.has(L.ex.id) ? 1 : 0, t ? 1 : 0, t ?? "", L.ex.id] as const;
  };
  const sortBy = (list: Located[]) =>
    [...list].sort((a, b) => {
      const ra = rank(a);
      const rb = rank(b);
      return ra[0] - rb[0] || ra[1] - rb[1] || ra[2].localeCompare(rb[2]) || ra[3].localeCompare(rb[3]);
    });

  const sameMode = all.filter((L) => modeOfKind(L.ex.kind) === mode);
  if (sameMode.length) return { conceptId, mode, exercise: sortBy(sameMode)[0].ex, fallback: false };
  return { conceptId, mode, exercise: sortBy(all)[0].ex, fallback: true };
}

/** Unidades cujo conteúdo precisa ser carregado para atender os itens vencidos. */
export function unitsNeeded(items: { conceptId: string }[]): string[] {
  return [...new Set(items.map((i) => unitOfConcept(i.conceptId)))];
}

export interface ReviewPlan {
  picks: ReviewPick[];
  /**
   * Itens vencidos cujo modo não tem exercício disponível (conteúdo mudou, por exemplo).
   * Quem chama deve desagendá-los: senão ficariam vencidos para sempre.
   */
  stuck: { conceptId: string; mode: Mode }[];
}

export function buildReviewPicks(due: DueItem[], index: ConceptIndex, attempts: Attempt[]): ReviewPlan {
  const used = new Set<string>();
  const picks: ReviewPick[] = [];
  const stuck: ReviewPlan["stuck"] = [];
  for (const d of due) {
    const pick = pickExercise(d.conceptId, d.mode, index, attempts, used);
    if (!pick || pick.fallback) {
      stuck.push({ conceptId: d.conceptId, mode: d.mode });
      continue;
    }
    // O mesmo exercício pode servir a dois conceitos vencidos; ele entra uma vez só.
    if (!used.has(pick.exercise.id)) {
      used.add(pick.exercise.id);
      picks.push(pick);
    }
  }
  return { picks, stuck };
}

// ---------------------------------------------------------------- caderno de erros

export interface ErrorEntry {
  conceptId: string | null;
  /** Exercício usado como referência (o último erro). */
  exerciseId: string;
  wrongCount: number;
  lastWrongAt: string;
  lastAnswers: string[];
  /** "pending" = sem acertos depois do erro; "recovering" = 1 acerto independente; "resolved" = ≥ 2 em dias distintos. */
  status: "pending" | "recovering" | "resolved";
}

/**
 * Agrupa erros por conceito (ou por exercício, se não houver conceito). Um erro é
 * considerado resolvido depois de 2 acertos independentes em dias distintos APÓS o
 * último erro. Nada é apagado: itens resolvidos continuam consultáveis.
 */
export function errorNotebook(state: ProgressState, dayOf: (iso: string) => string): ErrorEntry[] {
  const groups = new Map<string, { attempts: Attempt[]; conceptId: string | null }>();
  for (const a of state.attempts) {
    if (a.outcome === "self") continue;
    const keys = a.concepts.length ? a.concepts : [`ex:${a.exerciseId}`];
    for (const k of keys) {
      const g = groups.get(k) ?? { attempts: [], conceptId: a.concepts.length ? k : null };
      g.attempts.push(a);
      groups.set(k, g);
    }
  }
  const out: ErrorEntry[] = [];
  for (const g of groups.values()) {
    const wrong = g.attempts.filter((a) => a.outcome === "incorrect" || a.revealed);
    if (wrong.length === 0) continue;
    const last = wrong[wrong.length - 1];
    const after = g.attempts.filter((a) => a.ts > last.ts && a.independent);
    const days = new Set(after.map((a) => dayOf(a.ts)));
    out.push({
      conceptId: g.conceptId,
      exerciseId: last.exerciseId,
      wrongCount: wrong.length,
      lastWrongAt: last.ts,
      lastAnswers: [...new Set(wrong.slice(-3).map((a) => a.answer).filter(Boolean))],
      status: days.size >= 2 ? "resolved" : days.size === 1 || after.length >= 1 ? "recovering" : "pending",
    });
  }
  const rank = { pending: 0, recovering: 1, resolved: 2 } as const;
  return out.sort((a, b) => rank[a.status] - rank[b.status] || b.lastWrongAt.localeCompare(a.lastWrongAt));
}

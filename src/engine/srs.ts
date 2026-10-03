/**
 * Revisão espaçada — regras (documentadas em docs/REGRAS.md).
 *
 * Cada conceito tem DOIS estados independentes:
 *  - `rec` (reconhecer): mcq, listen, match, dialog, order
 *  - `prod` (produzir):  cloze, dictation, fix, type
 * Reconhecer uma palavra não prova que se consegue produzi-la.
 *
 * Regras de transição (um evento por conceito+modo):
 *  1. Acerto INDEPENDENTE na primeira tentativa do dia, quando o item está
 *     vencido (ou ainda não agendado): sobe um nível; próxima revisão em
 *     intervalos[nível-1] dias.
 *  2. Acerto independente ANTES do vencimento: conta como evidência, mas não
 *     adianta o agendamento (não dá para "inflar" o nível praticando de novo).
 *  3. Acerto ASSISTIDO (pista, resposta revelada, atividade adaptada): o nível
 *     não sobe; revisão em 1 dia.
 *  4. ERRO: o nível cai 2 (mínimo 0); revisão em 1 dia; o item volta na mesma
 *     sessão depois de outros itens (ver `requeueAfter`).
 *  5. Repetição no MESMO dia (mesmo conceito+modo) não altera nível nem data:
 *     repetir logo após ver a resposta não comprova retenção.
 *  6. Itens vencidos além do limite diário NUNCA são apagados; só aparecem
 *     em dias seguintes, em ordem de prioridade.
 */
import type { ConceptState, DateKey, Mode, ModeState } from "./model";
import { addDays, diffDays } from "./dates";

export type ReviewResult = "independent" | "assisted" | "wrong";

export interface ReviewEvent {
  conceptId: string;
  mode: Mode;
  result: ReviewResult;
  date: DateKey;
  exerciseId: string;
}

export function emptyMode(): ModeState {
  return {
    level: 0,
    due: null,
    lastDate: null,
    lastResult: null,
    correct: 0,
    assisted: 0,
    wrong: 0,
    repeats: 0,
    consecutive: 0,
    days: [],
  };
}

export function newConcept(id: string, date: DateKey): ConceptState {
  return { id, firstSeen: date, lastSeen: date, rec: emptyMode(), prod: emptyMode(), history: [] };
}

/** Intervalo (dias) após `level` acertos independentes. */
export function intervalFor(level: number, intervals: number[]): number {
  if (level <= 0) return intervals[0];
  return intervals[Math.min(level, intervals.length) - 1];
}

export function maxLevel(intervals: number[]): number {
  return intervals.length;
}

/** Aplica um evento de revisão. Função pura: devolve um novo estado. */
export function applyReview(
  prev: ConceptState | undefined,
  ev: ReviewEvent,
  intervals: number[],
): ConceptState {
  const base = prev ?? newConcept(ev.conceptId, ev.date);
  const m: ModeState = { ...base[ev.mode], days: [...base[ev.mode].days] };
  const sameDay = m.lastDate === ev.date && m.lastResult !== null;

  if (sameDay) {
    // Regra 5: repetição no mesmo dia. Registra, mas não muda nível nem data.
    m.repeats += 1;
    if (ev.result === "wrong" && m.lastResult === "correct") {
      // Um erro depois de um acerto no mesmo dia não anula o acerto, mas mostra fragilidade.
      m.consecutive = 0;
    }
  } else if (ev.result === "independent") {
    m.correct += 1;
    m.consecutive += 1;
    if (!m.days.includes(ev.date)) m.days = [...m.days, ev.date].slice(-12);
    const dueNow = m.due === null || ev.date >= m.due;
    if (dueNow) {
      m.level = Math.min(m.level + 1, maxLevel(intervals));
      m.due = addDays(ev.date, intervalFor(m.level, intervals));
    } // Regra 2: antes do vencimento → só evidência.
    m.lastResult = "correct";
  } else if (ev.result === "assisted") {
    m.assisted += 1;
    m.consecutive = 0;
    // Sempre amanhã: antecipa um item agendado para mais longe e tira um item
    // vencido do limbo (senão ele ficaria "vencido hoje" indefinidamente).
    m.due = addDays(ev.date, intervals[0]);
    m.lastResult = "assisted";
  } else {
    m.wrong += 1;
    m.consecutive = 0;
    m.level = Math.max(0, m.level - 2);
    m.due = addDays(ev.date, intervals[0]);
    m.lastResult = "wrong";
  }
  m.lastDate = ev.date;

  const r = ev.result === "independent" ? "c" : ev.result === "assisted" ? "a" : "w";
  return {
    ...base,
    lastSeen: ev.date,
    [ev.mode]: m,
    history: [...base.history, { d: ev.date, m: ev.mode, r, ex: ev.exerciseId } as const].slice(-12),
  };
}

/** Garante que o conceito está agendado nos dois modos (usado ao concluir uma lição). */
export function seedConcept(
  prev: ConceptState | undefined,
  conceptId: string,
  date: DateKey,
  modes: Mode[],
  intervals: number[],
): ConceptState {
  const base = prev ?? newConcept(conceptId, date);
  const next: ConceptState = { ...base, rec: { ...base.rec }, prod: { ...base.prod } };
  for (const mode of modes) {
    if (next[mode].due === null) next[mode].due = addDays(date, intervals[0]);
  }
  return next;
}

// ---------- Fila de revisão ----------

export interface DueItem {
  conceptId: string;
  mode: Mode;
  due: DateKey;
  overdueDays: number;
  level: number;
}

/** Todos os itens vencidos (due <= hoje), por prioridade: mais atrasados e mais fracos primeiro. */
export function dueItems(concepts: Record<string, ConceptState>, today: DateKey): DueItem[] {
  const out: DueItem[] = [];
  for (const c of Object.values(concepts)) {
    for (const mode of ["prod", "rec"] as const) {
      const m = c[mode];
      if (m.due !== null && m.due <= today) {
        out.push({ conceptId: c.id, mode, due: m.due, overdueDays: diffDays(m.due, today), level: m.level });
      }
    }
  }
  return out.sort(
    (a, b) =>
      b.overdueDays - a.overdueDays ||
      a.level - b.level ||
      (a.mode === b.mode ? 0 : a.mode === "prod" ? -1 : 1) ||
      a.conceptId.localeCompare(b.conceptId),
  );
}

export interface ReviewQueue {
  /** Itens de hoje (respeitando o limite diário). */
  today: DueItem[];
  /** Total vencido; o excedente continua guardado, não é apagado. */
  totalDue: number;
  /** Quantos ficaram para os próximos dias por causa do limite. */
  deferred: number;
}

/**
 * Monta a fila do dia. `doneToday` = itens de revisão já respondidos hoje (contam
 * para o limite). Para não pegar vários modos do mesmo conceito juntos, o segundo
 * modo de um conceito só entra quando já passou do primeiro (ver `spaceModes`).
 */
export function buildReviewQueue(
  concepts: Record<string, ConceptState>,
  today: DateKey,
  cap: number,
  doneToday = 0,
): ReviewQueue {
  const all = dueItems(concepts, today);
  const room = Math.max(0, cap - doneToday);
  const picked = spaceModes(all).slice(0, room);
  return { today: picked, totalDue: all.length, deferred: Math.max(0, all.length - picked.length) };
}

/** Evita que `prod` e `rec` do mesmo conceito apareçam lado a lado. */
function spaceModes(items: DueItem[]): DueItem[] {
  const first: DueItem[] = [];
  const later: DueItem[] = [];
  const seen = new Set<string>();
  for (const it of items) {
    if (seen.has(it.conceptId)) later.push(it);
    else {
      seen.add(it.conceptId);
      first.push(it);
    }
  }
  return [...first, ...later];
}

/** Posição de reinserção de um item errado: após `gap` outros itens (ou no fim). */
export function requeueIndex(currentIndex: number, queueLength: number, gap = 3): number {
  return Math.min(currentIndex + 1 + gap, queueLength);
}

// ---------- Estado de domínio (nunca por um acerto só) ----------

export type MasteryStatus = "new" | "learning" | "practicing" | "consolidating" | "retained";

export const MASTERY_LABELS: Record<MasteryStatus, string> = {
  new: "Novo",
  learning: "Em aprendizado",
  practicing: "Praticando",
  consolidating: "Consolidando",
  retained: "Retido",
};

/**
 * Domínio por modo:
 *  - new: sem tentativas
 *  - learning: tentativas, mas < 2 acertos independentes
 *  - practicing: ≥ 2 acertos independentes em ≥ 2 dias distintos
 *  - consolidating: nível ≥ 3 (intervalo ≥ 7 dias já superado)
 *  - retained: nível ≥ 4 e sem erro nas últimas 2 revisões
 * Um único acerto nunca passa de "learning".
 */
export function modeStatus(m: ModeState): MasteryStatus {
  const attempts = m.correct + m.assisted + m.wrong + m.repeats;
  if (attempts === 0) return "new";
  if (m.level >= 4 && m.consecutive >= 2) return "retained";
  if (m.level >= 3) return "consolidating";
  if (m.correct >= 2 && m.days.length >= 2) return "practicing";
  return "learning";
}

/** Domínio geral = o mais fraco entre os modos já praticados. */
export function conceptStatus(c: ConceptState | undefined): MasteryStatus {
  if (!c) return "new";
  const order: MasteryStatus[] = ["new", "learning", "practicing", "consolidating", "retained"];
  const used = (["rec", "prod"] as const).filter((k) => c[k].correct + c[k].assisted + c[k].wrong + c[k].repeats > 0);
  if (used.length === 0) return "new";
  return used.map((k) => modeStatus(c[k])).sort((a, b) => order.indexOf(a) - order.indexOf(b))[0];
}

/** Modo de um exercício para fins de revisão. */
export function modeOfKind(kind: string): Mode | null {
  switch (kind) {
    case "mcq":
    case "listen":
    case "match":
    case "dialog":
    case "order":
      return "rec";
    case "cloze":
    case "dictation":
    case "fix":
    case "type":
      return "prod";
    default:
      return null; // write/speak: autoavaliados, fora da revisão automática
  }
}

/**
 * Utilidades de exercício independentes de interface: embaralhamento
 * determinístico e escada de pistas.
 */
import type { Exercise } from "@/content/schema";
import { primaryExpected } from "./grading";

function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a: number): () => number {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Embaralhamento reprodutível: a mesma `seed` dá a mesma ordem (útil para retomar e testar). */
export function seededShuffle<T>(items: readonly T[], seed: string): T[] {
  const rnd = mulberry32(hashSeed(seed));
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Índices das opções (ordem original) na ordem de exibição. */
export function optionOrder(ex: Exercise, seed: string): number[] {
  if (ex.kind !== "mcq" && ex.kind !== "listen") return [];
  const idx = ex.options.map((_, i) => i);
  if (ex.kind === "mcq" && ex.shuffle === false) return idx;
  if (ex.kind === "listen" && ex.shuffle === false) return idx;
  const shuffled = seededShuffle(idx, `${ex.id}|${seed}`);
  // Evita que a resposta correta fique sempre na mesma posição inicial por azar do hash.
  return shuffled;
}

export type Hint =
  | { type: "text"; text: string }
  | { type: "eliminate" }
  | { type: "first-word"; text: string };

/** Escada de pistas: as do autor primeiro, depois uma pista automática. */
export function hintLadder(ex: Exercise): Hint[] {
  const authored: Hint[] = (ex.hints ?? []).map((text) => ({ type: "text", text }));
  switch (ex.kind) {
    case "mcq":
    case "listen":
      return [...authored, { type: "eliminate" }];
    case "cloze":
    case "type":
    case "fix":
    case "dictation": {
      const first = ex.accepted[0].trim().split(/\s+/)[0] ?? "";
      const letters = first.slice(0, Math.min(2, first.length));
      return [...authored, { type: "first-word", text: `Começa com “${letters}…”` }];
    }
    case "order": {
      const first = ex.answers[0].split(/\s+/)[0];
      return [...authored, { type: "first-word", text: `A primeira palavra é “${first}”.` }];
    }
    default:
      return authored;
  }
}

export function maxHints(ex: Exercise): number {
  return hintLadder(ex).length;
}

/** Para uma pista "eliminar": índice (ordem original) de uma opção errada a esconder. */
export function eliminableOption(ex: Exercise, alreadyHidden: number[]): number | null {
  if (ex.kind !== "mcq" && ex.kind !== "listen") return null;
  const candidates = ex.options.map((_, i) => i).filter((i) => i !== ex.answer && !alreadyHidden.includes(i));
  // Mantém pelo menos duas opções visíveis.
  if (ex.options.length - alreadyHidden.length <= 2) return null;
  return candidates.length ? candidates[0] : null;
}

/** Texto falado de um exercício de áudio. */
export function spokenText(ex: Exercise): string[] {
  if (ex.kind === "listen") return ex.say;
  if (ex.kind === "dictation") return [ex.say];
  return [];
}

export function isAudioExercise(ex: Exercise): boolean {
  return ex.kind === "listen" || ex.kind === "dictation";
}

/** Resposta de exibição para o botão "Revelar resposta". */
export function revealText(ex: Exercise): string {
  return primaryExpected(ex);
}

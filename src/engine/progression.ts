/**
 * Progressão: quais unidades/lições estão liberadas e o que vem a seguir.
 *
 * Regras (ver docs/REGRAS.md):
 *  - Uma unidade abre quando TODOS os pré-requisitos foram aprovados no
 *    checkpoint, aprovados por teste direto, ou marcados como ponto de partida.
 *  - Pular por ponto de partida libera a trilha, mas NÃO afirma que o conteúdo foi
 *    aprendido: a unidade aparece como "pulada", nunca como "concluída".
 *  - Dentro de uma unidade as lições abrem em sequência; lições já iniciadas,
 *    unidades aprovadas ou puladas ficam sempre acessíveis para revisão.
 *  - O checkpoint aprova com ≥ `passThreshold` de acertos INDEPENDENTES.
 */
import type { UnitMeta } from "@/content/schema";
import { lessonIdsOf } from "@/content/curriculum";
import type { ProgressState } from "./model";

export type UnitStatus =
  | "locked"
  | "available"
  | "in_progress"
  | "checkpoint_ready"
  | "completed"
  | "tested_out"
  | "skipped";

export const UNIT_STATUS_LABEL: Record<UnitStatus, string> = {
  locked: "Bloqueada",
  available: "Disponível",
  in_progress: "Em andamento",
  checkpoint_ready: "Pronta para o checkpoint",
  completed: "Concluída",
  tested_out: "Aprovada por teste",
  skipped: "Pulada (ponto de partida)",
};

export function lessonCompleted(state: ProgressState, lessonId: string): boolean {
  return state.lessons[lessonId]?.status === "completed";
}

export function lessonsDone(state: ProgressState, meta: UnitMeta): number {
  return lessonIdsOf(meta).filter((id) => lessonCompleted(state, id)).length;
}

export function unitPassed(state: ProgressState, unitId: string): boolean {
  return Boolean(state.units[unitId]?.passedAt);
}

/** Libera dependentes: aprovada ou marcada como ponto de partida. */
export function unitSatisfied(state: ProgressState, unitId: string): boolean {
  const u = state.units[unitId];
  return Boolean(u?.passedAt || u?.skip);
}

export function prerequisitesMet(state: ProgressState, meta: UnitMeta): boolean {
  return meta.prerequisites.every((p) => unitSatisfied(state, p));
}

export function unitStatus(state: ProgressState, meta: UnitMeta): UnitStatus {
  const done = lessonsDone(state, meta);
  if (unitPassed(state, meta.id)) return done >= meta.lessonCount ? "completed" : "tested_out";
  const skip = state.units[meta.id]?.skip;
  if (skip && done === 0 && !startedAny(state, meta)) return "skipped";
  if (!skip && !prerequisitesMet(state, meta)) return "locked";
  if (done >= meta.lessonCount) return "checkpoint_ready";
  if (done > 0 || startedAny(state, meta)) return "in_progress";
  return "available";
}

function startedAny(state: ProgressState, meta: UnitMeta): boolean {
  return lessonIdsOf(meta).some((id) => state.lessons[id] !== undefined);
}

export type LessonAccess = "locked" | "open";

export function lessonAccess(state: ProgressState, meta: UnitMeta, index: number): LessonAccess {
  const status = unitStatus(state, meta);
  if (status === "locked") return "locked";
  if (index === 0) return "open";
  const ids = lessonIdsOf(meta);
  if (state.lessons[ids[index]]) return "open"; // já iniciada ou concluída
  if (lessonCompleted(state, ids[index - 1])) return "open";
  if (status === "completed" || status === "tested_out" || status === "skipped") return "open";
  return "locked";
}

/** O checkpoint abre depois das lições, ou antes como "teste para pular" (unidade desbloqueada). */
export function checkpointAccess(state: ProgressState, meta: UnitMeta): "locked" | "after-lessons" | "test-out" {
  const status = unitStatus(state, meta);
  if (status === "locked") return "locked";
  return lessonsDone(state, meta) >= meta.lessonCount ? "after-lessons" : "test-out";
}

export interface NextStep {
  unitId: string;
  kind: "lesson" | "checkpoint";
  lessonId?: string;
  lessonIndex?: number;
}

/** Próximo passo recomendado: a primeira unidade ainda não resolvida, na ordem do currículo. */
export function recommendedNext(state: ProgressState, curriculum: UnitMeta[]): NextStep | null {
  for (const meta of curriculum) {
    const status = unitStatus(state, meta);
    if (status === "completed" || status === "tested_out" || status === "skipped" || status === "locked") continue;
    if (status === "checkpoint_ready") return { unitId: meta.id, kind: "checkpoint" };
    const ids = lessonIdsOf(meta);
    const idx = ids.findIndex((id) => !lessonCompleted(state, id));
    return { unitId: meta.id, kind: "lesson", lessonId: ids[idx], lessonIndex: idx };
  }
  return null;
}

/** Lição com sessão interrompida mais recente (para "Continuar de onde parei"). */
export function interruptedLesson(state: ProgressState): string | null {
  const open = Object.values(state.lessons).filter((l) => l.session !== null);
  if (open.length === 0) return null;
  return open.sort((a, b) => b.startedAt.localeCompare(a.startedAt))[0].id;
}

export function interruptedCheckpoint(state: ProgressState): string | null {
  const open = Object.values(state.units).filter((u) => u.session !== null);
  return open.length ? open[0].id : null;
}

export interface CheckpointScore {
  total: number;
  independentCorrect: number;
  ratio: number;
  passed: boolean;
}

export function scoreCheckpoint(total: number, independentCorrect: number, threshold: number): CheckpointScore {
  const ratio = total === 0 ? 0 : independentCorrect / total;
  // Pequena tolerância contra erro de ponto flutuante (8/10 deve passar a 0,8).
  return { total, independentCorrect, ratio, passed: ratio + 1e-9 >= threshold };
}

/** Qual versão do checkpoint usar na próxima tentativa (alterna A, B, A, B…). */
export function nextCheckpointSet(state: ProgressState, unitId: string): "A" | "B" {
  const n = state.units[unitId]?.attempts.length ?? 0;
  return n % 2 === 0 ? "A" : "B";
}

export interface StageProgress {
  stage: string;
  total: number;
  completed: number;
  skipped: number;
}

export function stageProgress(state: ProgressState, curriculum: UnitMeta[], stage: string): StageProgress {
  const units = curriculum.filter((m) => m.stage === stage);
  let completed = 0;
  let skipped = 0;
  for (const m of units) {
    const s = unitStatus(state, m);
    if (s === "completed" || s === "tested_out") completed += 1;
    else if (s === "skipped") skipped += 1;
  }
  return { stage, total: units.length, completed, skipped };
}

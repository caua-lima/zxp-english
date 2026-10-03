/**
 * Camada de persistência.
 *
 * `ProgressRepository` é a única interface que o resto do app conhece. Hoje há
 * duas implementações (IndexedDB e memória); uma sincronização futura entre
 * dispositivos seria uma terceira, sem mudar o restante do código.
 *
 * Garantias exigidas de qualquer implementação:
 *  - `apply` e `replaceAll` são ATÔMICOS: ou gravam tudo, ou nada.
 *  - `load` valida cada linha; dados inválidos viram avisos, nunca travam o app.
 */
import { z } from "zod";
import {
  achievementSchema,
  attemptSchema,
  conceptStateSchema,
  lessonProgressSchema,
  metaSchema,
  profileSchema,
  progressStateSchema,
  settingsSchema,
  taskSchema,
  unitProgressSchema,
  xpEntrySchema,
  SCHEMA_VERSION,
  type ProgressState,
} from "@/engine/model";
import { defaultMeta, defaultProfile, defaultSettings } from "@/engine/defaults";

export const STORES = ["meta", "lessons", "units", "concepts", "attempts", "xp", "tasks", "achievements"] as const;
export type StoreName = (typeof STORES)[number];

export type WriteOp =
  | { store: StoreName; key: string; value: unknown }
  | { store: StoreName; key: string; delete: true };

export class StorageError extends Error {
  constructor(
    message: string,
    readonly code: "unavailable" | "quota" | "blocked" | "failed",
    readonly cause?: unknown,
  ) {
    super(message);
    this.name = "StorageError";
  }
}

export interface LoadResult {
  /** null = nada salvo ainda (primeiro acesso). */
  state: ProgressState | null;
  /** Linhas ignoradas por estarem inválidas. */
  warnings: string[];
}

export interface ProgressRepository {
  readonly kind: "indexeddb" | "memory";
  load(): Promise<LoadResult>;
  apply(ops: WriteOp[]): Promise<void>;
  replaceAll(state: ProgressState): Promise<void>;
  wipe(): Promise<void>;
  close(): void;
}

// ---------- Estado ⇄ linhas ----------

export type Rows = Record<StoreName, Map<string, unknown>>;

export function emptyRows(): Rows {
  return Object.fromEntries(STORES.map((s) => [s, new Map<string, unknown>()])) as Rows;
}

/** Converte o estado completo em operações de escrita (uma por linha). */
export function stateToOps(state: ProgressState): WriteOp[] {
  const ops: WriteOp[] = [
    { store: "meta", key: "schemaVersion", value: SCHEMA_VERSION },
    { store: "meta", key: "settings", value: state.settings },
    { store: "meta", key: "profile", value: state.profile },
    { store: "meta", key: "meta", value: state.meta },
  ];
  for (const [k, v] of Object.entries(state.lessons)) ops.push({ store: "lessons", key: k, value: v });
  for (const [k, v] of Object.entries(state.units)) ops.push({ store: "units", key: k, value: v });
  for (const [k, v] of Object.entries(state.concepts)) ops.push({ store: "concepts", key: k, value: v });
  for (const a of state.attempts) ops.push({ store: "attempts", key: a.id, value: a });
  for (const x of state.xp) ops.push({ store: "xp", key: x.id, value: x });
  for (const [k, v] of Object.entries(state.tasks)) ops.push({ store: "tasks", key: k, value: v });
  for (const [k, v] of Object.entries(state.achievements)) ops.push({ store: "achievements", key: k, value: v });
  return ops;
}

function parseRows<T>(rows: Map<string, unknown>, schema: z.ZodType<T>, label: string, warnings: string[]): Record<string, T> {
  const out: Record<string, T> = {};
  for (const [key, raw] of rows) {
    const r = schema.safeParse(raw);
    if (r.success) out[key] = r.data;
    else warnings.push(`${label} “${key}” ignorado(a): formato inválido.`);
  }
  return out;
}

function parseList<T extends { id: string }>(rows: Map<string, unknown>, schema: z.ZodType<T>, label: string, warnings: string[]): T[] {
  return Object.values(parseRows(rows, schema, label, warnings));
}

/** Reconstrói o estado a partir das linhas, validando cada uma. */
export function rowsToState(rows: Rows, nowIso: string): LoadResult {
  const warnings: string[] = [];
  const m = rows.meta;
  if (!m.has("profile") && !m.has("settings")) return { state: null, warnings };

  const settingsR = settingsSchema.safeParse(m.get("settings"));
  const profileR = profileSchema.safeParse(m.get("profile"));
  const metaR = metaSchema.safeParse(m.get("meta"));
  if (!settingsR.success) warnings.push("Configurações inválidas; usando padrões.");
  if (!profileR.success) warnings.push("Perfil inválido; usando padrões.");
  if (!metaR.success) warnings.push("Metadados inválidos; usando padrões.");

  const state: ProgressState = {
    settings: settingsR.success ? settingsR.data : defaultSettings(),
    profile: profileR.success ? profileR.data : { ...defaultProfile(nowIso), onboarded: true },
    meta: metaR.success ? metaR.data : defaultMeta(),
    lessons: parseRows(rows.lessons, lessonProgressSchema, "Lição", warnings),
    units: parseRows(rows.units, unitProgressSchema, "Unidade", warnings),
    concepts: parseRows(rows.concepts, conceptStateSchema, "Conceito", warnings),
    attempts: parseList(rows.attempts, attemptSchema, "Tentativa", warnings).sort((a, b) => a.ts.localeCompare(b.ts)),
    xp: parseList(rows.xp, xpEntrySchema, "XP", warnings).sort((a, b) => a.ts.localeCompare(b.ts)),
    tasks: parseRows(rows.tasks, taskSchema, "Tarefa", warnings),
    achievements: parseRows(rows.achievements, achievementSchema, "Conquista", warnings),
  };
  return { state, warnings };
}

/** Aplica operações a um conjunto de linhas (usado pela implementação em memória). */
export function applyOpsToRows(rows: Rows, ops: WriteOp[]): void {
  for (const op of ops) {
    if ("delete" in op) rows[op.store].delete(op.key);
    else rows[op.store].set(op.key, op.value);
  }
}

/** Confere se um estado serializado passa no schema completo (usado antes de substituir tudo). */
export function assertValidState(state: unknown): ProgressState {
  return progressStateSchema.parse(state);
}

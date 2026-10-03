/**
 * Backup e restauração em JSON.
 *
 * Exportar: estado completo + versão do formato.
 * Importar: nunca altera nada por conta própria. `parseBackup` só devolve um estado
 * VALIDADO (ou um erro); quem chama decide, depois de confirmação do usuário, se
 * substitui o progresso atual. Importações inválidas portanto não destroem dados.
 */
import {
  BACKUP_APP,
  SCHEMA_VERSION,
  backupSchema,
  progressStateSchema,
  type BackupEnvelope,
  type ProgressState,
} from "@/engine/model";
import { MIGRATIONS, migrate, type MigrationTable } from "./migrations";

export const MAX_BACKUP_BYTES = 30 * 1024 * 1024;

export function buildBackup(state: ProgressState, exportedAt: Date = new Date()): BackupEnvelope {
  return { app: BACKUP_APP, schemaVersion: SCHEMA_VERSION, exportedAt: exportedAt.toISOString(), data: state };
}

export function serializeBackup(env: BackupEnvelope): string {
  return JSON.stringify(env, null, 2);
}

export function backupFileName(date: Date = new Date()): string {
  const d = date.toISOString().slice(0, 10);
  return `zxp-english-backup-${d}.json`;
}

export interface BackupSummary {
  exportedAt: string;
  schemaVersion: number;
  lessonsCompleted: number;
  unitsPassed: number;
  concepts: number;
  attempts: number;
  totalXp: number;
  lastStudyDate: string | null;
}

export type ImportResult =
  | { ok: true; state: ProgressState; summary: BackupSummary; migratedFrom: number | null; warnings: string[] }
  | { ok: false; error: string };

export function summarize(state: ProgressState, exportedAt: string, schemaVersion = SCHEMA_VERSION): BackupSummary {
  return {
    exportedAt,
    schemaVersion,
    lessonsCompleted: Object.values(state.lessons).filter((l) => l.status === "completed").length,
    unitsPassed: Object.values(state.units).filter((u) => u.passedAt).length,
    concepts: Object.keys(state.concepts).length,
    attempts: state.attempts.length,
    totalXp: state.xp.reduce((n, x) => n + x.amount, 0),
    lastStudyDate: state.meta.lastStudyDate,
  };
}

/** Remove duplicatas por ID em listas (um backup editado à mão ou mesclado pode ter). */
function dedupeById<T extends { id: string }>(list: T[], label: string, warnings: string[]): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const item of list) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    out.push(item);
  }
  if (out.length !== list.length) warnings.push(`${list.length - out.length} registro(s) duplicado(s) de ${label} foram descartados.`);
  return out;
}

export function parseBackup(text: string, table: MigrationTable = MIGRATIONS, current: number = SCHEMA_VERSION): ImportResult {
  if (text.length > MAX_BACKUP_BYTES) return { ok: false, error: "O arquivo é grande demais para ser um backup do ZXP ENGLISH." };

  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    return { ok: false, error: "O arquivo não é um JSON válido. Escolha um backup exportado pelo ZXP ENGLISH." };
  }

  const env = backupSchema.safeParse(json);
  if (!env.success) {
    return { ok: false, error: "Este arquivo não parece ser um backup do ZXP ENGLISH (formato do cabeçalho inválido)." };
  }
  const { schemaVersion, exportedAt } = env.data;
  if (schemaVersion > current) {
    return {
      ok: false,
      error: `Este backup é de uma versão mais nova do app (formato ${schemaVersion}; esta versão entende até ${current}). Atualize o app antes de restaurar.`,
    };
  }

  let data: unknown = env.data.data;
  let migratedFrom: number | null = null;
  try {
    if (schemaVersion < current) {
      data = migrate(data, schemaVersion, current, table);
      migratedFrom = schemaVersion;
    }
  } catch (e) {
    return { ok: false, error: `Não foi possível converter o backup do formato ${schemaVersion}: ${(e as Error).message}` };
  }

  const parsed = progressStateSchema.safeParse(data);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { ok: false, error: `O backup está corrompido ou incompleto (${first.path.join(".") || "raiz"}: ${first.message}). Nada foi alterado.` };
  }

  const warnings: string[] = [];
  const state: ProgressState = {
    ...parsed.data,
    attempts: dedupeById(parsed.data.attempts, "tentativas", warnings),
    xp: dedupeById(parsed.data.xp, "XP", warnings),
  };
  return { ok: true, state, summary: summarize(state, exportedAt, schemaVersion), migratedFrom, warnings };
}

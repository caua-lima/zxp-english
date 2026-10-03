/**
 * Modelo de dados do progresso (fonte única de verdade).
 *
 * Os mesmos schemas validam o que vem do IndexedDB e o que vem de um backup
 * importado. Os tipos TypeScript são inferidos daqui.
 */
import { z } from "zod";
import { EXERCISE_KINDS, SKILLS } from "@/content/schema";

export const SCHEMA_VERSION = 1;

export const dateKeySchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "data inválida");
export type DateKey = z.infer<typeof dateKeySchema>;
const isoSchema = z.string().refine((s) => !Number.isNaN(Date.parse(s)), "data/hora inválida");

// ---------- Perfil e configurações ----------

export const settingsSchema = z.strictObject({
  dailyMinutes: z.union([z.literal(10), z.literal(20), z.literal(30)]),
  /** Meta diária em XP (padrão deriva do tempo, mas é ajustável). */
  dailyXpGoal: z.number().int().min(10).max(500),
  /** Máximo de itens de revisão por dia. Pendências além do limite NÃO são apagadas. */
  reviewCap: z.number().int().min(3).max(60),
  timezone: z.string().min(1),
  /** Critério de avanço em checkpoints (0.5–1). Decisão de produto, não limiar científico. */
  passThreshold: z.number().min(0.5).max(1),
  /** Intervalos da revisão espaçada, em dias. */
  reviewIntervals: z.array(z.number().int().min(1).max(365)).min(2).max(8),
  instructionLanguage: z.enum(["pt", "en"]),
  showTranslations: z.boolean(),
  voiceURI: z.string().optional(),
  speechRate: z.number().min(0.5).max(1.2),
  reducedMotion: z.enum(["system", "on", "off"]),
  theme: z.enum(["system", "light", "dark"]),
});
export type Settings = z.infer<typeof settingsSchema>;

export const GOALS = ["travel", "work", "study", "culture", "general"] as const;
export type Goal = (typeof GOALS)[number];
export const GOAL_LABELS: Record<Goal, string> = {
  travel: "Viajar",
  work: "Trabalho",
  study: "Estudos",
  culture: "Filmes, música e internet",
  general: "Uso geral",
};

export const placementResultSchema = z.strictObject({
  takenAt: isoSchema,
  answered: z.number().int().min(0),
  correctIndependent: z.number().int().min(0),
  byStage: z.record(z.string(), z.strictObject({ correct: z.number().int(), total: z.number().int() })),
  suggestedUnit: z.string(),
  accepted: z.boolean(),
  /** Quantas perguntas de escuta foram adaptadas (sem áudio). */
  adaptedListening: z.number().int().min(0),
});
export type PlacementResult = z.infer<typeof placementResultSchema>;

export const profileSchema = z.strictObject({
  createdAt: isoSchema,
  onboarded: z.boolean(),
  goal: z.enum(GOALS),
  /** Unidade escolhida como ponto de partida (manual ou sugerida). null = do zero. */
  startUnit: z.string().nullable(),
  startSource: z.enum(["zero", "manual", "placement"]),
  placement: placementResultSchema.nullable(),
});
export type Profile = z.infer<typeof profileSchema>;

// ---------- Revisão espaçada ----------

export const modeStateSchema = z.strictObject({
  level: z.number().int().min(0).max(12),
  due: dateKeySchema.nullable(),
  lastDate: dateKeySchema.nullable(),
  lastResult: z.enum(["correct", "assisted", "wrong"]).nullable(),
  correct: z.number().int().min(0),
  assisted: z.number().int().min(0),
  wrong: z.number().int().min(0),
  repeats: z.number().int().min(0),
  consecutive: z.number().int().min(0),
  days: z.array(dateKeySchema).max(12),
});
export type ModeState = z.infer<typeof modeStateSchema>;
export type Mode = "rec" | "prod";

export const conceptStateSchema = z.strictObject({
  id: z.string(),
  firstSeen: dateKeySchema,
  lastSeen: dateKeySchema,
  rec: modeStateSchema,
  prod: modeStateSchema,
  history: z
    .array(
      z.strictObject({
        d: dateKeySchema,
        m: z.enum(["rec", "prod"]),
        r: z.enum(["c", "a", "w"]),
        ex: z.string(),
      }),
    )
    .max(12),
});
export type ConceptState = z.infer<typeof conceptStateSchema>;

// ---------- Tentativas ----------

export const CONTEXTS = ["lesson", "review", "checkpoint", "activity", "notebook", "placement"] as const;
export type AttemptContext = (typeof CONTEXTS)[number];

export const attemptSchema = z.strictObject({
  id: z.string(),
  ts: isoSchema,
  exerciseId: z.string(),
  kind: z.enum(EXERCISE_KINDS),
  skill: z.enum(SKILLS),
  concepts: z.array(z.string()),
  context: z.enum(CONTEXTS),
  /** Lição, unidade ou sessão a que a tentativa pertence. */
  ref: z.string(),
  outcome: z.enum(["correct", "typo", "incorrect", "self"]),
  /** Acerto sem pista, sem revelar a resposta, sem repetição imediata e sem adaptação. */
  independent: z.boolean(),
  hints: z.number().int().min(0),
  revealed: z.boolean(),
  answer: z.string().max(2000),
  adapted: z.boolean().optional(),
  retry: z.boolean().optional(),
  /** Qual versão do checkpoint (A/B), quando aplicável. */
  set: z.enum(["A", "B"]).optional(),
});
export type Attempt = z.infer<typeof attemptSchema>;

// ---------- Lições, checkpoints e unidades ----------

export const sessionSnapshotSchema = z.strictObject({
  /** IDs completos dos exercícios na ordem da fila (inclui reapresentações). */
  queue: z.array(z.string()),
  cursor: z.number().int().min(0),
  phase: z.enum(["intro", "exercises", "summary"]),
  /** exerciseId → resultado resumido (para retomar sem perder respostas). */
  results: z.record(
    z.string(),
    z.strictObject({
      outcome: z.enum(["correct", "typo", "incorrect", "self"]),
      independent: z.boolean(),
      hints: z.number().int().min(0),
      revealed: z.boolean(),
    }),
  ),
  /** Exercícios já reapresentados uma vez (evita laços infinitos). */
  requeued: z.array(z.string()),
  set: z.enum(["A", "B"]).optional(),
});
export type SessionSnapshot = z.infer<typeof sessionSnapshotSchema>;

export const lessonProgressSchema = z.strictObject({
  id: z.string(),
  status: z.enum(["in_progress", "completed"]),
  startedAt: isoSchema,
  completedAt: isoSchema.optional(),
  /** Quantas vezes concluída (repetições não geram novo XP). */
  completions: z.number().int().min(0),
  /** Acerto independente na última conclusão (0–1), só em itens corrigidos. */
  lastAccuracy: z.number().min(0).max(1).optional(),
  session: sessionSnapshotSchema.nullable(),
});
export type LessonProgress = z.infer<typeof lessonProgressSchema>;

export const checkpointAttemptSchema = z.strictObject({
  n: z.number().int().min(1),
  set: z.enum(["A", "B"]),
  ts: isoSchema,
  total: z.number().int(),
  independentCorrect: z.number().int(),
  passed: z.boolean(),
  threshold: z.number(),
  weakConcepts: z.array(z.string()),
});
export type CheckpointAttempt = z.infer<typeof checkpointAttemptSchema>;

export const unitProgressSchema = z.strictObject({
  id: z.string(),
  /** `skipped` = ponto de partida manual/diagnóstico: libera a unidade sem afirmar que foi aprendida. */
  skip: z.enum(["manual", "placement"]).nullable(),
  attempts: z.array(checkpointAttemptSchema),
  passedAt: isoSchema.nullable(),
  session: sessionSnapshotSchema.nullable(),
  /** Atividades da unidade concluídas (reading, listening…). */
  activitiesDone: z.array(z.string()),
});
export type UnitProgress = z.infer<typeof unitProgressSchema>;

// ---------- XP, tarefas, conquistas ----------

export const XP_KINDS = ["lesson", "checkpoint", "activity", "mission", "review", "task", "placement", "outside"] as const;
export type XpKind = (typeof XP_KINDS)[number];

export const xpEntrySchema = z.strictObject({
  /** ID determinístico: o mesmo evento nunca gera XP duas vezes. */
  id: z.string(),
  ts: isoSchema,
  kind: z.enum(XP_KINDS),
  amount: z.number().int().min(0).max(500),
  ref: z.string().optional(),
});
export type XpEntry = z.infer<typeof xpEntrySchema>;

export const TASK_KINDS = ["writing", "speaking", "mission", "outside", "production"] as const;
export const taskSchema = z.strictObject({
  /** = ID do exercício (ou da missão externa). Reenvios substituem o anterior e contam em `runs`. */
  id: z.string(),
  unitId: z.string(),
  kind: z.enum(TASK_KINDS),
  /** `self_assessed`: autoavaliação. `self_reported`: autorrelato de atividade fora do app. Nunca é avaliação externa. */
  status: z.enum(["self_assessed", "self_reported"]),
  ts: isoSchema,
  runs: z.number().int().min(1),
  text: z.string().max(10000).optional(),
  checks: z.array(z.boolean()),
  recorded: z.boolean().optional(),
  /** Feita sem áudio/microfone: não conta como evidência da habilidade. */
  adapted: z.boolean().optional(),
});
export type TaskRecord = z.infer<typeof taskSchema>;

export const achievementSchema = z.strictObject({ id: z.string(), unlockedAt: isoSchema });
export type AchievementRecord = z.infer<typeof achievementSchema>;

export const metaSchema = z.strictObject({
  lastBackupAt: isoSchema.nullable(),
  lastStudyDate: dateKeySchema.nullable(),
  bestStreak: z.number().int().min(0),
});
export type Meta = z.infer<typeof metaSchema>;

// ---------- Estado completo ----------

export const progressStateSchema = z.strictObject({
  settings: settingsSchema,
  profile: profileSchema,
  meta: metaSchema,
  lessons: z.record(z.string(), lessonProgressSchema),
  units: z.record(z.string(), unitProgressSchema),
  concepts: z.record(z.string(), conceptStateSchema),
  attempts: z.array(attemptSchema),
  xp: z.array(xpEntrySchema),
  tasks: z.record(z.string(), taskSchema),
  achievements: z.record(z.string(), achievementSchema),
});
export type ProgressState = z.infer<typeof progressStateSchema>;

export const BACKUP_APP = "zxp-english";

export const backupSchema = z.strictObject({
  app: z.literal(BACKUP_APP),
  schemaVersion: z.number().int().min(1),
  exportedAt: isoSchema,
  data: z.unknown(),
});
export type BackupEnvelope = z.infer<typeof backupSchema>;

/**
 * Ações de estado: funções PURAS `(estado, entrada, agora) → { estado, operações }`.
 *
 * Nada aqui toca o navegador. As `ops` descrevem exatamente o que gravar, e o
 * `ProgressStore` as aplica de forma atômica. Todas as ações são idempotentes
 * quanto a XP e tentativas (IDs determinísticos), então um clique duplo ou um
 * reenvio não duplica nada.
 */
import type { Exercise } from "@/content/schema";
import { CURRICULUM } from "@/content/curriculum";
import type {
  AchievementRecord,
  Attempt,
  AttemptContext,
  CheckpointAttempt,
  ConceptState,
  LessonProgress,
  Mode,
  PlacementResult,
  ProgressState,
  SessionSnapshot,
  Settings,
  TaskRecord,
  UnitProgress,
  XpEntry,
  XpKind,
} from "@/engine/model";
import { dateKey } from "@/engine/dates";
import { BY_MINUTES } from "@/engine/defaults";
import type { GradeResult } from "@/engine/grading";
import { isIndependent } from "@/engine/grading";
import { applyReview, modeOfKind, seedConcept, type ReviewResult } from "@/engine/srs";
import { XP_AMOUNTS, bestStreakOf, studyDays } from "@/engine/xp";
import type { WriteOp } from "@/persistence/repository";

export interface Change {
  state: ProgressState;
  ops: WriteOp[];
}

const unchanged = (state: ProgressState): Change => ({ state, ops: [] });

class Draft {
  s: ProgressState;
  ops: WriteOp[] = [];
  private xpIds: Set<string> | null = null;
  xpAdded = false;

  constructor(
    base: ProgressState,
    readonly now: Date,
  ) {
    this.s = base;
  }

  get tz(): string {
    return this.s.settings.timezone;
  }
  get ts(): string {
    return this.now.toISOString();
  }
  get today(): string {
    return dateKey(this.now, this.tz);
  }

  putMeta(meta: ProgressState["meta"]): void {
    this.s = { ...this.s, meta };
    this.ops.push({ store: "meta", key: "meta", value: meta });
  }
  putSettings(settings: Settings): void {
    this.s = { ...this.s, settings };
    this.ops.push({ store: "meta", key: "settings", value: settings });
  }
  putProfile(profile: ProgressState["profile"]): void {
    this.s = { ...this.s, profile };
    this.ops.push({ store: "meta", key: "profile", value: profile });
  }
  putLesson(l: LessonProgress): void {
    this.s = { ...this.s, lessons: { ...this.s.lessons, [l.id]: l } };
    this.ops.push({ store: "lessons", key: l.id, value: l });
  }
  putUnit(u: UnitProgress): void {
    this.s = { ...this.s, units: { ...this.s.units, [u.id]: u } };
    this.ops.push({ store: "units", key: u.id, value: u });
  }
  putConcept(c: ConceptState): void {
    this.s = { ...this.s, concepts: { ...this.s.concepts, [c.id]: c } };
    this.ops.push({ store: "concepts", key: c.id, value: c });
  }
  putTask(t: TaskRecord): void {
    this.s = { ...this.s, tasks: { ...this.s.tasks, [t.id]: t } };
    this.ops.push({ store: "tasks", key: t.id, value: t });
  }
  putAchievement(a: AchievementRecord): void {
    this.s = { ...this.s, achievements: { ...this.s.achievements, [a.id]: a } };
    this.ops.push({ store: "achievements", key: a.id, value: a });
  }

  hasAttempt(id: string): boolean {
    return this.s.attempts.some((a) => a.id === id);
  }
  addAttempt(a: Attempt): void {
    this.s = { ...this.s, attempts: [...this.s.attempts, a] };
    this.ops.push({ store: "attempts", key: a.id, value: a });
  }

  /** Concede XP uma única vez por ID. Devolve se concedeu. */
  addXp(id: string, kind: XpKind, amount: number, ref?: string): boolean {
    if (amount <= 0) return false;
    if (!this.xpIds) this.xpIds = new Set(this.s.xp.map((x) => x.id));
    if (this.xpIds.has(id)) return false;
    this.xpIds.add(id);
    const entry: XpEntry = { id, ts: this.ts, kind, amount, ...(ref ? { ref } : {}) };
    this.s = { ...this.s, xp: [...this.s.xp, entry] };
    this.ops.push({ store: "xp", key: id, value: entry });
    this.xpAdded = true;
    return true;
  }

  /** Atualiza metadados derivados (último dia de estudo, melhor sequência). */
  finish(): Change {
    if (this.xpAdded) {
      const days = studyDays(this.s.xp, this.tz);
      const best = Math.max(this.s.meta.bestStreak, bestStreakOf(days));
      const last = [...days].sort().at(-1) ?? this.s.meta.lastStudyDate;
      if (best !== this.s.meta.bestStreak || last !== this.s.meta.lastStudyDate) {
        this.putMeta({ ...this.s.meta, bestStreak: best, lastStudyDate: last });
      }
    }
    return { state: this.s, ops: this.ops };
  }
}

// ---------------------------------------------------------------- tentativas

export interface RecordAttemptInput {
  /** Determinístico por execução: `${sessão}:${exercício}:${n}`. Evita gravar a mesma resposta duas vezes. */
  attemptId: string;
  exercise: Exercise;
  context: AttemptContext;
  /** Lição, unidade ou "review". */
  ref: string;
  grade: GradeResult;
  hints: number;
  revealed: boolean;
  adapted?: boolean;
  /** Reapresentação depois de um erro na mesma sessão. */
  retry?: boolean;
  set?: "A" | "B";
}

export function recordAttempt(state: ProgressState, input: RecordAttemptInput, now: Date): Change & { attempt: Attempt | null } {
  const d = new Draft(state, now);
  if (d.hasAttempt(input.attemptId)) return { ...unchanged(state), attempt: null };

  const { exercise: ex, grade } = input;
  const independent = isIndependent({
    outcome: grade.outcome,
    hints: input.hints,
    revealed: input.revealed,
    adapted: input.adapted,
    retry: input.retry,
  });
  const attempt: Attempt = {
    id: input.attemptId,
    ts: d.ts,
    exerciseId: ex.id,
    kind: ex.kind,
    skill: ex.skill,
    concepts: ex.concepts,
    context: input.context,
    ref: input.ref,
    outcome: grade.outcome,
    independent,
    hints: input.hints,
    revealed: input.revealed,
    answer: grade.userAnswer.slice(0, 500),
    ...(input.adapted ? { adapted: true } : {}),
    ...(input.retry ? { retry: true } : {}),
    ...(input.set ? { set: input.set } : {}),
  };
  d.addAttempt(attempt);

  const mode: Mode | null = modeOfKind(ex.kind);
  const today = d.today;

  // Revisão espaçada: só exercícios corrigidos, e nunca o diagnóstico.
  if (grade.graded && mode && input.context !== "placement") {
    const result: ReviewResult = independent ? "independent" : grade.correct && !input.revealed ? "assisted" : "wrong";
    for (const conceptId of ex.concepts) {
      d.putConcept(
        applyReview(
          d.s.concepts[conceptId],
          { conceptId, mode, result, date: today, exerciseId: ex.id },
          d.s.settings.reviewIntervals,
        ),
      );
    }
  }

  // XP: uma vez por exercício (prática) ou uma vez por item/dia (revisão).
  if (input.context !== "placement") {
    const isReview = input.context === "review" || input.context === "notebook";
    if (isReview && mode) {
      for (const conceptId of ex.concepts) {
        d.addXp(
          `rev:${today}:${conceptId}:${mode}`,
          "review",
          independent ? XP_AMOUNTS.reviewIndependent : XP_AMOUNTS.reviewOther,
          conceptId,
        );
      }
    } else if (grade.graded) {
      d.addXp(`ex:${ex.id}`, "practice", independent ? XP_AMOUNTS.practiceIndependent : XP_AMOUNTS.practiceOther, ex.id);
    }
  }

  return { ...d.finish(), attempt };
}

// ---------------------------------------------------------------------- lições

function emptyLesson(id: string, ts: string): LessonProgress {
  return { id, status: "in_progress", startedAt: ts, completions: 0, session: null };
}

export function saveLessonSession(state: ProgressState, lessonId: string, session: SessionSnapshot | null, now: Date): Change {
  const d = new Draft(state, now);
  const prev = state.lessons[lessonId] ?? emptyLesson(lessonId, d.ts);
  d.putLesson({ ...prev, session });
  return d.finish();
}

export interface CompleteLessonInput {
  lessonId: string;
  /** Conceitos enviados à revisão, com os modos que têm exercício disponível. */
  concepts: { id: string; modes: Mode[] }[];
  /** Acerto independente nos itens corrigidos (0–1). */
  accuracy: number;
}

export function completeLesson(state: ProgressState, input: CompleteLessonInput, now: Date): Change {
  const d = new Draft(state, now);
  const prev = state.lessons[input.lessonId] ?? emptyLesson(input.lessonId, d.ts);
  d.putLesson({
    ...prev,
    status: "completed",
    completedAt: d.ts,
    completions: prev.completions + 1,
    lastAccuracy: input.accuracy,
    session: null,
  });
  d.addXp(`lesson:${input.lessonId}`, "lesson", XP_AMOUNTS.lessonBonus, input.lessonId);
  // "Enviar para revisão": agenda os dois modos; não inventa acertos.
  for (const c of input.concepts) {
    d.putConcept(seedConcept(d.s.concepts[c.id], c.id, d.today, c.modes, d.s.settings.reviewIntervals));
  }
  return d.finish();
}

// ----------------------------------------------------------------- checkpoint

function emptyUnit(id: string): UnitProgress {
  return { id, skip: null, attempts: [], passedAt: null, session: null, activitiesDone: [] };
}

export function saveCheckpointSession(state: ProgressState, unitId: string, session: SessionSnapshot | null, now: Date): Change {
  const d = new Draft(state, now);
  d.putUnit({ ...(state.units[unitId] ?? emptyUnit(unitId)), session });
  return d.finish();
}

export interface FinishCheckpointInput {
  unitId: string;
  set: "A" | "B";
  total: number;
  independentCorrect: number;
  passed: boolean;
  weakConcepts: string[];
}

export function finishCheckpoint(state: ProgressState, input: FinishCheckpointInput, now: Date): Change {
  const d = new Draft(state, now);
  const prev = state.units[input.unitId] ?? emptyUnit(input.unitId);
  const attempt: CheckpointAttempt = {
    n: prev.attempts.length + 1,
    set: input.set,
    ts: d.ts,
    total: input.total,
    independentCorrect: input.independentCorrect,
    passed: input.passed,
    threshold: state.settings.passThreshold,
    weakConcepts: input.weakConcepts,
  };
  d.putUnit({
    ...prev,
    attempts: [...prev.attempts, attempt],
    passedAt: prev.passedAt ?? (input.passed ? d.ts : null),
    session: null,
  });
  d.addXp(`cp:${input.unitId}:first`, "checkpoint", XP_AMOUNTS.checkpointFirst, input.unitId);
  if (input.passed) d.addXp(`cp:${input.unitId}:pass`, "checkpoint", XP_AMOUNTS.checkpointPass, input.unitId);
  return d.finish();
}

// ---------------------------------------------------- atividades, tarefas, missões

export function completeActivity(
  state: ProgressState,
  p: { unitId: string; activityId: string; kind: "reading" | "listening" | "mission" | "writing" | "speaking" },
  now: Date,
): Change {
  const d = new Draft(state, now);
  const prev = state.units[p.unitId] ?? emptyUnit(p.unitId);
  if (!prev.activitiesDone.includes(p.activityId)) {
    d.putUnit({ ...prev, activitiesDone: [...prev.activitiesDone, p.activityId] });
  }
  d.addXp(`act:${p.activityId}`, p.kind === "mission" ? "mission" : "activity", p.kind === "mission" ? XP_AMOUNTS.mission : XP_AMOUNTS.activity, p.activityId);
  return d.finish();
}

export interface SubmitTaskInput {
  id: string;
  unitId: string;
  kind: TaskRecord["kind"];
  status: TaskRecord["status"];
  text?: string;
  checks: boolean[];
  recorded?: boolean;
  adapted?: boolean;
}

export function submitTask(state: ProgressState, input: SubmitTaskInput, now: Date): Change {
  const d = new Draft(state, now);
  const prev = state.tasks[input.id];
  d.putTask({
    id: input.id,
    unitId: input.unitId,
    kind: input.kind,
    status: input.status,
    ts: d.ts,
    runs: (prev?.runs ?? 0) + 1,
    ...(input.text ? { text: input.text.slice(0, 10000) } : {}),
    checks: input.checks,
    ...(input.recorded ? { recorded: true } : {}),
    ...(input.adapted ? { adapted: true } : {}),
  });
  if (input.kind === "outside") d.addXp(`outside:${input.id}`, "outside", XP_AMOUNTS.outside, input.id);
  else d.addXp(`task:${input.id}`, "task", XP_AMOUNTS.task, input.id);
  return d.finish();
}

// ---------------------------------------------- ponto de partida e diagnóstico

/**
 * Define o ponto de partida. Unidades ANTERIORES (e ainda não aprovadas) recebem
 * `skip`: liberam a trilha, mas continuam marcadas como "puladas", não como estudadas.
 * Voltar o ponto de partida remove `skip` das unidades que passaram a ficar depois dele.
 */
export function setStartUnit(
  state: ProgressState,
  unitId: string | null,
  source: "zero" | "manual" | "placement",
  now: Date,
): Change {
  const d = new Draft(state, now);
  const startIndex = unitId ? CURRICULUM.findIndex((m) => m.id === unitId) : 0;
  if (unitId && startIndex < 0) return unchanged(state);
  CURRICULUM.forEach((m, i) => {
    const prev = d.s.units[m.id];
    const shouldSkip = i < startIndex && !prev?.passedAt;
    const skip = shouldSkip ? (source === "placement" ? "placement" : "manual") : null;
    if ((prev?.skip ?? null) !== skip) {
      if (!prev && !skip) return;
      d.putUnit({ ...(prev ?? emptyUnit(m.id)), skip });
    }
  });
  d.putProfile({ ...d.s.profile, startUnit: unitId, startSource: unitId ? source : "zero" });
  return d.finish();
}

export function finishPlacement(state: ProgressState, result: PlacementResult, now: Date): Change {
  const d = new Draft(state, now);
  d.putProfile({ ...d.s.profile, placement: result });
  d.addXp("placement:done", "placement", XP_AMOUNTS.placement);
  return d.finish();
}

// --------------------------------------------------------------- configurações

export function completeOnboarding(
  state: ProgressState,
  p: { goal: ProgressState["profile"]["goal"]; minutes: 10 | 20 | 30; timezone: string },
  now: Date,
): Change {
  const d = new Draft(state, now);
  d.putSettings({
    ...d.s.settings,
    dailyMinutes: p.minutes,
    dailyXpGoal: BY_MINUTES[p.minutes].xp,
    reviewCap: BY_MINUTES[p.minutes].reviewCap,
    timezone: p.timezone,
  });
  d.putProfile({ ...d.s.profile, goal: p.goal, onboarded: true });
  return d.finish();
}

export function updateSettings(state: ProgressState, patch: Partial<Settings>, now: Date): Change {
  const d = new Draft(state, now);
  const next: Settings = { ...d.s.settings, ...patch };
  // Mudar o tempo diário ajusta meta e limite, a menos que o usuário também os tenha passado.
  if (patch.dailyMinutes && patch.dailyMinutes !== state.settings.dailyMinutes) {
    if (patch.dailyXpGoal === undefined) next.dailyXpGoal = BY_MINUTES[patch.dailyMinutes].xp;
    if (patch.reviewCap === undefined) next.reviewCap = BY_MINUTES[patch.dailyMinutes].reviewCap;
  }
  d.putSettings(next);
  return d.finish();
}

export function updateProfile(state: ProgressState, patch: Partial<ProgressState["profile"]>, now: Date): Change {
  const d = new Draft(state, now);
  d.putProfile({ ...d.s.profile, ...patch });
  return d.finish();
}

export function markBackup(state: ProgressState, now: Date): Change {
  const d = new Draft(state, now);
  d.putMeta({ ...d.s.meta, lastBackupAt: d.ts });
  return d.finish();
}

export function unlockAchievements(state: ProgressState, ids: string[], now: Date): Change {
  const d = new Draft(state, now);
  for (const id of ids) {
    if (!d.s.achievements[id]) d.putAchievement({ id, unlockedAt: d.ts });
  }
  return d.finish();
}

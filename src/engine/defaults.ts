/**
 * Valores padrão. São decisões de produto (heurísticas iniciais), não fórmulas
 * universais de aprendizagem — por isso são configuráveis em Ajustes.
 */
import type { Settings, Profile, ProgressState, Meta } from "./model";
import { browserTimeZone } from "./dates";

/** Critério de avanço em checkpoints: 80% de acertos independentes. */
export const DEFAULT_PASS_THRESHOLD = 0.8;

/** Intervalos iniciais da revisão espaçada, em dias. */
export const DEFAULT_REVIEW_INTERVALS = [1, 3, 7, 14, 30];

/** Meta diária de XP e limite de revisões, por tempo de sessão. */
export const BY_MINUTES = {
  10: { xp: 40, reviewCap: 10 },
  20: { xp: 80, reviewCap: 20 },
  30: { xp: 120, reviewCap: 30 },
} as const;

/** Menos de N tentativas independentes numa habilidade = "evidência insuficiente". */
export const MIN_EVIDENCE = 8;

export function defaultSettings(minutes: 10 | 20 | 30 = 20, timezone = browserTimeZone()): Settings {
  return {
    dailyMinutes: minutes,
    dailyXpGoal: BY_MINUTES[minutes].xp,
    reviewCap: BY_MINUTES[minutes].reviewCap,
    timezone,
    passThreshold: DEFAULT_PASS_THRESHOLD,
    reviewIntervals: [...DEFAULT_REVIEW_INTERVALS],
    instructionLanguage: "pt",
    showTranslations: true,
    speechRate: 0.65,
    reducedMotion: "system",
    theme: "system",
  };
}

export function defaultProfile(nowIso: string): Profile {
  return {
    createdAt: nowIso,
    onboarded: false,
    goal: "general",
    startUnit: null,
    startSource: "zero",
    placement: null,
  };
}

export function defaultMeta(): Meta {
  return { lastBackupAt: null, lastStudyDate: null, bestStreak: 0 };
}

export function emptyState(nowIso: string, tz?: string): ProgressState {
  return {
    settings: defaultSettings(20, tz),
    profile: defaultProfile(nowIso),
    meta: defaultMeta(),
    lessons: {},
    units: {},
    concepts: {},
    attempts: [],
    xp: [],
    tasks: {},
    achievements: {},
  };
}

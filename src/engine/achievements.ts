/**
 * Conquistas: marcos relevantes de estudo, não prêmios por repetir algo trivial.
 * Cada uma é concedida uma única vez; nenhuma afirma proficiência.
 */
import { CURRICULUM } from "@/content/curriculum";
import type { DateKey, ProgressState } from "./model";
import { dateKey, diffDays } from "./dates";
import { conceptStatus } from "./srs";
import { currentStreak, studyDays, totalXp } from "./xp";
import { unitStatus } from "./progression";

interface Ctx {
  state: ProgressState;
  today: DateKey;
  days: () => Set<DateKey>;
}

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  check: (c: Ctx) => boolean;
}

const lessonsCompleted = (s: ProgressState) => Object.values(s.lessons).filter((l) => l.status === "completed").length;
const independentReviews = (s: ProgressState) =>
  s.attempts.filter((a) => (a.context === "review" || a.context === "notebook") && a.independent).length;
const independentOf = (s: ProgressState, skill: string) => s.attempts.filter((a) => a.skill === skill && a.independent).length;
const stageDone = (s: ProgressState, stage: string) =>
  CURRICULUM.filter((m) => m.stage === stage).every((m) => {
    const st = unitStatus(s, m);
    return st === "completed" || st === "tested_out";
  });

function comeback(days: Set<DateKey>): boolean {
  const sorted = [...days].sort();
  for (let i = 1; i < sorted.length; i++) if (diffDays(sorted[i - 1], sorted[i]) >= 7) return true;
  return false;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: "first-lesson", title: "Primeira lição", description: "Você concluiu sua primeira lição.", check: ({ state }) => lessonsCompleted(state) >= 1 },
  { id: "lessons-10", title: "10 lições", description: "Dez lições concluídas.", check: ({ state }) => lessonsCompleted(state) >= 10 },
  { id: "lessons-50", title: "50 lições", description: "Cinquenta lições concluídas.", check: ({ state }) => lessonsCompleted(state) >= 50 },
  { id: "lessons-100", title: "100 lições", description: "Cem lições concluídas.", check: ({ state }) => lessonsCompleted(state) >= 100 },
  { id: "first-checkpoint", title: "Primeiro checkpoint", description: "Você passou em um checkpoint com acertos independentes.", check: ({ state }) => Object.values(state.units).some((u) => u.passedAt) },
  { id: "first-unit", title: "Unidade concluída", description: "Você concluiu uma unidade inteira: lições e checkpoint.", check: ({ state }) => CURRICULUM.some((m) => unitStatus(state, m) === "completed") },
  { id: "stage-a1", title: "Etapa A1 concluída", description: "As 8 unidades de A1 estão resolvidas.", check: ({ state }) => stageDone(state, "a1") },
  { id: "stage-a2", title: "Etapa A2 concluída", description: "As 8 unidades de A2 estão resolvidas.", check: ({ state }) => stageDone(state, "a2") },
  { id: "stage-b1", title: "Etapa B1 concluída", description: "As 8 unidades de B1 estão resolvidas.", check: ({ state }) => stageDone(state, "b1") },
  { id: "stage-b2", title: "Etapa B2 concluída", description: "As 8 unidades de B2 estão resolvidas.", check: ({ state }) => stageDone(state, "b2") },
  { id: "streak-3", title: "3 dias seguidos", description: "Três dias de estudo em sequência.", check: (c) => currentStreak(c.days(), c.today) >= 3 },
  { id: "streak-7", title: "Uma semana", description: "Sete dias de estudo em sequência.", check: (c) => currentStreak(c.days(), c.today) >= 7 },
  { id: "streak-14", title: "Duas semanas", description: "Catorze dias de estudo em sequência.", check: (c) => currentStreak(c.days(), c.today) >= 14 },
  { id: "streak-30", title: "Um mês", description: "Trinta dias de estudo em sequência.", check: (c) => currentStreak(c.days(), c.today) >= 30 },
  { id: "xp-100", title: "100 XP", description: "XP mede atividade, não proficiência. Mas é um bom começo.", check: ({ state }) => totalXp(state.xp) >= 100 },
  { id: "xp-1000", title: "1.000 XP", description: "Mil pontos de atividade de estudo.", check: ({ state }) => totalXp(state.xp) >= 1000 },
  { id: "xp-5000", title: "5.000 XP", description: "Cinco mil pontos de atividade de estudo.", check: ({ state }) => totalXp(state.xp) >= 5000 },
  { id: "first-review", title: "Primeira revisão", description: "Você revisou itens que estavam vencidos.", check: ({ state }) => state.attempts.some((a) => a.context === "review") },
  { id: "reviews-50", title: "50 revisões sem ajuda", description: "Cinquenta recuperações independentes em revisões.", check: ({ state }) => independentReviews(state) >= 50 },
  {
    id: "retained-5",
    title: "5 itens retidos",
    description: "Cinco itens passaram por revisões espaçadas bem-sucedidas.",
    check: ({ state }) => Object.values(state.concepts).filter((c) => conceptStatus(c) === "retained").length >= 5,
  },
  { id: "listening-30", title: "Ouvido em treino", description: "Trinta respostas independentes em exercícios de escuta.", check: ({ state }) => independentOf(state, "listening") >= 30 },
  { id: "first-writing", title: "Primeira escrita", description: "Você concluiu uma tarefa de escrita (autoavaliada).", check: ({ state }) => Object.values(state.tasks).some((t) => t.kind === "writing") },
  { id: "first-speaking", title: "Primeira fala", description: "Você concluiu uma tarefa de fala (autoavaliada).", check: ({ state }) => Object.values(state.tasks).some((t) => t.kind === "speaking" && !t.adapted) },
  { id: "outside-mission", title: "Inglês fora do app", description: "Você registrou uma missão feita na vida real (autorrelato).", check: ({ state }) => Object.values(state.tasks).some((t) => t.kind === "outside") },
  { id: "comeback", title: "De volta ao jogo", description: "Você voltou a estudar depois de uma pausa de pelo menos 7 dias.", check: (c) => comeback(c.days()) },
  { id: "first-backup", title: "Progresso protegido", description: "Você exportou um backup do seu progresso.", check: ({ state }) => state.meta.lastBackupAt !== null },
];

export function newlyUnlocked(state: ProgressState, now: Date): string[] {
  const tz = state.settings.timezone;
  let cache: Set<DateKey> | null = null;
  const ctx: Ctx = {
    state,
    today: dateKey(now, tz),
    days: () => (cache ??= studyDays(state.xp, tz)),
  };
  return ACHIEVEMENTS.filter((a) => !state.achievements[a.id] && a.check(ctx)).map((a) => a.id);
}

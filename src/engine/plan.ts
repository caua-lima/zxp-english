/**
 * Plano diário: o que cabe no tempo escolhido (10, 20 ou 30 minutos).
 *
 * Ordem: retomar o que ficou aberto → revisar o que venceu → avançar → praticar.
 * Depois de dias sem estudar, o plano encolhe em vez de despejar tudo de uma vez
 * ("retomada"): revisão leve primeiro e, após pausas longas, rever a última lição
 * antes de conteúdo novo. Pendências de revisão nunca são apagadas.
 */
import type { UnitMeta } from "@/content/schema";
import { ACTIVITY_KINDS, ACTIVITY_LABELS } from "@/content/schema";
import { lessonIdsOf } from "@/content/curriculum";
import type { DateKey, ProgressState } from "./model";
import { dateKey } from "./dates";
import { interruptedCheckpoint, interruptedLesson, lessonsDone, recommendedNext, unitStatus } from "./progression";
import { buildReviewQueue } from "./srs";
import { reviewsDoneOn } from "./stats";
import { daysSinceStudy, studyDays, xpOnDate } from "./xp";

export type PlanKind = "resume" | "review" | "lesson" | "checkpoint" | "activity" | "errors" | "relearn";

export interface PlanItem {
  kind: PlanKind;
  title: string;
  detail: string;
  minutes: number;
  href: string;
}

export interface DailyPlan {
  items: PlanItem[];
  minutesPlanned: number;
  budget: number;
  /** Só preenchido após ≥ 3 dias sem estudar. */
  reentry: { daysAway: number; message: string } | null;
  review: { today: number; totalDue: number; deferred: number; doneToday: number };
  xpToday: number;
  goal: number;
  goalMet: boolean;
  /** Trilha inteira resolvida. */
  finished: boolean;
}

const REVIEW_MIN_PER_ITEM = 0.5;
const LESSON_MIN = 8;

export function buildDailyPlan(
  state: ProgressState,
  curriculum: UnitMeta[],
  now: Date,
  opts: { pendingErrors?: number; isPublished?: (unitId: string) => boolean } = {},
): DailyPlan {
  const tz = state.settings.timezone;
  const today: DateKey = dateKey(now, tz);
  const budget = state.settings.dailyMinutes;
  const published = opts.isPublished ?? (() => true);

  const doneToday = reviewsDoneOn(state, today);
  const days = studyDays(state.xp, tz);
  const away = daysSinceStudy(days, today);
  const reentry = away !== null && away >= 3;

  // Na retomada, a revisão do dia fica mais leve (no máximo 10 itens), sem apagar nada.
  const cap = reentry ? Math.min(state.settings.reviewCap, 10) : state.settings.reviewCap;
  const queue = buildReviewQueue(state.concepts, today, cap, doneToday);

  const items: PlanItem[] = [];
  let used = 0;
  const add = (item: PlanItem) => {
    items.push(item);
    used += item.minutes;
  };

  const openLesson = interruptedLesson(state);
  if (openLesson) {
    add({ kind: "resume", title: "Continuar de onde parei", detail: "Você tem uma lição em andamento.", minutes: 5, href: `/licao/${openLesson}` });
  }
  const openCp = interruptedCheckpoint(state);
  if (openCp) {
    add({ kind: "resume", title: "Terminar o checkpoint", detail: "Há um checkpoint em andamento.", minutes: 6, href: `/checkpoint/${openCp}` });
  }

  if (queue.today.length > 0) {
    add({
      kind: "review",
      title: `Revisar ${queue.today.length} ${queue.today.length === 1 ? "item" : "itens"}`,
      detail:
        queue.deferred > 0
          ? `${queue.deferred} ${queue.deferred === 1 ? "pendência fica guardada" : "pendências ficam guardadas"} para os próximos dias.`
          : "Recupere o que você estudou nos dias anteriores.",
      minutes: Math.max(1, Math.ceil(queue.today.length * REVIEW_MIN_PER_ITEM)),
      href: "/revisar",
    });
  }

  const next = recommendedNext(state, curriculum);
  const longBreak = away !== null && away >= 14;

  if (longBreak && !openLesson) {
    // Após uma pausa longa: rever a última lição concluída antes de avançar.
    const last = Object.values(state.lessons)
      .filter((l) => l.completedAt)
      .sort((a, b) => (b.completedAt ?? "").localeCompare(a.completedAt ?? ""))[0];
    if (last) add({ kind: "relearn", title: "Rever a última lição", detail: "Depois de uma pausa longa, retome com algo conhecido.", minutes: LESSON_MIN, href: `/licao/${last.id}` });
  } else if (next && !openLesson && !(openCp && next.kind === "checkpoint") && published(next.unitId)) {
    const meta = curriculum.find((m) => m.id === next.unitId)!;
    if (next.kind === "checkpoint") {
      add({ kind: "checkpoint", title: "Fazer o checkpoint", detail: `${meta.title}: situações novas para confirmar a unidade.`, minutes: 8, href: `/checkpoint/${meta.id}` });
    } else {
      add({ kind: "lesson", title: `Lição ${(next.lessonIndex ?? 0) + 1}`, detail: meta.title, minutes: LESSON_MIN, href: `/licao/${next.lessonId}` });
      // 30 minutos comportam uma segunda lição, se houver.
      if (!reentry && budget >= 30) {
        const ids = lessonIdsOf(meta);
        const second = ids[(next.lessonIndex ?? 0) + 1];
        if (second) add({ kind: "lesson", title: `Lição ${(next.lessonIndex ?? 0) + 2}`, detail: meta.title, minutes: LESSON_MIN, href: `/licao/${second}` });
      }
    }
  }

  // Atividade da unidade atual (leitura, escuta…), quando sobra tempo.
  if (!reentry && next && used + 5 <= budget && published(next.unitId)) {
    const meta = curriculum.find((m) => m.id === next.unitId)!;
    const done = lessonsDone(state, meta);
    const finishedActs = state.units[meta.id]?.activitiesDone ?? [];
    const unlockedCount = done >= 4 ? 5 : done >= 3 ? 4 : done >= 2 ? 2 : 0; // leitura+escuta após 2 lições; escrita+fala após 3; missão após 4
    const pending = ACTIVITY_KINDS.slice(0, unlockedCount).find((k) => !finishedActs.includes(`${meta.id}-act-${k}`));
    if (pending) {
      add({ kind: "activity", title: ACTIVITY_LABELS[pending], detail: `Atividade da unidade “${meta.title}”.`, minutes: 5, href: `/atividade/${meta.id}/${pending}` });
    }
  }

  if (!reentry && (opts.pendingErrors ?? 0) >= 3 && used + 3 <= budget) {
    add({ kind: "errors", title: "Praticar meus erros", detail: `${opts.pendingErrors} itens no caderno de erros.`, minutes: 3, href: "/erros" });
  }

  const xpToday = xpOnDate(state.xp, today, tz);
  const allResolved = curriculum.every((m) => {
    const s = unitStatus(state, m);
    return s === "completed" || s === "tested_out" || s === "skipped";
  });

  return {
    items,
    minutesPlanned: used,
    budget,
    reentry: reentry
      ? {
          daysAway: away!,
          message:
            away! >= 14
              ? `Faz ${away} dias desde o último estudo. Seu aprendizado continua guardado: hoje o plano é leve, com revisão e uma lição já conhecida.`
              : `Faz ${away} dias desde o último estudo. Hoje o plano é mais leve: revisão primeiro, depois uma lição.`,
        }
      : null,
    review: { today: queue.today.length, totalDue: queue.totalDue, deferred: queue.deferred, doneToday },
    xpToday,
    goal: state.settings.dailyXpGoal,
    goalMet: xpToday >= state.settings.dailyXpGoal,
    finished: next === null && allResolved,
  };
}

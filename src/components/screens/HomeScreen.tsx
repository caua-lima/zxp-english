"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  Flame,
  NotebookPen,
  Play,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";
import { CURRICULUM } from "@/content/curriculum";
import { isPublished } from "@/content/registry";
import { SKILL_LABELS, STAGE_INFO, STAGES } from "@/content/schema";
import { dateKey, diffDays, formatShort, weekdayShort } from "@/engine/dates";
import { buildDailyPlan, type PlanKind } from "@/engine/plan";
import { stageProgress } from "@/engine/progression";
import { errorNotebook } from "@/engine/review-builder";
import { skillStats } from "@/engine/stats";
import { bestStreakOf, currentStreak, lastDays, studyDays, totalXp } from "@/engine/xp";
import { useNow, useProgress } from "@/state/provider";
import { Zip } from "@/components/brand";
import { useConceptMap } from "@/components/content-hooks";
import { Card, Chip, LinkButton, Notice, ProgressBar, Ring, SectionTitle } from "@/components/ui";

const PLAN_ICON: Record<PlanKind, LucideIcon> = {
  resume: Play,
  review: RefreshCw,
  lesson: BookOpen,
  checkpoint: ClipboardCheck,
  activity: Sparkles,
  errors: NotebookPen,
  relearn: RotateCcw,
};

const GOAL_LINE: Record<string, string> = {
  travel: "Seu foco: viajar com autonomia.",
  work: "Seu foco: usar inglês no trabalho.",
  study: "Seu foco: estudar em inglês.",
  culture: "Seu foco: entender filmes, músicas e a internet.",
  general: "Seu foco: usar inglês no dia a dia.",
};

export function HomeScreen() {
  const state = useProgress();
  const now = useNow();
  const tz = state?.settings.timezone ?? "America/Sao_Paulo";
  const notebook = state ? errorNotebook(state, (iso) => dateKey(iso, tz)) : [];
  const open = notebook.filter((e) => e.status !== "resolved");
  const labels = useConceptMap(open.slice(0, 3).flatMap((e) => (e.conceptId ? [e.conceptId] : [])));

  if (!state) return null;

  const today = dateKey(now, tz);
  const plan = buildDailyPlan(state, CURRICULUM, now, { pendingErrors: open.length, isPublished });
  const days = studyDays(state.xp, tz);
  const streak = currentStreak(days, today);
  const best = Math.max(state.meta.bestStreak, bestStreakOf(days));
  const week = lastDays(state.xp, tz, today, state.settings.dailyXpGoal, 7);
  const first = plan.items[0];
  const started = state.attempts.length > 0 || Object.keys(state.lessons).length > 0;
  const lessonsCompleted = Object.values(state.lessons).filter((l) => l.status === "completed").length;
  const totalLessons = CURRICULUM.reduce((n, m) => n + m.lessonCount, 0);
  const weak = skillStats(state)
    .filter((s) => s.immediate !== null && s.immediate < 0.75)
    .sort((a, b) => (a.immediate ?? 1) - (b.immediate ?? 1))[0];
  const backupAge = state.meta.lastBackupAt ? diffDays(dateKey(state.meta.lastBackupAt, tz), today) : null;
  const remindBackup = lessonsCompleted >= 2 && (backupAge === null || backupAge >= 14);

  return (
    <div className="grid gap-1">
      <header className="mb-3 flex items-center gap-3">
        <Zip mood={plan.goalMet ? "cheer" : plan.reentry ? "rest" : "happy"} size={68} />
        <div className="min-w-0">
          <h1 className="text-2xl font-extrabold sm:text-3xl">{started ? (plan.goalMet ? "Meta do dia cumprida" : "Vamos estudar?") : "Bem-vindo ao ZXP ENGLISH"}</h1>
          <p className="text-ink-2">
            {formatShort(today)} · {GOAL_LINE[state.profile.goal]}
          </p>
        </div>
      </header>

      {plan.reentry ? (
        <Notice tone="info" title="Que bom ter você de volta" className="mb-3" role="status">
          {plan.reentry.message} Sua sequência recomeça hoje; o que você aprendeu não foi apagado.
        </Notice>
      ) : null}

      {/* O que estudar agora? */}
      <Card pop as="section" aria-labelledby="agora" className="!p-5">
        <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-primary-text">
          <Target size={16} aria-hidden="true" /> O que estudar agora
        </p>
        {first ? (
          <>
            <h2 id="agora" className="mt-1 text-2xl font-extrabold">
              {first.title}
            </h2>
            <p className="text-ink-2">{first.detail}</p>
            <LinkButton href={first.href} className="mt-4" block>
              {first.kind === "resume" ? "Continuar de onde parei" : started ? "Continuar" : "Começar"} <ArrowRight size={18} aria-hidden="true" />
            </LinkButton>
          </>
        ) : plan.finished ? (
          <>
            <h2 id="agora" className="mt-1 text-2xl font-extrabold">
              Você percorreu toda a trilha
            </h2>
            <p className="text-ink-2">
              Isso é progresso no curso, não um certificado de proficiência. Continue revisando, refazendo checkpoints e usando o inglês fora do app.
            </p>
            <LinkButton href="/revisar" className="mt-4" block>
              Revisar
            </LinkButton>
          </>
        ) : (
          <>
            <h2 id="agora" className="mt-1 text-2xl font-extrabold">
              Nada pendente por hoje
            </h2>
            <p className="text-ink-2">Você pode adiantar uma lição na trilha ou rever o que já estudou.</p>
            <LinkButton href="/trilha" className="mt-4" block>
              Abrir a trilha
            </LinkButton>
          </>
        )}
      </Card>

      {/* Plano diário */}
      <SectionTitle id="plano" aside={<Chip>{plan.minutesPlanned} de {plan.budget} min</Chip>}>
        Plano de hoje
      </SectionTitle>
      {plan.items.length > 0 ? (
        <ol className="grid gap-2" aria-labelledby="plano">
          {plan.items.map((item, i) => {
            const Icon = PLAN_ICON[item.kind];
            return (
              <li key={`${item.href}-${i}`}>
                <Link href={item.href} className="card flex items-center gap-3 p-3.5 hover:border-ink-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-text">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-extrabold">{item.title}</span>
                    <span className="block truncate text-sm text-ink-2">{item.detail}</span>
                  </span>
                  <span className="shrink-0 text-sm font-extrabold text-ink-2">~{item.minutes} min</span>
                </Link>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="text-ink-2">Sem itens planejados. Abra a trilha para escolher o que fazer.</p>
      )}
      <p className="mt-2 text-sm text-ink-3">
        O plano cabe no tempo que você escolheu ({plan.budget} min por dia). Mude em <Link href="/ajustes" className="font-bold underline">Ajustes</Link>.
      </p>

      {/* Meta e sequência */}
      <SectionTitle id="meta">Meta e sequência</SectionTitle>
      <Card as="section" aria-labelledby="meta">
        <div className="flex items-center gap-4">
          <Ring value={plan.goal ? plan.xpToday / plan.goal : 0} size={84} label={`XP de hoje: ${plan.xpToday} de ${plan.goal}`} color="var(--accent)">
            <span className="text-center leading-none">
              <span className="block text-xl font-extrabold tabular-nums">{plan.xpToday}</span>
              <span className="block text-[0.65rem] font-bold text-ink-2">de {plan.goal} XP</span>
            </span>
          </Ring>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 text-lg font-extrabold">
              <Flame size={20} className={streak > 0 ? "text-warn" : "text-ink-3"} aria-hidden="true" />
              {streak} {streak === 1 ? "dia seguido" : "dias seguidos"}
            </p>
            <p className="text-sm text-ink-2">
              Melhor sequência: {best} {best === 1 ? "dia" : "dias"}. Um dia conta com pelo menos 10 XP.
            </p>
            <p className="mt-1 text-sm text-ink-2">XP mede atividade de estudo, não proficiência.</p>
          </div>
        </div>
        <ol className="mt-4 grid grid-cols-7 gap-1.5" aria-label="Últimos 7 dias">
          {week.map((d) => (
            <li key={d.date} className="text-center">
              <span
                className={`mx-auto grid h-9 w-9 place-items-center rounded-full border-2 text-xs font-extrabold ${
                  d.goalMet ? "border-line-strong bg-accent text-accent-ink" : d.studied ? "border-primary bg-primary-soft text-primary-text" : "border-line bg-surface-2 text-ink-3"
                }`}
                aria-hidden="true"
              >
                {d.goalMet ? "✓" : d.studied ? "•" : ""}
              </span>
              <span className="mt-0.5 block text-[0.68rem] font-bold text-ink-2">{weekdayShort(d.date)}</span>
              <span className="sr-only">
                {formatShort(d.date)}: {d.xp} XP{d.goalMet ? ", meta cumprida" : d.studied ? ", dia de estudo" : ", sem estudo"}
              </span>
            </li>
          ))}
        </ol>
      </Card>

      {/* O que revisar? */}
      <SectionTitle id="revisar">O que revisar</SectionTitle>
      <Card as="section" aria-labelledby="revisar">
        {plan.review.today > 0 ? (
          <>
            <p className="text-lg font-extrabold">
              {plan.review.today} {plan.review.today === 1 ? "item vence" : "itens vencem"} hoje
            </p>
            <p className="text-sm text-ink-2">
              {plan.review.deferred > 0
                ? `Há ${plan.review.totalDue} pendências no total. Para não acumular demais num dia só, ${plan.review.deferred} ficam guardadas para os próximos dias.`
                : "Recuperar o que você já viu, dias depois, é o que fixa o conteúdo."}
            </p>
            <LinkButton href="/revisar" variant="secondary" className="mt-3">
              <RefreshCw size={18} aria-hidden="true" /> Revisar agora
            </LinkButton>
          </>
        ) : (
          <>
            <p className="text-lg font-extrabold">{plan.review.doneToday > 0 ? "Revisões de hoje feitas" : "Nada vence hoje"}</p>
            <p className="text-sm text-ink-2">
              {plan.review.totalDue > 0
                ? `${plan.review.totalDue} pendências continuam guardadas e voltam amanhã (o limite diário de hoje já foi atingido).`
                : Object.keys(state.concepts).length > 0
                  ? "Os itens que você estudou voltam nos dias programados."
                  : "Conclua uma lição e os itens dela passam a aparecer aqui a partir do dia seguinte."}
            </p>
          </>
        )}
      </Card>

      {/* Quanto avancei? */}
      <SectionTitle id="avanco" aside={<Link href="/trilha" className="text-sm font-extrabold text-primary-text underline">Ver trilha</Link>}>
        Quanto avancei
      </SectionTitle>
      <Card as="section" aria-labelledby="avanco">
        <p className="font-extrabold">
          {lessonsCompleted} de {totalLessons} lições concluídas · {totalXp(state.xp)} XP no total
        </p>
        <ul className="mt-3 grid gap-3">
          {STAGES.map((stage) => {
            const p = stageProgress(state, CURRICULUM, stage);
            return (
              <li key={stage}>
                <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
                  <span className="font-extrabold">
                    <span style={{ color: `var(--stage-${stage})` }}>{STAGE_INFO[stage].label}</span> · {STAGE_INFO[stage].name}
                  </span>
                  <span className="font-bold tabular-nums text-ink-2">
                    {p.completed}/{p.total}
                    {p.skipped ? ` (+${p.skipped} puladas)` : ""}
                  </span>
                </div>
                <ProgressBar value={p.completed / p.total} label={`${STAGE_INFO[stage].label}: ${p.completed} de ${p.total} unidades resolvidas`} />
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-sm text-ink-3">Progresso no curso não é proficiência comprovada. As etapas usam o CEFR como referência de objetivos, sem certificação.</p>
      </Card>

      {/* Em que preciso melhorar? */}
      <SectionTitle id="melhorar" aside={<Link href="/progresso" className="text-sm font-extrabold text-primary-text underline">Ver por habilidade</Link>}>
        Em que preciso melhorar
      </SectionTitle>
      <Card as="section" aria-labelledby="melhorar">
        {open.length === 0 && !weak ? (
          <p className="text-ink-2">
            {started ? "Nenhum ponto fraco registrado até agora. Os erros que você cometer aparecem aqui, com explicação e prática." : "Assim que você praticar, seus pontos de atenção aparecem aqui."}
          </p>
        ) : (
          <>
            {weak ? (
              <p className="mb-2">
                <span className="font-extrabold">{SKILL_LABELS[weak.skill]}</span>: {Math.round((weak.immediate ?? 0) * 100)}% de acertos sem ajuda nas últimas {weak.immediateN} respostas.
              </p>
            ) : null}
            {open.length > 0 ? (
              <>
                <p className="font-extrabold">
                  {open.length} {open.length === 1 ? "item" : "itens"} no caderno de erros
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {open.slice(0, 3).map((e) => {
                    const c = e.conceptId ? labels.get(e.conceptId) : undefined;
                    return (
                      <li key={e.conceptId ?? e.exerciseId}>
                        <Chip tone="bad" className="!text-sm">
                          <span lang="en">{c?.en ?? "Item de prática"}</span>
                        </Chip>
                      </li>
                    );
                  })}
                </ul>
                <LinkButton href="/erros" variant="secondary" className="mt-3">
                  <NotebookPen size={18} aria-hidden="true" /> Praticar meus erros
                </LinkButton>
              </>
            ) : null}
          </>
        )}
      </Card>

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        <Link href="/semana" className="card flex items-center gap-3 p-3.5 hover:border-ink-3">
          <CalendarDays size={22} className="text-primary-text" aria-hidden="true" />
          <span>
            <span className="block font-extrabold">Revisão semanal</span>
            <span className="block text-sm text-ink-2">Como foi sua semana de estudo</span>
          </span>
        </Link>
        {remindBackup ? (
          <Link href="/ajustes#backup" className="card flex items-center gap-3 border-warn p-3.5 hover:border-ink-3">
            <ClipboardCheck size={22} className="text-warn" aria-hidden="true" />
            <span>
              <span className="block font-extrabold">Faça um backup</span>
              <span className="block text-sm text-ink-2">
                {backupAge === null ? "Você ainda não exportou seu progresso." : `Último backup há ${backupAge} dias.`}
              </span>
            </span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

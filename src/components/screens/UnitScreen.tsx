"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpenText,
  Check,
  ClipboardCheck,
  Ear,
  FastForward,
  Lock,
  MessageCircle,
  PenLine,
  Play,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { getUnitMeta, lessonIdsOf } from "@/content/curriculum";
import { ACTIVITY_KINDS, ACTIVITY_LABELS, STAGE_INFO, type ActivityKind } from "@/content/schema";
import { formatShort, dateKey } from "@/engine/dates";
import { checkpointAccess, lessonAccess, lessonsDone, UNIT_STATUS_LABEL, unitSatisfied, unitStatus } from "@/engine/progression";
import { useProgress } from "@/state/provider";
import { useUnit } from "@/components/content-hooks";
import { Card, Chip, LinkButton, Notice, SectionTitle, Skeleton } from "@/components/ui";

const ACT_ICON: Record<ActivityKind, LucideIcon> = {
  reading: BookOpenText,
  listening: Ear,
  writing: PenLine,
  speaking: MessageCircle,
  mission: Rocket,
};

const ACT_AFTER: Record<ActivityKind, number> = { reading: 2, listening: 2, writing: 3, speaking: 3, mission: 4 };

export function UnitScreen({ unitId }: { unitId: string }) {
  const state = useProgress();
  const meta = getUnitMeta(unitId);
  const loaded = useUnit(unitId);
  if (!state) return null;
  if (!meta) {
    return (
      <Notice tone="warn" title="Unidade não encontrada">
        <Link href="/trilha" className="font-extrabold underline">
          Voltar à trilha
        </Link>
      </Notice>
    );
  }

  const tz = state.settings.timezone;
  const status = unitStatus(state, meta);
  const locked = status === "locked";
  const done = lessonsDone(state, meta);
  const ids = lessonIdsOf(meta);
  const up = state.units[meta.id];
  const cp = checkpointAccess(state, meta);
  const missing = meta.prerequisites.filter((p) => !unitSatisfied(state, p)).map((p) => getUnitMeta(p)!);
  const unit = loaded.status === "ready" ? loaded.data : null;
  const color = `var(--stage-${meta.stage})`;
  const passed = Boolean(up?.passedAt);
  const threshold = Math.round(state.settings.passThreshold * 100);

  return (
    <div>
      <Link href="/trilha" className="mb-3 inline-flex items-center gap-1.5 text-sm font-extrabold text-ink-2 hover:underline">
        <ArrowLeft size={16} aria-hidden="true" /> Trilha
      </Link>

      <header className="card card-pop mb-2 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg border-2 border-line-strong px-2 py-0.5 text-xs font-extrabold" style={{ background: color, color: "var(--surface)" }}>
            {STAGE_INFO[meta.stage].label} · Unidade {meta.order}
          </span>
          <Chip tone={passed ? "ok" : locked ? "neutral" : "primary"}>{UNIT_STATUS_LABEL[status]}</Chip>
        </div>
        <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">{meta.title}</h1>
        <p className="mt-1 text-ink-2">{meta.subtitle}</p>
        <h2 className="mt-4 text-sm font-extrabold uppercase tracking-wider text-ink-2">Ao final, você consegue</h2>
        <ul className="rich mt-1.5">
          {meta.canDo.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {meta.focus.map((f) => (
            <Chip key={f}>{f}</Chip>
          ))}
        </div>
      </header>

      {status === "skipped" ? (
        <Notice tone="info" title="Unidade pulada pelo ponto de partida" className="mt-3" icon={<FastForward size={18} aria-hidden="true" />}>
          Ela libera a trilha, mas não conta como estudada. Você pode fazer as lições normalmente ou confirmar o que sabe pelo checkpoint.
        </Notice>
      ) : null}
      {locked ? (
        <Notice tone="warn" title="Unidade bloqueada" className="mt-3" icon={<Lock size={18} aria-hidden="true" />}>
          Para abrir, resolva antes:
          <ul className="mt-1 grid gap-1">
            {missing.map((m) => (
              <li key={m.id}>
                <Link href={`/unidade/${m.id}`} className="font-extrabold underline">
                  {STAGE_INFO[m.stage].label} · Unidade {m.order}: {m.title}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-2">
            Se você já domina esse conteúdo, ajuste o ponto de partida em{" "}
            <Link href="/ajustes#partida" className="font-extrabold underline">
              Ajustes
            </Link>
            .
          </p>
        </Notice>
      ) : null}
      {loaded.status === "missing" ? (
        <Notice tone="warn" title="Conteúdo em preparação" className="mt-3">
          As lições desta unidade ainda não foram publicadas nesta versão do app.
        </Notice>
      ) : null}
      {loaded.status === "error" ? (
        <Notice tone="bad" title="Não foi possível carregar" className="mt-3" role="alert">
          {loaded.message}
        </Notice>
      ) : null}

      {/* Lições */}
      <SectionTitle id="licoes" aside={<Chip>{done}/{meta.lessonCount}</Chip>}>
        Lições
      </SectionTitle>
      <ol className="grid gap-2.5" aria-labelledby="licoes">
        {ids.map((id, i) => {
          const lesson = unit?.lessons[i];
          const lp = state.lessons[id];
          const access = lessonAccess(state, meta, i);
          const completed = lp?.status === "completed";
          const open = lp?.session != null;
          const available = access === "open" && loaded.status === "ready";
          const inner = (
            <>
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 text-base font-extrabold ${
                  completed ? "border-ok bg-ok-soft text-ok" : access === "locked" ? "border-line bg-surface-2 text-ink-3" : "border-line-strong bg-surface"
                }`}
                aria-hidden="true"
              >
                {completed ? <Check size={20} /> : access === "locked" ? <Lock size={17} /> : i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-extrabold">{lesson ? lesson.title : loaded.status === "loading" ? "Carregando…" : `Lição ${i + 1}`}</span>
                {lesson ? <span className="line-clamp-2 block text-sm text-ink-2">{lesson.objective}</span> : null}
                <span className="mt-1 flex flex-wrap gap-1.5">
                  {lesson ? <Chip>~{lesson.minutes} min</Chip> : null}
                  {completed ? (
                    <Chip tone="ok">
                      Concluída{lp?.lastAccuracy !== undefined ? ` · ${Math.round(lp.lastAccuracy * 100)}% sem ajuda` : ""}
                    </Chip>
                  ) : open ? (
                    <Chip tone="warn">Em andamento</Chip>
                  ) : access === "locked" ? (
                    <Chip>Abre após a lição {i}</Chip>
                  ) : null}
                </span>
              </span>
              {available ? <Play size={18} className="shrink-0 text-primary-text" aria-hidden="true" /> : null}
            </>
          );
          return (
            <li key={id}>
              {available ? (
                <Link href={`/licao/${id}`} className="card flex items-center gap-3 p-3.5 hover:border-ink-3" aria-label={`Lição ${i + 1}: ${lesson?.title ?? ""}${completed ? " (concluída, refazer)" : open ? " (continuar)" : ""}`}>
                  {inner}
                </Link>
              ) : (
                <div className="card flex items-center gap-3 p-3.5 opacity-80" aria-disabled="true">
                  {inner}
                </div>
              )}
            </li>
          );
        })}
        {loaded.status === "loading" ? <Skeleton className="h-4 w-1/3" /> : null}
      </ol>

      {/* Checkpoint */}
      <SectionTitle id="checkpoint">Checkpoint</SectionTitle>
      <Card as="section" aria-labelledby="checkpoint" pop={status === "checkpoint_ready"}>
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-ink">
            <ClipboardCheck size={22} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-extrabold">{passed ? "Checkpoint aprovado" : "Situações e perguntas inéditas"}</p>
            <p className="text-sm text-ink-2">
              10 perguntas sem pistas. Passa com {threshold}% de acertos independentes. Se não passar, a nova tentativa traz outra versão, com perguntas diferentes.
            </p>
          </div>
        </div>
        {up?.attempts.length ? (
          <ul className="mt-3 grid gap-1 text-sm">
            {up.attempts.map((a) => (
              <li key={a.n} className="flex flex-wrap items-center gap-2">
                <span className="font-bold">
                  Tentativa {a.n} (versão {a.set}) · {formatShort(dateKey(a.ts, tz))}:
                </span>
                <span className="tabular-nums">
                  {a.independentCorrect}/{a.total}
                </span>
                <Chip tone={a.passed ? "ok" : "bad"}>{a.passed ? "Aprovado" : "Não aprovado"}</Chip>
              </li>
            ))}
          </ul>
        ) : null}
        {cp === "locked" || loaded.status !== "ready" ? null : (
          <div className="mt-3">
            <LinkButton href={`/checkpoint/${meta.id}`} variant={cp === "after-lessons" && !passed ? "primary" : "secondary"}>
              {up?.session ? "Continuar o checkpoint" : passed ? "Refazer o checkpoint" : cp === "after-lessons" ? "Fazer o checkpoint" : "Já sei isso: testar para pular"}
            </LinkButton>
            {cp === "test-out" && !passed ? (
              <p className="mt-2 text-sm text-ink-2">
                Você ainda não concluiu as lições. Se passar agora, a unidade fica marcada como <strong>aprovada por teste</strong> (não como estudada) e as lições continuam
                disponíveis.
              </p>
            ) : null}
          </div>
        )}
      </Card>

      {/* Atividades */}
      <SectionTitle id="atividades">Atividades da unidade</SectionTitle>
      <p className="mb-3 text-sm text-ink-2">Leitura e escuta são corrigidas. Escrita, fala e missão são autoavaliadas e registradas à parte: não contam para o checkpoint.</p>
      <ul className="grid gap-2.5 sm:grid-cols-2" aria-labelledby="atividades">
        {ACTIVITY_KINDS.map((kind) => {
          const Icon = ACT_ICON[kind];
          const actId = `${meta.id}-act-${kind}`;
          const finished = up?.activitiesDone.includes(actId);
          const act = unit?.activities[kind];
          const usable = !locked && loaded.status === "ready";
          const body = (
            <>
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${finished ? "bg-ok-soft text-ok" : "bg-primary-soft text-primary-text"}`}>
                {finished ? <Check size={20} aria-hidden="true" /> : <Icon size={20} aria-hidden="true" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-extrabold uppercase tracking-wider text-ink-2">{ACTIVITY_LABELS[kind]}</span>
                <span className="block font-extrabold leading-tight">{act?.title ?? "…"}</span>
                <span className="mt-1 flex flex-wrap gap-1.5">
                  {finished ? <Chip tone="ok">Feita</Chip> : <Chip>Sugerida após a lição {ACT_AFTER[kind]}</Chip>}
                  {kind === "writing" || kind === "speaking" || kind === "mission" ? <Chip tone="info">Autoavaliada</Chip> : null}
                </span>
              </span>
            </>
          );
          return (
            <li key={kind}>
              {usable ? (
                <Link href={`/atividade/${meta.id}/${kind}`} className="card flex h-full items-center gap-3 p-3.5 hover:border-ink-3">
                  {body}
                </Link>
              ) : (
                <div className="card flex h-full items-center gap-3 p-3.5 opacity-80">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

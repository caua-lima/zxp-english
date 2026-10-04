"use client";

import Link from "next/link";
import { Check, ChevronRight, FastForward, Lock, Play } from "lucide-react";
import { CURRICULUM, getUnitMeta, unitsOfStage } from "@/content/curriculum";
import { isPublished } from "@/content/registry";
import { STAGE_INFO, STAGES, type UnitMeta } from "@/content/schema";
import { lessonsDone, recommendedNext, stageProgress, UNIT_STATUS_LABEL, unitSatisfied, unitStatus, type UnitStatus } from "@/engine/progression";
import { useProgress } from "@/state/provider";
import { Chip, PageTitle, ProgressBar, Ring } from "@/components/ui";

const STATUS_TONE: Record<UnitStatus, "neutral" | "primary" | "ok" | "warn" | "info"> = {
  locked: "neutral",
  available: "primary",
  in_progress: "primary",
  checkpoint_ready: "warn",
  completed: "ok",
  tested_out: "ok",
  skipped: "info",
};

function UnitNode({ meta, status, done, isNext, offset }: { meta: UnitMeta; status: UnitStatus; done: number; isNext: boolean; offset: boolean }) {
  const state = useProgress()!;
  const published = isPublished(meta.id);
  const locked = status === "locked";
  const steps = meta.lessonCount + 1; // lições + checkpoint
  const value = status === "completed" ? 1 : status === "tested_out" ? 1 : done / steps;
  const missing = meta.prerequisites.filter((p) => !unitSatisfied(state, p)).map((p) => getUnitMeta(p)!);
  const color = `var(--stage-${meta.stage})`;

  return (
    <li className="relative">
      <Link
        href={`/unidade/${meta.id}`}
        aria-label={`Unidade ${meta.order}: ${meta.title}. ${UNIT_STATUS_LABEL[status]}.`}
        className={`card flex items-center gap-3 p-3 transition-transform hover:border-ink-3 sm:gap-4 sm:p-4 ${offset ? "sm:ml-10" : "sm:mr-10"} ${isNext ? "card-pop" : ""} ${locked ? "opacity-80" : ""}`}
      >
        <Ring value={value} size={60} stroke={6} label={`${done} de ${meta.lessonCount} lições`} color={color}>
          {status === "completed" || status === "tested_out" ? (
            <Check size={24} style={{ color }} aria-hidden="true" />
          ) : locked ? (
            <Lock size={20} className="text-ink-3" aria-hidden="true" />
          ) : status === "skipped" ? (
            <FastForward size={20} className="text-ink-3" aria-hidden="true" />
          ) : (
            <span className="text-lg font-extrabold tabular-nums" style={{ color }}>
              {meta.order}
            </span>
          )}
        </Ring>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-extrabold uppercase tracking-wider text-ink-2">
            {STAGE_INFO[meta.stage].label} · Unidade {meta.order}
          </p>
          <p className="truncate text-lg font-extrabold leading-tight">{meta.title}</p>
          <p className="line-clamp-2 text-sm text-ink-2">{meta.subtitle}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <Chip tone={STATUS_TONE[status]}>{UNIT_STATUS_LABEL[status]}</Chip>
            {!locked && status !== "completed" && status !== "tested_out" && done > 0 ? (
              <Chip>
                {done}/{meta.lessonCount} lições
              </Chip>
            ) : null}
            {!published ? <Chip tone="warn">Em preparação</Chip> : null}
            {isNext ? (
              <Chip tone="accent">
                <Play size={11} aria-hidden="true" /> Você está aqui
              </Chip>
            ) : null}
          </div>
          {locked && missing.length > 0 ? (
            <p className="mt-1.5 text-xs font-semibold text-ink-2">
              Requer: {missing.map((m) => `${STAGE_INFO[m.stage].label}·U${m.order} ${m.title}`).join("; ")}
            </p>
          ) : null}
        </div>
        <ChevronRight size={20} className="shrink-0 text-ink-3" aria-hidden="true" />
      </Link>
    </li>
  );
}

export function TrailScreen() {
  const state = useProgress();
  if (!state) return null;
  const next = recommendedNext(state, CURRICULUM);

  return (
    <div>
      <PageTitle
        title="Trilha"
        subtitle="Do zero ao B2 em 4 etapas e 32 unidades. Cada unidade abre quando os pré-requisitos estão resolvidos; você sempre pode rever o que já passou."
      />
      <div className="mb-4 flex flex-wrap gap-2">
        <Link href="/ajustes#partida" className="btn btn-secondary btn-sm">
          Ajustar ponto de partida
        </Link>
        <Link href="/diagnostico" className="btn btn-ghost btn-sm">
          Fazer o diagnóstico
        </Link>
      </div>

      {STAGES.map((stage) => {
        const info = STAGE_INFO[stage];
        const p = stageProgress(state, CURRICULUM, stage);
        const units = unitsOfStage(stage);
        return (
          <section key={stage} aria-labelledby={`etapa-${stage}`} className="mb-8">
            <div className="sticky top-[58px] z-10 -mx-4 mb-3 border-y-2 border-line bg-bg/95 px-4 py-2.5 backdrop-blur">
              <div className="flex items-center gap-3">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 border-line-strong font-display text-lg font-extrabold"
                  style={{ background: `var(--stage-${stage})`, color: "var(--surface)" }}
                  aria-hidden="true"
                >
                  {info.label}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 id={`etapa-${stage}`} className="truncate text-lg font-extrabold">
                    <span className="sr-only">{info.label} — </span>
                    {info.name}
                  </h2>
                  <ProgressBar value={p.completed / p.total} label={`${p.completed} de ${p.total} unidades resolvidas`} className="mt-1 !h-2" />
                </div>
                <span className="shrink-0 text-sm font-extrabold tabular-nums text-ink-2">
                  {p.completed}/{p.total}
                </span>
              </div>
            </div>
            <p className="mb-3 text-sm text-ink-2">{info.blurb}</p>
            <ol className="relative grid grid-cols-[minmax(0,1fr)] gap-3">
              <span className="absolute bottom-6 left-[42px] top-6 w-1 rounded-full bg-line sm:left-1/2" aria-hidden="true" />
              {units.map((meta, i) => (
                <UnitNode
                  key={meta.id}
                  meta={meta}
                  status={unitStatus(state, meta)}
                  done={lessonsDone(state, meta)}
                  isNext={next?.unitId === meta.id}
                  offset={i % 2 === 1}
                />
              ))}
            </ol>
          </section>
        );
      })}
      <p className="text-sm text-ink-3">
        As etapas A1–B2 seguem os objetivos comunicativos do CEFR como referência editorial. O ZXP English não emite certificado nem equivale a um exame oficial.
      </p>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SKILL_LABELS } from "@/content/schema";
import { addDays, dateKey, formatShort, weekStart, weekdayShort } from "@/engine/dates";
import { weeklySummary } from "@/engine/stats";
import { xpByDate } from "@/engine/xp";
import { useNow, useProgress } from "@/state/provider";
import { useConceptMap } from "@/components/content-hooks";
import { Card, Chip, LinkButton, PageTitle, SectionTitle } from "@/components/ui";

export function WeekScreen() {
  const state = useProgress();
  const now = useNow();
  const [offset, setOffset] = useState(0);
  const tz = state?.settings.timezone ?? "America/Sao_Paulo";
  const today = dateKey(now, tz);
  const start = addDays(weekStart(today), offset * 7);
  const w = state ? weeklySummary(state, start) : null;
  const labels = useConceptMap(w ? w.weakest.map((x) => x.conceptId) : []);
  if (!state || !w) return null;

  const byDate = xpByDate(state.xp, tz);
  const goal = state.settings.dailyXpGoal;
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = addDays(start, i);
    return { d, xp: byDate.get(d) ?? 0, future: d > today };
  });
  const max = Math.max(goal, ...days.map((x) => x.xp));
  const delta = w.xp - w.previousXp;
  const current = offset === 0;

  const suggestions: string[] = [];
  if (w.studyDays === 0) suggestions.push("Nesta semana ainda não houve estudo. Comece por uma revisão curta: 5 minutos já contam.");
  else if (w.studyDays <= 2) suggestions.push("Poucos dias de estudo. Sessões curtas em mais dias fixam melhor do que uma sessão longa.");
  if (w.reviewAccuracy !== null && w.reviewAccuracy < 0.7) suggestions.push("A retenção nas revisões ficou abaixo de 70%. Vale reduzir conteúdo novo por alguns dias e priorizar revisão.");
  if (w.weakestSkill) suggestions.push(`${SKILL_LABELS[w.weakestSkill.skill]} foi a habilidade com mais erros (${Math.round(w.weakestSkill.ratio * 100)}% sem ajuda). Refaça uma lição que a trabalhe.`);
  if (w.tasksDone === 0 && w.lessonsCompleted > 0) suggestions.push("Nenhuma tarefa de escrita ou fala nesta semana. Faça uma das atividades de produção da unidade atual.");
  if (w.weakest.length > 0) suggestions.push("Pratique os itens abaixo pelo caderno de erros antes de avançar.");
  if (suggestions.length === 0 && w.studyDays > 0) suggestions.push("Semana equilibrada. Mantenha o ritmo e continue fazendo as revisões no dia em que vencem.");

  return (
    <div>
      <PageTitle title="Revisão semanal" subtitle="Um resumo honesto da sua semana: o que foi feito, o que ficou e o que ajustar." />

      <div className="mb-4 flex items-center justify-between gap-2">
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => setOffset((o) => o - 1)} aria-label="Semana anterior">
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <p className="text-center font-extrabold" aria-live="polite">
          {formatShort(w.weekStart)} a {formatShort(w.weekEnd)}
          {current ? <span className="block text-xs font-bold text-ink-2">semana atual</span> : null}
        </p>
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => setOffset((o) => Math.min(0, o + 1))} disabled={current} aria-label="Próxima semana">
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          ["XP", String(w.xp)],
          ["Dias de estudo", `${w.studyDays}/7`],
          ["Meta cumprida", `${w.goalDays} ${w.goalDays === 1 ? "dia" : "dias"}`],
          ["Lições", String(w.lessonsCompleted)],
          ["Revisões", String(w.reviewsDone)],
          ["Retenção", w.reviewAccuracy === null ? "—" : `${Math.round(w.reviewAccuracy * 100)}%`],
          ["Itens novos", String(w.newConcepts)],
          ["Tarefas de produção", String(w.tasksDone)],
        ].map(([k, v]) => (
          <div key={k} className="card p-3 text-center">
            <dt className="text-xs font-extrabold uppercase tracking-wide text-ink-2">{k}</dt>
            <dd className="text-2xl font-extrabold tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 text-sm text-ink-2">
        {w.previousXp === 0 && w.xp === 0
          ? "Sem atividade nesta semana nem na anterior."
          : delta === 0
            ? "Mesmo XP da semana anterior."
            : `${Math.abs(delta)} XP ${delta > 0 ? "a mais" : "a menos"} do que na semana anterior (${w.previousXp} XP).`}
        {w.reviewAccuracy === null && w.reviewsDone > 0 ? " Retenção aparece a partir de 5 revisões na semana." : ""}
      </p>

      <SectionTitle id="dias">Dia a dia</SectionTitle>
      <Card as="section" aria-labelledby="dias">
        <ol className="grid grid-cols-7 items-end gap-1.5">
          {days.map((x) => (
            <li key={x.d} className="text-center">
              <div className="mx-auto flex h-24 w-full max-w-10 items-end rounded-lg bg-surface-2" aria-hidden="true">
                <div
                  className={`w-full rounded-lg ${x.xp >= goal ? "bg-accent" : "bg-primary"}`}
                  style={{ height: `${Math.round((x.xp / max) * 100)}%`, minHeight: x.xp ? 6 : 0 }}
                />
              </div>
              <p className="mt-1 text-sm font-extrabold tabular-nums">{x.future ? "·" : x.xp}</p>
              <p className="text-[0.68rem] font-bold text-ink-2">{weekdayShort(x.d)}</p>
              <span className="sr-only">
                {formatShort(x.d)}: {x.future ? "dia futuro" : `${x.xp} XP${x.xp >= goal ? ", meta cumprida" : ""}`}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-2 text-xs font-bold text-ink-2">Meta diária: {goal} XP. Barras amarelas indicam meta cumprida.</p>
      </Card>

      <SectionTitle id="ajustar">O que ajustar</SectionTitle>
      <Card as="section" aria-labelledby="ajustar">
        <ul className="rich">
          {suggestions.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        {w.weakest.length > 0 ? (
          <>
            <p className="mt-4 font-extrabold">Itens com mais erros na semana</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {w.weakest.map((x) => (
                <li key={x.conceptId}>
                  <Chip tone="bad" className="!text-sm">
                    <span lang="en">{labels.get(x.conceptId)?.en ?? "item"}</span> · {x.wrong}×
                  </Chip>
                </li>
              ))}
            </ul>
            <LinkButton href="/erros" variant="secondary" size="sm" className="mt-3">
              Abrir caderno de erros
            </LinkButton>
          </>
        ) : null}
      </Card>
    </div>
  );
}

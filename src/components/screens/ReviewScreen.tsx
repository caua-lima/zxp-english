"use client";

import Link from "next/link";
import { NotebookPen, RefreshCw } from "lucide-react";
import { addDays, dateKey, formatShort, weekdayShort } from "@/engine/dates";
import { buildReviewQueue, dueItems, MASTERY_LABELS, type MasteryStatus } from "@/engine/srs";
import { masteryCounts, reviewsDoneOn } from "@/engine/stats";
import { useNow, useProgress } from "@/state/provider";
import { Zip } from "@/components/brand";
import { useConceptMap } from "@/components/content-hooks";
import { Card, Chip, LinkButton, PageTitle, SectionTitle } from "@/components/ui";

const ORDER: MasteryStatus[] = ["learning", "practicing", "consolidating", "retained"];
const MASTERY_HELP: Record<MasteryStatus, string> = {
  new: "Ainda sem tentativas.",
  learning: "Já praticado, mas com menos de 2 acertos sem ajuda.",
  practicing: "Pelo menos 2 acertos sem ajuda, em dias diferentes.",
  consolidating: "Superou um intervalo de 7 dias ou mais.",
  retained: "Vários intervalos longos seguidos, sem erro recente.",
};

export function ReviewScreen() {
  const state = useProgress();
  const now = useNow();
  const tz = state?.settings.timezone ?? "America/Sao_Paulo";
  const today = dateKey(now, tz);
  const queue = state ? buildReviewQueue(state.concepts, today, state.settings.reviewCap, reviewsDoneOn(state, today)) : null;
  const labels = useConceptMap(queue ? queue.today.slice(0, 12).map((i) => i.conceptId) : []);
  if (!state || !queue) return null;

  const doneToday = reviewsDoneOn(state, today);
  const counts = masteryCounts(state);
  const tracked = Object.keys(state.concepts).length;

  // Quantos itens vencem em cada um dos próximos 7 dias (sem contar os já vencidos).
  const upcoming = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(today, i + 1);
    const count = Object.values(state.concepts).reduce((n, c) => n + (c.rec.due === day ? 1 : 0) + (c.prod.due === day ? 1 : 0), 0);
    return { day, count };
  });
  const maxUpcoming = Math.max(1, ...upcoming.map((u) => u.count));
  const overdue = dueItems(state.concepts, today).filter((i) => i.overdueDays > 0).length;

  return (
    <div>
      <PageTitle title="Revisar hoje" subtitle="Recuperar o que você estudou, dias depois e em frases novas, é o que transforma estudo em memória." />

      <Card pop as="section" aria-labelledby="hoje" className="!p-5">
        <div className="flex items-center gap-4">
          <Zip mood={queue.today.length > 0 ? "happy" : "rest"} size={72} />
          <div className="min-w-0 flex-1">
            <h2 id="hoje" className="text-2xl font-extrabold">
              {queue.today.length > 0 ? `${queue.today.length} ${queue.today.length === 1 ? "item" : "itens"} para hoje` : doneToday > 0 ? "Revisões de hoje feitas" : "Nada vence hoje"}
            </h2>
            <p className="text-ink-2">
              {queue.today.length > 0
                ? `Cerca de ${Math.max(1, Math.ceil(queue.today.length / 2))} minutos.`
                : tracked === 0
                  ? "Conclua uma lição: os itens dela entram aqui a partir de amanhã."
                  : "Volte amanhã. Enquanto isso, avance na trilha ou pratique seus erros."}
            </p>
          </div>
        </div>
        {queue.today.length > 0 ? (
          <LinkButton href="/pratica/revisao" className="mt-4" block>
            <RefreshCw size={18} aria-hidden="true" /> Começar a revisão
          </LinkButton>
        ) : null}
        <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-surface-2 p-2.5">
            <dt className="text-xs font-extrabold uppercase tracking-wide text-ink-2">Feitas hoje</dt>
            <dd className="text-xl font-extrabold tabular-nums">{doneToday}</dd>
          </div>
          <div className="rounded-2xl bg-surface-2 p-2.5">
            <dt className="text-xs font-extrabold uppercase tracking-wide text-ink-2">Limite diário</dt>
            <dd className="text-xl font-extrabold tabular-nums">{state.settings.reviewCap}</dd>
          </div>
          <div className="rounded-2xl bg-surface-2 p-2.5">
            <dt className="text-xs font-extrabold uppercase tracking-wide text-ink-2">Guardadas</dt>
            <dd className="text-xl font-extrabold tabular-nums">{queue.deferred}</dd>
          </div>
        </dl>
        {queue.deferred > 0 ? (
          <p className="mt-3 text-sm text-ink-2">
            Há {queue.totalDue} pendências no total ({overdue} atrasadas). O limite diário evita um acúmulo desanimador: o que não cabe hoje continua guardado e aparece nos
            próximos dias, começando pelos itens mais atrasados e mais frágeis. Nada é apagado. Você pode aumentar o limite em{" "}
            <Link href="/ajustes" className="font-extrabold underline">
              Ajustes
            </Link>
            .
          </p>
        ) : null}
      </Card>

      {queue.today.length > 0 && labels.size > 0 ? (
        <>
          <SectionTitle id="itens">Na fila de hoje</SectionTitle>
          <ul className="flex flex-wrap gap-2" aria-labelledby="itens">
            {queue.today.slice(0, 12).map((i) => {
              const c = labels.get(i.conceptId);
              return c ? (
                <li key={`${i.conceptId}-${i.mode}`}>
                  <Chip tone={i.mode === "prod" ? "primary" : "neutral"} className="!text-sm">
                    <span lang="en">{c.en}</span>
                    <span className="font-bold opacity-80">· {i.mode === "prod" ? "produzir" : "reconhecer"}</span>
                  </Chip>
                </li>
              ) : null;
            })}
            {queue.today.length > 12 ? (
              <li>
                <Chip>+{queue.today.length - 12}</Chip>
              </li>
            ) : null}
          </ul>
        </>
      ) : null}

      <SectionTitle id="proximos">Próximos 7 dias</SectionTitle>
      <Card as="section" aria-labelledby="proximos">
        <ol className="grid grid-cols-7 items-end gap-1.5">
          {upcoming.map((u) => (
            <li key={u.day} className="text-center">
              <div className="mx-auto flex h-20 w-full max-w-10 items-end rounded-lg bg-surface-2" aria-hidden="true">
                <div className="w-full rounded-lg bg-primary" style={{ height: `${Math.round((u.count / maxUpcoming) * 100)}%`, minHeight: u.count ? 6 : 0 }} />
              </div>
              <p className="mt-1 text-sm font-extrabold tabular-nums">{u.count}</p>
              <p className="text-[0.68rem] font-bold text-ink-2">{weekdayShort(u.day)}</p>
              <span className="sr-only">
                {formatShort(u.day)}: {u.count} itens
              </span>
            </li>
          ))}
        </ol>
      </Card>

      <SectionTitle id="estado">Como estão seus itens</SectionTitle>
      <Card as="section" aria-labelledby="estado">
        {tracked === 0 ? (
          <p className="text-ink-2">Nenhum item em revisão ainda.</p>
        ) : (
          <ul className="grid gap-2">
            {ORDER.map((k) => (
              <li key={k} className="flex items-start justify-between gap-3">
                <span>
                  <span className="block font-extrabold">{MASTERY_LABELS[k]}</span>
                  <span className="block text-sm text-ink-2">{MASTERY_HELP[k]}</span>
                </span>
                <span className="text-xl font-extrabold tabular-nums">{counts[k]}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-sm text-ink-3">Um item nunca é considerado dominado por um único acerto. Reconhecer e produzir são acompanhados separadamente.</p>
      </Card>

      <details className="card mt-6 p-4">
        <summary className="cursor-pointer font-extrabold">Como a revisão funciona</summary>
        <ul className="rich mt-3 text-sm">
          <li>
            Intervalos atuais: <strong>{state.settings.reviewIntervals.join(", ")} dias</strong>. É uma heurística inicial do app, não uma fórmula universal.
          </li>
          <li>Acerto sem ajuda no dia do vencimento: o intervalo aumenta.</li>
          <li>Erro: o intervalo recua e o item volta amanhã; na mesma sessão ele reaparece depois de outros itens.</li>
          <li>Acerto com pista ou após ver a resposta: não conta como recuperação independente; o item volta amanhã.</li>
          <li>Repetir o mesmo item no mesmo dia não altera o agendamento.</li>
          <li>Cada item volta em uma frase diferente da última vez, quando há alternativa.</li>
        </ul>
      </details>

      <div className="mt-4">
        <LinkButton href="/erros" variant="secondary">
          <NotebookPen size={18} aria-hidden="true" /> Abrir caderno de erros
        </LinkButton>
      </div>
    </div>
  );
}

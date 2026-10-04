"use client";

/**
 * Sessão de prática: "revisão" (itens vencidos de hoje) ou "erros" (caderno de erros).
 * A fila é montada uma vez ao abrir e congelada: responder não muda a ordem no meio da sessão.
 */
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { isPublished, loadUnits } from "@/content/registry";
import type { Exercise } from "@/content/schema";
import { addDays, dateKey } from "@/engine/dates";
import type { AttemptContext, ProgressState } from "@/engine/model";
import { buildConceptIndex, buildReviewPicks, errorNotebook, pickExercise, unitsNeeded, type ReviewPick } from "@/engine/review-builder";
import { initSession, sessionStats, type SessionState } from "@/engine/session";
import { buildReviewQueue, dueItems } from "@/engine/srs";
import { reviewsDoneOn } from "@/engine/stats";
import { unscheduleModes } from "@/state/actions";
import { useProgress, useStore } from "@/state/provider";
import { Zip } from "@/components/brand";
import { FocusHeader, SessionRunner } from "@/components/session/SessionRunner";
import { LinkButton, Loading, Notice } from "@/components/ui";

export type PracticeMode = "revisao" | "erros";

type Stuck = { conceptId: string; mode: "rec" | "prod" }[];
type Plan =
  | { status: "loading" }
  | { status: "empty"; reason: string; stuck?: Stuck }
  | { status: "ready"; exercises: Record<string, Exercise>; order: string[]; key: string; stuck?: Stuck }
  | { status: "error" };

async function buildPlan(state: ProgressState, mode: PracticeMode, concept: string | null, now: Date): Promise<Plan> {
  const tz = state.settings.timezone;
  const today = dateKey(now, tz);
  let picks: ReviewPick[] = [];
  let stuck: Stuck = [];

  if (mode === "revisao") {
    const queue = buildReviewQueue(state.concepts, today, state.settings.reviewCap, reviewsDoneOn(state, today));
    if (queue.today.length === 0) {
      return {
        status: "empty",
        reason:
          queue.totalDue > 0
            ? `Você já fez as revisões de hoje. ${queue.totalDue} pendências continuam guardadas para os próximos dias.`
            : "Nenhum item vence hoje. Novos itens aparecem no dia seguinte ao estudo.",
      };
    }
    const units = await loadUnits(unitsNeeded(queue.today).filter(isPublished));
    const plan = buildReviewPicks(queue.today, buildConceptIndex(units, state), state.attempts);
    picks = plan.picks;
    stuck = plan.stuck;
  } else {
    const entries = errorNotebook(state, (iso) => dateKey(iso, tz));
    const chosen = concept ? entries.filter((e) => e.conceptId === concept) : entries.filter((e) => e.status !== "resolved").slice(0, 6);
    const ids = chosen.flatMap((e) => (e.conceptId ? [e.conceptId] : []));
    if (ids.length === 0) return { status: "empty", reason: "Não há itens com conceito associado para praticar agora." };
    const units = await loadUnits(unitsNeeded(ids.map((conceptId) => ({ conceptId }))).filter(isPublished));
    const index = buildConceptIndex(units, state);
    const used = new Set<string>();
    for (const id of ids) {
      // Produção primeiro; depois reconhecimento, em outro exercício.
      for (const m of ["prod", "rec"] as const) {
        const p = pickExercise(id, m, index, state.attempts, used);
        if (p && !used.has(p.exercise.id) && !p.fallback) {
          used.add(p.exercise.id);
          picks.push(p);
        }
      }
      if (!picks.some((p) => p.conceptId === id)) {
        const p = pickExercise(id, "prod", index, state.attempts, used);
        if (p && !used.has(p.exercise.id)) {
          used.add(p.exercise.id);
          picks.push(p);
        }
      }
    }
  }

  // Um exercício só entra uma vez na fila.
  const exercises: Record<string, Exercise> = {};
  const order: string[] = [];
  for (const p of picks) {
    if (exercises[p.exercise.id]) continue;
    exercises[p.exercise.id] = p.exercise;
    order.push(p.exercise.id);
  }
  if (order.length === 0) return { status: "empty", reason: "Não encontrei exercícios disponíveis para estes itens.", stuck };
  return { status: "ready", exercises, order, key: `${mode}:${now.getTime()}`, stuck };
}

export function PracticeScreen({ mode, concept }: { mode: PracticeMode; concept: string | null }) {
  const store = useStore();
  const progress = useProgress();
  const router = useRouter();
  const [plan, setPlan] = useState<Plan>({ status: "loading" });
  const [final, setFinal] = useState<SessionState | null>(null);
  const ready = progress !== null;
  const back = mode === "revisao" ? "/revisar" : "/erros";
  const title = mode === "revisao" ? "Revisar hoje" : "Praticar meus erros";
  const context: AttemptContext = mode === "revisao" ? "review" : "notebook";

  useEffect(() => {
    if (!ready) return;
    let alive = true;
    buildPlan(store.state, mode, concept, store.now())
      .then((p) => {
        if (!alive) return;
        // Modos vencidos sem exercício disponível saem da fila (ver review-builder).
        if ((p.status === "ready" || p.status === "empty") && p.stuck?.length) {
          const stuck = p.stuck;
          store.run((s, now) => unscheduleModes(s, stuck, now));
        }
        setPlan(p);
      })
      .catch(() => alive && setPlan({ status: "error" }));
    return () => {
      alive = false;
    };
    // A fila é montada uma única vez por abertura da tela.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, mode, concept]);

  const initial = useMemo(() => (plan.status === "ready" ? initSession(plan.order) : null), [plan]);
  const header = <FocusHeader title={title} onExit={() => router.push(back)} exitLabel="Voltar" />;

  if (!progress || plan.status === "loading") {
    return (
      <div className="min-h-dvh">
        {header}
        <div className="mx-auto max-w-2xl px-4 pt-6">
          <Loading label="Montando sua sessão…" />
        </div>
      </div>
    );
  }

  if (plan.status === "empty" || plan.status === "error") {
    return (
      <div className="min-h-dvh">
        {header}
        <main className="mx-auto grid max-w-2xl gap-4 px-4 pt-8 text-center">
          <div className="flex justify-center">
            <Zip mood="rest" size={96} />
          </div>
          <h1 className="text-2xl font-extrabold">{plan.status === "error" ? "Não foi possível montar a sessão" : "Tudo em dia"}</h1>
          <p className="text-ink-2">{plan.status === "error" ? "Verifique sua conexão e tente de novo." : plan.reason}</p>
          <LinkButton href="/" block>
            Ir para o início
          </LinkButton>
        </main>
      </div>
    );
  }

  if (!final && initial) {
    return (
      <SessionRunner
        key={plan.key}
        title={title}
        context={context}
        refId={mode === "revisao" ? "review" : "notebook"}
        sessionKey={plan.key}
        exercises={plan.exercises}
        initial={initial}
        allowRequeue
        allowHints
        onFinish={setFinal}
        onExit={() => router.push(back)}
        exitMessage="As respostas já dadas ficam registradas. Os itens que faltaram continuam na fila de revisão."
      />
    );
  }

  const stats = final ? sessionStats(final) : null;
  const tz = progress.settings.timezone;
  const today = dateKey(store.now(), tz);
  const remaining = buildReviewQueue(progress.concepts, today, progress.settings.reviewCap, reviewsDoneOn(progress, today));
  const tomorrow = dueItems(progress.concepts, addDays(today, 1)).length;

  return (
    <div className="min-h-dvh">
      {header}
      <main className="mx-auto grid max-w-2xl gap-5 px-4 pb-24 pt-6">
        <div className="text-center anim-pop">
          <div className="flex justify-center">
            <Zip mood="cheer" size={96} />
          </div>
          <h1 className="mt-2 text-3xl font-extrabold">{mode === "revisao" ? "Revisão feita" : "Prática feita"}</h1>
          {stats ? (
            <p className="mt-1 text-lg font-extrabold tabular-nums">
              {stats.independent} de {stats.gradedTotal} recuperados sem ajuda
            </p>
          ) : null}
        </div>
        <Notice tone="info" title="O que acontece agora">
          <ul className="rich">
            <li>Itens acertados sem ajuda voltam mais tarde, com intervalo maior.</li>
            <li>Itens errados ou com pista voltam amanhã, em outra frase.</li>
            {stats && stats.failedIds.length > 0 ? <li>{stats.failedIds.length} item(ns) ficaram no caderno de erros.</li> : null}
          </ul>
        </Notice>
        <p className="text-center text-ink-2">
          {remaining.today.length > 0
            ? `Ainda há ${remaining.today.length} item(ns) para hoje.`
            : remaining.totalDue > 0
              ? `Limite de hoje atingido. ${remaining.totalDue} pendências ficam guardadas.`
              : `Fila de hoje zerada. Amanhã: ${tomorrow} item(ns).`}
        </p>
        <div className="grid gap-2">
          {remaining.today.length > 0 && mode === "revisao" ? (
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => {
                setFinal(null);
                setPlan({ status: "loading" });
                void buildPlan(store.state, mode, concept, store.now()).then(setPlan);
              }}
            >
              Continuar revisando
            </button>
          ) : null}
          <LinkButton href="/" variant={remaining.today.length > 0 ? "secondary" : "primary"} block>
            Ir para o início
          </LinkButton>
          <LinkButton href={back} variant="secondary" block>
            {mode === "revisao" ? "Ver revisões" : "Ver caderno de erros"}
          </LinkButton>
        </div>
      </main>
    </div>
  );
}

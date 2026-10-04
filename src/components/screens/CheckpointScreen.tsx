"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CircleCheck, CircleX } from "lucide-react";
import { CURRICULUM, getUnitMeta } from "@/content/curriculum";
import type { Exercise, UnitContent } from "@/content/schema";
import { STAGE_INFO } from "@/content/schema";
import type { ProgressState } from "@/engine/model";
import { checkpointAccess, lessonsDone, nextCheckpointSet, recommendedNext, scoreCheckpoint, type CheckpointScore } from "@/engine/progression";
import { fromSnapshot, initSession, sessionStats, toSnapshot, type SessionState } from "@/engine/session";
import { finishCheckpoint, saveCheckpointSession } from "@/state/actions";
import { useProgress, useStore } from "@/state/provider";
import { Zip } from "@/components/brand";
import { useUnit } from "@/components/content-hooks";
import { FocusHeader, SessionRunner } from "@/components/session/SessionRunner";
import { Chip, LinkButton, Loading, Notice } from "@/components/ui";

export function exerciseTitle(ex: Exercise): string {
  switch (ex.kind) {
    case "mcq":
    case "listen":
    case "type":
    case "order":
    case "match":
    case "write":
    case "speak":
      return ex.prompt;
    case "cloze":
      return ex.text;
    case "dictation":
      return "Ditado";
    case "fix":
      return `Corrigir: ${ex.wrong}`;
    case "dialog":
      return ex.setup;
  }
}

type Stage = "intro" | "run" | "result" | "production";

export function CheckpointScreen({ unitId }: { unitId: string }) {
  const loaded = useUnit(unitId);
  const progress = useProgress();
  const router = useRouter();
  const meta = getUnitMeta(unitId);

  if (!progress || loaded.status === "loading") {
    return (
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <Loading label="Carregando o checkpoint…" />
      </div>
    );
  }
  if (loaded.status !== "ready" || !meta || checkpointAccess(progress, meta) === "locked") {
    return (
      <div className="min-h-dvh">
        <FocusHeader title="Checkpoint" onExit={() => router.push(`/unidade/${unitId}`)} exitLabel="Voltar" />
        <main className="mx-auto max-w-2xl px-4 pt-5">
          <Notice tone="warn" title="Checkpoint indisponível">
            {loaded.status === "error" ? loaded.message : "Esta unidade ainda está bloqueada ou não tem conteúdo publicado."}
          </Notice>
          <LinkButton href="/trilha" className="mt-4">
            Ir para a trilha
          </LinkButton>
        </main>
      </div>
    );
  }
  return <CheckpointFlow key={unitId} unit={loaded.data} initialProgress={progress} />;
}

function CheckpointFlow({ unit, initialProgress }: { unit: UnitContent; initialProgress: ProgressState }) {
  const store = useStore();
  const progress = useProgress() ?? initialProgress;
  const router = useRouter();
  const meta = getUnitMeta(unit.id)!;
  const cp = unit.checkpoint;

  const [boot] = useState(() => {
    const snap = initialProgress.units[unit.id]?.session;
    const set = snap?.set ?? nextCheckpointSet(initialProgress, unit.id);
    const pool = set === "A" ? cp.setA : cp.setB;
    const valid = snap && snap.queue.length > 0 && snap.queue.every((id) => pool.some((e) => e.id === id));
    return { resume: valid ? fromSnapshot(snap) : null };
  });

  const [stage, setStage] = useState<Stage>(boot.resume ? "run" : "intro");
  const [session, setSession] = useState<SessionState | null>(boot.resume);
  const [result, setResult] = useState<{ score: CheckpointScore; session: SessionState; set: "A" | "B" } | null>(null);
  const [productionDone, setProductionDone] = useState(Boolean(initialProgress.tasks[cp.production.id]));
  // Número desta execução: compõe o ID das tentativas, para retomar sem duplicar respostas.
  const [runNo, setRunNo] = useState(initialProgress.units[unit.id]?.attempts.length ?? 0);

  const set = session?.set ?? nextCheckpointSet(progress, unit.id);
  const pool = set === "A" ? cp.setA : cp.setB;
  const exercises = useMemo(() => Object.fromEntries(pool.map((e) => [e.id, e])), [pool]);
  const threshold = progress.settings.passThreshold;
  const allLessons = lessonsDone(progress, meta) >= meta.lessonCount;
  const attempts = progress.units[unit.id]?.attempts ?? [];

  const start = () => {
    const s = initSession(pool.map((e) => e.id), "exercises", set);
    setRunNo(attempts.length);
    setSession(s);
    store.run((st, now) => saveCheckpointSession(st, unit.id, toSnapshot(s), now));
    setStage("run");
  };

  const finish = (s: SessionState) => {
    const stats = sessionStats(s);
    const total = s.queue.length;
    const score = scoreCheckpoint(total, stats.independent, threshold);
    const failed = pool.filter((e) => !s.results[e.id]?.independent);
    const weak = [...new Set(failed.flatMap((e) => e.concepts).filter((c) => c.startsWith(unit.id)))];
    store.run((st, now) =>
      finishCheckpoint(st, { unitId: unit.id, set: s.set ?? set, total, independentCorrect: stats.independent, passed: score.passed, weakConcepts: weak }, now),
    );
    setResult({ score, session: s, set: s.set ?? set });
    setSession(null);
    setStage("result");
  };

  if (stage === "run" && session) {
    return (
      <SessionRunner
        title={`Checkpoint · ${meta.title}`}
        context="checkpoint"
        refId={unit.id}
        sessionKey={`${cp.id}#${runNo}`}
        exercises={exercises}
        initial={session}
        allowRequeue={false}
        allowHints={false}
        onPersist={(s) => {
          if (s.phase !== "summary") store.run((st, now) => saveCheckpointSession(st, unit.id, toSnapshot(s), now));
        }}
        onFinish={finish}
        onExit={() => router.push(`/unidade/${unit.id}`)}
        exitMessage="As respostas dadas ficam salvas e você continua depois, na mesma versão do checkpoint."
      />
    );
  }

  if (stage === "production") {
    return (
      <SessionRunner
        title="Tarefa de produção"
        context="checkpoint"
        refId={unit.id}
        sessionKey={`${cp.id}-prod#${progress.tasks[cp.production.id]?.runs ?? 0}`}
        exercises={{ [cp.production.id]: cp.production }}
        initial={initSession([cp.production.id])}
        allowRequeue={false}
        allowHints
        taskKind="production"
        onFinish={() => {
          setProductionDone(true);
          setStage("result");
        }}
        onExit={() => setStage("result")}
        exitMessage="A tarefa de produção não foi concluída. Você pode fazê-la depois, pela página da unidade."
      />
    );
  }

  const header = <FocusHeader title={`Checkpoint · ${meta.title}`} onExit={() => router.push(`/unidade/${unit.id}`)} exitLabel="Voltar à unidade" />;

  if (stage === "intro" || !result) {
    const passed = Boolean(progress.units[unit.id]?.passedAt);
    return (
      <div className="min-h-dvh">
        {header}
        <main className="mx-auto grid max-w-2xl gap-4 px-4 pb-24 pt-6">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-primary-text">
              {STAGE_INFO[meta.stage].label} · Unidade {meta.order} · versão {set}
            </p>
            <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">Checkpoint: {meta.title}</h1>
          </div>
          <p className="text-ink-2">{cp.intro}</p>
          <ul className="rich card p-4">
            <li>10 perguntas em situações que não apareceram nas lições.</li>
            <li>Sem pistas e sem reapresentação: vale a primeira resposta.</li>
            <li>
              Para avançar: <strong>{Math.round(threshold * 100)}% de acertos independentes</strong>. É um critério do app (ajustável em Ajustes), não uma medida oficial de nível.
            </li>
            <li>Depois há uma tarefa de produção, autoavaliada, que não entra nessa conta.</li>
          </ul>
          {!allLessons && !passed ? (
            <Notice tone="info" title="Você está testando para pular">
              Ainda há lições por fazer nesta unidade. Se passar, ela fica marcada como aprovada por teste, e as lições continuam abertas para estudo.
            </Notice>
          ) : null}
          {attempts.length > 0 ? (
            <Notice tone="neutral" title={`Tentativas anteriores: ${attempts.length}`}>
              Última: {attempts.at(-1)!.independentCorrect}/{attempts.at(-1)!.total} na versão {attempts.at(-1)!.set}. Agora você fará a versão {set}, com perguntas diferentes.
            </Notice>
          ) : null}
          <button type="button" className="btn btn-primary btn-block" onClick={start}>
            Começar o checkpoint <ArrowRight size={18} aria-hidden="true" />
          </button>
        </main>
      </div>
    );
  }

  // ---------- resultado ----------
  const { score } = result;
  const usedPool = result.set === "A" ? cp.setA : cp.setB;
  const concepts = new Map(unit.concepts.map((c) => [c.id, c]));
  const weak = [...new Set(usedPool.filter((e) => !result.session.results[e.id]?.independent).flatMap((e) => e.concepts))]
    .map((id) => concepts.get(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const weakLessons = [...new Set(weak.map((c) => c.lesson))];
  const next = recommendedNext(progress, CURRICULUM);
  const nextHref = next ? (next.kind === "checkpoint" ? `/checkpoint/${next.unitId}` : `/licao/${next.lessonId}`) : "/trilha";

  return (
    <div className="min-h-dvh">
      {header}
      <main className="mx-auto grid max-w-2xl gap-5 px-4 pb-24 pt-6">
        <div className="text-center anim-pop">
          <div className="flex justify-center">
            <Zip mood={score.passed ? "cheer" : "think"} size={104} />
          </div>
          <h1 className="mt-2 text-3xl font-extrabold">{score.passed ? "Checkpoint aprovado" : "Ainda não foi desta vez"}</h1>
          <p className="mt-1 text-lg font-extrabold tabular-nums">
            {score.independentCorrect} de {score.total} acertos independentes ({Math.round(score.ratio * 100)}%)
          </p>
          <p className="text-sm text-ink-2">
            Critério de avanço: {Math.round(threshold * 100)}%.{" "}
            {score.passed
              ? allLessons
                ? "A próxima unidade está liberada."
                : "A próxima unidade está liberada. Esta ficou como aprovada por teste: as lições continuam disponíveis."
              : "Nada foi perdido: seu progresso e suas revisões continuam."}
          </p>
        </div>

        {!score.passed ? (
          <section className="card p-4" aria-labelledby="reforco">
            <h2 id="reforco" className="text-lg font-extrabold">
              O que reforçar antes de tentar de novo
            </h2>
            {weak.length > 0 ? (
              <>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {weak.map((c) => (
                    <li key={c.id}>
                      <Chip tone="bad" className="!text-sm">
                        <span lang="en">{c.en}</span>
                      </Chip>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-bold">Lições para rever:</p>
                <ul className="mt-1 grid gap-1.5">
                  {weakLessons.map((lid) => {
                    const l = unit.lessons.find((x) => x.id === lid);
                    return l ? (
                      <li key={lid}>
                        <LinkButton href={`/licao/${lid}`} variant="secondary" size="sm">
                          {l.title}
                        </LinkButton>
                      </li>
                    ) : null;
                  })}
                </ul>
              </>
            ) : (
              <p className="mt-1 text-ink-2">Reveja as lições desta unidade e pratique os itens no caderno de erros.</p>
            )}
            <p className="mt-3 text-sm text-ink-2">A nova tentativa usa a outra versão do checkpoint, com perguntas diferentes.</p>
          </section>
        ) : null}

        <section className="card p-4" aria-labelledby="respostas">
          <h2 id="respostas" className="text-lg font-extrabold">
            Suas respostas
          </h2>
          <ol className="mt-2 grid gap-1.5">
            {usedPool.map((e, i) => {
              const ok = result.session.results[e.id]?.independent;
              return (
                <li key={e.id} className="flex items-start gap-2 text-sm">
                  {ok ? <CircleCheck size={18} className="mt-0.5 shrink-0 text-ok" aria-hidden="true" /> : <CircleX size={18} className="mt-0.5 shrink-0 text-bad" aria-hidden="true" />}
                  <span>
                    <span className="font-bold">
                      {i + 1}. {ok ? "Certa" : "Errada"}:
                    </span>{" "}
                    {exerciseTitle(e)}
                  </span>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="card p-4" aria-labelledby="prod">
          <h2 id="prod" className="text-lg font-extrabold">
            Tarefa de produção
          </h2>
          <p className="text-sm text-ink-2">
            Autoavaliada e registrada à parte: não altera o resultado acima. É aqui que você verifica se consegue usar o conteúdo com suas palavras.
          </p>
          {productionDone ? (
            <p className="mt-2">
              <Chip tone="ok">Feita (autoavaliação)</Chip>
            </p>
          ) : null}
          <button type="button" className="btn btn-secondary mt-3" onClick={() => setStage("production")}>
            {productionDone ? "Refazer a tarefa" : "Fazer a tarefa de produção"}
          </button>
        </section>

        <div className="grid gap-2">
          {score.passed ? (
            <LinkButton href={nextHref} block>
              Continuar <ArrowRight size={18} aria-hidden="true" />
            </LinkButton>
          ) : (
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => {
                setResult(null);
                setStage("intro");
              }}
            >
              Tentar a outra versão
            </button>
          )}
          <LinkButton href={`/unidade/${unit.id}`} variant="secondary" block>
            Voltar à unidade
          </LinkButton>
        </div>
      </main>
    </div>
  );
}

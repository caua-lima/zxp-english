"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CURRICULUM, getUnitMeta } from "@/content/curriculum";
import { PLACEMENT, placementByStage } from "@/content/placement";
import { STAGE_INFO, STAGES, type Stage } from "@/content/schema";
import { evaluatePlacement, shouldContinue, type PlacementAnswer, type PlacementOutcome } from "@/engine/placement";
import { initSession, type SessionState } from "@/engine/session";
import { finishPlacement, setStartUnit } from "@/state/actions";
import { useStore } from "@/state/provider";
import { Zip } from "@/components/brand";
import { FocusHeader, SessionRunner } from "@/components/session/SessionRunner";
import { Notice } from "@/components/ui";

type Phase = "intro" | "run" | "between" | "result";

export function PlacementScreen() {
  const store = useStore();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro");
  const [stageIndex, setStageIndex] = useState(0);
  const [answers, setAnswers] = useState<PlacementAnswer[]>([]);
  const [outcome, setOutcome] = useState<PlacementOutcome | null>(null);
  const [runId, setRunId] = useState("");
  const [manual, setManual] = useState<string | null>(null);

  const stage: Stage = STAGES[stageIndex];
  const items = useMemo(() => placementByStage(stage), [stage]);
  const exercises = useMemo(() => Object.fromEntries(items.map((p) => [p.exercise.id, p.exercise])), [items]);

  const conclude = (all: PlacementAnswer[]) => {
    const result = evaluatePlacement(all, CURRICULUM);
    setOutcome(result);
    store.run((s, now) =>
      finishPlacement(
        s,
        {
          takenAt: now.toISOString(),
          answered: all.length,
          correctIndependent: all.filter((a) => a.independent).length,
          byStage: result.byStage,
          suggestedUnit: result.suggestedUnit,
          accepted: false,
          adaptedListening: all.filter((a) => a.adapted).length,
        },
        now,
      ),
    );
    setPhase("result");
  };

  const onStageDone = (s: SessionState) => {
    const stageAnswers: PlacementAnswer[] = items.map((p) => ({
      unitId: p.unitId,
      stage: p.stage,
      independent: Boolean(s.results[p.exercise.id]?.independent),
      adapted: false,
    }));
    const all = [...answers, ...stageAnswers];
    setAnswers(all);
    if (shouldContinue(all, stage) && stageIndex < STAGES.length - 1) setPhase("between");
    else conclude(all);
  };

  const apply = (unitId: string | null, source: "zero" | "manual" | "placement") => {
    store.run((s, now) => setStartUnit(s, unitId === "a1-u01" ? null : unitId, unitId && unitId !== "a1-u01" ? source : "zero", now));
    if (source === "placement") {
      store.run((s, now) => (s.profile.placement ? finishPlacement(s, { ...s.profile.placement, accepted: true }, now) : { state: s, ops: [] }));
    }
    router.replace("/");
  };

  if (phase === "run") {
    return (
      <SessionRunner
        key={`${runId}:${stage}`}
        title={`Diagnóstico · ${STAGE_INFO[stage].label}`}
        context="placement"
        refId="placement"
        sessionKey={`pl:${runId}:${stage}`}
        exercises={exercises}
        initial={initSession(items.map((p) => p.exercise.id))}
        allowRequeue={false}
        allowHints={false}
        onFinish={onStageDone}
        onExit={() => router.replace("/")}
        exitMessage="O diagnóstico é opcional. Se sair agora, ele recomeça do início na próxima vez."
      />
    );
  }

  const header = <FocusHeader title="Diagnóstico" onExit={() => router.replace("/")} exitLabel="Sair do diagnóstico" />;

  if (phase === "intro") {
    return (
      <div className="min-h-dvh">
        {header}
        <main className="mx-auto grid max-w-2xl gap-4 px-4 pb-24 pt-6">
          <div className="flex justify-center">
            <Zip mood="think" size={96} />
          </div>
          <h1 className="text-center text-2xl font-extrabold sm:text-3xl">Diagnóstico de ponto de partida</h1>
          <p className="text-center text-ink-2">Perguntas curtas, da mais básica à mais avançada. Ele para sozinho quando encontra o seu limite atual.</p>
          <Notice tone="info" title="O que este diagnóstico é, e o que não é">
            <ul className="rich">
              <li>São até {PLACEMENT.length} perguntas, quase todas de reconhecimento de gramática e vocabulário.</li>
              <li>Ele NÃO avalia fala, escrita nem compreensão oral, então não informa um nível de inglês.</li>
              <li>O resultado é uma sugestão de por onde começar. Você pode aceitar, recusar ou escolher outra unidade.</li>
              <li>Não há pistas. Se não souber, toque em “Não sei”: chutar só atrapalha a sugestão.</li>
            </ul>
          </Notice>
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={() => {
              setRunId(String(store.now().getTime()));
              setPhase("run");
            }}
          >
            Começar <ArrowRight size={18} aria-hidden="true" />
          </button>
          <button type="button" className="btn btn-secondary btn-block" onClick={() => router.replace("/")}>
            Pular o diagnóstico
          </button>
        </main>
      </div>
    );
  }

  if (phase === "between") {
    const nextStage = STAGES[stageIndex + 1];
    return (
      <div className="min-h-dvh">
        {header}
        <main className="mx-auto grid max-w-2xl gap-4 px-4 pb-24 pt-10 text-center">
          <div className="flex justify-center">
            <Zip mood="cheer" size={96} />
          </div>
          <h1 className="text-2xl font-extrabold">Você foi bem em {STAGE_INFO[stage].label}</h1>
          <p className="text-ink-2">Vamos a perguntas um pouco mais difíceis ({STAGE_INFO[nextStage].label}). Você pode parar aqui, se preferir.</p>
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={() => {
              setStageIndex((i) => i + 1);
              setPhase("run");
            }}
          >
            Continuar <ArrowRight size={18} aria-hidden="true" />
          </button>
          <button type="button" className="btn btn-secondary btn-block" onClick={() => conclude(answers)}>
            Parar e ver a sugestão
          </button>
        </main>
      </div>
    );
  }

  const suggested = getUnitMeta(outcome?.suggestedUnit ?? "a1-u01")!;
  const fromZero = suggested.id === "a1-u01";

  return (
    <div className="min-h-dvh">
      {header}
      <main className="mx-auto grid max-w-2xl gap-5 px-4 pb-24 pt-6">
        <div className="text-center">
          <p className="text-xs font-extrabold uppercase tracking-wider text-primary-text">Sugestão de ponto de partida</p>
          <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">
            {STAGE_INFO[suggested.stage].label} · Unidade {suggested.order}
          </h1>
          <p className="text-lg font-extrabold">{suggested.title}</p>
          <p className="mt-1 text-ink-2">{suggested.subtitle}</p>
        </div>

        <section className="card p-4" aria-labelledby="como">
          <h2 id="como" className="font-extrabold">
            Como chegamos a isso
          </h2>
          <ul className="mt-2 grid gap-1">
            {STAGES.filter((st) => outcome?.byStage[st]).map((st) => (
              <li key={st} className="flex justify-between gap-3">
                <span className="font-bold">
                  {STAGE_INFO[st].label} · {STAGE_INFO[st].name}
                </span>
                <span className="tabular-nums">
                  {outcome!.byStage[st].correct}/{outcome!.byStage[st].total}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-ink-2">
            {fromZero
              ? "As primeiras perguntas mostraram pontos a firmar logo no início, então vale começar pela primeira unidade."
              : "A sugestão é a unidade do primeiro assunto em que você hesitou. As unidades anteriores ficam marcadas como puladas, não como estudadas."}
          </p>
        </section>

        <Notice tone="warn" title="Limitações">
          Foram {answers.length} perguntas de reconhecimento. Isso não é um nível de inglês e pode errar para mais ou para menos. Se a unidade parecer fácil ou difícil demais,
          ajuste o ponto de partida em Ajustes, ou use o “teste para pular” de cada unidade.
        </Notice>

        <div className="grid gap-2">
          <button type="button" className="btn btn-primary btn-block" onClick={() => apply(suggested.id, "placement")}>
            {fromZero ? "Começar do zero" : "Começar por esta unidade"} <ArrowRight size={18} aria-hidden="true" />
          </button>
          {!fromZero ? (
            <button type="button" className="btn btn-secondary btn-block" onClick={() => apply(null, "zero")}>
              Prefiro começar do zero
            </button>
          ) : null}
          <label className="mt-2 grid gap-1">
            <span className="font-bold">Ou escolha outra unidade</span>
            <select className="field" value={manual ?? suggested.id} onChange={(e) => setManual(e.target.value)}>
              {CURRICULUM.map((m) => (
                <option key={m.id} value={m.id}>
                  {STAGE_INFO[m.stage].label} · Unidade {m.order} — {m.title}
                </option>
              ))}
            </select>
          </label>
          {manual && manual !== suggested.id ? (
            <button type="button" className="btn btn-secondary btn-block" onClick={() => apply(manual, "manual")}>
              Começar pela unidade escolhida
            </button>
          ) : null}
        </div>
      </main>
    </div>
  );
}

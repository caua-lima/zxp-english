"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getUnitMeta } from "@/content/curriculum";
import { ACTIVITY_LABELS, type Activity, type ActivityKind, type UnitContent } from "@/content/schema";
import { unitStatus } from "@/engine/progression";
import { initSession, sessionStats, type SessionState } from "@/engine/session";
import { completeActivity, submitTask } from "@/state/actions";
import { useProgress, useStore } from "@/state/provider";
import { useSpeaker } from "@/audio/speech";
import { Zip } from "@/components/brand";
import { useUnit } from "@/components/content-hooks";
import { ContextView } from "@/components/lesson/ContextView";
import { FocusHeader, SessionRunner } from "@/components/session/SessionRunner";
import { Chip, LinkButton, Loading, Notice } from "@/components/ui";

type Stage = "intro" | "run" | "outside" | "done";

const INTRO: Record<ActivityKind, string> = {
  reading: "Leia o texto com calma antes de responder. Ele continua visível durante as perguntas.",
  listening: "Você vai ouvir antes de ler: o texto só aparece no final. Use “Devagar” e repita os trechos quantas vezes precisar.",
  writing: "Escreva primeiro, do seu jeito. O modelo e os critérios só aparecem depois que você terminar.",
  speaking: "Fale em voz alta. Gravar é opcional e a gravação fica só neste aparelho.",
  mission: "Uma situação completa, que junta o que você aprendeu na unidade. No fim há uma missão para fazer fora do app.",
};

export function ActivityScreen({ unitId, kind }: { unitId: string; kind: ActivityKind }) {
  const loaded = useUnit(unitId);
  const progress = useProgress();
  const router = useRouter();
  const meta = getUnitMeta(unitId);

  if (!progress || loaded.status === "loading") {
    return (
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <Loading label="Carregando a atividade…" />
      </div>
    );
  }
  if (loaded.status !== "ready" || !meta || unitStatus(progress, meta) === "locked") {
    return (
      <div className="min-h-dvh">
        <FocusHeader title="Atividade" onExit={() => router.push(`/unidade/${unitId}`)} exitLabel="Voltar" />
        <main className="mx-auto max-w-2xl px-4 pt-5">
          <Notice tone="warn" title="Atividade indisponível">
            {loaded.status === "error" ? loaded.message : "Esta unidade ainda está bloqueada ou não tem conteúdo publicado."}
          </Notice>
          <LinkButton href="/trilha" className="mt-4">
            Ir para a trilha
          </LinkButton>
        </main>
      </div>
    );
  }
  return <ActivityFlow key={`${unitId}-${kind}`} unit={loaded.data} activity={loaded.data.activities[kind]} />;
}

function ActivityFlow({ unit, activity }: { unit: UnitContent; activity: Activity }) {
  const store = useStore();
  const progress = useProgress();
  const router = useRouter();
  const speaker = useSpeaker({ voiceURI: progress?.settings.voiceURI, slowRate: progress?.settings.speechRate });
  const [stage, setStage] = useState<Stage>("intro");
  const [final, setFinal] = useState<SessionState | null>(null);
  const [runKey, setRunKey] = useState("");
  const [checks, setChecks] = useState<boolean[]>(() => activity.outside?.checklist.map(() => false) ?? []);
  const exercises = useMemo(() => Object.fromEntries(activity.exercises.map((e) => [e.id, e])), [activity]);
  const kind = activity.kind;
  const back = `/unidade/${unit.id}`;
  const outsideId = `${activity.id}-outside`;
  const outsideDone = Boolean(progress?.tasks[outsideId]);

  const finish = (s: SessionState) => {
    store.run((st, now) => completeActivity(st, { unitId: unit.id, activityId: activity.id, kind }, now));
    setFinal(s);
    setStage(activity.outside ? "outside" : "done");
  };

  if (stage === "run") {
    return (
      <SessionRunner
        title={`${ACTIVITY_LABELS[kind]} · ${activity.title}`}
        context="activity"
        refId={activity.id}
        sessionKey={runKey}
        exercises={exercises}
        initial={initSession(activity.exercises.map((e) => e.id))}
        allowRequeue={kind === "reading" || kind === "listening"}
        allowHints
        taskKind={kind === "mission" ? "mission" : undefined}
        banner={kind === "reading" && activity.context ? <ContextView block={activity.context} speaker={speaker} defaultTranslation={false} compact /> : undefined}
        onFinish={finish}
        onExit={() => router.push(back)}
        exitMessage="Esta atividade é curta e recomeça do início na próxima vez. As respostas já dadas ficam registradas."
      />
    );
  }

  const header = <FocusHeader title={`${ACTIVITY_LABELS[kind]} · ${activity.title}`} onExit={() => router.push(back)} exitLabel="Voltar à unidade" />;

  if (stage === "intro") {
    return (
      <div className="min-h-dvh">
        {header}
        <main className="mx-auto grid max-w-2xl gap-4 px-4 pb-24 pt-6">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-primary-text">{ACTIVITY_LABELS[kind]}</p>
            <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">{activity.title}</h1>
            <p className="mt-1 text-ink-2">{activity.goal}</p>
          </div>
          <Notice tone="info">{INTRO[kind]}</Notice>
          {kind === "reading" && activity.context ? <ContextView block={activity.context} speaker={speaker} defaultTranslation={false} /> : null}
          {kind === "listening" && speaker.info.ready && !speaker.info.available ? (
            <Notice tone="warn" title="Áudio indisponível neste navegador">
              Você pode fazer a atividade lendo o texto, mas ela não contará como evidência de compreensão oral. A habilidade fica marcada como pendente.
            </Notice>
          ) : null}
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={() => {
              speaker.stop();
              setRunKey(`${activity.id}#${store.now().getTime()}`);
              setStage("run");
            }}
          >
            Começar <ArrowRight size={18} aria-hidden="true" />
          </button>
        </main>
      </div>
    );
  }

  if (stage === "outside" && activity.outside) {
    const o = activity.outside;
    return (
      <div className="min-h-dvh">
        {header}
        <main className="mx-auto grid max-w-2xl gap-4 px-4 pb-24 pt-6">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-primary-text">Missão fora do app</p>
            <h1 className="mt-1 text-2xl font-extrabold">{o.title}</h1>
          </div>
          <p>{o.instructions}</p>
          <fieldset className="grid gap-2">
            <legend className="mb-1 font-extrabold">Autorrelato: marque o que você fez</legend>
            {o.checklist.map((item, i) => (
              <label key={i} className="choice !items-start" data-selected={checks[i]}>
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 shrink-0 accent-[var(--primary)]"
                  checked={checks[i]}
                  onChange={() => setChecks((c) => c.map((v, j) => (j === i ? !v : v)))}
                />
                <span className="font-semibold">{item}</span>
              </label>
            ))}
          </fieldset>
          <p className="text-sm text-ink-2">O app não confere o que você fez fora dele: o registro é seu, e aparece no progresso como autorrelato.</p>
          <button
            type="button"
            className="btn btn-primary btn-block"
            disabled={!checks.some(Boolean)}
            onClick={() => {
              store.run((st, now) => submitTask(st, { id: outsideId, unitId: unit.id, kind: "outside", status: "self_reported", checks }, now));
              setStage("done");
            }}
          >
            Registrar missão feita
          </button>
          <button type="button" className="btn btn-secondary btn-block" onClick={() => setStage("done")}>
            Vou fazer depois
          </button>
        </main>
      </div>
    );
  }

  const stats = final ? sessionStats(final) : null;
  return (
    <div className="min-h-dvh">
      {header}
      <main className="mx-auto grid max-w-2xl gap-5 px-4 pb-24 pt-6">
        <div className="text-center anim-pop">
          <div className="flex justify-center">
            <Zip mood="cheer" size={96} />
          </div>
          <h1 className="mt-2 text-3xl font-extrabold">Atividade concluída</h1>
          {stats && stats.gradedTotal > 0 ? (
            <p className="mt-1 text-lg font-extrabold tabular-nums">
              {stats.independent} de {stats.gradedTotal} sem ajuda
            </p>
          ) : null}
          <div className="mt-2 flex flex-wrap justify-center gap-1.5">
            {stats && stats.selfAssessed > 0 ? <Chip tone="info">Autoavaliada: sem nota</Chip> : null}
            {activity.outside ? <Chip tone={outsideDone ? "ok" : "neutral"}>{outsideDone ? "Missão externa registrada" : "Missão externa pendente"}</Chip> : null}
          </div>
        </div>
        {kind === "listening" && activity.context ? (
          <section aria-label="Transcrição">
            <h2 className="mb-2 text-lg font-extrabold">Agora leia o que você ouviu</h2>
            <ContextView block={activity.context} speaker={speaker} />
          </section>
        ) : null}
        <div className="grid gap-2">
          <LinkButton href={back} block>
            Voltar à unidade
          </LinkButton>
          <LinkButton href="/" variant="secondary" block>
            Ir para o início
          </LinkButton>
        </div>
      </main>
    </div>
  );
}

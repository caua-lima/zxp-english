"use client";

/**
 * Tela de lição: objetivo → contexto → explicação → prática (guiada, independente,
 * aplicação) → resumo. A posição é salva a cada passo, então dá para fechar e voltar.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, CircleCheck, CircleX, Target } from "lucide-react";
import type { Concept, Lesson, UnitContent } from "@/content/schema";
import { CURRICULUM, getUnitMeta, lessonIdsOf, unitOfItem } from "@/content/curriculum";
import { exercisesOf } from "@/content/iter";
import type { Mode, ProgressState } from "@/engine/model";
import { lessonAccess, recommendedNext } from "@/engine/progression";
import { fromSnapshot, initSession, sessionStats, toSnapshot, type SessionState } from "@/engine/session";
import { modeOfKind } from "@/engine/srs";
import { completeLesson, saveLessonSession } from "@/state/actions";
import { useProgress, useStore } from "@/state/provider";
import { useSpeaker, type Speaker } from "@/audio/speech";
import { Chip, Loading, LinkButton, Notice, RichText } from "@/components/ui";
import { Zip } from "@/components/brand";
import { SayButton } from "@/components/exercise/AudioPlayer";
import { FocusHeader, SessionRunner } from "@/components/session/SessionRunner";
import { useUnit } from "@/components/content-hooks";
import { ContextView } from "./ContextView";

type Stage = "intro" | "run" | "done";

/** Modos de revisão que têm exercício disponível para cada conceito da unidade. */
function modesByConcept(unit: UnitContent): Map<string, Mode[]> {
  const map = new Map<string, Set<Mode>>();
  for (const L of exercisesOf(unit)) {
    const m = modeOfKind(L.ex.kind);
    if (!m) continue;
    for (const c of L.ex.concepts) map.set(c, (map.get(c) ?? new Set<Mode>()).add(m));
  }
  return new Map([...map].map(([k, v]) => [k, [...v]]));
}

export function LessonScreen({ lessonId }: { lessonId: string }) {
  const unitId = unitOfItem(lessonId);
  const loaded = useUnit(unitId);
  const progress = useProgress();

  if (!progress || loaded.status === "loading") {
    return (
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <Loading label="Carregando a lição…" />
      </div>
    );
  }
  if (loaded.status !== "ready") return <Missing unitId={unitId} message={loaded.status === "error" ? loaded.message : undefined} />;
  const lesson = loaded.data.lessons.find((l) => l.id === lessonId);
  const meta = getUnitMeta(unitId);
  if (!lesson || !meta) return <Missing unitId={unitId} />;

  const index = lessonIdsOf(meta).indexOf(lessonId);
  if (lessonAccess(progress, meta, index) === "locked") {
    return (
      <Shell title={lesson.title} back={`/unidade/${unitId}`}>
        <Notice tone="warn" title="Esta lição ainda está bloqueada">
          Conclua a lição anterior para liberar esta. As lições de uma unidade se apoiam uma na outra.
        </Notice>
        <LinkButton href={`/unidade/${unitId}`} className="mt-4">
          Ver a unidade
        </LinkButton>
      </Shell>
    );
  }

  return <LessonFlow key={lessonId} lesson={lesson} unit={loaded.data} index={index} initialProgress={progress} />;
}

function Shell({ title, back, children }: { title: string; back: string; children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="min-h-dvh">
      <FocusHeader title={title} onExit={() => router.push(back)} exitLabel="Voltar" />
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-5">{children}</main>
    </div>
  );
}

function Missing({ unitId, message }: { unitId: string; message?: string }) {
  return (
    <Shell title="Lição" back={`/unidade/${unitId}`}>
      <Notice tone="warn" title="Conteúdo indisponível">
        {message ?? "Esta lição não foi encontrada."}
      </Notice>
      <LinkButton href="/trilha" className="mt-4">
        Ir para a trilha
      </LinkButton>
    </Shell>
  );
}

function LessonFlow({
  lesson,
  unit,
  index,
  initialProgress,
}: {
  lesson: Lesson;
  unit: UnitContent;
  index: number;
  initialProgress: ProgressState;
}) {
  const store = useStore();
  const router = useRouter();
  const exercises = useMemo(() => Object.fromEntries(lesson.exercises.map((e) => [e.id, e])), [lesson]);

  // Sessão inicial: retoma o snapshot salvo, se ele ainda corresponde ao conteúdo.
  const [boot] = useState(() => {
    const saved = initialProgress.lessons[lesson.id];
    const snap = saved?.session;
    const valid = snap && snap.queue.length > 0 && snap.queue.every((id) => exercises[id]);
    const session: SessionState = valid ? fromSnapshot(snap) : initSession(lesson.exercises.map((e) => e.id), "intro");
    const stage: Stage = session.phase === "intro" ? "intro" : session.phase === "summary" ? "done" : "run";
    return { session, stage, runKey: `${lesson.id}#${saved?.completions ?? 0}`, resumed: Boolean(valid) && session.phase !== "intro" };
  });

  const [stage, setStage] = useState<Stage>(boot.stage);
  const [final, setFinal] = useState<SessionState | null>(boot.stage === "done" ? boot.session : null);
  const [session, setSession] = useState<SessionState>(boot.session);

  const finish = (s: SessionState) => {
    const stats = sessionStats(s);
    const modes = modesByConcept(unit);
    store.run((st, now) =>
      completeLesson(
        st,
        {
          lessonId: lesson.id,
          concepts: lesson.summary.concepts.map((id) => ({ id, modes: modes.get(id) ?? [] })),
          accuracy: stats.ratio,
        },
        now,
      ),
    );
    setFinal(s);
    setStage("done");
  };

  // Sessão salva já no resumo (fechou no último instante): finaliza ao abrir, uma única vez.
  const bootHandled = useRef(false);
  useEffect(() => {
    if (boot.stage === "done" && !bootHandled.current) {
      bootHandled.current = true;
      finish(boot.session);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (stage === "intro") {
    return (
      <LessonIntro
        lesson={lesson}
        index={index}
        onExit={() => router.push(`/unidade/${unit.id}`)}
        onStart={() => {
          const next = { ...session, phase: "exercises" as const };
          setSession(next);
          store.run((st, now) => saveLessonSession(st, lesson.id, toSnapshot(next), now));
          setStage("run");
        }}
      />
    );
  }

  if (stage === "run") {
    return (
      <SessionRunner
        title={`Lição ${index + 1} · ${lesson.title}`}
        context="lesson"
        refId={lesson.id}
        sessionKey={boot.runKey}
        exercises={exercises}
        initial={session}
        lessonContext={lesson.context}
        allowRequeue
        allowHints
        onPersist={(s) => {
          if (s.phase !== "summary") store.run((st, now) => saveLessonSession(st, lesson.id, toSnapshot(s), now));
        }}
        onFinish={finish}
        onExit={() => router.push(`/unidade/${unit.id}`)}
      />
    );
  }

  return <LessonResult lesson={lesson} unit={unit} index={index} session={final ?? session} />;
}

// ---------------------------------------------------------------- introdução

function LessonIntro({ lesson, index, onStart, onExit }: { lesson: Lesson; index: number; onStart: () => void; onExit: () => void }) {
  const progress = useProgress();
  const speaker = useSpeaker({ voiceURI: progress?.settings.voiceURI, slowRate: progress?.settings.speechRate });
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-dvh">
      <FocusHeader title={`Lição ${index + 1} · ${lesson.title}`} progress={step === 0 ? 0.02 : 0.06} counter={`${step + 1}/2`} onExit={onExit} exitLabel="Voltar à unidade" />
      <main className="mx-auto max-w-2xl px-4 pb-28 pt-5">
        {step === 0 ? (
          <div className="grid gap-5 anim-rise">
            <div className="rounded-2xl border-2 border-line-strong bg-accent-soft p-4">
              <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-ink-2">
                <Target size={16} aria-hidden="true" /> Objetivo desta lição
              </p>
              <h1 className="mt-1 text-xl font-extrabold leading-snug sm:text-2xl">{lesson.objective}</h1>
              <p className="mt-2 text-sm font-semibold text-ink-2">Cerca de {lesson.minutes} minutos · {lesson.exercises.length} atividades</p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-extrabold">Primeiro, veja em uso</h2>
              <p className="mb-3 text-ink-2">Leia e ouça com calma. Você não precisa entender tudo agora: a ideia é perceber como as frases aparecem numa situação real.</p>
              <ContextView block={lesson.context} speaker={speaker} defaultTranslation={progress?.settings.showTranslations ?? true} />
            </div>
            <button type="button" className="btn btn-primary btn-block" onClick={() => { speaker.stop(); setStep(1); }}>
              Entendi o contexto <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className="grid gap-5 anim-rise">
            <div>
              <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-primary-text">
                <BookOpen size={16} aria-hidden="true" /> Explicação
              </p>
              <h1 className="mt-1 text-2xl font-extrabold">{lesson.title}</h1>
            </div>
            <ExplanationView lesson={lesson} speaker={speaker} />
            <div className="flex flex-col gap-2 sm:flex-row">
              <button type="button" className="btn btn-secondary" onClick={() => setStep(0)}>
                <ArrowLeft size={18} aria-hidden="true" /> Rever o contexto
              </button>
              <button type="button" className="btn btn-primary sm:flex-1" onClick={() => { speaker.stop(); onStart(); }}>
                Praticar <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export function ExplanationView({ lesson, speaker }: { lesson: Lesson; speaker: Speaker }) {
  const ex = lesson.explanation;
  return (
    <div className="grid gap-4">
      <div className="card p-4">
        <RichText text={ex.summary} className="text-[1.05rem]" />
      </div>

      <div>
        <h3 className="mb-2 font-extrabold">Exemplos</h3>
        <ul className="grid gap-2">
          {ex.examples.map((e, i) => (
            <li key={i} className="flex items-start gap-2 rounded-2xl border-2 border-line bg-surface p-3">
              <div className="min-w-0 flex-1">
                <p lang="en" className="en text-[1.08rem]">
                  {e.en}
                </p>
                <p className="text-sm text-ink-2">{e.pt}</p>
                {e.note ? <p className="mt-0.5 text-sm font-semibold text-ink-2">{e.note}</p> : null}
              </div>
              <SayButton text={e.en} speaker={speaker} />
            </li>
          ))}
        </ul>
      </div>

      {ex.contrasts?.length ? (
        <div>
          <h3 className="mb-2 font-extrabold">Certo e errado, lado a lado</h3>
          <ul className="grid gap-2">
            {ex.contrasts.map((c, i) => (
              <li key={i} className="rounded-2xl border-2 border-line bg-surface p-3">
                <p className="flex items-start gap-2">
                  <CircleX size={20} className="mt-0.5 shrink-0 text-bad" aria-hidden="true" />
                  <span>
                    <span className="sr-only">Errado: </span>
                    <span lang="en" className="line-through decoration-2">
                      {c.wrong}
                    </span>
                  </span>
                </p>
                <p className="mt-1 flex items-start gap-2">
                  <CircleCheck size={20} className="mt-0.5 shrink-0 text-ok" aria-hidden="true" />
                  <span>
                    <span className="sr-only">Certo: </span>
                    <span lang="en" className="en">
                      {c.right}
                    </span>
                  </span>
                </p>
                <p className="mt-1.5 text-sm text-ink-2">{c.why}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {ex.tip ? (
        <Notice tone="accent" title="Dica">
          <RichText text={ex.tip} />
        </Notice>
      ) : null}

      {ex.details ? (
        <details className="rounded-2xl border-2 border-line bg-surface p-3">
          <summary className="cursor-pointer font-extrabold">Aprofundar (opcional)</summary>
          <RichText text={ex.details} className="mt-3" />
        </details>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------- resultado

function LessonResult({ lesson, unit, index, session }: { lesson: Lesson; unit: UnitContent; index: number; session: SessionState }) {
  const progress = useProgress();
  const router = useRouter();
  const stats = sessionStats(session);
  const concepts = new Map<string, Concept>(unit.concepts.map((c) => [c.id, c]));
  const meta = getUnitMeta(unit.id)!;

  const exIds = new Set(lesson.exercises.map((e) => e.id));
  const xp = (progress?.xp ?? []).filter((x) => x.ref === lesson.id || (x.ref && exIds.has(x.ref))).reduce((n, x) => n + x.amount, 0);
  const completions = progress?.lessons[lesson.id]?.completions ?? 1;
  const next = progress ? recommendedNext(progress, CURRICULUM) : null;
  const nextHref = next ? (next.kind === "checkpoint" ? `/checkpoint/${next.unitId}` : `/licao/${next.lessonId}`) : "/trilha";
  const nextLabel = !next
    ? "Ver a trilha"
    : next.kind === "checkpoint"
      ? "Ir para o checkpoint"
      : next.unitId === unit.id
        ? `Próxima lição (${(next.lessonIndex ?? 0) + 1} de ${meta.lessonCount})`
        : "Próxima unidade";
  const failed = lesson.exercises.filter((e) => stats.failedIds.includes(e.id));

  return (
    <div className="min-h-dvh">
      <FocusHeader title={`Lição ${index + 1} · ${lesson.title}`} progress={1} onExit={() => router.push(`/unidade/${unit.id}`)} exitLabel="Voltar à unidade" />
      <main className="mx-auto grid max-w-2xl gap-5 px-4 pb-24 pt-6">
        <div className="text-center anim-pop">
          <div className="flex justify-center">
            <Zip mood="cheer" size={104} />
          </div>
          <h1 className="mt-2 text-3xl font-extrabold">Lição concluída</h1>
          <p className="mt-1 text-ink-2">{lesson.objective.replace(/^Você vai conseguir/, "Você praticou como")}</p>
        </div>

        <dl className="grid grid-cols-3 gap-2 text-center">
          <div className="card p-3">
            <dt className="text-xs font-extrabold uppercase tracking-wide text-ink-2">Sem ajuda</dt>
            <dd className="text-2xl font-extrabold tabular-nums">
              {stats.independent}/{stats.gradedTotal}
            </dd>
          </div>
          <div className="card p-3">
            <dt className="text-xs font-extrabold uppercase tracking-wide text-ink-2">Com pista</dt>
            <dd className="text-2xl font-extrabold tabular-nums">{stats.hinted}</dd>
          </div>
          <div className="card p-3">
            <dt className="text-xs font-extrabold uppercase tracking-wide text-ink-2">XP da lição</dt>
            <dd className="text-2xl font-extrabold tabular-nums">{xp}</dd>
          </div>
        </dl>
        {completions > 1 ? (
          <p className="-mt-2 text-center text-sm text-ink-2">Você já tinha concluído esta lição: refazer é ótimo para praticar, mas não gera XP de novo.</p>
        ) : null}
        {stats.selfAssessed > 0 ? (
          <p className="-mt-2 text-center text-sm text-ink-2">
            {stats.selfAssessed} tarefa{stats.selfAssessed > 1 ? "s" : ""} de produção autoavaliada{stats.selfAssessed > 1 ? "s" : ""} (registrada{stats.selfAssessed > 1 ? "s" : ""} à parte, sem nota).
          </p>
        ) : null}

        <section className="card p-4" aria-labelledby="resumo">
          <h2 id="resumo" className="text-lg font-extrabold">
            O essencial desta lição
          </h2>
          <ul className="rich mt-2">
            {lesson.summary.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </section>

        <section className="card p-4" aria-labelledby="rev">
          <h2 id="rev" className="text-lg font-extrabold">
            Enviado para revisão
          </h2>
          <p className="text-sm text-ink-2">Estes itens voltam a partir de amanhã, em frases diferentes. É assim que eles ficam na memória.</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {lesson.summary.concepts.map((id) => {
              const c = concepts.get(id);
              return c ? (
                <li key={id}>
                  <Chip tone="primary" className="!text-sm">
                    <span lang="en">{c.en}</span>
                  </Chip>
                </li>
              ) : null;
            })}
          </ul>
        </section>

        {failed.length > 0 ? (
          <section className="card p-4" aria-labelledby="ref">
            <h2 id="ref" className="text-lg font-extrabold">
              Para reforçar
            </h2>
            <p className="text-sm text-ink-2">
              {failed.length} {failed.length === 1 ? "item ficou" : "itens ficaram"} no caderno de erros, com a explicação e prática direcionada.
            </p>
            <LinkButton href="/erros" variant="secondary" size="sm" className="mt-3">
              Abrir caderno de erros
            </LinkButton>
          </section>
        ) : null}

        <div className="grid gap-2">
          <LinkButton href={nextHref} block>
            {nextLabel} <ArrowRight size={18} aria-hidden="true" />
          </LinkButton>
          <LinkButton href={`/unidade/${unit.id}`} variant="secondary" block>
            Voltar à unidade
          </LinkButton>
          <LinkButton href="/" variant="ghost" block>
            Ir para o início
          </LinkButton>
        </div>
      </main>
    </div>
  );
}

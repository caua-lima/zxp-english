"use client";

/**
 * Executor de sessão: percorre uma fila de exercícios, grava cada resposta assim
 * que é dada e mantém um snapshot para retomar depois de fechar ou recarregar.
 */
import { useEffect, useReducer, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import type { ContextBlock, Exercise } from "@/content/schema";
import { unitOfItem } from "@/content/curriculum";
import type { AttemptContext, TaskRecord } from "@/engine/model";
import { isIndependent } from "@/engine/grading";
import { currentId, isRetry, progressOf, sessionReducer, type SessionState } from "@/engine/session";
import { useSpeaker } from "@/audio/speech";
import { recordAttempt, submitTask } from "@/state/actions";
import { useProgress, useStore } from "@/state/provider";
import { Button, Dialog, ProgressBar } from "@/components/ui";
import { ExerciseCard, type GradedPayload } from "@/components/exercise/ExerciseCard";

export function FocusHeader({
  title,
  progress,
  counter,
  onExit,
  exitLabel = "Sair",
}: {
  title: string;
  progress?: number;
  counter?: string;
  onExit: () => void;
  exitLabel?: string;
}) {
  return (
    <header className="sticky top-0 z-20 border-b-2 border-line bg-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-2.5">
        <button
          type="button"
          onClick={onExit}
          className="inline-grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 border-line-strong bg-surface hover:bg-surface-2"
          aria-label={exitLabel}
        >
          <X size={20} aria-hidden="true" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-extrabold">{title}</p>
          {progress !== undefined ? <ProgressBar value={progress} label="Progresso da sessão" className="mt-1 !h-2.5" /> : null}
        </div>
        {counter ? <p className="shrink-0 text-sm font-extrabold tabular-nums text-ink-2">{counter}</p> : null}
      </div>
    </header>
  );
}

export function SessionRunner({
  title,
  context,
  refId,
  sessionKey,
  exercises,
  initial,
  lessonContext,
  allowRequeue,
  allowHints,
  taskKind,
  banner,
  onPersist,
  onFinish,
  onExit,
  exitMessage = "Suas respostas até aqui estão salvas. Você pode continuar depois de onde parou.",
}: {
  title: string;
  context: AttemptContext;
  /** Lição, unidade ou "review": referência gravada em cada tentativa. */
  refId: string;
  /** Identifica esta execução; compõe o ID determinístico de cada tentativa. */
  sessionKey: string;
  exercises: Record<string, Exercise>;
  initial: SessionState;
  lessonContext?: ContextBlock;
  allowRequeue: boolean;
  allowHints: boolean;
  /** Tipo de tarefa para exercícios abertos (padrão: writing/speaking). */
  taskKind?: TaskRecord["kind"];
  /** Conteúdo fixo acima do exercício (texto de leitura, por exemplo). */
  banner?: ReactNode;
  onPersist?: (s: SessionState) => void;
  onFinish: (s: SessionState) => void;
  onExit: () => void;
  exitMessage?: string;
}) {
  const store = useStore();
  const progress = useProgress();
  const [state, dispatch] = useReducer(sessionReducer, initial);
  const [confirmExit, setConfirmExit] = useState(false);
  const speaker = useSpeaker({ voiceURI: progress?.settings.voiceURI, slowRate: progress?.settings.speechRate });

  const persistRef = useRef(onPersist);
  const finishRef = useRef(onFinish);
  const finished = useRef(false);

  // Mantém os callbacks atuais sem reexecutar o efeito de persistência.
  useEffect(() => {
    persistRef.current = onPersist;
    finishRef.current = onFinish;
  });

  useEffect(() => {
    persistRef.current?.(state);
    if (state.phase === "summary" && !finished.current) {
      finished.current = true;
      finishRef.current(state);
    }
  }, [state]);

  const id = currentId(state);
  const ex = id ? exercises[id] : undefined;
  const retry = isRetry(state);
  const lang = progress?.settings.instructionLanguage ?? "pt";

  const handleGraded = (p: GradedPayload) => {
    if (!ex || !id) return;
    const attemptId = `${sessionKey}:${id}:${retry ? 2 : 1}`;
    store.run((s, now) =>
      recordAttempt(
        s,
        {
          attemptId,
          exercise: ex,
          context,
          ref: refId,
          grade: p.grade,
          hints: p.hints,
          revealed: p.revealed,
          adapted: p.adapted,
          retry,
          ...(state.set ? { set: state.set } : {}),
        },
        now,
      ),
    );
    if (p.task && (ex.kind === "write" || ex.kind === "speak")) {
      const task = p.task;
      store.run((s, now) =>
        submitTask(
          s,
          {
            id: ex.id,
            unitId: unitOfItem(ex.id),
            kind: taskKind ?? (ex.kind === "write" ? "writing" : "speaking"),
            status: "self_assessed",
            ...(task.text ? { text: task.text } : {}),
            checks: task.checks,
            ...(task.recorded ? { recorded: true } : {}),
            ...(p.adapted ? { adapted: true } : {}),
          },
          now,
        ),
      );
    }
    dispatch({
      type: "answered",
      id,
      result: {
        outcome: p.grade.outcome,
        independent: isIndependent({ outcome: p.grade.outcome, hints: p.hints, revealed: p.revealed, adapted: p.adapted, retry }),
        hints: p.hints,
        revealed: p.revealed,
        ...(p.adapted ? { adapted: true } : {}),
      },
      allowRequeue,
    });
  };

  if (state.phase === "summary" || !ex) return null;

  const isLast = state.cursor === state.queue.length - 1;

  return (
    <div className="min-h-dvh">
      <FocusHeader
        title={title}
        progress={progressOf(state)}
        counter={`${Math.min(state.cursor + 1, state.queue.length)}/${state.queue.length}`}
        onExit={() => setConfirmExit(true)}
      />
      <main className="mx-auto max-w-2xl px-4 pb-28 pt-5">
        {banner ? <div className="mb-5">{banner}</div> : null}
        <ExerciseCard
          key={`${id}@${state.cursor}`}
          ex={ex}
          seed={`${sessionKey}:${state.cursor}`}
          context={lessonContext}
          retry={retry}
          allowHints={allowHints}
          willRequeue={allowRequeue && !retry}
          speaker={speaker}
          lang={lang}
          showTranslations={progress?.settings.showTranslations ?? true}
          onGraded={handleGraded}
          onContinue={() => dispatch({ type: "next" })}
          continueLabel={isLast ? "Ver resultado" : undefined}
        />
      </main>

      <Dialog
        open={confirmExit}
        onClose={() => setConfirmExit(false)}
        title="Sair agora?"
        actions={
          <>
            <Button variant="secondary" onClick={() => setConfirmExit(false)}>
              Continuar aqui
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                speaker.stop();
                onExit();
              }}
            >
              Sair
            </Button>
          </>
        }
      >
        {exitMessage}
      </Dialog>
    </div>
  );
}

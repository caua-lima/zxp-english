"use client";

/**
 * Cartão de exercício: apresenta um exercício de qualquer tipo, recolhe a resposta,
 * corrige e mostra o feedback. É a única peça de interface que conhece os 11 tipos.
 *
 * Regras de apoio:
 *  - Cada pista usada torna a tentativa "assistida" (não conta como acerto independente).
 *  - "Mostrar resposta" encerra o exercício como erro; o item volta mais tarde.
 *  - Em exercícios de áudio, sem voz disponível (ou se a pessoa disser que não pode
 *    ouvir), o texto é mostrado e a tentativa é marcada como "adaptada".
 */
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { EarOff, Eye, Lightbulb, RotateCw } from "lucide-react";
import type { ContextBlock, Exercise } from "@/content/schema";
import { eliminableOption, hintLadder, isAudioExercise, spokenText } from "@/engine/exercise-utils";
import { gradeResponse, type GradeResult, type Response } from "@/engine/grading";
import type { Speaker } from "@/audio/speech";
import { Chip, Notice } from "@/components/ui";
import { ContextView } from "@/components/lesson/ContextView";
import { AudioPlayer } from "./AudioPlayer";
import { Feedback } from "./Feedback";
import { kindLabel, PHASE_LABEL, ui, type Lang } from "./labels";
import { ChoiceView, ClozeView, DialogView, MatchView, OrderView, orderBank, TextView } from "./views-closed";
import { SpeakView, WriteView } from "./views-open";

export interface GradedPayload {
  grade: GradeResult;
  hints: number;
  revealed: boolean;
  adapted: boolean;
  /** Só em tarefas abertas (escrita/fala). */
  task?: { text?: string; checks: boolean[]; recorded?: boolean };
}

function emptyResponse(ex: Exercise): Response {
  switch (ex.kind) {
    case "mcq":
    case "listen":
      return { kind: ex.kind, choice: null };
    case "cloze":
    case "type":
    case "fix":
    case "dictation":
      return { kind: ex.kind, text: "" };
    case "order":
      return { kind: "order", tokens: [] };
    case "match":
      return { kind: "match", mistakes: 0, complete: false };
    case "dialog":
      return { kind: "dialog", choices: [] };
    case "write":
      return { kind: "write", text: "", checks: [] };
    case "speak":
      return { kind: "speak", checks: [], recorded: false };
  }
}

export function ExerciseCard({
  ex,
  seed,
  context,
  retry,
  allowHints,
  willRequeue,
  speaker,
  lang,
  showTranslations,
  onGraded,
  onContinue,
  continueLabel,
}: {
  ex: Exercise;
  /** Semente do embaralhamento (estável ao retomar a sessão). */
  seed: string;
  /** Contexto da lição, para exercícios com `usesContext`. */
  context?: ContextBlock;
  /** Reapresentação depois de um erro. */
  retry: boolean;
  /** Pistas e "mostrar resposta" liberados (falso em checkpoint e diagnóstico). */
  allowHints: boolean;
  /** Um erro aqui fará o item voltar nesta sessão. */
  willRequeue: boolean;
  speaker: Speaker;
  lang: Lang;
  showTranslations: boolean;
  onGraded: (p: GradedPayload) => void;
  onContinue: () => void;
  continueLabel?: string;
}) {
  const L = ui(lang);
  const ladder = useMemo(() => hintLadder(ex), [ex]);
  const audio = isAudioExercise(ex);

  const [choice, setChoice] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [picked, setPicked] = useState<number[]>([]);
  const [hintLevel, setHintLevel] = useState(0);
  const [hidden, setHidden] = useState<number[]>([]);
  const [transcript, setTranscript] = useState(false);
  const [cannotListen, setCannotListen] = useState(false);
  const [done, setDone] = useState<(GradedPayload & { skipped: boolean }) | null>(null);
  const continueRef = useRef<HTMLButtonElement>(null);

  const noAudio = audio && speaker.info.ready && !speaker.info.available;
  const adapted = audio && (noAudio || cannotListen);
  const hints = hintLevel + (transcript && !adapted ? 1 : 0);
  const locked = done !== null;

  useEffect(() => {
    if (done) continueRef.current?.focus();
  }, [done]);

  const finish = (response: Response, opts: { revealed?: boolean; skipped?: boolean; task?: GradedPayload["task"]; adaptedTask?: boolean } = {}) => {
    if (done) return;
    speaker.stop();
    const grade = gradeResponse(ex, response);
    const payload: GradedPayload = {
      grade,
      hints,
      revealed: Boolean(opts.revealed),
      adapted: Boolean(adapted || opts.adaptedTask),
      ...(opts.task ? { task: opts.task } : {}),
    };
    setDone({ ...payload, skipped: Boolean(opts.skipped) });
    onGraded(payload);
  };

  const response: Response | null = (() => {
    switch (ex.kind) {
      case "mcq":
      case "listen":
        return choice === null ? null : { kind: ex.kind, choice };
      case "cloze":
      case "type":
      case "fix":
      case "dictation":
        return text.trim() ? { kind: ex.kind, text } : null;
      case "order": {
        if (picked.length === 0) return null;
        const bank = orderBank(ex, seed);
        return { kind: "order", tokens: picked.map((i) => bank[i]) };
      }
      default:
        return null;
    }
  })();

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    if (response && !locked) finish(response);
  };

  const useHint = () => {
    const next = ladder[hintLevel];
    if (!next) return;
    if (next.type === "eliminate") {
      const idx = eliminableOption(ex, hidden);
      if (idx !== null) {
        setHidden((h) => [...h, idx]);
        if (choice === idx) setChoice(null);
      }
    }
    setHintLevel((n) => n + 1);
  };

  const shownHints = ladder.slice(0, hintLevel);
  const open = ex.kind === "write" || ex.kind === "speak";
  const selfSubmitting = ex.kind === "match" || ex.kind === "dialog";
  const hasPassage = (ex.kind === "mcq" || ex.kind === "type") && ex.passage;
  const usesContext = (ex.kind === "mcq" || ex.kind === "type") && ex.usesContext && context;

  const promptText =
    ex.kind === "cloze"
      ? null
      : ex.kind === "dictation"
        ? (ex.prompt ?? "Ouça e escreva exatamente o que ouviu.")
        : ex.kind === "fix"
          ? (ex.prompt ?? "Há um erro nesta frase. Reescreva-a corretamente.")
          : ex.kind === "dialog"
            ? null
            : "prompt" in ex
              ? ex.prompt
              : null;

  return (
    <article className="anim-rise" aria-labelledby={`ex-${ex.id}`}>
      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <Chip tone="primary">{kindLabel(ex.kind, lang)}</Chip>
        {ex.phase ? <Chip>{PHASE_LABEL[ex.phase]}</Chip> : null}
        {retry ? (
          <Chip tone="warn">
            <RotateCw size={12} aria-hidden="true" /> De novo
          </Chip>
        ) : null}
        {open ? <Chip tone="info">Autoavaliada</Chip> : null}
      </div>

      <form onSubmit={submit} className="grid gap-4">
        {usesContext ? <ContextView block={context} speaker={speaker} defaultTranslation={false} compact /> : null}
        {hasPassage ? (
          <div className="rounded-2xl border-2 border-line bg-surface-2 p-3.5">
            <p lang="en" className="en whitespace-pre-line text-[1.05rem]">
              {ex.passage}
            </p>
          </div>
        ) : null}

        {audio ? (
          <div className="grid gap-2">
            <AudioPlayer lines={spokenText(ex)} speaker={speaker} lang={lang} />
            {adapted ? (
              <Notice tone="warn" title="Atividade adaptada (sem áudio)" icon={<EarOff size={18} aria-hidden="true" />} role="status">
                O texto aparece abaixo para você continuar. Esta resposta não conta como evidência de compreensão oral, e a habilidade fica marcada como pendente.
                <span lang="en" className="en mt-1.5 block text-base">
                  {spokenText(ex).join(" ")}
                </span>
              </Notice>
            ) : transcript ? (
              <div className="rounded-2xl border-2 border-line bg-surface-2 p-3" lang="en">
                <span className="en">{spokenText(ex).join(" ")}</span>
              </div>
            ) : null}
            {!locked && !adapted ? (
              <div className="flex flex-wrap gap-2">
                {allowHints && !transcript ? (
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => setTranscript(true)}>
                    <Eye size={16} aria-hidden="true" /> {L.transcript} (conta como pista)
                  </button>
                ) : null}
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setCannotListen(true)}>
                  <EarOff size={16} aria-hidden="true" /> Não posso ouvir agora
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

        {promptText ? (
          <h2 id={`ex-${ex.id}`} className="text-xl font-extrabold leading-snug sm:text-[1.4rem]">
            {promptText}
          </h2>
        ) : (
          <h2 id={`ex-${ex.id}`} className="sr-only">
            {kindLabel(ex.kind, lang)}
          </h2>
        )}
        {ex.promptPt && showTranslations ? <p className="-mt-2 text-sm text-ink-2">Em português: {ex.promptPt}</p> : null}

        {ex.kind === "fix" ? (
          <div className="rounded-2xl border-2 border-bad bg-bad-soft p-3.5">
            <p className="text-xs font-extrabold uppercase tracking-wider text-ink-2">Frase com erro</p>
            <p lang="en" className="en mt-0.5 text-lg">
              {ex.wrong}
            </p>
          </div>
        ) : null}

        {ex.kind === "mcq" || ex.kind === "listen" ? (
          <ChoiceView ex={ex} seed={seed} value={choice} onChange={setChoice} hidden={hidden} locked={locked} />
        ) : null}
        {ex.kind === "cloze" ? <ClozeView ex={ex} value={text} onChange={setText} locked={locked} showTranslation={showTranslations} /> : null}
        {ex.kind === "type" || ex.kind === "fix" || ex.kind === "dictation" ? (
          <TextView value={text} onChange={setText} locked={locked} label={promptText ?? "Sua resposta"} />
        ) : null}
        {ex.kind === "order" ? <OrderView ex={ex} seed={seed} picked={picked} onChange={setPicked} locked={locked} /> : null}
        {ex.kind === "match" ? <MatchView ex={ex} seed={seed} locked={locked} onComplete={(r) => finish(r)} /> : null}
        {ex.kind === "dialog" ? (
          <DialogView ex={ex} seed={seed} locked={locked} speaker={speaker} showTranslation={showTranslations} onComplete={(r) => finish(r)} />
        ) : null}
        {ex.kind === "write" && !locked ? (
          <WriteView ex={ex} onDone={(t, checks) => finish({ kind: "write", text: t, checks }, { task: { text: t, checks } })} />
        ) : null}
        {ex.kind === "speak" && !locked ? (
          <SpeakView
            ex={ex}
            speaker={speaker}
            onDone={(p) =>
              finish({ kind: "speak", checks: p.checks, recorded: p.recorded }, { task: { checks: p.checks, recorded: p.recorded }, adaptedTask: p.adapted })
            }
          />
        ) : null}

        {shownHints.length > 0 && !locked ? (
          <div className="grid gap-1.5" aria-live="polite">
            {shownHints.map((h, i) => (
              <Notice key={i} tone="accent" icon={<Lightbulb size={18} aria-hidden="true" />}>
                <span className="font-semibold">
                  Pista {i + 1}: {h.type === "eliminate" ? "uma alternativa errada foi eliminada." : h.text}
                </span>
              </Notice>
            ))}
          </div>
        ) : null}

        {!locked && !open ? (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {!selfSubmitting ? (
              <button type="submit" className="btn btn-primary sm:min-w-44" disabled={!response}>
                {L.check}
              </button>
            ) : null}
            {allowHints && hintLevel < ladder.length ? (
              <button type="button" className="btn btn-secondary btn-sm" onClick={useHint}>
                <Lightbulb size={16} aria-hidden="true" /> {L.hint} ({hintLevel + 1}/{ladder.length})
              </button>
            ) : null}
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => finish(emptyResponse(ex), { revealed: allowHints, skipped: true })}
            >
              {allowHints ? L.reveal : "Não sei"}
            </button>
          </div>
        ) : null}
      </form>

      {done ? (
        <div className="mt-4 grid gap-3">
          <Feedback
            ex={ex}
            grade={done.grade}
            lang={lang}
            skipped={done.skipped}
            revealed={done.revealed}
            hints={done.hints}
            adapted={done.adapted}
            willReturn={willRequeue && !retry && (done.grade.outcome === "incorrect" || done.revealed)}
          />
          <button ref={continueRef} type="button" className="btn btn-primary btn-block" onClick={onContinue}>
            {continueLabel ?? L.continue}
          </button>
        </div>
      ) : null}
    </article>
  );
}

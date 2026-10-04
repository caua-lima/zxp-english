"use client";

/**
 * Visões dos exercícios corrigidos automaticamente.
 * Nenhuma depende de arrastar: tudo funciona com toque, clique ou teclado.
 */
import { useMemo, useState } from "react";
import { Check, X } from "lucide-react";
import type { ExerciseOf } from "@/content/schema";
import { optionOrder, seededShuffle } from "@/engine/exercise-utils";
import type { Response } from "@/engine/grading";
import type { Speaker } from "@/audio/speech";
import { SayButton } from "./AudioPlayer";

const LETTERS = ["A", "B", "C", "D"];

// ------------------------------------------------------------------ múltipla escolha

export function ChoiceView({
  ex,
  seed,
  value,
  onChange,
  hidden,
  locked,
}: {
  ex: ExerciseOf<"mcq"> | ExerciseOf<"listen">;
  seed: string;
  value: number | null;
  onChange: (choice: number) => void;
  hidden: number[];
  locked: boolean;
}) {
  const order = useMemo(() => optionOrder(ex, seed), [ex, seed]);
  return (
    <fieldset className="grid gap-2.5" disabled={locked}>
      <legend className="sr-only">Alternativas</legend>
      {order.map((i, pos) => {
        const opt = ex.options[i];
        const isHidden = hidden.includes(i);
        const selected = value === i;
        const state = locked ? (i === ex.answer ? "ok" : selected ? "bad" : "dim") : isHidden ? "dim" : undefined;
        return (
          <label key={i} className="choice" data-selected={selected} data-state={state}>
            <input
              type="radio"
              className="sr-only"
              name={`opt-${ex.id}`}
              checked={selected}
              disabled={locked || isHidden}
              onChange={() => onChange(i)}
            />
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border-2 border-line-strong bg-surface text-xs font-extrabold" aria-hidden="true">
              {LETTERS[pos]}
            </span>
            <span className={isHidden ? "line-through" : ""}>{opt.text}</span>
            {locked && i === ex.answer ? (
              <span className="ml-auto inline-flex items-center gap-1 text-sm font-extrabold text-ok">
                <Check size={18} aria-hidden="true" /> Correta
              </span>
            ) : null}
            {locked && selected && i !== ex.answer ? (
              <span className="ml-auto inline-flex items-center gap-1 text-sm font-extrabold text-bad">
                <X size={18} aria-hidden="true" /> Sua escolha
              </span>
            ) : null}
            {isHidden && !locked ? <span className="ml-auto text-xs font-bold text-ink-2">Eliminada pela pista</span> : null}
          </label>
        );
      })}
    </fieldset>
  );
}

// ------------------------------------------------------------------ lacuna

export function ClozeView({
  ex,
  value,
  onChange,
  locked,
  showTranslation,
}: {
  ex: ExerciseOf<"cloze">;
  value: string;
  onChange: (v: string) => void;
  locked: boolean;
  showTranslation: boolean;
}) {
  const [before, after] = ex.text.split("___");
  const width = Math.max(6, Math.min(22, Math.max(...ex.accepted.map((a) => a.length)) + 3));
  return (
    <div>
      <p className="text-xl leading-loose" lang="en">
        <span className="en">{before}</span>
        <input
          className="field mx-1 inline-block !min-h-11 !w-auto !py-1 text-center align-baseline font-bold"
          style={{ width: `${width}ch` }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={locked}
          aria-label="Complete a lacuna"
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          lang="en"
          enterKeyHint="done"
        />
        <span className="en">{after}</span>
        {ex.cue ? <span className="ml-1 text-base font-bold text-ink-2">{ex.cue}</span> : null}
      </p>
      {ex.translation && showTranslation ? <p className="mt-1 text-sm text-ink-2">{ex.translation}</p> : null}
    </div>
  );
}

// ------------------------------------------------------------------ texto digitado

export function TextView({
  value,
  onChange,
  locked,
  label,
  placeholder = "Digite em inglês",
  multiline = false,
}: {
  value: string;
  onChange: (v: string) => void;
  locked: boolean;
  label: string;
  placeholder?: string;
  multiline?: boolean;
}) {
  const common = {
    className: "field",
    value,
    disabled: locked,
    placeholder,
    "aria-label": label,
    autoCapitalize: "none" as const,
    autoCorrect: "off",
    autoComplete: "off",
    spellCheck: false,
    lang: "en",
  };
  return multiline ? (
    <textarea {...common} rows={3} onChange={(e) => onChange(e.target.value)} />
  ) : (
    <input {...common} enterKeyHint="done" onChange={(e) => onChange(e.target.value)} />
  );
}

// ------------------------------------------------------------------ ordenar palavras

export function OrderView({
  ex,
  seed,
  picked,
  onChange,
  locked,
}: {
  ex: ExerciseOf<"order">;
  seed: string;
  /** Índices do banco, na ordem escolhida. */
  picked: number[];
  onChange: (picked: number[]) => void;
  locked: boolean;
}) {
  const bank = useMemo(() => {
    let b = seededShuffle(ex.tokens, `${ex.id}|${seed}`);
    // Se o embaralhamento reproduzir a resposta, gira uma posição.
    if (ex.answers.some((a) => a === b.join(" ")) && b.length > 1) b = [...b.slice(1), b[0]];
    return b;
  }, [ex, seed]);

  return (
    <div>
      <div
        className="flex min-h-[64px] flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed border-line bg-surface-2 p-3"
        aria-label="Sua frase"
        role="group"
      >
        {picked.length === 0 ? <span className="text-sm font-semibold text-ink-2">Toque nas palavras abaixo, na ordem certa.</span> : null}
        {picked.map((bi, pos) => (
          <button
            key={`${bi}-${pos}`}
            type="button"
            className="token"
            lang="en"
            disabled={locked}
            onClick={() => onChange(picked.filter((_, p) => p !== pos))}
            aria-label={`Remover “${bank[bi]}”`}
          >
            {bank[bi]}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Frase montada: {picked.map((i) => bank[i]).join(" ") || "vazia"}
      </p>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Banco de palavras">
        {bank.map((tok, bi) => {
          const used = picked.includes(bi);
          return used ? (
            <span key={bi} className="token token-ghost" aria-hidden="true">
              {tok}
            </span>
          ) : (
            <button key={bi} type="button" className="token" lang="en" disabled={locked} onClick={() => onChange([...picked, bi])}>
              {tok}
            </button>
          );
        })}
      </div>
      {!locked && picked.length > 0 ? (
        <button type="button" className="btn btn-ghost btn-sm mt-2" onClick={() => onChange([])}>
          Limpar
        </button>
      ) : null}
    </div>
  );
}

/** Tokens do banco (na ordem embaralhada) para montar a resposta fora do componente. */
export function orderBank(ex: ExerciseOf<"order">, seed: string): string[] {
  let b = seededShuffle(ex.tokens, `${ex.id}|${seed}`);
  if (ex.answers.some((a) => a === b.join(" ")) && b.length > 1) b = [...b.slice(1), b[0]];
  return b;
}

// ------------------------------------------------------------------ associar pares

export function MatchView({
  ex,
  seed,
  locked,
  onComplete,
}: {
  ex: ExerciseOf<"match">;
  seed: string;
  locked: boolean;
  onComplete: (r: Response) => void;
}) {
  const rightOrder = useMemo(() => seededShuffle(ex.pairs.map((_, i) => i), `${ex.id}|r|${seed}`), [ex, seed]);
  const [selLeft, setSelLeft] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [flash, setFlash] = useState<{ left: number; right: number } | null>(null);
  const [status, setStatus] = useState("");

  const pickRight = (ri: number) => {
    if (selLeft === null || locked) return;
    if (ri === selLeft) {
      const next = [...matched, ri];
      setMatched(next);
      setSelLeft(null);
      setStatus("Par certo.");
      if (next.length === ex.pairs.length) onComplete({ kind: "match", mistakes, complete: true });
    } else {
      setMistakes((m) => m + 1);
      setFlash({ left: selLeft, right: ri });
      setStatus("Esse par não combina. Tente outro.");
      window.setTimeout(() => setFlash(null), 600);
      setSelLeft(null);
    }
  };

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-ink-2">Toque em um item da esquerda e depois no par dele à direita.</p>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="grid content-start gap-2.5" role="group" aria-label="Coluna da esquerda">
          {ex.pairs.map((p, i) => {
            const done = matched.includes(i);
            return (
              <button
                key={i}
                type="button"
                className={`choice !min-h-14 ${flash?.left === i ? "anim-nudge" : ""}`}
                aria-pressed={selLeft === i}
                data-state={done ? "ok" : flash?.left === i ? "bad" : undefined}
                disabled={done || locked}
                onClick={() => setSelLeft(selLeft === i ? null : i)}
              >
                <span lang="en" className="en">
                  {p.left}
                </span>
                {done ? <Check size={18} className="ml-auto shrink-0 text-ok" aria-label="par formado" /> : null}
              </button>
            );
          })}
        </div>
        <div className="grid content-start gap-2.5" role="group" aria-label="Coluna da direita">
          {rightOrder.map((ri) => {
            const done = matched.includes(ri);
            return (
              <button
                key={ri}
                type="button"
                className={`choice !min-h-14 ${flash?.right === ri ? "anim-nudge" : ""}`}
                data-state={done ? "ok" : flash?.right === ri ? "bad" : undefined}
                disabled={done || locked || selLeft === null}
                onClick={() => pickRight(ri)}
              >
                <span>{ex.pairs[ri].right}</span>
                {done ? <Check size={18} className="ml-auto shrink-0 text-ok" aria-label="par formado" /> : null}
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-2 min-h-5 text-sm font-bold text-ink-2" aria-live="polite">
        {status}
        {mistakes > 0 ? ` (${mistakes} tentativa${mistakes > 1 ? "s" : ""} errada${mistakes > 1 ? "s" : ""})` : ""}
      </p>
    </div>
  );
}

// ------------------------------------------------------------------ diálogo com escolhas

export function DialogView({
  ex,
  seed,
  locked,
  speaker,
  showTranslation,
  onComplete,
}: {
  ex: ExerciseOf<"dialog">;
  seed: string;
  locked: boolean;
  speaker: Speaker;
  showTranslation: boolean;
  onComplete: (r: Response) => void;
}) {
  const [choices, setChoices] = useState<number[]>([]);
  const turnIndex = choices.length;
  const orders = useMemo(
    () => ex.turns.map((t, ti) => seededShuffle(t.options.map((_, i) => i), `${ex.id}|${ti}|${seed}`)),
    [ex, seed],
  );
  const [pending, setPending] = useState<number | null>(null);

  const confirm = () => {
    if (pending === null) return;
    const next = [...choices, pending];
    setChoices(next);
    setPending(null);
    if (next.length === ex.turns.length) onComplete({ kind: "dialog", choices: next });
  };

  return (
    <div className="grid gap-3">
      <p className="rounded-2xl bg-surface-2 p-3 text-sm font-semibold text-ink-2">{ex.setup}</p>
      {ex.turns.map((turn, ti) => {
        if (ti > turnIndex) return null;
        const chosen = choices[ti];
        const active = ti === turnIndex && !locked;
        return (
          <div key={ti} className="grid gap-2 anim-rise">
            <div className="flex items-start gap-2">
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm border-2 border-line-strong bg-surface p-3">
                <p lang="en" className="en text-lg">
                  {turn.npc.en}
                </p>
                {showTranslation ? <p className="text-sm text-ink-2">{turn.npc.pt}</p> : null}
              </div>
              <SayButton text={turn.npc.en} speaker={speaker} />
            </div>

            {chosen !== undefined ? (
              <div className="ml-auto max-w-[85%]">
                <div
                  className={`rounded-2xl rounded-tr-sm border-2 p-3 ${turn.options[chosen].ok ? "border-ok bg-ok-soft" : "border-bad bg-bad-soft"}`}
                >
                  <p lang="en" className="en text-lg">
                    {turn.options[chosen].text}
                  </p>
                </div>
                <p className="mt-1 text-sm">
                  <span className={`font-extrabold ${turn.options[chosen].ok ? "text-ok" : "text-bad"}`}>
                    {turn.options[chosen].ok ? "Funcionou. " : "Não funcionou bem. "}
                  </span>
                  {turn.options[chosen].reaction}
                </p>
              </div>
            ) : active ? (
              <div className="grid gap-2" role="group" aria-label={`O que você diz? (fala ${ti + 1} de ${ex.turns.length})`}>
                {orders[ti].map((oi) => (
                  <button
                    key={oi}
                    type="button"
                    aria-pressed={pending === oi}
                    className="choice"
                    onClick={() => setPending(oi)}
                  >
                    <span lang="en" className="en">
                      {turn.options[oi].text}
                    </span>
                  </button>
                ))}
                <button type="button" className="btn btn-primary" disabled={pending === null} onClick={confirm}>
                  Dizer isso
                </button>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

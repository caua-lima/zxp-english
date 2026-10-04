"use client";

import { Snail, Square, Volume2 } from "lucide-react";
import type { Speaker } from "@/audio/speech";
import { ui, type Lang } from "./labels";

/**
 * Controles de áudio: velocidade normal, reduzida e repetição por trecho.
 * Sempre identifica a voz como sintética.
 */
export function AudioPlayer({
  lines,
  speaker,
  lang = "pt",
  showLines = false,
  label = "Áudio",
  disabled = false,
}: {
  lines: string[];
  speaker: Speaker;
  lang?: Lang;
  /** Mostra o texto de cada trecho ao lado do botão de repetição. */
  showLines?: boolean;
  label?: string;
  disabled?: boolean;
}) {
  const L = ui(lang);
  const multi = lines.length > 1;
  const off = disabled || !speaker.info.available;

  return (
    <div className="rounded-2xl border-2 border-line-strong bg-primary-soft p-3" role="group" aria-label={label}>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className="btn btn-primary btn-sm" onClick={() => speaker.speak(lines)} disabled={off}>
          <Volume2 size={18} aria-hidden="true" /> {L.listen}
        </button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => speaker.speak(lines, { slow: true })} disabled={off}>
          <Snail size={18} aria-hidden="true" /> {L.slow}
        </button>
        {speaker.speaking ? (
          <button type="button" className="btn btn-ghost btn-sm" onClick={speaker.stop}>
            <Square size={16} aria-hidden="true" /> {L.stop}
          </button>
        ) : null}
      </div>

      {multi || showLines ? (
        <ol className="mt-3 grid gap-1.5">
          {lines.map((line, i) => (
            <li key={i} className="flex items-start gap-2">
              <button
                type="button"
                className="btn btn-secondary btn-sm !min-h-9 shrink-0 !px-2.5"
                onClick={() => speaker.speak(line, { startIndex: i })}
                disabled={off}
                aria-label={`Repetir trecho ${i + 1}`}
              >
                <Volume2 size={15} aria-hidden="true" />
                <span className="text-xs">{i + 1}</span>
              </button>
              {showLines ? (
                <span lang="en" className={`en pt-1.5 ${speaker.activeIndex === i ? "text-primary-text underline" : ""}`}>
                  {line}
                </span>
              ) : (
                <span className="pt-2 text-xs font-bold text-ink-2">Trecho {i + 1}</span>
              )}
            </li>
          ))}
        </ol>
      ) : null}

      <p className="mt-2 text-xs font-semibold text-ink-2">
        {speaker.info.available
          ? `Voz sintética do seu navegador${speaker.info.voice ? ` · ${speaker.info.voice.name}` : ""}. A pronúncia pode variar.`
          : "Áudio indisponível neste navegador."}
      </p>
    </div>
  );
}

/** Botão pequeno para ouvir uma frase (exemplos, diálogos, vocabulário). */
export function SayButton({ text, speaker, label }: { text: string; speaker: Speaker; label?: string }) {
  if (!speaker.info.available) return null;
  return (
    <button
      type="button"
      onClick={() => speaker.speak(text)}
      className="inline-grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-line-strong bg-surface text-ink hover:bg-surface-2"
      aria-label={label ?? `Ouvir: ${text}`}
    >
      <Volume2 size={16} aria-hidden="true" />
    </button>
  );
}

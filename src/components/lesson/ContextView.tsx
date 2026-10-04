"use client";

import { useState } from "react";
import { Languages, Volume2 } from "lucide-react";
import type { ContextBlock } from "@/content/schema";
import type { Speaker } from "@/audio/speech";
import { SayButton } from "@/components/exercise/AudioPlayer";

const KIND_LABEL: Record<ContextBlock["kind"], string> = {
  dialogue: "Diálogo",
  text: "Texto",
  message: "Mensagens",
  notice: "Aviso",
  list: "Lista",
};

/**
 * Diálogo, texto ou mensagem de contexto: inglês em destaque, tradução sob demanda
 * e áudio por linha (repetição por trecho) ou do bloco inteiro.
 */
export function ContextView({
  block,
  speaker,
  defaultTranslation = true,
  compact = false,
}: {
  block: ContextBlock;
  speaker: Speaker;
  defaultTranslation?: boolean;
  compact?: boolean;
}) {
  const [showPt, setShowPt] = useState(defaultTranslation);
  const chat = block.kind === "dialogue" || block.kind === "message";
  const speakers = [...new Set(block.lines.map((l) => l.who).filter(Boolean))];

  return (
    <section className="rounded-2xl border-2 border-line-strong bg-surface p-3.5 sm:p-4" aria-label={block.title ?? KIND_LABEL[block.kind]}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-primary-text">{KIND_LABEL[block.kind]}</p>
          {block.title ? <p className="font-extrabold">{block.title}</p> : null}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {speaker.info.available ? (
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => speaker.speak(block.lines.map((l) => l.en))}>
              <Volume2 size={16} aria-hidden="true" /> Ouvir tudo
            </button>
          ) : null}
          <button type="button" className="btn btn-ghost btn-sm" aria-pressed={showPt} onClick={() => setShowPt((v) => !v)}>
            <Languages size={16} aria-hidden="true" /> {showPt ? "Ocultar tradução" : "Ver tradução"}
          </button>
        </div>
      </div>

      <ol className={`grid ${compact ? "gap-2" : "gap-3"}`}>
        {block.lines.map((line, i) => {
          const side = chat && line.who ? speakers.indexOf(line.who) % 2 : 0;
          const active = speaker.activeIndex === i && speaker.speaking;
          return (
            <li key={i} className={`flex items-start gap-2 ${chat && side === 1 ? "flex-row-reverse" : ""}`}>
              <div
                className={`min-w-0 max-w-[88%] rounded-2xl border-2 p-2.5 ${
                  chat ? (side === 1 ? "rounded-tr-sm border-line bg-primary-soft" : "rounded-tl-sm border-line bg-surface-2") : "border-transparent p-0"
                } ${active ? "!border-primary" : ""}`}
              >
                {line.who ? <p className="text-xs font-extrabold text-ink-2">{line.who}</p> : null}
                <p lang="en" className="en text-[1.08rem] leading-snug">
                  {line.en}
                </p>
                {showPt ? <p className="mt-0.5 text-sm text-ink-2">{line.pt}</p> : null}
              </div>
              <SayButton text={line.en} speaker={speaker} label={`Ouvir a fala ${i + 1}`} />
            </li>
          );
        })}
      </ol>
      {!speaker.info.available && speaker.info.ready ? (
        <p className="mt-3 text-xs font-semibold text-ink-2">Áudio indisponível neste navegador: leia o texto em voz alta.</p>
      ) : null}
    </section>
  );
}

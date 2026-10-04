"use client";

/**
 * Tarefas abertas: escrita e fala. São AUTOAVALIADAS.
 * O app mostra critérios e um modelo, mas não finge entender o texto nem mede pronúncia.
 */
import { useState } from "react";
import { Mic, RotateCcw, Square } from "lucide-react";
import type { ExerciseOf } from "@/content/schema";
import type { Speaker } from "@/audio/speech";
import { useRecorder } from "@/audio/recorder";
import { Notice } from "@/components/ui";
import { AudioPlayer } from "./AudioPlayer";

function countWords(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function Checklist({ items, checks, onToggle, legend }: { items: string[]; checks: boolean[]; onToggle: (i: number) => void; legend: string }) {
  return (
    <fieldset className="grid gap-2">
      <legend className="mb-1 font-extrabold">{legend}</legend>
      {items.map((item, i) => (
        <label key={i} className="choice !items-start" data-selected={checks[i]}>
          <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[var(--primary)]" checked={checks[i]} onChange={() => onToggle(i)} />
          <span className="font-semibold">{item}</span>
        </label>
      ))}
    </fieldset>
  );
}

const MODE_LABEL: Record<string, string> = {
  guided: "Escrita guiada",
  free: "Escrita livre",
  summary: "Síntese",
  argument: "Argumentação",
};

// ------------------------------------------------------------------ escrita

export function WriteView({
  ex,
  onDone,
}: {
  ex: ExerciseOf<"write">;
  onDone: (text: string, checks: boolean[]) => void;
}) {
  const [text, setText] = useState("");
  const [finished, setFinished] = useState(false);
  const [checks, setChecks] = useState<boolean[]>(() => ex.checklist.map(() => false));
  const words = countWords(text);
  const missing = Math.max(0, ex.minWords - words);

  return (
    <div className="grid gap-4">
      <p className="text-xs font-extrabold uppercase tracking-wider text-primary-text">{MODE_LABEL[ex.mode]}</p>
      {ex.source ? (
        <div className="rounded-2xl border-2 border-line bg-surface-2 p-3">
          <p className="mb-1 text-xs font-extrabold uppercase tracking-wider text-ink-2">Texto de base</p>
          <p lang="en" className="whitespace-pre-line">
            {ex.source}
          </p>
        </div>
      ) : null}

      {!finished ? (
        <>
          {ex.frame?.length ? (
            <div>
              <p className="mb-1.5 text-sm font-bold text-ink-2">Comece por aqui (toque para inserir):</p>
              <div className="flex flex-wrap gap-2">
                {ex.frame.map((f) => (
                  <button
                    key={f}
                    type="button"
                    lang="en"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setText((t) => (t ? `${t.trimEnd()} ${f.replace(/…/g, "").trim()} ` : `${f.replace(/…/g, "").trim()} `))}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          <div>
            <textarea
              className="field min-h-36"
              value={text}
              onChange={(e) => setText(e.target.value)}
              aria-label="Seu texto em inglês"
              placeholder="Escreva em inglês…"
              lang="en"
              spellCheck={false}
            />
            <p className="mt-1 text-sm font-semibold text-ink-2" aria-live="polite">
              {words} {words === 1 ? "palavra" : "palavras"}
              {missing > 0 ? ` · faltam ${missing} para o mínimo sugerido (${ex.minWords})` : " · mínimo sugerido alcançado"}
            </p>
          </div>
          <button type="button" className="btn btn-primary" disabled={words === 0} onClick={() => setFinished(true)}>
            Terminei de escrever
          </button>
          <p className="text-sm text-ink-2">O modelo e os critérios aparecem só depois que você terminar.</p>
        </>
      ) : (
        <div className="grid gap-4 anim-rise">
          <div className="rounded-2xl border-2 border-line bg-surface p-3">
            <p className="mb-1 text-xs font-extrabold uppercase tracking-wider text-ink-2">Seu texto</p>
            <p lang="en" className="whitespace-pre-line">
              {text}
            </p>
          </div>
          <div className="rounded-2xl border-2 border-line-strong bg-primary-soft p-3">
            <p className="mb-1 text-xs font-extrabold uppercase tracking-wider text-primary-text">Um modelo possível</p>
            <p lang="en" className="en whitespace-pre-line">
              {ex.model}
            </p>
            <p className="mt-1 text-xs font-semibold text-ink-2">Seu texto pode ser diferente e estar certo. Use o modelo como referência, não como gabarito.</p>
          </div>
          <Checklist
            legend="Autoavaliação: marque só o que você realmente fez"
            items={ex.checklist}
            checks={checks}
            onToggle={(i) => setChecks((c) => c.map((v, j) => (j === i ? !v : v)))}
          />
          <div className="flex flex-col gap-2 sm:flex-row">
            <button type="button" className="btn btn-primary" onClick={() => onDone(text, checks)}>
              Concluir autoavaliação
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setFinished(false)}>
              Voltar e reescrever
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------------ fala

const SPEAK_HELP: Record<string, string> = {
  repeat: "Ouça o modelo e repita em voz alta, frase por frase.",
  shadow: "Shadowing: toque em “Devagar” e fale junto com o áudio, tentando acompanhar o ritmo.",
  respond: "Responda em voz alta com suas palavras. Depois ouça o modelo e compare.",
};

export function SpeakView({
  ex,
  speaker,
  onDone,
}: {
  ex: ExerciseOf<"speak">;
  speaker: Speaker;
  onDone: (p: { checks: boolean[]; recorded: boolean; adapted: boolean }) => void;
}) {
  const rec = useRecorder();
  const [checks, setChecks] = useState<boolean[]>(() => ex.checklist.map(() => false));
  const [modelShown, setModelShown] = useState(ex.mode !== "respond");
  const [spoke, setSpoke] = useState(false);
  const recorded = rec.status === "recorded";
  const canAssess = spoke || recorded;

  return (
    <div className="grid gap-4">
      <p className="rounded-2xl bg-surface-2 p-3 text-sm font-semibold text-ink-2">{SPEAK_HELP[ex.mode]}</p>

      {modelShown ? (
        <AudioPlayer lines={ex.lines} speaker={speaker} showLines label="Modelo para ouvir" />
      ) : (
        <button type="button" className="btn btn-secondary" onClick={() => setModelShown(true)}>
          Ver e ouvir um modelo de resposta
        </button>
      )}
      {!speaker.info.available && modelShown ? (
        <Notice tone="warn" title="Sem áudio neste navegador">
          Leia o modelo acima e fale em voz alta. Sem ouvir o modelo, esta tarefa continua valendo como prática de fala.
        </Notice>
      ) : null}

      <div className="rounded-2xl border-2 border-line bg-surface p-3">
        <p className="font-extrabold">Sua vez</p>
        {rec.status === "unsupported" ? (
          <p className="mt-1 text-sm text-ink-2">Este navegador não grava áudio. Fale em voz alta e siga para a autoavaliação.</p>
        ) : rec.status === "denied" ? (
          <Notice tone="warn" title="Microfone não autorizado" className="mt-2" role="status">
            Tudo bem: fale em voz alta sem gravar. Para gravar depois, libere o microfone nas permissões do site.
          </Notice>
        ) : rec.status === "error" ? (
          <Notice tone="warn" title="Não foi possível gravar" className="mt-2" role="status">
            Fale em voz alta sem gravar, ou tente gravar de novo.
          </Notice>
        ) : (
          <p className="mt-1 text-sm text-ink-2">
            Gravar é opcional. A gravação fica só neste aparelho, serve para você se ouvir e é descartada ao sair. O app não avalia sua pronúncia.
          </p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {rec.status === "recording" ? (
            <button type="button" className="btn btn-danger btn-sm" onClick={rec.stop}>
              <Square size={16} aria-hidden="true" /> Parar ({rec.seconds}s)
            </button>
          ) : rec.supported ? (
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => void rec.start()} disabled={rec.status === "requesting"}>
              <Mic size={16} aria-hidden="true" /> {recorded ? "Gravar de novo" : rec.status === "requesting" ? "Aguardando permissão…" : "Gravar minha voz"}
            </button>
          ) : null}
          {rec.status === "recording" ? (
            <span className="inline-flex items-center gap-2 text-sm font-bold text-bad" role="status">
              <span className="recording-dot h-3 w-3 rounded-full bg-bad" aria-hidden="true" /> Gravando
            </span>
          ) : null}
          {!recorded && rec.status !== "recording" ? (
            <button type="button" className="btn btn-secondary btn-sm" aria-pressed={spoke} onClick={() => setSpoke(true)}>
              {spoke ? "Falei em voz alta ✓" : "Falei em voz alta, sem gravar"}
            </button>
          ) : null}
          {recorded ? (
            <button type="button" className="btn btn-ghost btn-sm" onClick={rec.reset}>
              <RotateCcw size={16} aria-hidden="true" /> Descartar
            </button>
          ) : null}
        </div>

        {recorded && rec.url ? (
          <div className="mt-3">
            <p className="mb-1 text-sm font-bold">Ouça sua gravação e compare com o modelo:</p>
            <audio controls src={rec.url} className="w-full" />
          </div>
        ) : null}
      </div>

      {canAssess ? (
        <div className="grid gap-3 anim-rise">
          <Checklist
            legend="Autoavaliação: marque só o que você realmente fez"
            items={ex.checklist}
            checks={checks}
            onToggle={(i) => setChecks((c) => c.map((v, j) => (j === i ? !v : v)))}
          />
          <button type="button" className="btn btn-primary" onClick={() => onDone({ checks, recorded, adapted: false })}>
            Concluir autoavaliação
          </button>
        </div>
      ) : null}

      <button
        type="button"
        className="btn btn-ghost btn-sm justify-self-start"
        onClick={() => onDone({ checks: ex.checklist.map(() => false), recorded: false, adapted: true })}
      >
        Não posso falar agora (deixar pendente)
      </button>
    </div>
  );
}

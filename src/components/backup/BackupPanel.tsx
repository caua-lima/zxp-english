"use client";

/**
 * Backup e restauração.
 *  - Exportar: baixa um JSON com todo o progresso.
 *  - Importar: valida o arquivo ANTES de qualquer mudança, mostra um resumo e só
 *    substitui depois de confirmação. Arquivo inválido = nada é alterado.
 *  - Apagar: exige digitar uma palavra de confirmação.
 */
import { useRef, useState } from "react";
import { Download, Trash2, Upload } from "lucide-react";
import { dateKey, formatShort } from "@/engine/dates";
import { backupFileName, buildBackup, parseBackup, serializeBackup, summarize, type BackupSummary, type ImportResult } from "@/persistence/backup";
import { markBackup } from "@/state/actions";
import { useProgress, useStore } from "@/state/provider";
import { Button, Dialog, Notice } from "@/components/ui";

function SummaryList({ s, tz }: { s: BackupSummary; tz: string }) {
  return (
    <ul className="grid gap-0.5 text-sm">
      <li>{s.lessonsCompleted} lições concluídas</li>
      <li>{s.unitsPassed} checkpoints aprovados</li>
      <li>{s.concepts} itens em revisão</li>
      <li>{s.totalXp} XP</li>
      <li>Último estudo: {s.lastStudyDate ? formatShort(s.lastStudyDate) : "nenhum"}</li>
      <li className="text-ink-2">Gerado em {formatShort(dateKey(s.exportedAt, tz))}</li>
    </ul>
  );
}

export function ExportBackup({ variant = "primary" }: { variant?: "primary" | "secondary" }) {
  const store = useStore();
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setError(null);
    try {
      await store.flush();
      const now = store.now();
      const text = serializeBackup(buildBackup(store.state, now));
      const name = backupFileName(now);
      const url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 2000);
      store.run((s, n) => markBackup(s, n));
      setDone(name);
    } catch {
      setError("Não foi possível gerar o arquivo de backup neste navegador.");
    }
  };

  return (
    <div className="grid gap-2">
      <Button variant={variant} onClick={() => void run()}>
        <Download size={18} aria-hidden="true" /> Exportar backup (JSON)
      </Button>
      {done ? (
        <Notice tone="ok" role="status" title="Backup exportado">
          Arquivo <span className="font-bold">{done}</span> salvo na pasta de downloads. Guarde-o fora deste navegador (e-mail, nuvem, pen drive).
        </Notice>
      ) : null}
      {error ? (
        <Notice tone="bad" role="alert" title="Falha ao exportar">
          {error}
        </Notice>
      ) : null}
    </div>
  );
}

export function ImportBackup({ onRestored }: { onRestored?: () => void }) {
  const store = useStore();
  const progress = useProgress();
  const input = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [message, setMessage] = useState<{ tone: "ok" | "bad"; title: string; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const tz = progress?.settings.timezone ?? "America/Sao_Paulo";

  const onFile = async (file: File | undefined) => {
    setMessage(null);
    if (!file) return;
    let text: string;
    try {
      text = await file.text();
    } catch {
      setMessage({ tone: "bad", title: "Não foi possível ler o arquivo", text: "Nada foi alterado no seu progresso." });
      return;
    }
    const parsed = parseBackup(text);
    if (!parsed.ok) {
      setMessage({ tone: "bad", title: "Backup não importado", text: `${parsed.error} Seu progresso atual continua intacto.` });
      setResult(null);
    } else {
      setResult(parsed);
    }
    if (input.current) input.current.value = "";
  };

  const confirm = async () => {
    if (!result || !result.ok) return;
    setBusy(true);
    try {
      await store.replaceAll(result.state);
      setMessage({ tone: "ok", title: "Progresso restaurado", text: "O backup substituiu o progresso que havia neste navegador." });
      setResult(null);
      onRestored?.();
    } catch {
      setMessage({ tone: "bad", title: "Não foi possível restaurar", text: "A gravação falhou e nada foi alterado: seu progresso anterior continua aqui." });
      setResult(null);
    } finally {
      setBusy(false);
    }
  };

  const current = progress ? summarize(progress, store.now().toISOString()) : null;

  return (
    <div className="grid gap-2">
      <input
        ref={input}
        id="backup-file"
        type="file"
        accept="application/json,.json"
        className="sr-only"
        onChange={(e) => void onFile(e.target.files?.[0])}
      />
      <label htmlFor="backup-file" className="btn btn-secondary cursor-pointer">
        <Upload size={18} aria-hidden="true" /> Restaurar de um backup
      </label>
      {message ? (
        <Notice tone={message.tone} role={message.tone === "bad" ? "alert" : "status"} title={message.title}>
          {message.text}
        </Notice>
      ) : null}

      <Dialog
        open={Boolean(result && result.ok)}
        onClose={() => setResult(null)}
        title="Substituir o progresso deste navegador?"
        actions={
          <>
            <Button variant="secondary" onClick={() => setResult(null)} disabled={busy}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={() => void confirm()} disabled={busy}>
              {busy ? "Restaurando…" : "Substituir pelo backup"}
            </Button>
          </>
        }
      >
        {result && result.ok ? (
          <div className="grid gap-3 text-ink">
            <p>Esta ação troca TODO o progresso atual pelo conteúdo do arquivo. Não é possível desfazer, então exporte um backup do estado atual antes, se ele importa.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border-2 border-line p-3">
                <p className="mb-1 font-extrabold">No backup</p>
                <SummaryList s={result.summary} tz={tz} />
              </div>
              {current ? (
                <div className="rounded-2xl border-2 border-line p-3">
                  <p className="mb-1 font-extrabold">Aqui, agora</p>
                  <SummaryList s={current} tz={tz} />
                </div>
              ) : null}
            </div>
            {result.migratedFrom !== null ? <p className="text-sm">Este backup é de um formato anterior ({result.migratedFrom}) e será convertido.</p> : null}
            {result.warnings.map((w, i) => (
              <p key={i} className="text-sm font-semibold">
                {w}
              </p>
            ))}
          </div>
        ) : null}
      </Dialog>
    </div>
  );
}

const WIPE_WORD = "APAGAR";

export function WipeProgress() {
  const store = useStore();
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const close = () => {
    setOpen(false);
    setTyped("");
  };

  return (
    <div className="grid gap-2">
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <Trash2 size={18} aria-hidden="true" /> Apagar todo o progresso
      </Button>
      {done ? (
        <Notice tone="ok" role="status" title="Progresso apagado">
          O app voltou ao estado inicial.
        </Notice>
      ) : null}
      {error ? (
        <Notice tone="bad" role="alert" title="Não foi possível apagar">
          O armazenamento do navegador recusou a operação. Nada foi alterado.
        </Notice>
      ) : null}
      <Dialog
        open={open}
        onClose={close}
        title="Apagar todo o progresso?"
        actions={
          <>
            <Button variant="secondary" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              disabled={typed.trim().toUpperCase() !== WIPE_WORD}
              onClick={() => {
                void store
                  .wipe()
                  .then(() => {
                    setDone(true);
                    setError(false);
                  })
                  .catch(() => setError(true))
                  .finally(close);
              }}
            >
              Apagar definitivamente
            </Button>
          </>
        }
      >
        <div className="grid gap-3 text-ink">
          <p>Lições, revisões, XP, conquistas e tarefas serão removidos deste navegador. Não há como desfazer.</p>
          <p className="font-semibold">Se houver alguma chance de querer isso de volta, exporte um backup antes.</p>
          <label className="grid gap-1">
            <span className="text-sm font-bold">
              Para confirmar, digite <span className="font-extrabold">{WIPE_WORD}</span>
            </span>
            <input className="field" value={typed} onChange={(e) => setTyped(e.target.value)} autoComplete="off" autoCapitalize="characters" />
          </label>
        </div>
      </Dialog>
    </div>
  );
}

/** Explicação curta de onde os dados ficam. */
export function StorageExplainer() {
  return (
    <ul className="rich text-sm text-ink-2">
      <li>Seus dados ficam só neste navegador e neste endereço (origem) do app. Não há conta nem servidor.</li>
      <li>Não existe sincronização automática entre celular e computador.</li>
      <li>Limpar os dados do navegador, ou usar o modo privado, pode apagar o progresso.</li>
      <li>Se o app mudar de domínio ou você usar outra URL, restaure um backup para continuar de onde parou.</li>
    </ul>
  );
}

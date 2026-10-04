"use client";

/**
 * Gravação da própria voz (MediaRecorder).
 *
 * - O microfone só é pedido quando a pessoa aperta "Gravar".
 * - O áudio fica na memória da aba, para ouvir de volta; NÃO é salvo no
 *   armazenamento, NÃO entra no backup e NÃO é enviado a lugar nenhum.
 * - Se o navegador não suporta ou a permissão é negada, a tarefa continua
 *   possível sem gravação.
 */
import { useCallback, useEffect, useRef, useState } from "react";

export type RecorderStatus = "idle" | "requesting" | "recording" | "recorded" | "denied" | "unsupported" | "error";

export interface Recorder {
  status: RecorderStatus;
  supported: boolean;
  /** URL local (blob:) da gravação mais recente. */
  url: string | null;
  seconds: number;
  start: () => Promise<void>;
  stop: () => void;
  reset: () => void;
}

export function recorderSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.MediaRecorder !== "undefined" &&
    Boolean(navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === "function")
  );
}

const MAX_SECONDS = 90;

export function useRecorder(): Recorder {
  const [status, setStatus] = useState<RecorderStatus>("idle");
  const [supported, setSupported] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const rec = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timer = useRef<number | null>(null);
  const urlRef = useRef<string | null>(null);

  useEffect(() => {
    const ok = recorderSupported();
    setSupported(ok);
    if (!ok) setStatus("unsupported");
  }, []);

  const release = useCallback(() => {
    if (timer.current !== null) window.clearInterval(timer.current);
    timer.current = null;
    stream.current?.getTracks().forEach((t) => t.stop());
    stream.current = null;
  }, []);

  const revoke = useCallback(() => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
  }, []);

  const stop = useCallback(() => {
    if (rec.current && rec.current.state !== "inactive") rec.current.stop();
  }, []);

  const start = useCallback(async () => {
    if (!recorderSupported()) {
      setStatus("unsupported");
      return;
    }
    revoke();
    setUrl(null);
    setSeconds(0);
    setStatus("requesting");
    try {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.current = media;
      const recorder = new MediaRecorder(media);
      rec.current = recorder;
      chunks.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data);
      };
      recorder.onstop = () => {
        release();
        const blob = new Blob(chunks.current, { type: recorder.mimeType || "audio/webm" });
        chunks.current = [];
        if (blob.size === 0) {
          setStatus("error");
          return;
        }
        const next = URL.createObjectURL(blob);
        urlRef.current = next;
        setUrl(next);
        setStatus("recorded");
      };
      recorder.start();
      setStatus("recording");
      timer.current = window.setInterval(() => {
        setSeconds((s) => {
          if (s + 1 >= MAX_SECONDS) stop();
          return s + 1;
        });
      }, 1000);
    } catch (e) {
      release();
      const name = (e as { name?: string })?.name;
      setStatus(name === "NotAllowedError" || name === "SecurityError" || name === "PermissionDeniedError" ? "denied" : "error");
    }
  }, [release, revoke, stop]);

  const reset = useCallback(() => {
    stop();
    release();
    revoke();
    setUrl(null);
    setSeconds(0);
    setStatus(recorderSupported() ? "idle" : "unsupported");
  }, [release, revoke, stop]);

  useEffect(
    () => () => {
      if (rec.current && rec.current.state !== "inactive") {
        rec.current.onstop = null;
        rec.current.stop();
      }
      release();
      revoke();
    },
    [release, revoke],
  );

  return { status, supported, url, seconds, start, stop, reset };
}

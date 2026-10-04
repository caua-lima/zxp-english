"use client";

/**
 * Áudio por síntese de voz do navegador (Web Speech API).
 *
 * Limites assumidos e comunicados na interface:
 *  - A voz é SINTÉTICA e depende do navegador/sistema. Qualidade e sotaque variam.
 *  - Pode não existir (ou não haver voz em inglês). Nesse caso os exercícios de
 *    escuta viram "atividade adaptada" e não contam como evidência de compreensão oral.
 *  - Nada é enviado a servidores por este código.
 */
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

export interface SpeechInfo {
  /** A API existe neste navegador. */
  supported: boolean;
  /** Há como falar inglês (voz em inglês, ou lista vazia que usa a voz padrão do sistema). */
  available: boolean;
  /** Já sabemos a resposta (as vozes carregam de forma assíncrona). */
  ready: boolean;
  voices: SpeechSynthesisVoice[];
  voice: SpeechSynthesisVoice | null;
  /** Nome para exibir. */
  voiceLabel: string;
}

function synth(): SpeechSynthesis | null {
  if (typeof window === "undefined") return null;
  const s = window.speechSynthesis;
  return s && typeof s.speak === "function" && typeof window.SpeechSynthesisUtterance === "function" ? s : null;
}

const PREFERRED = [/google us english/i, /samantha/i, /aria/i, /jenny/i, /ava/i, /zira/i, /english.*united states/i];

export function pickVoice(voices: SpeechSynthesisVoice[], preferredURI?: string): SpeechSynthesisVoice | null {
  const english = voices.filter((v) => /^en([-_]|$)/i.test(v.lang));
  if (english.length === 0) return null;
  if (preferredURI) {
    const chosen = english.find((v) => v.voiceURI === preferredURI);
    if (chosen) return chosen;
  }
  const us = english.filter((v) => /^en[-_]US/i.test(v.lang));
  const pool = us.length ? us : english;
  for (const re of PREFERRED) {
    const hit = pool.find((v) => re.test(v.name));
    if (hit) return hit;
  }
  return pool.find((v) => v.default) ?? pool[0];
}

// ---- Lista de vozes como "store" externo: as vozes carregam de forma assíncrona. ----
const NO_VOICES: SpeechSynthesisVoice[] = [];
let voicesCache: SpeechSynthesisVoice[] = NO_VOICES;
let voicesSettled = false;
let watching = false;
const voiceListeners = new Set<() => void>();
const emitVoices = () => voiceListeners.forEach((l) => l());

function watchVoices(): void {
  if (watching) return;
  watching = true;
  const s = synth();
  if (!s) {
    voicesSettled = true;
    return;
  }
  const load = () => {
    const list = s.getVoices();
    if (list.length) {
      voicesCache = list;
      voicesSettled = true;
      emitVoices();
    }
  };
  load();
  s.addEventListener?.("voiceschanged", load);
  // Alguns navegadores nunca disparam o evento; depois de um tempo, seguimos com o que houver.
  window.setTimeout(() => {
    if (!voicesSettled) {
      voicesSettled = true;
      emitVoices();
    }
  }, 1500);
}

function subscribeVoices(listener: () => void): () => void {
  watchVoices();
  voiceListeners.add(listener);
  return () => voiceListeners.delete(listener);
}

export function useSpeechInfo(preferredURI?: string): SpeechInfo {
  const all = useSyncExternalStore(subscribeVoices, () => voicesCache, () => NO_VOICES);
  const settled = useSyncExternalStore(subscribeVoices, () => voicesSettled, () => false);
  const supported = useSyncExternalStore(subscribeVoices, () => synth() !== null, () => false);

  const voice = pickVoice(all, preferredURI);
  // Lista vazia: o sistema ainda pode falar inglês com a voz padrão (comum no Android).
  const available = supported && (voice !== null || all.length === 0);
  return {
    supported,
    available,
    ready: settled,
    voices: all.filter((v) => /^en([-_]|$)/i.test(v.lang)),
    voice,
    voiceLabel: voice ? `${voice.name} (${voice.lang})` : supported ? "Voz padrão do sistema" : "Indisponível",
  };
}

export interface Speaker {
  info: SpeechInfo;
  speaking: boolean;
  /** Índice da fala em reprodução (para destacar a linha). */
  activeIndex: number | null;
  /** Fala uma ou várias frases em sequência. `slow` usa a velocidade reduzida das configurações. */
  speak: (text: string | string[], opts?: { slow?: boolean; startIndex?: number }) => void;
  stop: () => void;
}

export function useSpeaker(opts: { voiceURI?: string; slowRate?: number } = {}): Speaker {
  const info = useSpeechInfo(opts.voiceURI);
  const [speaking, setSpeaking] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const token = useRef(0);
  const slowRate = opts.slowRate ?? 0.65;
  const voice = info.voice;

  const stop = useCallback(() => {
    token.current += 1;
    synth()?.cancel();
    setSpeaking(false);
    setActiveIndex(null);
  }, []);

  const speak = useCallback(
    (text: string | string[], o: { slow?: boolean; startIndex?: number } = {}) => {
      const s = synth();
      if (!s) return;
      const lines = (Array.isArray(text) ? text : [text]).filter((l) => l.trim().length > 0);
      if (lines.length === 0) return;
      token.current += 1;
      const mine = token.current;
      s.cancel();
      setSpeaking(true);

      const say = (i: number) => {
        if (mine !== token.current) return;
        if (i >= lines.length) {
          setSpeaking(false);
          setActiveIndex(null);
          return;
        }
        const u = new SpeechSynthesisUtterance(lines[i]);
        if (voice) u.voice = voice;
        u.lang = voice?.lang ?? "en-US";
        u.rate = o.slow ? slowRate : 0.95;
        u.onend = () => say(i + 1);
        u.onerror = () => {
          if (mine === token.current) {
            setSpeaking(false);
            setActiveIndex(null);
          }
        };
        setActiveIndex((o.startIndex ?? 0) + i);
        s.speak(u);
      };
      say(0);
    },
    [voice, slowRate],
  );

  // Para qualquer fala ao sair da tela.
  useEffect(() => () => synth()?.cancel(), []);

  return { info, speaking, activeIndex, speak, stop };
}

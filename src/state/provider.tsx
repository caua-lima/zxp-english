"use client";

/**
 * Liga o ProgressStore ao React. O store é um singleton do navegador: vive
 * enquanto a aba estiver aberta e é compartilhado por todas as telas.
 */
import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import type { ProgressState } from "@/engine/model";
import { dateKey, now as clockNow } from "@/engine/dates";
import { createRepository } from "@/persistence/idb";
import { ProgressStore, type StoreSnapshot } from "./store";

let singleton: ProgressStore | null = null;

function getStore(): ProgressStore {
  if (!singleton) singleton = new ProgressStore(createRepository);
  return singleton;
}

const StoreContext = createContext<ProgressStore | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const store = useMemo(() => getStore(), []);
  useEffect(() => {
    void store.init();
  }, [store]);
  return (
    <StoreContext.Provider value={store}>
      <ThemeSync />
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): ProgressStore {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useStore precisa estar dentro de <ProgressProvider>");
  return store;
}

export function useSnapshot(): StoreSnapshot {
  const store = useStore();
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
}

/** Estado do progresso; null enquanto carrega. */
export function useProgress(): ProgressState | null {
  return useSnapshot().state;
}

/**
 * "Agora", atualizado a cada minuto e quando a aba volta a ficar visível, para
 * que a virada do dia apareça sem recarregar a página.
 */
export function useNow(): Date {
  const [tick, setTick] = useState(() => clockNow());
  useEffect(() => {
    const update = () => setTick(clockNow());
    const id = window.setInterval(update, 60_000);
    document.addEventListener("visibilitychange", update);
    window.addEventListener("focus", update);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("focus", update);
    };
  }, []);
  return tick;
}

/** Dia de hoje no fuso configurado. */
export function useToday(): string {
  const state = useProgress();
  const now = useNow();
  return dateKey(now, state?.settings.timezone ?? "America/Sao_Paulo");
}

/** Mantém tema e movimento reduzido em sincronia com as configurações. */
function ThemeSync() {
  const state = useProgress();
  const theme = state?.settings.theme;
  const motion = state?.settings.reducedMotion;

  useEffect(() => {
    if (!theme || !motion) return;
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const dark = theme === "dark" || (theme === "system" && mq.matches);
      root.setAttribute("data-theme", dark ? "dark" : "light");
      if (motion === "on") root.setAttribute("data-motion", "reduce");
      else if (motion === "off") root.setAttribute("data-motion", "full");
      else root.removeAttribute("data-motion");
    };
    apply();
    try {
      localStorage.setItem("zxp-theme", theme);
      localStorage.setItem("zxp-motion", motion);
    } catch {
      /* localStorage indisponível: o tema ainda funciona, só pode piscar ao recarregar */
    }
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme, motion]);

  return null;
}

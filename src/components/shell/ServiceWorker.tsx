"use client";

import { useEffect } from "react";

/**
 * Registra o service worker (só em produção e em contexto seguro: https ou localhost).
 * Sem ele o app continua funcionando normalmente online; é apenas um reforço offline.
 */
export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* sem service worker o app segue online normalmente */
    });
  }, []);
  return null;
}

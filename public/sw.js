/*
 * Service worker do ZXP English.
 *
 * Objetivo: depois de abrir o app online uma vez, as telas e as unidades que você já
 * abriu continuam funcionando sem internet. O progresso nunca passa por aqui (fica no
 * IndexedDB do navegador).
 *
 * Estratégia:
 *  - /_next/static/* (arquivos com hash no nome, imutáveis): cache primeiro.
 *  - Demais GETs do mesmo domínio (páginas, dados de navegação): rede primeiro, com cópia
 *    no cache como reserva. Assim, online, você sempre recebe a versão mais nova.
 * Limitação conhecida: uma unidade que você nunca abriu não está no cache.
 */
const CACHE = "zxp-english-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname === "/sw.js") return;

  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(req));
    return;
  }
  event.respondWith(networkFirst(req));
});

async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) cache.put(req, res.clone());
  return res;
}

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    const hit = await cache.match(req, { ignoreSearch: req.mode === "navigate" });
    if (hit) return hit;
    throw err;
  }
}

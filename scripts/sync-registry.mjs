// Atualiza a lista LOADERS em src/content/registry.ts conforme os arquivos em src/content/units.
// Rodar: node scripts/sync-registry.mjs
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const ids = readdirSync("src/content/units")
  .filter((f) => /^(a1|a2|b1|b2)-u0[1-8]\.ts$/.test(f))
  .map((f) => f.replace(/\.ts$/, ""))
  .sort();

const path = "src/content/registry.ts";
const src = readFileSync(path, "utf8");
const start = src.indexOf("export const LOADERS");
const end = src.indexOf("};", start) + 2;
const body = ids.map((id) => `  "${id}": () => import("./units/${id}"),`).join("\n");
const next = `${src.slice(0, start)}export const LOADERS: Record<string, Loader> = {\n${body}\n};${src.slice(end)}`;
writeFileSync(path, next);
console.log(`${ids.length} unidades registradas`);

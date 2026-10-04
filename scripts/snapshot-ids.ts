/**
 * Gera `tests/content/ids.snapshot.json` com todos os IDs publicados.
 * O teste `ids.test.ts` falha se algum ID do snapshot desaparecer (renomear ou remover
 * quebraria o progresso salvo dos usuários). Novos IDs são permitidos.
 * Uso: npx tsx scripts/snapshot-ids.ts
 */
import { writeFileSync } from "node:fs";
import { loadAllPublished } from "../src/content/registry";
import { exercisesOf } from "../src/content/iter";

async function main() {
  const units = await loadAllPublished();
  const ids: string[] = [];
  for (const u of units) {
    ids.push(u.id);
    for (const l of u.lessons) ids.push(l.id);
    ids.push(u.checkpoint.id);
    for (const c of u.concepts) ids.push(c.id);
    for (const a of Object.values(u.activities)) ids.push(a.id);
    for (const { ex } of exercisesOf(u)) ids.push(ex.id);
  }
  const sorted = [...new Set(ids)].sort();
  writeFileSync("tests/content/ids.snapshot.json", JSON.stringify(sorted, null, 0) + "\n");
  console.log(`${sorted.length} IDs gravados`);
}
void main();

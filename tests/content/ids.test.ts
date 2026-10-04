import { describe, expect, it } from "vitest";
import snapshot from "./ids.snapshot.json";
import { loadAllPublished } from "@/content/registry";
import { exercisesOf } from "@/content/iter";

/**
 * IDs são estáveis: o progresso salvo dos usuários aponta para eles.
 * Adicionar IDs é permitido; remover ou renomear exige decisão consciente
 * (e regerar o snapshot com `npx tsx scripts/snapshot-ids.ts` + migração de dados).
 */
describe("IDs estáveis", () => {
  it("nenhum ID publicado anteriormente desapareceu", async () => {
    const units = await loadAllPublished();
    const current = new Set<string>();
    for (const u of units) {
      current.add(u.id);
      u.lessons.forEach((l) => current.add(l.id));
      current.add(u.checkpoint.id);
      u.concepts.forEach((c) => current.add(c.id));
      Object.values(u.activities).forEach((a) => current.add(a.id));
      exercisesOf(u).forEach(({ ex }) => current.add(ex.id));
    }
    const missing = (snapshot as string[]).filter((id) => !current.has(id));
    expect(missing).toEqual([]);
  });

  it("não há IDs duplicados entre exercícios de todas as unidades", async () => {
    const units = await loadAllPublished();
    const seen = new Set<string>();
    const dup: string[] = [];
    for (const u of units) {
      for (const { ex } of exercisesOf(u)) {
        if (seen.has(ex.id)) dup.push(ex.id);
        seen.add(ex.id);
      }
    }
    expect(dup).toEqual([]);
  });
});

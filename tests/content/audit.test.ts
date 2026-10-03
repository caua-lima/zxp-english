import { describe, expect, it } from "vitest";
import { CURRICULUM } from "@/content/curriculum";
import { LOADERS, loadAllPublished } from "@/content/registry";
import { auditMeta, auditUnits } from "@/content/audit";
import { STAGES } from "@/content/schema";

/**
 * Durante o desenvolvimento, `ZXP_ALLOW_PARTIAL=1` permite rodar com unidades ainda
 * não escritas. A versão final de `npm test` NÃO usa essa variável: todas as 32 unidades
 * precisam estar publicadas.
 */
const ALLOW_PARTIAL = process.env.ZXP_ALLOW_PARTIAL === "1";

describe("mapa curricular", () => {
  it("tem 4 etapas com 8 unidades cada, em ordem", () => {
    expect(CURRICULUM).toHaveLength(32);
    for (const stage of STAGES) {
      const units = CURRICULUM.filter((m) => m.stage === stage);
      expect(units.map((u) => u.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
      expect(units.every((u) => u.id === `${stage}-u0${u.order}`)).toBe(true);
    }
  });

  it("não tem pré-requisito inexistente, posterior nem ciclo", () => {
    expect(auditMeta(CURRICULUM).filter((i) => i.level === "error")).toEqual([]);
  });

  it("toda unidade tem objetivos comunicativos concretos", () => {
    for (const m of CURRICULUM) {
      expect(m.canDo.length).toBeGreaterThanOrEqual(3);
      expect(m.lessonCount).toBeGreaterThanOrEqual(4);
    }
  });
});

describe("conteúdo publicado", () => {
  it("todas as 32 unidades estão publicadas", () => {
    const missing = CURRICULUM.filter((m) => !(m.id in LOADERS)).map((m) => m.id);
    if (ALLOW_PARTIAL) return;
    expect(missing).toEqual([]);
  });

  it("passa na auditoria sem nenhum erro", async () => {
    const units = await loadAllPublished();
    const issues = auditUnits(units, CURRICULUM).filter((i) => i.level === "error");
    expect(issues.map((i) => `[${i.unit}] ${i.where}: ${i.message}`)).toEqual([]);
  });

  it("cada unidade tem no mínimo 4 lições, um checkpoint de duas versões e as 5 atividades", async () => {
    const units = await loadAllPublished();
    for (const u of units) {
      expect(u.lessons.length).toBeGreaterThanOrEqual(4);
      expect(u.checkpoint.setA).toHaveLength(10);
      expect(u.checkpoint.setB).toHaveLength(10);
      expect(Object.keys(u.activities).sort()).toEqual(["listening", "mission", "reading", "speaking", "writing"]);
    }
  });
});

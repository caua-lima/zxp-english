import { test, expect, type Page } from "@playwright/test";
import { completeLesson, fakeSpeech, onboard, startLesson } from "./helpers";

/**
 * Varredura automática de acessibilidade (axe-core, regras WCAG 2.x A/AA) nas telas
 * principais, nos dois temas. Não substitui teste com leitor de tela real.
 */
const AXE = require.resolve("axe-core/axe.min.js");

async function scan(page: Page, where: string) {
  await page.addScriptTag({ path: AXE });
  const result = await page.evaluate(async () => {
    // @ts-expect-error axe é injetado
    const r = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } });
    return r.violations.map((v: { id: string; impact: string; nodes: { target: string[] }[] }) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.slice(0, 3).map((n) => n.target.join(" ")),
    }));
  });
  expect(result, `violações de acessibilidade em ${where}`).toEqual([]);
}

test.beforeEach(async ({ page }) => {
  await fakeSpeech(page);
});

for (const theme of ["Escuro", "Claro"] as const) {
  test(`telas principais sem violações do axe — tema ${theme.toLowerCase()}`, async ({ page }) => {
    await onboard(page);
    await completeLesson(page, "a1-u01-l1");
    await page.goto("/ajustes");
    await page.getByRole("group", { name: "Tema" }).getByRole("button", { name: theme }).click();
    for (const path of ["/", "/trilha", "/unidade/a1-u01", "/revisar", "/erros", "/biblioteca", "/progresso", "/semana", "/ajustes", "/mais"]) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await scan(page, `${path} (${theme})`);
    }
  });

  test(`lição e exercício sem violações do axe — tema ${theme.toLowerCase()}`, async ({ page }) => {
    await onboard(page);
    await page.goto("/ajustes");
    await page.getByRole("group", { name: "Tema" }).getByRole("button", { name: theme }).click();
    await startLesson(page, "a1-u01-l1");
    await scan(page, `lição (${theme})`);
  });
}

import { expect, test, type Page } from "@playwright/test";
import { CURRICULUM, lessonIdsOf } from "@/content/curriculum";
import { ACTIVITY_KINDS } from "@/content/schema";
import { answer, CARD, expectNoHorizontalScroll, fakeSpeech, next, onboard, startLesson } from "./helpers";

/**
 * Percorre o currículo INTEIRO pela interface real: todas as lições, todos os checkpoints e
 * todas as atividades das 32 unidades, respondendo com o gabarito do próprio conteúdo.
 * Em cada exercício confere que a tela não rola na horizontal.
 *
 * É lento (vários minutos), então só roda com `ZXP_FULL=1 npx playwright test curriculo-completo`.
 */
test.skip(process.env.ZXP_FULL !== "1", "Execute com ZXP_FULL=1 (percurso completo do currículo)");
test.setTimeout(10 * 60_000);
test.use({ actionTimeout: 15_000 });

test.beforeEach(async ({ page }) => {
  await fakeSpeech(page);
});

async function runSession(page: Page, label: string) {
  for (let i = 0; i < 60; i++) {
    await page.waitForTimeout(60);
    if ((await page.locator(CARD).count()) === 0) return;
    await expectNoHorizontalScroll(page);
    await answer(page, "right");
    await expectNoHorizontalScroll(page); // com o feedback aberto
    await next(page);
  }
  throw new Error(`${label}: a sessão não terminou`);
}

async function startAt(page: Page, unitId: string) {
  if (unitId === "a1-u01") return;
  await page.goto("/ajustes");
  await page.getByRole("region", { name: "Ponto de partida" }).locator("select").selectOption(unitId);
  await page.getByRole("button", { name: "Aplicar ponto de partida" }).click();
  await page.getByRole("button", { name: "Aplicar", exact: true }).click();
  await expect(page.getByText("escolha manual")).toBeVisible();
}

for (const meta of CURRICULUM) {
  test(`${meta.id}: lições, checkpoint e atividades`, async ({ page }) => {
    await onboard(page);
    await startAt(page, meta.id);

    for (const lessonId of lessonIdsOf(meta)) {
      await startLesson(page, lessonId);
      await runSession(page, lessonId);
      await expect(page.getByRole("heading", { name: "Lição concluída" }), lessonId).toBeVisible();
    }

    await page.goto(`/checkpoint/${meta.id}`);
    await page.getByRole("button", { name: "Começar o checkpoint" }).click();
    await runSession(page, `${meta.id} checkpoint`);
    await expect(page.getByRole("heading", { name: "Checkpoint aprovado" }), `${meta.id} checkpoint`).toBeVisible();

    for (const kind of ACTIVITY_KINDS) {
      await page.goto(`/atividade/${meta.id}/${kind}`);
      await page.getByRole("button", { name: /^Começar/ }).click();
      await runSession(page, `${meta.id} ${kind}`);
      const later = page.getByRole("button", { name: "Vou fazer depois" });
      if (await later.isVisible().catch(() => false)) await later.click();
      await expect(page.getByRole("heading", { name: "Atividade concluída" }), `${meta.id} ${kind}`).toBeVisible();
    }
  });
}


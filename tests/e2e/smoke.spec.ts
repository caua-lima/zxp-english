import { expect, test, type Page } from "@playwright/test";
import { answer, next, onboard, startLesson } from "./helpers";

/** `ZXP_SHOTS=1` grava capturas em tests/e2e/shots (para inspeção visual). */
const SHOTS = process.env.ZXP_SHOTS === "1";
const shot = async (page: Page, name: string) => {
  if (SHOTS) await page.screenshot({ path: `tests/e2e/shots/${name}.png`, fullPage: true });
};

test("primeiro acesso: configuração, início, trilha, unidade e começo da lição", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/bem-vindo/);
  await shot(page, "01-boas-vindas");
  await onboard(page);
  await shot(page, "02-inicio");

  await page.goto("/trilha");
  await expect(page.getByRole("heading", { name: "Trilha" })).toBeVisible();
  await shot(page, "03-trilha");

  await page.goto("/unidade/a1-u01");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Primeiros contatos");
  await shot(page, "04-unidade");

  await page.goto("/licao/a1-u01-l1");
  await expect(page.getByText("Objetivo desta lição")).toBeVisible();
  await shot(page, "05-licao-contexto");
  await page.getByRole("button", { name: "Entendi o contexto" }).click();
  await shot(page, "06-licao-explicacao");
  await page.getByRole("button", { name: "Praticar" }).click();
  await shot(page, "07-exercicio");
  await answer(page, "wrong");
  await shot(page, "08-feedback-erro");
  await next(page);
  await answer(page, "right");
  await shot(page, "09-feedback-acerto");
});

test("lição completa mostra o resumo", async ({ page }) => {
  await onboard(page);
  await startLesson(page, "a1-u01-l1");
  for (let i = 0; i < 30; i++) {
    await page.waitForTimeout(80);
    if ((await page.locator("article[aria-labelledby^=ex-]").count()) === 0) break;
    const ex = await answer(page, "right");
    await shot(page, `10-passo-${String(i).padStart(2, "0")}-${ex.kind}`);
    await next(page);
  }
  await expect(page.getByRole("heading", { name: "Lição concluída" })).toBeVisible();
  await shot(page, "11-resultado");
});

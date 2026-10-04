import { expect, test } from "@playwright/test";
import { completeLesson, fakeSpeech, finishSession, onboard, readRows, startLesson } from "./helpers";

const DAY1 = new Date("2026-10-01T15:00:00Z"); // 12:00 em São Paulo
const DAY = 86_400_000;

test.beforeEach(async ({ page }) => {
  await fakeSpeech(page);
});

test("revisões com passagem simulada de dias", async ({ page }) => {
  await page.clock.install({ time: DAY1 });
  await onboard(page);
  await completeLesson(page, "a1-u01-l1");

  // Dia 1: nada vence no próprio dia do estudo.
  await page.goto("/revisar");
  await expect(page.getByRole("heading", { name: "Nada vence hoje" })).toBeVisible();

  // Dia 2: os itens da lição vencem.
  await page.clock.setSystemTime(new Date(DAY1.getTime() + DAY));
  await page.reload();
  await expect(page.getByRole("heading", { name: /\d+ itens para hoje/ })).toBeVisible();
  const before = await readRows<{ id: string; prod: { due: string | null; level: number }; rec: { due: string | null; level: number } }>(page, "concepts");
  expect(before.some((c) => c.prod.due === "2026-10-02" || c.rec.due === "2026-10-02")).toBe(true);

  await page.getByRole("link", { name: "Começar a revisão" }).click();
  await expect(page).toHaveURL(/pratica\/revisao/);
  await finishSession(page);
  await expect(page.getByRole("heading", { name: "Revisão feita" })).toBeVisible();

  // Tudo o que foi revisado saiu da fila de hoje e foi reagendado para frente.
  const after = await readRows<{ id: string; prod: { due: string | null }; rec: { due: string | null } }>(page, "concepts");
  for (const c of after) {
    if (c.prod.due) expect(c.prod.due > "2026-10-02").toBe(true);
    if (c.rec.due) expect(c.rec.due > "2026-10-02").toBe(true);
  }
  const reviews = (await readRows<{ context: string }>(page, "attempts")).filter((a) => a.context === "review");
  expect(reviews.length).toBeGreaterThan(5);

  await page.goto("/revisar");
  await expect(page.getByRole("heading", { name: "Revisões de hoje feitas" })).toBeVisible();

  // Dia 3: quem tinha nível 1 e subiu para 2 só volta em 3 dias; nada novo ainda para muitos itens.
  // Dia 6: os itens voltam.
  await page.clock.setSystemTime(new Date(DAY1.getTime() + 5 * DAY));
  await page.reload();
  await expect(page.getByRole("heading", { name: /\d+ ite(m|ns) para hoje/ })).toBeVisible();
});

test("depois de dias sem estudar, o início avisa, propõe um plano leve e não apaga nada", async ({ page }) => {
  await page.clock.install({ time: DAY1 });
  await onboard(page);
  await completeLesson(page, "a1-u01-l1");
  const conceptsBefore = (await readRows(page, "concepts")).length;

  await page.clock.setSystemTime(new Date(DAY1.getTime() + 6 * DAY));
  await page.goto("/");
  await expect(page.getByText("Que bom ter você de volta")).toBeVisible();
  await expect(page.getByText(/Faz 6 dias desde o último estudo/)).toBeVisible();
  await expect(page.getByText("0 dias seguidos")).toBeVisible();
  // O aprendizado continua lá.
  expect((await readRows(page, "concepts")).length).toBe(conceptsBefore);
  await expect(page.getByText(/1 de 128 lições concluídas/)).toBeVisible();
  // Plano: revisão primeiro.
  await expect(page.getByRole("list", { name: "Plano de hoje" }).getByRole("listitem").first()).toContainText("Revisar");
});

test("caderno de erros: guarda o erro com explicação e oferece prática direcionada", async ({ page }) => {
  await onboard(page);
  await startLesson(page, "a1-u01-l1");
  await finishSession(page, { wrong: 2 });
  await expect(page.getByRole("heading", { name: "Lição concluída" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Para reforçar" })).toBeVisible();

  await page.goto("/erros");
  await expect(page.getByRole("heading", { name: "Caderno de erros" })).toBeVisible();
  const list = page.getByRole("list", { name: "Para praticar" });
  await expect(list.getByRole("listitem").first()).toBeVisible();
  await expect(list.getByText("Você respondeu").first()).toBeVisible();
  await expect(list.getByText("Explicação").first()).toBeVisible();
  // Erros recentes ficam "pendentes" ou "em recuperação"; nunca somem nem viram "resolvido" no mesmo dia.
  await expect(list.getByText(/^(Pendente|Em recuperação)$/).first()).toBeVisible();
  await expect(page.getByText(/^Resolvidos/)).toHaveCount(0);

  await list.getByRole("link", { name: "Praticar este item" }).first().click();
  await expect(page).toHaveURL(/pratica\/erros\?c=/);
  await finishSession(page);
  await expect(page.getByRole("heading", { name: "Prática feita" })).toBeVisible();

  const attempts = await readRows<{ context: string }>(page, "attempts");
  expect(attempts.some((a) => a.context === "notebook")).toBe(true);
});

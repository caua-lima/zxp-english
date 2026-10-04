import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { answer, completeLesson, countRows, fakeSpeech, onboard, readRows, readXp, startLesson } from "./helpers";

test.beforeEach(async ({ page }) => {
  await fakeSpeech(page);
});

test("backup e restauração: exportar, apagar tudo e restaurar pelo arquivo", async ({ page }) => {
  await onboard(page);
  await completeLesson(page, "a1-u01-l1");
  const xp = await readXp(page);
  const attempts = await countRows(page, "attempts");
  expect(xp).toBeGreaterThan(0);

  await page.goto("/ajustes#backup");
  const [download] = await Promise.all([page.waitForEvent("download"), page.getByRole("button", { name: /Exportar backup/ }).click()]);
  expect(download.suggestedFilename()).toMatch(/^zxp-english-backup-\d{4}-\d{2}-\d{2}\.json$/);
  const file = await download.path();
  const backup = JSON.parse(readFileSync(file, "utf8"));
  expect(backup).toMatchObject({ app: "zxp-english", schemaVersion: 1 });
  expect(backup.data.lessons["a1-u01-l1"].status).toBe("completed");
  await expect(page.getByText("Backup exportado")).toBeVisible();

  // Apagar exige a palavra de confirmação.
  await page.getByRole("button", { name: "Apagar todo o progresso" }).click();
  const confirm = page.getByRole("button", { name: "Apagar definitivamente" });
  await expect(confirm).toBeDisabled();
  await page.getByRole("dialog").getByRole("textbox").fill("apagar");
  await confirm.click();

  // Sem progresso, o app volta para a configuração inicial.
  await expect(page).toHaveURL(/bem-vindo/);
  expect(await readXp(page)).toBe(0);
  expect(await countRows(page, "attempts")).toBe(0);

  // Restaurar pelo próprio fluxo de boas-vindas.
  await page.getByRole("button", { name: "Começar" }).click();
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.setInputFiles("#backup-file", file);
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("Substituir o progresso deste navegador?");
  await expect(dialog).toContainText("1 lições concluídas");
  await dialog.getByRole("button", { name: "Substituir pelo backup" }).click();

  await expect(page).toHaveURL(/\/$/);
  expect(await readXp(page)).toBe(xp);
  expect(await countRows(page, "attempts")).toBe(attempts);
  await expect(page.getByText(/1 de 128 lições concluídas/)).toBeVisible();

  // E continua lá depois de recarregar.
  await page.reload();
  await expect(page.getByText(/1 de 128 lições concluídas/)).toBeVisible();
});

test("importação inválida não altera o progresso", async ({ page }) => {
  await onboard(page);
  await completeLesson(page, "a1-u01-l1");
  const xp = await readXp(page);
  const lessons = await readRows(page, "lessons");
  await page.goto("/ajustes#backup");

  const cases: { name: string; body: string; message: RegExp }[] = [
    { name: "nao-e-json.json", body: "isto não é um backup {", message: /não é um JSON válido/ },
    { name: "outro-app.json", body: JSON.stringify({ app: "outro", schemaVersion: 1, exportedAt: "2026-01-01T00:00:00Z", data: {} }), message: /não parece ser um backup/ },
    {
      name: "versao-futura.json",
      body: JSON.stringify({ app: "zxp-english", schemaVersion: 99, exportedAt: "2026-01-01T00:00:00Z", data: {} }),
      message: /versão mais nova/,
    },
    {
      name: "corrompido.json",
      body: JSON.stringify({ app: "zxp-english", schemaVersion: 1, exportedAt: "2026-01-01T00:00:00Z", data: { lessons: "quebrado" } }),
      message: /corrompido ou incompleto/,
    },
  ];

  for (const c of cases) {
    await page.setInputFiles("#backup-file", { name: c.name, mimeType: "application/json", buffer: Buffer.from(c.body) });
    const alert = page.getByRole("alert").filter({ hasText: "Backup não importado" });
    await expect(alert).toContainText(c.message);
    await expect(alert).toContainText("Seu progresso atual continua intacto");
    await expect(page.getByRole("dialog")).toHaveCount(0); // nem chega a pedir confirmação
    expect(await readXp(page)).toBe(xp);
    expect(await readRows(page, "lessons")).toEqual(lessons);
  }
});

test("cancelar a restauração mantém o progresso atual", async ({ page }) => {
  await onboard(page);
  await completeLesson(page, "a1-u01-l1");
  const xp = await readXp(page);
  await page.goto("/ajustes#backup");
  const [download] = await Promise.all([page.waitForEvent("download"), page.getByRole("button", { name: /Exportar backup/ }).click()]);
  const file = await download.path();

  await startLesson(page, "a1-u01-l2");
  await answer(page, "right");
  const xpNow = await readXp(page);
  expect(xpNow).toBeGreaterThan(xp);

  await page.goto("/ajustes#backup");
  await page.setInputFiles("#backup-file", file);
  await page.getByRole("dialog").getByRole("button", { name: "Cancelar" }).click();
  expect(await readXp(page)).toBe(xpNow);
});

test("falha ao salvar: aviso claro, estado mantido e recuperação", async ({ page }) => {
  await onboard(page);
  await startLesson(page, "a1-u01-l1");

  // Simula o navegador recusando gravações (disco cheio).
  await page.evaluate(() => {
    const w = window as unknown as { __put?: IDBObjectStore["put"] };
    w.__put = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function () {
      throw new DOMException("sem espaço", "QuotaExceededError");
    };
  });
  await answer(page, "right");
  const alert = page.getByRole("alert").filter({ hasText: "Seu progresso não foi salvo" });
  await expect(alert).toBeVisible();
  await expect(alert).toContainText("Sem espaço para salvar");
  expect(await countRows(page, "attempts")).toBe(0); // nada gravado, nada pela metade

  // O armazenamento volta: "Tentar salvar de novo" grava tudo o que estava pendente.
  await page.evaluate(() => {
    const w = window as unknown as { __put: IDBObjectStore["put"] };
    IDBObjectStore.prototype.put = w.__put;
  });
  await alert.getByRole("button", { name: "Tentar salvar de novo" }).click();
  await expect(alert).toHaveCount(0);
  expect(await countRows(page, "attempts")).toBe(1);
});

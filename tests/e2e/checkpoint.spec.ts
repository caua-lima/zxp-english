import { expect, test } from "@playwright/test";
import { answer, CARD, currentExerciseId, fakeSpeech, finishSession, next, onboard, readRows } from "./helpers";

test.beforeEach(async ({ page }) => {
  await fakeSpeech(page);
});

test("checkpoint aprovado desbloqueia a próxima unidade (teste para pular)", async ({ page }) => {
  await onboard(page);

  // Antes: a unidade 2 está bloqueada.
  await page.goto("/unidade/a1-u02");
  await expect(page.getByText("Unidade bloqueada")).toBeVisible();

  await page.goto("/checkpoint/a1-u01");
  await expect(page.getByText("Você está testando para pular")).toBeVisible();
  await page.getByRole("button", { name: "Começar o checkpoint" }).click();

  // Sem pistas nem "mostrar resposta" no checkpoint.
  await expect(page.locator(CARD)).toBeVisible();
  await expect(page.getByRole("button", { name: /Pista/ })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Mostrar resposta" })).toHaveCount(0);
  expect(await currentExerciseId(page)).toContain("-cp-a-");

  await finishSession(page);
  await expect(page.getByRole("heading", { name: "Checkpoint aprovado" })).toBeVisible();
  await expect(page.getByText("10 de 10 acertos independentes (100%)")).toBeVisible();
  await expect(page.getByText("aprovada por teste")).toBeVisible();

  const units = await readRows<{ id: string; passedAt: string | null; attempts: { set: string; passed: boolean }[] }>(page, "units");
  expect(units[0].passedAt).not.toBeNull();
  expect(units[0].attempts).toEqual([expect.objectContaining({ set: "A", passed: true })]);

  // Depois: a unidade 2 abriu, e a 1 aparece como aprovada por teste (não como concluída).
  await page.goto("/trilha");
  await expect(page.getByRole("link", { name: /Unidade 1: Olá! Primeiros contatos\. Aprovada por teste/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Unidade 2: Quem sou eu\. Disponível/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Unidade 3: Família e pessoas\. Bloqueada/ })).toBeVisible();
});

test("checkpoint reprovado: mostra o que reforçar, não libera, e a nova tentativa usa outra versão", async ({ page }) => {
  await onboard(page);
  await page.goto("/checkpoint/a1-u01");
  await page.getByRole("button", { name: "Começar o checkpoint" }).click();
  await finishSession(page, { wrong: 4 });

  await expect(page.getByRole("heading", { name: "Ainda não foi desta vez" })).toBeVisible();
  await expect(page.getByText("6 de 10 acertos independentes (60%)")).toBeVisible();
  await expect(page.getByRole("heading", { name: "O que reforçar antes de tentar de novo" })).toBeVisible();
  await expect(page.getByText("Lições para rever:")).toBeVisible();

  await page.goto("/unidade/a1-u02");
  await expect(page.getByText("Unidade bloqueada")).toBeVisible();

  await page.goto("/checkpoint/a1-u01");
  await expect(page.getByText(/versão B/).first()).toBeVisible();
  await expect(page.getByText(/Agora você fará a versão B, com perguntas diferentes/)).toBeVisible();
  await page.getByRole("button", { name: "Começar o checkpoint" }).click();
  expect(await currentExerciseId(page)).toContain("-cp-b-");

  // Erros do checkpoint vão para o caderno de erros.
  await page.goto("/erros");
  await expect(page.getByRole("heading", { name: "Para praticar" })).toBeVisible();
  await expect(page.getByText("Você respondeu").first()).toBeVisible();
});

test("checkpoint interrompido é retomado na mesma versão e na mesma pergunta", async ({ page }) => {
  await onboard(page);
  await page.goto("/checkpoint/a1-u01");
  await page.getByRole("button", { name: "Começar o checkpoint" }).click();
  await answer(page, "right");
  await next(page);
  await answer(page, "wrong");
  await next(page);
  const third = await currentExerciseId(page);
  await expect(page.getByText("3/10")).toBeVisible();

  await page.reload();
  await expect(page.locator(CARD)).toBeVisible();
  expect(await currentExerciseId(page)).toBe(third);
  await expect(page.getByText("3/10")).toBeVisible();

  await finishSession(page);
  await expect(page.getByText("9 de 10 acertos independentes (90%)")).toBeVisible();
});

test("a tarefa de produção é autoavaliada e fica registrada à parte", async ({ page }) => {
  await onboard(page);
  await page.goto("/checkpoint/a1-u01");
  await page.getByRole("button", { name: "Começar o checkpoint" }).click();
  await finishSession(page);
  await page.getByRole("button", { name: "Fazer a tarefa de produção" }).click();
  await answer(page, "right");
  await expect(page.getByRole("status", { name: "Resultado" })).toContainText("Não é uma nota nem uma correção externa");
  await next(page);
  await expect(page.getByText("Feita (autoavaliação)")).toBeVisible();

  const tasks = await readRows<{ kind: string; status: string }>(page, "tasks");
  expect(tasks).toEqual([expect.objectContaining({ kind: "production", status: "self_assessed" })]);
  // O resultado do checkpoint não mudou por causa da tarefa.
  await expect(page.getByText("10 de 10 acertos independentes (100%)")).toBeVisible();
});

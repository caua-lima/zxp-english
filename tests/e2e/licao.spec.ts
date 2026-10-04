import { expect, test } from "@playwright/test";
import { answer, CARD, completeLesson, countRows, currentExerciseId, exerciseById, fakeSpeech, fill, next, onboard, readRows, readXp, startLesson } from "./helpers";

test.beforeEach(async ({ page }) => {
  await fakeSpeech(page);
});

test("início e conclusão de uma lição: XP, resumo e próxima lição liberada", async ({ page }) => {
  await onboard(page);
  await completeLesson(page, "a1-u01-l1");

  await expect(page.getByRole("heading", { name: "O essencial desta lição" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Enviado para revisão" })).toBeVisible();
  expect(await readXp(page)).toBeGreaterThan(20);

  const lessons = await readRows<{ id: string; status: string; session: unknown }>(page, "lessons");
  expect(lessons).toEqual([expect.objectContaining({ id: "a1-u01-l1", status: "completed", session: null })]);

  await page.getByRole("link", { name: /Próxima lição/ }).click();
  await expect(page).toHaveURL(/licao\/a1-u01-l2/);
  await expect(page.getByText("Objetivo desta lição")).toBeVisible();
});

test("resposta errada: mostra a resposta dada, a esperada, a explicação e reapresenta o item depois", async ({ page }) => {
  await onboard(page);
  await startLesson(page, "a1-u01-l1");
  const first = await currentExerciseId(page);
  await expect(page.getByText("1/11")).toBeVisible();

  await answer(page, "wrong");
  const result = page.getByRole("status", { name: "Resultado" });
  await expect(result).toContainText("Ainda não");
  await expect(result).toContainText("Sua resposta");
  await expect(result).toContainText("Resposta esperada");
  await expect(result).toContainText("Good morning!");
  await expect(result).toContainText("Por quê");
  await expect(result).toContainText("Este item volta daqui a pouco");
  await expect(page.getByText("1/12")).toBeVisible(); // a fila cresceu: o item voltará

  await next(page);
  for (let i = 0; i < 3; i++) {
    expect(await currentExerciseId(page)).not.toBe(first); // outros itens no meio
    await answer(page, "right");
    await next(page);
  }
  expect(await currentExerciseId(page)).toBe(first);
  await expect(page.locator(CARD)).toContainText("De novo");

  // Acertar na reapresentação não vira "acerto independente".
  await answer(page, "right");
  const attempts = await readRows<{ exerciseId: string; independent: boolean; retry?: boolean; outcome: string }>(page, "attempts");
  const mine = attempts.filter((a) => a.exerciseId === first);
  expect(mine).toHaveLength(2);
  expect(mine.find((a) => a.retry)).toMatchObject({ outcome: "correct", independent: false });
});

test("resposta digitada errada mostra a forma completa e marca a diferença", async ({ page }) => {
  await onboard(page);
  await completeLesson(page, "a1-u01-l1"); // a lição 2 só abre depois da 1
  await startLesson(page, "a1-u01-l2");
  for (let i = 0; i < 12; i++) {
    const ex = await exerciseById(await currentExerciseId(page));
    if (ex.kind === "fix") break;
    await answer(page, "right");
    await next(page);
  }
  const card = page.locator(CARD);
  await card.locator("input.field").fill("My name are Ana.");
  await card.getByRole("button", { name: "Verificar" }).click();
  const result = page.getByRole("status", { name: "Resultado" });
  await expect(result).toContainText("Ainda não");
  await expect(result).toContainText("A frase foi repetida sem correção");
  await expect(result).toContainText("My name is Ana");
});

test("uso de pistas: a pista aparece e o acerto conta como assistido", async ({ page }) => {
  await onboard(page);
  await startLesson(page, "a1-u01-l1");
  const id = await currentExerciseId(page);
  const ex = await exerciseById(id);

  await page.getByRole("button", { name: /Pista \(1\// }).click();
  await expect(page.getByText(/Pista 1:/)).toBeVisible();
  await expect(page.getByText("Eliminada pela pista")).toBeVisible();

  await fill(page, ex, "right");
  await page.locator(CARD).getByRole("button", { name: "Verificar" }).click();
  await expect(page.getByRole("status", { name: "Resultado" })).toContainText("Acerto com pista");

  const attempts = await readRows<{ exerciseId: string; hints: number; independent: boolean; outcome: string }>(page, "attempts");
  expect(attempts).toEqual([expect.objectContaining({ exerciseId: id, hints: 1, independent: false, outcome: "correct" })]);
  const concepts = await readRows<{ id: string; rec: { level: number; assisted: number; correct: number } }>(page, "concepts");
  expect(concepts[0].rec).toMatchObject({ level: 0, assisted: 1, correct: 0 });
});

test("mostrar resposta encerra o exercício como erro e o item volta", async ({ page }) => {
  await onboard(page);
  await startLesson(page, "a1-u01-l1");
  await page.getByRole("button", { name: "Mostrar resposta" }).click();
  const result = page.getByRole("status", { name: "Resultado" });
  await expect(result).toContainText("Resposta mostrada");
  await expect(result).toContainText("(sem resposta)");
  await expect(result).toContainText("Good morning!");
  const attempts = await readRows<{ revealed: boolean; independent: boolean }>(page, "attempts");
  expect(attempts[0]).toMatchObject({ revealed: true, independent: false });
});

test("retomada após recarregar: volta ao mesmo exercício, sem repetir a introdução", async ({ page }) => {
  await onboard(page);
  await startLesson(page, "a1-u01-l1");
  for (let i = 0; i < 3; i++) {
    await answer(page, "right");
    await next(page);
  }
  const fourth = await currentExerciseId(page);
  await expect(page.getByText("4/11")).toBeVisible();

  await page.reload();
  await expect(page.locator(CARD)).toBeVisible();
  expect(await currentExerciseId(page)).toBe(fourth);
  await expect(page.getByText("4/11")).toBeVisible();
  await expect(page.getByText("Objetivo desta lição")).toHaveCount(0);

  // O início oferece continuar de onde parou.
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Continuar de onde parei" })).toBeVisible();
  await page.getByRole("link", { name: /Continuar de onde parei/ }).first().click();
  await expect(page).toHaveURL(/licao\/a1-u01-l1/);
  expect(await currentExerciseId(page)).toBe(fourth);
});

test("recarregar depois de responder (antes de continuar) não duplica a resposta", async ({ page }) => {
  await onboard(page);
  await startLesson(page, "a1-u01-l1");
  const id = await currentExerciseId(page);
  await answer(page, "right");
  expect(await countRows(page, "attempts")).toBe(1);
  const xp = await readXp(page);

  await page.reload();
  expect(await currentExerciseId(page)).toBe(id);
  await answer(page, "right");
  expect(await countRows(page, "attempts")).toBe(1);
  expect(await readXp(page)).toBe(xp);
});

test("XP sem duplicidade: refazer a lição e clicar duas vezes não geram XP extra", async ({ page }) => {
  await onboard(page);
  await startLesson(page, "a1-u01-l1");
  const ex = await exerciseById(await currentExerciseId(page));
  await fill(page, ex, "right");
  await page.locator(CARD).getByRole("button", { name: "Verificar" }).dblclick();
  await expect(page.getByRole("status", { name: "Resultado" })).toBeVisible();
  expect(await countRows(page, "attempts")).toBe(1);

  await completeLesson(page, "a1-u01-l1");
  const xp = await readXp(page);
  const xpRows = await countRows(page, "xp");

  await completeLesson(page, "a1-u01-l1");
  expect(await readXp(page)).toBe(xp);
  expect(await countRows(page, "xp")).toBe(xpRows);
  await expect(page.getByText("refazer é ótimo para praticar, mas não gera XP de novo")).toBeVisible();
  const lessons = await readRows<{ completions: number }>(page, "lessons");
  expect(lessons[0].completions).toBe(2);
});

test("teclado: dá para responder e avançar sem mouse", async ({ page }) => {
  await onboard(page);
  await startLesson(page, "a1-u01-l1");
  const id = await currentExerciseId(page);
  const ex = await exerciseById(id);
  if (ex.kind !== "mcq") throw new Error("o primeiro exercício deveria ser de múltipla escolha");

  const labels = page.locator(`${CARD} label.choice`);
  const texts = await labels.allInnerTexts();
  const target = texts.findIndex((t) => t.includes(ex.options[ex.answer].text));

  await page.locator(`${CARD} input[type=radio]`).first().focus();
  await page.keyboard.press("Space");
  for (let i = 0; i < target; i++) await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter"); // envia o formulário
  await expect(page.getByRole("status", { name: "Resultado" })).toContainText("Correto!");

  // O foco vai para "Continuar": Enter avança.
  await expect(page.getByRole("button", { name: "Continuar" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect.poll(() => currentExerciseId(page)).not.toBe(id);
});

test("lição bloqueada não abre antes da anterior", async ({ page }) => {
  await onboard(page);
  await page.goto("/licao/a1-u01-l3");
  await expect(page.getByText("Esta lição ainda está bloqueada")).toBeVisible();
});

import { expect, test, type Page } from "@playwright/test";
import { answer, CARD, currentExerciseId, denyMicrophone, exerciseById, fakeSpeech, next, onboard, readRows, startLesson } from "./helpers";

/** Avança respondendo certo até chegar a um exercício do tipo pedido. */
async function advanceTo(page: Page, kind: string): Promise<string> {
  for (let i = 0; i < 15; i++) {
    const id = await currentExerciseId(page);
    if ((await exerciseById(id)).kind === kind) return id;
    await answer(page, "right");
    await next(page);
  }
  throw new Error(`nenhum exercício do tipo ${kind}`);
}

test("áudio indisponível: a escuta vira atividade adaptada e não conta como evidência", async ({ page }) => {
  // Remove a síntese de voz, como num navegador sem suporte.
  await page.addInitScript(() => {
    Object.defineProperty(window, "speechSynthesis", { value: undefined, configurable: true });
  });
  await onboard(page);
  await startLesson(page, "a1-u01-l1");
  const id = await advanceTo(page, "dictation");

  await expect(page.getByText("Atividade adaptada (sem áudio)")).toBeVisible();
  await expect(page.getByText("Áudio indisponível neste navegador.")).toBeVisible();
  await expect(page.locator(CARD).getByRole("button", { name: "Ouvir", exact: true })).toBeDisabled();

  await answer(page, "right"); // dá para continuar o curso
  await expect(page.getByRole("status", { name: "Resultado" })).toContainText("Feito sem áudio");

  const attempts = await readRows<{ exerciseId: string; adapted?: boolean; independent: boolean; outcome: string }>(page, "attempts");
  expect(attempts.find((a) => a.exerciseId === id)).toMatchObject({ adapted: true, independent: false, outcome: "correct" });

  // A habilidade aparece como pendente, não como evidência.
  await page.goto("/progresso");
  const listening = page.getByRole("listitem").filter({ has: page.getByRole("heading", { name: "Compreensão oral" }) });
  await expect(listening).toContainText("pendente");
  await expect(listening).toContainText("Sem evidência");
});

test("com áudio: toca normal e devagar, esconde o texto e conta como evidência", async ({ page }) => {
  await fakeSpeech(page);
  await onboard(page);
  await startLesson(page, "a1-u01-l1");
  const id = await advanceTo(page, "dictation");
  const ex = await exerciseById(id);
  if (ex.kind !== "dictation") throw new Error("esperava ditado");

  await expect(page.getByText("Atividade adaptada (sem áudio)")).toHaveCount(0);
  await expect(page.getByText(/Voz sintética do seu navegador/)).toBeVisible();
  // O texto não aparece antes da resposta.
  await expect(page.locator(CARD).getByText(ex.say, { exact: true })).toHaveCount(0);

  await page.locator(CARD).getByRole("button", { name: "Ouvir", exact: true }).click();
  await page.locator(CARD).getByRole("button", { name: "Devagar" }).click();
  const spoken = await page.evaluate(() => (window as unknown as { __spoken: string[] }).__spoken);
  expect(spoken.filter((s) => s === ex.say)).toHaveLength(2);

  await answer(page, "right");
  const attempts = await readRows<{ exerciseId: string; adapted?: boolean; independent: boolean }>(page, "attempts");
  const mine = attempts.find((a) => a.exerciseId === id)!;
  expect(mine.independent).toBe(true);
  expect(mine.adapted).toBeUndefined();
});

test("ver o texto antes de responder conta como pista", async ({ page }) => {
  await fakeSpeech(page);
  await onboard(page);
  await startLesson(page, "a1-u01-l1");
  const id = await advanceTo(page, "dictation");
  await page.getByRole("button", { name: /Mostrar texto/ }).click();
  await answer(page, "right");
  const attempts = await readRows<{ exerciseId: string; hints: number; independent: boolean }>(page, "attempts");
  expect(attempts.find((a) => a.exerciseId === id)).toMatchObject({ hints: 1, independent: false });
});

test("microfone recusado: a tarefa de fala continua possível sem gravar", async ({ page }) => {
  await fakeSpeech(page);
  await denyMicrophone(page);
  await onboard(page);
  await page.goto("/atividade/a1-u01/speaking");
  await page.getByRole("button", { name: "Começar" }).click();
  await expect(page.locator(CARD)).toBeVisible();

  // O microfone só é pedido ao tocar em gravar.
  await page.getByRole("button", { name: "Gravar minha voz" }).click();
  await expect(page.getByText("Microfone não autorizado")).toBeVisible();

  await page.getByRole("button", { name: "Falei em voz alta, sem gravar" }).click();
  await page.getByRole("button", { name: "Concluir autoavaliação" }).click();
  await expect(page.getByRole("status", { name: "Resultado" })).toContainText("Autoavaliação registrada");
  await next(page);
  await expect(page.getByRole("heading", { name: "Atividade concluída" })).toBeVisible();

  const tasks = await readRows<{ kind: string; status: string; recorded?: boolean; adapted?: boolean }>(page, "tasks");
  expect(tasks).toHaveLength(1);
  expect(tasks[0]).toMatchObject({ kind: "speaking", status: "self_assessed" });
  expect(tasks[0].recorded).toBeUndefined();
  expect(tasks[0].adapted).toBeUndefined();
});

test("“não posso falar agora” registra a habilidade como pendente e deixa seguir", async ({ page }) => {
  await fakeSpeech(page);
  await onboard(page);
  await page.goto("/atividade/a1-u01/speaking");
  await page.getByRole("button", { name: "Começar" }).click();
  await page.getByRole("button", { name: /Não posso falar agora/ }).click();
  await expect(page.getByRole("status", { name: "Resultado" })).toContainText("pendente");
  const tasks = await readRows<{ adapted?: boolean }>(page, "tasks");
  expect(tasks[0].adapted).toBe(true);
});

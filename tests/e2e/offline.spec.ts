import { test, expect } from "@playwright/test";
import { onboard } from "./helpers";

test("offline: depois de aberto online, o app e o progresso continuam disponíveis", async ({ page, context }) => {
  await onboard(page);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  // Uma recarga depois que o service worker assume o controle, para ele guardar as páginas.
  for (const path of ["/", "/trilha"]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
  await page.reload();
  await expect(page.getByRole("heading", { level: 1, name: "Trilha" })).toBeVisible();

  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole("heading", { level: 1, name: "Trilha" })).toBeVisible();
  await expect(page.getByText("Olá! Primeiros contatos").first()).toBeVisible();
  await context.setOffline(false);
});

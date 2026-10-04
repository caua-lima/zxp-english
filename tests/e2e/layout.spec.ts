import { expect, test } from "@playwright/test";
import { answer, completeLesson, expectNoHorizontalScroll, fakeSpeech, onboard, startLesson } from "./helpers";

const PAGES = ["/", "/trilha", "/unidade/a1-u01", "/revisar", "/erros", "/biblioteca", "/progresso", "/semana", "/ajustes", "/mais"];

test.beforeEach(async ({ page }) => {
  await fakeSpeech(page);
});

test("celular: nenhuma tela rola na horizontal e a navegação inferior está sempre lá", async ({ page }) => {
  await onboard(page);
  await completeLesson(page, "a1-u01-l1");
  for (const path of PAGES) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expectNoHorizontalScroll(page);
    const nav = page.getByRole("navigation", { name: "Principal" }).last();
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link")).toHaveCount(5);
  }
  // Alvos de toque confortáveis.
  const box = await page.getByRole("navigation", { name: "Principal" }).last().getByRole("link").first().boundingBox();
  expect(box!.height).toBeGreaterThanOrEqual(44);
});

test("celular: lição, feedback e checkpoint cabem na tela", async ({ page }) => {
  await onboard(page);
  await page.goto("/licao/a1-u01-l1");
  await expectNoHorizontalScroll(page);
  await startLesson(page, "a1-u01-l1");
  await answer(page, "wrong");
  await expectNoHorizontalScroll(page);
  await page.goto("/checkpoint/a1-u01");
  await expectNoHorizontalScroll(page);
  await page.goto("/atividade/a1-u01/reading");
  await expectNoHorizontalScroll(page);
});

test("navegação: a aba atual fica marcada e os atalhos levam ao lugar certo", async ({ page }) => {
  await onboard(page);
  const nav = page.getByRole("navigation", { name: "Principal" }).last();
  await nav.getByRole("link", { name: "Trilha" }).click();
  await expect(page).toHaveURL(/trilha/);
  await expect(nav.getByRole("link", { name: "Trilha" })).toHaveAttribute("aria-current", "page");
  await nav.getByRole("link", { name: "Mais" }).click();
  await page.getByRole("link", { name: /Ajustes e backup/ }).click();
  await expect(page.getByRole("heading", { name: "Ajustes", level: 1 })).toBeVisible();
});

test.describe("computador", () => {
  test.use({ viewport: { width: 1280, height: 800 }, isMobile: false, hasTouch: false });

  test("mostra a navegação lateral e esconde a inferior", async ({ page }) => {
    await onboard(page);
    await expect(page.getByRole("complementary").getByRole("navigation", { name: "Principal" })).toBeVisible();
    await expect(page.getByRole("complementary").getByRole("link", { name: "Caderno de erros" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Mais", exact: true })).toBeHidden();
    await expectNoHorizontalScroll(page);
  });
});

test.describe("fuso horário", () => {
  // 23h30 de 1º de outubro em São Paulo = 02h30 de 2 de outubro em UTC = 11h30 de 2 de outubro em Tóquio.
  const INSTANT = new Date("2026-10-02T02:30:00Z");

  test("em São Paulo ainda é dia 1", async ({ page }) => {
    await page.clock.install({ time: INSTANT });
    await onboard(page);
    await expect(page.getByText(/^1 out · /)).toBeVisible();
    await page.goto("/ajustes");
    await expect(page.getByLabel("Fuso horário")).toHaveValue("America/Sao_Paulo");
  });

  test.describe("em Tóquio", () => {
    test.use({ timezoneId: "Asia/Tokyo" });
    test("já é dia 2, e o XP do estudo conta para o dia 2", async ({ page }) => {
      await page.clock.install({ time: INSTANT });
      await onboard(page);
      await expect(page.getByText(/^2 out · /)).toBeVisible();
      await page.goto("/ajustes");
      await expect(page.getByLabel("Fuso horário")).toHaveValue("Asia/Tokyo");
    });
  });

  test("mudar o fuso nas configurações muda o dia em que o XP é contado", async ({ page }) => {
    await page.clock.install({ time: INSTANT });
    await onboard(page);
    await startLesson(page, "a1-u01-l1");
    for (let i = 0; i < 6; i++) {
      await answer(page, "right");
      await page.getByRole("button", { name: /^(Continuar|Ver resultado)$/ }).click();
    }
    await page.goto("/semana");
    // Em São Paulo o XP caiu na quinta, 1º de outubro.
    await expect(page.getByText(/1 out: \d+ XP/)).toBeAttached();
    await expect(page.getByText("2 out: dia futuro")).toBeAttached();

    await page.goto("/ajustes");
    await page.getByLabel("Fuso horário").selectOption("Asia/Tokyo");
    await page.goto("/semana");
    await expect(page.getByText("1 out: 0 XP")).toBeAttached();
    await expect(page.getByText(/2 out: [1-9]\d* XP/)).toBeAttached();
  });
});

test.describe("preferências do sistema", () => {
  test.use({ colorScheme: "dark" });
  test("tema escuro do sistema é respeitado e pode ser trocado", async ({ page }) => {
    await onboard(page);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.goto("/ajustes");
    await page.getByRole("group", { name: "Tema" }).getByRole("button", { name: "Claro" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });
});

test("movimento reduzido: as animações são desligadas", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await onboard(page);
  const duration = await page.locator("header").first().evaluate(() => {
    const el = document.createElement("div");
    el.className = "anim-rise";
    document.body.appendChild(el);
    const d = getComputedStyle(el).animationDuration;
    el.remove();
    return d;
  });
  expect(parseFloat(duration)).toBeLessThan(0.01);
});

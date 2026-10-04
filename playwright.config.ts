import { defineConfig, devices } from "@playwright/test";

const PORT = 3210;

/**
 * Testes de ponta a ponta contra o BUILD DE PRODUÇÃO (`next start`).
 * `npm run test:e2e` faz o build antes. O padrão é um celular (uso principal do app).
 */
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  reporter: [["list"]],
  timeout: 90_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: `http://localhost:${PORT}`,
    locale: "pt-BR",
    timezoneId: "America/Sao_Paulo",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [{ name: "celular", use: { ...devices["Pixel 7"] } }],
  webServer: {
    command: `npx next start --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});

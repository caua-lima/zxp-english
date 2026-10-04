import { expect, type Page } from "@playwright/test";
import { unitOfItem } from "@/content/curriculum";
import { exerciseMap } from "@/content/iter";
import { PLACEMENT } from "@/content/placement";
import { loadUnit } from "@/content/registry";
import type { Exercise, UnitContent } from "@/content/schema";

export const CARD = "article[aria-labelledby^=ex-]";

const cache = new Map<string, Exercise>();
for (const p of PLACEMENT) cache.set(p.exercise.id, p.exercise);

/** Encontra o exercício no conteúdo real do app (os testes não têm gabarito próprio). */
export async function exerciseById(id: string): Promise<Exercise> {
  if (!cache.has(id)) {
    const loaded = await loadUnit(unitOfItem(id));
    // No executor de testes (CommonJS), o import() dinâmico embrulha o módulo uma vez a mais.
    const unit = "lessons" in loaded ? loaded : (loaded as unknown as { default: UnitContent }).default;
    for (const [eid, L] of exerciseMap(unit)) cache.set(eid, L.ex);
  }
  const ex = cache.get(id);
  if (!ex) throw new Error(`Exercício desconhecido nos testes: ${id}`);
  return ex;
}

/** Passa pela configuração inicial escolhendo "começar do zero". */
export async function onboard(page: Page, opts: { minutes?: 10 | 20 | 30 } = {}): Promise<void> {
  await page.goto("/");
  await expect(page).toHaveURL(/bem-vindo/);
  await page.getByRole("button", { name: "Começar" }).click();
  await page.getByRole("button", { name: "Continuar" }).click(); // objetivo
  if (opts.minutes) await page.getByRole("button", { name: `${opts.minutes} min` }).click();
  await page.getByRole("button", { name: "Continuar" }).click(); // tempo
  await page.getByRole("button", { name: "Continuar" }).click(); // armazenamento
  await page.getByRole("button", { name: "Começar a estudar" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
}

/**
 * Simula a síntese de voz (o Chromium de teste não tem vozes). Com isso os
 * exercícios de escuta rodam como rodariam num celular com áudio.
 */
export async function fakeSpeech(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const spoken: string[] = [];
    (window as unknown as { __spoken: string[] }).__spoken = spoken;
    class Utterance {
      text: string;
      lang = "en-US";
      rate = 1;
      voice: unknown = null;
      onend: ((e: Event) => void) | null = null;
      onerror: ((e: Event) => void) | null = null;
      constructor(text: string) {
        this.text = text;
      }
    }
    const voice = { name: "Voz de teste", lang: "en-US", default: true, localService: true, voiceURI: "test-en" };
    const synth = {
      getVoices: () => [voice],
      speak(u: Utterance) {
        spoken.push(u.text);
        setTimeout(() => u.onend?.(new Event("end")), 5);
      },
      cancel() {},
      addEventListener() {},
      removeEventListener() {},
    };
    Object.defineProperty(window, "speechSynthesis", { value: synth, configurable: true });
    (window as unknown as { SpeechSynthesisUtterance: unknown }).SpeechSynthesisUtterance = Utterance;
  });
}

/** Faz o navegador recusar o microfone, como quando a pessoa nega a permissão. */
export async function denyMicrophone(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const md = navigator.mediaDevices ?? ({} as MediaDevices);
    md.getUserMedia = () => Promise.reject(new DOMException("Permission denied", "NotAllowedError"));
    if (!navigator.mediaDevices) Object.defineProperty(navigator, "mediaDevices", { value: md, configurable: true });
    if (typeof (window as unknown as { MediaRecorder?: unknown }).MediaRecorder === "undefined") {
      (window as unknown as { MediaRecorder: unknown }).MediaRecorder = class {};
    }
  });
}

/** ID do exercício visível (vem do atributo aria-labelledby do cartão). */
export async function currentExerciseId(page: Page): Promise<string> {
  const article = page.locator(CARD).first();
  await expect(article).toBeVisible();
  const labelled = await article.getAttribute("aria-labelledby");
  return labelled!.replace(/^ex-/, "");
}

export type How = "right" | "wrong";

/** Preenche a resposta do exercício atual sem enviar (para os tipos que têm botão Verificar). */
export async function fill(page: Page, ex: Exercise, how: How): Promise<void> {
  const card = page.locator(CARD).first();
  switch (ex.kind) {
    case "mcq":
    case "listen": {
      const idx = how === "right" ? ex.answer : (ex.answer + 1) % ex.options.length;
      await card.locator("label.choice").filter({ hasText: ex.options[idx].text }).first().click();
      break;
    }
    case "cloze":
    case "type":
    case "fix":
    case "dictation":
      await card.locator("input.field, textarea.field").first().fill(how === "right" ? ex.accepted[0] : "zzz qqq");
      break;
    case "order": {
      const words = ex.answers[0].split(/\s+/);
      const tokens = how === "right" ? words : [...words].reverse();
      const bank = card.getByRole("group", { name: "Banco de palavras" });
      for (const t of tokens) await bank.getByRole("button", { name: t, exact: true }).first().click();
      break;
    }
    default:
      throw new Error(`fill() não se aplica a ${ex.kind}`);
  }
}

/** Responde o exercício atual (certo ou errado) e NÃO avança. Devolve o exercício. */
export async function answer(page: Page, how: How = "right"): Promise<Exercise> {
  const ex = await exerciseById(await currentExerciseId(page));
  const card = page.locator(CARD).first();

  switch (ex.kind) {
    case "mcq":
    case "listen":
    case "cloze":
    case "type":
    case "fix":
    case "dictation":
    case "order":
      await fill(page, ex, how);
      await card.getByRole("button", { name: /^(Verificar|Check)$/ }).click();
      break;
    case "match": {
      const left = card.getByRole("group", { name: "Coluna da esquerda" });
      const right = card.getByRole("group", { name: "Coluna da direita" });
      if (how === "wrong") {
        await left.getByRole("button", { name: ex.pairs[0].left, exact: true }).click();
        await right.getByRole("button", { name: ex.pairs[1].right, exact: true }).click();
      }
      for (const p of ex.pairs) {
        await left.getByRole("button", { name: p.left, exact: true }).click();
        await right.getByRole("button", { name: p.right, exact: true }).click();
      }
      break;
    }
    case "dialog": {
      for (const turn of ex.turns) {
        const opt = turn.options.find((o) => (how === "right" ? o.ok : !o.ok))!;
        await card.getByRole("button", { name: opt.text, exact: true }).click();
        await card.getByRole("button", { name: "Dizer isso" }).click();
      }
      break;
    }
    case "write": {
      await card.locator("textarea").fill(ex.model);
      await card.getByRole("button", { name: "Terminei de escrever" }).click();
      await card.getByRole("button", { name: "Concluir autoavaliação" }).click();
      break;
    }
    case "speak": {
      await card.getByRole("button", { name: /Falei em voz alta/ }).click();
      await card.getByRole("button", { name: "Concluir autoavaliação" }).click();
      break;
    }
  }
  await expect(page.getByRole("status", { name: "Resultado" })).toBeVisible();
  return ex;
}

export async function next(page: Page): Promise<void> {
  await page.getByRole("button", { name: /^(Continuar|Continue|Ver resultado)$/ }).click();
}

/** Responde até a sessão terminar. `wrong` = quantos dos primeiros exercícios corrigidos errar. */
export async function finishSession(page: Page, opts: { wrong?: number; max?: number } = {}): Promise<void> {
  let toMiss = opts.wrong ?? 0;
  for (let i = 0; i < (opts.max ?? 45); i++) {
    await page.waitForTimeout(80);
    if ((await page.locator(CARD).count()) === 0) return;
    const ex = await exerciseById(await currentExerciseId(page));
    const gradable = ex.kind !== "write" && ex.kind !== "speak";
    const how: How = gradable && toMiss > 0 ? "wrong" : "right";
    if (how === "wrong") toMiss -= 1;
    await answer(page, how);
    await next(page);
  }
  throw new Error("A sessão não terminou no número esperado de passos.");
}

/** Abre a lição e passa pela introdução (contexto e explicação). */
export async function startLesson(page: Page, lessonId: string): Promise<void> {
  await page.goto(`/licao/${lessonId}`);
  // Uma lição já iniciada retoma direto no exercício, sem a introdução.
  const intro = page.getByRole("button", { name: "Entendi o contexto" });
  await expect(intro.or(page.locator(CARD)).first()).toBeVisible();
  if (await intro.isVisible()) {
    await intro.click();
    await page.getByRole("button", { name: "Praticar" }).click();
  }
  await expect(page.locator(CARD)).toBeVisible();
}

export async function completeLesson(page: Page, lessonId: string): Promise<void> {
  await startLesson(page, lessonId);
  await finishSession(page);
  await expect(page.getByRole("heading", { name: "Lição concluída" })).toBeVisible();
}

function idb<T>(page: Page, store: string, op: "count" | "getAll"): Promise<T> {
  return page.evaluate(
    ([name, operation]) =>
      new Promise<unknown>((resolve, reject) => {
        const open = indexedDB.open("zxp-english");
        open.onerror = () => reject(open.error);
        open.onsuccess = () => {
          const os = open.result.transaction(name, "readonly").objectStore(name);
          const req = operation === "count" ? os.count() : os.getAll();
          req.onsuccess = () => {
            resolve(req.result);
            open.result.close();
          };
          req.onerror = () => reject(req.error);
        };
      }),
    [store, op] as const,
  ) as Promise<T>;
}

/** Total de XP salvo, lido direto do IndexedDB (fonte de verdade). */
export async function readXp(page: Page): Promise<number> {
  const rows = await idb<{ amount: number }[]>(page, "xp", "getAll");
  return rows.reduce((n, x) => n + x.amount, 0);
}

export function countRows(page: Page, store: string): Promise<number> {
  return idb<number>(page, store, "count");
}

export function readRows<T>(page: Page, store: string): Promise<T[]> {
  return idb<T[]>(page, store, "getAll");
}

/** A página não deve rolar na horizontal. */
export async function expectNoHorizontalScroll(page: Page): Promise<void> {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow, "largura do conteúdo além da tela").toBeLessThanOrEqual(1);
}

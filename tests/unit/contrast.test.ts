import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

/** Lê os tokens de cor direto do CSS, para o teste falhar se alguém mudar a paleta. */
const css = readFileSync(fileURLToPath(new URL("../../src/app/globals.css", import.meta.url)), "utf8");

function tokens(selector: string): Record<string, string> {
  const start = css.indexOf(selector + " {");
  const block = css.slice(start, css.indexOf("}", start));
  const out: Record<string, string> = {};
  for (const m of block.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)) out[m[1]] = m[2];
  return out;
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** [texto, fundo] que aparecem na interface. */
const PAIRS: [string, string][] = [
  ["ink", "bg"], ["ink", "surface"], ["ink", "surface-2"],
  ["ink-2", "bg"], ["ink-2", "surface"], ["ink-2", "surface-2"],
  ["ink-3", "bg"], ["ink-3", "surface"], ["ink-3", "surface-2"],
  ["primary-ink", "primary"], ["primary-ink", "primary-strong"],
  ["primary-text", "surface"], ["primary-text", "bg"], ["primary-text", "primary-soft"],
  ["ink", "primary-soft"],
  ["accent-ink", "accent"], ["ink", "accent-soft"],
  ["ok", "surface"], ["ok", "ok-soft"], ["ink", "ok-soft"],
  ["bad", "surface"], ["bad", "bad-soft"], ["ink", "bad-soft"], ["surface", "bad"],
  ["warn", "surface"], ["warn", "warn-soft"], ["ink", "warn-soft"],
  ["info", "surface"], ["info", "info-soft"], ["ink", "info-soft"],
  ["stage-a1", "surface"], ["stage-a2", "surface"], ["stage-b1", "surface"], ["stage-b2", "surface"],
  ["surface", "stage-a1"], ["surface", "stage-a2"], ["surface", "stage-b1"], ["surface", "stage-b2"],
];

describe.each([
  ["claro", ":root"],
  ["escuro", ':root[data-theme="dark"]'],
])("contraste WCAG AA — tema %s", (_name, selector) => {
  const t = tokens(selector);

  it("todos os tokens usados existem", () => {
    for (const [fg, bgc] of PAIRS) {
      expect(t[fg], fg).toBeTruthy();
      expect(t[bgc], bgc).toBeTruthy();
    }
  });

  it.each(PAIRS)("%s sobre %s tem contraste ≥ 4,5:1", (fg, bgc) => {
    expect(contrast(t[fg], t[bgc])).toBeGreaterThanOrEqual(4.5);
  });

  it("o indicador de foco contrasta com os fundos (≥ 3:1)", () => {
    for (const bgc of ["bg", "surface", "surface-2"]) expect(contrast(t["focus"], t[bgc])).toBeGreaterThanOrEqual(3);
  });

  it("bordas de controles contrastam com o fundo (≥ 3:1)", () => {
    expect(contrast(t["line-strong"], t["surface"]) >= 3 || contrast(t["ink-3"], t["surface"]) >= 3).toBe(true);
  });
});

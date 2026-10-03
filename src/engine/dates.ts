/**
 * Datas "de calendário" no fuso horário configurado.
 *
 * Todo cálculo de dia, meta e sequência usa `dateKey(instante, fuso)`.
 * Aritmética de dias é feita em UTC sobre chaves `YYYY-MM-DD`, então não
 * sofre com horário de verão.
 */
import type { DateKey } from "./model";

export const FALLBACK_TZ = "America/Sao_Paulo";

export function isValidTimeZone(tz: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

export function browserTimeZone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz && isValidTimeZone(tz) ? tz : FALLBACK_TZ;
  } catch {
    return FALLBACK_TZ;
  }
}

const formatters = new Map<string, Intl.DateTimeFormat>();

function formatter(tz: string): Intl.DateTimeFormat {
  let f = formatters.get(tz);
  if (!f) {
    f = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    formatters.set(tz, f);
  }
  return f;
}

/** Dia de calendário de um instante no fuso informado. */
export function dateKey(when: Date | number | string, tz: string): DateKey {
  const d = when instanceof Date ? when : new Date(when);
  const zone = isValidTimeZone(tz) ? tz : FALLBACK_TZ;
  const parts = formatter(zone).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function toUTC(key: DateKey): number {
  const [y, m, d] = key.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

function fromUTC(ms: number): DateKey {
  const d = new Date(ms);
  const y = String(d.getUTCFullYear()).padStart(4, "0");
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addDays(key: DateKey, n: number): DateKey {
  return fromUTC(toUTC(key) + n * 86_400_000);
}

/** Dias entre duas chaves: `diffDays(a, b)` = b − a. */
export function diffDays(a: DateKey, b: DateKey): number {
  return Math.round((toUTC(b) - toUTC(a)) / 86_400_000);
}

/** Segunda-feira da semana (ISO) que contém a data. */
export function weekStart(key: DateKey): DateKey {
  const dow = new Date(toUTC(key)).getUTCDay(); // 0 = domingo
  const back = (dow + 6) % 7;
  return addDays(key, -back);
}

export function isDateKey(s: string): s is DateKey {
  return /^\d{4}-\d{2}-\d{2}$/.test(s) && fromUTC(toUTC(s)) === s;
}

const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const WEEKDAYS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

export function formatShort(key: DateKey): string {
  const [, m, d] = key.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]}`;
}

export function weekdayShort(key: DateKey): string {
  return WEEKDAYS[new Date(toUTC(key)).getUTCDay()];
}

/** Relógio injetável (testes e simulação de dias). */
let clock: () => number = () => Date.now();
export function now(): Date {
  return new Date(clock());
}
export function setClock(fn: (() => number) | null): void {
  clock = fn ?? (() => Date.now());
}

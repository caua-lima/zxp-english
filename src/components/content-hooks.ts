"use client";

import { useEffect, useState } from "react";
import type { Concept, UnitContent } from "@/content/schema";
import { unitOfConcept } from "@/content/curriculum";
import { isPublished, loadUnit, loadUnits } from "@/content/registry";

export type Loaded<T> = { status: "loading" } | { status: "ready"; data: T } | { status: "missing" } | { status: "error"; message: string };

const LOADING = { status: "loading" } as const;
const MISSING = { status: "missing" } as const;
const LOAD_ERROR = "Não foi possível carregar o conteúdo. Verifique sua conexão e tente de novo.";

/**
 * Carrega o conteúdo de uma unidade sob demanda. O resultado é guardado junto com a
 * chave pedida: enquanto a chave atual não tiver resultado, o estado derivado é "loading".
 */
export function useUnit(unitId: string): Loaded<UnitContent> {
  const [result, setResult] = useState<{ key: string; value: Loaded<UnitContent> } | null>(null);
  const published = isPublished(unitId);
  useEffect(() => {
    if (!published) return;
    let alive = true;
    loadUnit(unitId)
      .then((data) => alive && setResult({ key: unitId, value: { status: "ready", data } }))
      .catch(() => alive && setResult({ key: unitId, value: { status: "error", message: LOAD_ERROR } }));
    return () => {
      alive = false;
    };
  }, [unitId, published]);
  if (!published) return MISSING;
  return result && result.key === unitId ? result.value : LOADING;
}

/** Carrega várias unidades (revisão, caderno de erros, biblioteca). */
export function useUnits(unitIds: string[]): Loaded<UnitContent[]> {
  const key = unitIds.join(",");
  const [result, setResult] = useState<{ key: string; value: Loaded<UnitContent[]> } | null>(null);
  useEffect(() => {
    let alive = true;
    loadUnits(key ? key.split(",") : [])
      .then((data) => alive && setResult({ key, value: { status: "ready", data } }))
      .catch(() => alive && setResult({ key, value: { status: "error", message: LOAD_ERROR } }));
    return () => {
      alive = false;
    };
  }, [key]);
  return result && result.key === key ? result.value : LOADING;
}

/** Rótulos (inglês/português) de uma lista de conceitos, carregando só as unidades necessárias. */
export function useConceptMap(conceptIds: string[]): Map<string, Concept> {
  const unitIds = [...new Set(conceptIds.map(unitOfConcept))].sort();
  const loaded = useUnits(unitIds);
  if (loaded.status !== "ready") return new Map();
  return new Map(loaded.data.flatMap((u) => u.concepts.map((c) => [c.id, c] as const)));
}

/**
 * Registro de conteúdo: carrega as unidades sob demanda (code splitting por unidade).
 *
 * Cada unidade é um módulo separado; só é baixada quando a pessoa a abre, ou
 * quando uma revisão precisa de exercícios dela.
 */
import type { UnitContent } from "./schema";
import { CURRICULUM } from "./curriculum";

type Loader = () => Promise<{ default: UnitContent }>;

/** IDs com conteúdo escrito. O teste `curriculum completeness` exige as 32. */
export const LOADERS: Record<string, Loader> = {
  "a1-u01": () => import("./units/a1-u01"),
  "a1-u02": () => import("./units/a1-u02"),
  "a1-u03": () => import("./units/a1-u03"),
  "a1-u04": () => import("./units/a1-u04"),
  "a1-u05": () => import("./units/a1-u05"),
  "a1-u06": () => import("./units/a1-u06"),
  "a1-u07": () => import("./units/a1-u07"),
  "a1-u08": () => import("./units/a1-u08"),
  "a2-u01": () => import("./units/a2-u01"),
  "a2-u02": () => import("./units/a2-u02"),
  "a2-u03": () => import("./units/a2-u03"),
  "a2-u04": () => import("./units/a2-u04"),
  "a2-u05": () => import("./units/a2-u05"),
  "a2-u06": () => import("./units/a2-u06"),
  "a2-u07": () => import("./units/a2-u07"),
  "a2-u08": () => import("./units/a2-u08"),
  "b1-u01": () => import("./units/b1-u01"),
  "b1-u02": () => import("./units/b1-u02"),
  "b1-u03": () => import("./units/b1-u03"),
  "b1-u04": () => import("./units/b1-u04"),
  "b1-u05": () => import("./units/b1-u05"),
  "b1-u06": () => import("./units/b1-u06"),
  "b1-u07": () => import("./units/b1-u07"),
  "b1-u08": () => import("./units/b1-u08"),
  "b2-u01": () => import("./units/b2-u01"),
  "b2-u02": () => import("./units/b2-u02"),
  "b2-u03": () => import("./units/b2-u03"),
  "b2-u04": () => import("./units/b2-u04"),
  "b2-u05": () => import("./units/b2-u05"),
  "b2-u06": () => import("./units/b2-u06"),
  "b2-u07": () => import("./units/b2-u07"),
};

const cache = new Map<string, Promise<UnitContent>>();

export function isPublished(unitId: string): boolean {
  return unitId in LOADERS;
}

export function loadUnit(unitId: string): Promise<UnitContent> {
  const loader = LOADERS[unitId];
  if (!loader) return Promise.reject(new Error(`Unidade sem conteúdo: ${unitId}`));
  let p = cache.get(unitId);
  if (!p) {
    p = loader().then((m) => m.default);
    p.catch(() => cache.delete(unitId));
    cache.set(unitId, p);
  }
  return p;
}

export async function loadUnits(ids: string[]): Promise<UnitContent[]> {
  return Promise.all(ids.filter(isPublished).map(loadUnit));
}

export async function loadAllPublished(): Promise<UnitContent[]> {
  return loadUnits(CURRICULUM.map((m) => m.id));
}

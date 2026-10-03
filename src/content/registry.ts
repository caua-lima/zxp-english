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

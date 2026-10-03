/** Percorre todos os exercícios de uma unidade, com a localização de cada um. */
import type { ActivityKind, Exercise, UnitContent } from "./schema";

export type Group = "lesson" | "checkpoint-a" | "checkpoint-b" | "checkpoint-prod" | "activity";

export interface Located {
  ex: Exercise;
  group: Group;
  unitId: string;
  /** ID da lição, do checkpoint ou da atividade que contém o exercício. */
  parentId: string;
  activityKind?: ActivityKind;
}

export function exercisesOf(unit: UnitContent): Located[] {
  const out: Located[] = [];
  for (const l of unit.lessons) {
    for (const ex of l.exercises) out.push({ ex, group: "lesson", unitId: unit.id, parentId: l.id });
  }
  for (const ex of unit.checkpoint.setA) out.push({ ex, group: "checkpoint-a", unitId: unit.id, parentId: unit.checkpoint.id });
  for (const ex of unit.checkpoint.setB) out.push({ ex, group: "checkpoint-b", unitId: unit.id, parentId: unit.checkpoint.id });
  out.push({ ex: unit.checkpoint.production, group: "checkpoint-prod", unitId: unit.id, parentId: unit.checkpoint.id });
  for (const a of Object.values(unit.activities)) {
    for (const ex of a.exercises) out.push({ ex, group: "activity", unitId: unit.id, parentId: a.id, activityKind: a.kind });
  }
  return out;
}

export function exerciseMap(unit: UnitContent): Map<string, Located> {
  return new Map(exercisesOf(unit).map((l) => [l.ex.id, l]));
}

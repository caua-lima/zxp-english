/**
 * Diagnóstico inicial (opcional e curto).
 *
 * O resultado é uma SUGESTÃO de ponto de partida, não uma medida de nível: são poucas
 * perguntas, quase todas de reconhecimento, sem avaliar fala nem escrita. Por isso o
 * app nunca declara "seu nível é B1"; ele diz "sugerimos começar por tal unidade".
 *
 * Regras:
 *  - As perguntas vêm agrupadas por etapa (A1 → B2).
 *  - Uma etapa é considerada "superada" com ≥ 75% de acertos independentes.
 *  - Ao não superar uma etapa, o diagnóstico para (não faz sentido continuar).
 *  - Sugestão: a unidade da primeira pergunta errada na primeira etapa não superada.
 *  - Perguntas de escuta adaptadas (sem áudio) não contam.
 */
import type { Stage, UnitMeta } from "@/content/schema";
import { STAGES } from "@/content/schema";

export const PLACEMENT_PASS = 0.75;

export interface PlacementAnswer {
  unitId: string;
  stage: Stage;
  independent: boolean;
  adapted: boolean;
}

export interface StageScore {
  correct: number;
  total: number;
  passed: boolean;
}

export function stageScore(answers: PlacementAnswer[], stage: Stage): StageScore {
  const valid = answers.filter((a) => a.stage === stage && !a.adapted);
  const correct = valid.filter((a) => a.independent).length;
  const total = valid.length;
  return { correct, total, passed: total >= 3 && correct / total >= PLACEMENT_PASS };
}

/** Depois de terminar as perguntas de uma etapa: vale a pena seguir para a próxima? */
export function shouldContinue(answers: PlacementAnswer[], stage: Stage): boolean {
  return stageScore(answers, stage).passed;
}

export interface PlacementOutcome {
  byStage: Record<string, { correct: number; total: number }>;
  suggestedUnit: string;
  /** Etapa mais alta superada, só para compor a mensagem. null = nenhuma. */
  highestPassed: Stage | null;
}

export function evaluatePlacement(answers: PlacementAnswer[], curriculum: UnitMeta[]): PlacementOutcome {
  const byStage: PlacementOutcome["byStage"] = {};
  let suggested: string | null = null;
  let highestPassed: Stage | null = null;
  const order = new Map(curriculum.map((m, i) => [m.id, i]));

  for (const stage of STAGES) {
    const score = stageScore(answers, stage);
    if (score.total === 0) break; // etapa não alcançada
    byStage[stage] = { correct: score.correct, total: score.total };
    if (score.passed) {
      highestPassed = stage;
      continue;
    }
    const missed = answers
      .filter((a) => a.stage === stage && !a.adapted && !a.independent)
      .sort((a, b) => (order.get(a.unitId) ?? 0) - (order.get(b.unitId) ?? 0));
    suggested = missed[0]?.unitId ?? `${stage}-u01`;
    break;
  }

  if (!suggested) {
    if (highestPassed === null) suggested = "a1-u01";
    else {
      const idx = STAGES.indexOf(highestPassed);
      // Superou tudo o que foi perguntado: começa na etapa seguinte (ou no início de B2).
      suggested = idx + 1 < STAGES.length ? `${STAGES[idx + 1]}-u01` : "b2-u01";
    }
  }
  return { byStage, suggestedUnit: suggested, highestPassed };
}

import { describe, expect, it } from "vitest";
import { loadAllPublished } from "@/content/registry";
import { exercisesOf } from "@/content/iter";
import { gradeResponse } from "@/engine/grading";
import type { Exercise } from "@/content/schema";

/**
 * Autoconsistência do conteúdo contra o corretor REAL: se uma resposta que o próprio
 * exercício declara correta é reprovada (ou aprovada só como "erro de digitação"), o
 * aluno seria punido por acertar. E um "erro" que passa na correção não ensina nada.
 */

function textOf(ex: Exercise, answer: string) {
  return gradeResponse(ex, { kind: ex.kind as "cloze", text: answer });
}

describe("o corretor concorda com o gabarito de todo o currículo", async () => {
  const units = await loadAllPublished();
  const all = units.flatMap((u) => exercisesOf(u).map((l) => l.ex));

  it("há exercícios para verificar", () => {
    expect(all.length).toBeGreaterThan(1000);
  });

  it("respostas aceitas em cloze, type, dictation e fix são corretas (sem depender de tolerância)", () => {
    const problems: string[] = [];
    for (const ex of all) {
      if (ex.kind !== "cloze" && ex.kind !== "type" && ex.kind !== "dictation" && ex.kind !== "fix") continue;
      for (const a of ex.accepted) {
        const r = textOf(ex, a);
        if (r.outcome !== "correct") problems.push(`${ex.id}: "${a}" → ${r.outcome}`);
      }
    }
    expect(problems).toEqual([]);
  });

  it("a frase ditada é aceita no ditado", () => {
    const problems: string[] = [];
    for (const ex of all) {
      if (ex.kind !== "dictation") continue;
      const r = textOf(ex, ex.say);
      if (r.outcome !== "correct") problems.push(`${ex.id}: "${ex.say}" → ${r.outcome}`);
    }
    expect(problems).toEqual([]);
  });

  it("o texto errado de um exercício de correção NÃO é aceito", () => {
    const problems: string[] = [];
    for (const ex of all) {
      if (ex.kind !== "fix") continue;
      const r = textOf(ex, ex.wrong);
      if (r.correct) problems.push(`${ex.id}: "${ex.wrong}" passou como ${r.outcome}`);
    }
    expect(problems).toEqual([]);
  });

  it("respostas de ordenar são corretas e usam só fichas do banco", () => {
    const problems: string[] = [];
    for (const ex of all) {
      if (ex.kind !== "order") continue;
      for (const a of ex.answers) {
        const toks = a.split(" ");
        const bank = [...ex.tokens];
        for (const t of toks) {
          const i = bank.indexOf(t);
          if (i < 0) problems.push(`${ex.id}: "${t}" não está no banco`);
          else bank.splice(i, 1);
        }
        const r = gradeResponse(ex, { kind: "order", tokens: toks });
        if (!r.correct) problems.push(`${ex.id}: "${a}" → ${r.outcome}`);
      }
    }
    expect(problems).toEqual([]);
  });

  it("a opção marcada como correta em mcq/listen existe e é corrigida como certa", () => {
    const problems: string[] = [];
    for (const ex of all) {
      if (ex.kind !== "mcq" && ex.kind !== "listen") continue;
      if (!ex.options[ex.answer]) problems.push(`${ex.id}: gabarito fora do intervalo`);
      else if (!gradeResponse(ex, { kind: ex.kind, choice: ex.answer }).correct) problems.push(`${ex.id}: gabarito reprovado`);
      const texts = ex.options.map((o) => o.text.trim().toLowerCase());
      if (new Set(texts).size !== texts.length) problems.push(`${ex.id}: opções repetidas`);
    }
    expect(problems).toEqual([]);
  });
});

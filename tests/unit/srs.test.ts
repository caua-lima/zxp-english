import { describe, expect, it } from "vitest";
import {
  applyReview,
  buildReviewQueue,
  conceptStatus,
  dueItems,
  modeOfKind,
  requeueIndex,
  seedConcept,
  type ReviewEvent,
} from "@/engine/srs";
import type { ConceptState } from "@/engine/model";
import { addDays } from "@/engine/dates";

const INT = [1, 3, 7, 14, 30];
const D0 = "2026-10-01";
const ev = (result: ReviewEvent["result"], date: string, mode: "rec" | "prod" = "prod", conceptId = "a1-u01:hello"): ReviewEvent => ({
  conceptId,
  mode,
  result,
  date,
  exerciseId: "ex-" + date,
});

describe("acertos independentes sobem o nível e esticam o intervalo", () => {
  it("1 → 3 → 7 → 14 → 30 dias quando cada revisão acontece no vencimento", () => {
    let c: ConceptState | undefined;
    let day = D0;
    const gaps: number[] = [];
    for (let i = 0; i < 6; i++) {
      c = applyReview(c, ev("independent", day), INT);
      const due = c.prod.due!;
      gaps.push((new Date(due).getTime() - new Date(day).getTime()) / 86_400_000);
      day = due;
    }
    expect(gaps).toEqual([1, 3, 7, 14, 30, 30]);
    expect(c!.prod.level).toBe(5);
  });

  it("os intervalos são configuráveis", () => {
    const c = applyReview(undefined, ev("independent", D0), [2, 5, 9]);
    expect(c.prod.due).toBe(addDays(D0, 2));
  });
});

describe("erro reduz o nível e reagenda para amanhã", () => {
  it("cai 2 níveis, nunca abaixo de 0", () => {
    let c: ConceptState | undefined;
    let day = D0;
    for (let i = 0; i < 4; i++) {
      c = applyReview(c, ev("independent", day), INT);
      day = c.prod.due!;
    }
    expect(c!.prod.level).toBe(4);
    c = applyReview(c, ev("wrong", day), INT);
    expect(c.prod.level).toBe(2);
    expect(c.prod.due).toBe(addDays(day, 1));
    expect(c.prod.consecutive).toBe(0);
    const fresh = applyReview(undefined, ev("wrong", D0), INT);
    expect(fresh.prod.level).toBe(0);
    expect(fresh.prod.wrong).toBe(1);
  });
});

describe("acerto assistido não é recuperação independente", () => {
  it("não sobe o nível, agenda para amanhã e não conta como acerto independente", () => {
    const c = applyReview(undefined, ev("assisted", D0), INT);
    expect(c.prod.level).toBe(0);
    expect(c.prod.correct).toBe(0);
    expect(c.prod.assisted).toBe(1);
    expect(c.prod.due).toBe(addDays(D0, 1));
  });

  it("assistido reagenda para amanhã, mesmo se já estava vencido", () => {
    let c = applyReview(undefined, ev("independent", D0), INT); // due D0+1
    c = applyReview(c, ev("assisted", addDays(D0, 1)), INT);
    expect(c.prod.due).toBe(addDays(D0, 2));
    expect(c.prod.level).toBe(1);
  });
});

describe("repetir no mesmo dia não comprova retenção", () => {
  it("erro seguido de acerto no mesmo dia: o acerto é só repetição", () => {
    let c = applyReview(undefined, ev("wrong", D0), INT);
    c = applyReview(c, ev("independent", D0), INT);
    expect(c.prod.level).toBe(0);
    expect(c.prod.correct).toBe(0);
    expect(c.prod.repeats).toBe(1);
    expect(c.prod.due).toBe(addDays(D0, 1));
  });

  it("dois acertos no mesmo dia contam como um nível só", () => {
    let c = applyReview(undefined, ev("independent", D0), INT);
    c = applyReview(c, ev("independent", D0), INT);
    expect(c.prod.level).toBe(1);
    expect(c.prod.correct).toBe(1);
  });

  it("praticar de novo ANTES do vencimento não infla o nível", () => {
    let c = applyReview(undefined, ev("independent", D0), INT); // vence D0+1
    // Dois dias depois já venceu: sobe. Mas e um dia em que ainda não venceu?
    c = applyReview(c, ev("independent", addDays(D0, 1)), INT); // nível 2, vence D0+4
    const before = c.prod.level;
    c = applyReview(c, ev("independent", addDays(D0, 2)), INT); // ainda não venceu
    expect(c.prod.level).toBe(before);
    expect(c.prod.due).toBe(addDays(D0, 4));
    expect(c.prod.correct).toBe(3); // mas conta como evidência
  });
});

describe("reconhecer e produzir são estados separados", () => {
  it("acertar em múltipla escolha não agenda nem avança a produção", () => {
    const c = applyReview(undefined, ev("independent", D0, "rec"), INT);
    expect(c.rec.level).toBe(1);
    expect(c.prod.level).toBe(0);
    expect(c.prod.due).toBeNull();
  });

  it("modeOfKind separa reconhecimento de produção", () => {
    expect(modeOfKind("mcq")).toBe("rec");
    expect(modeOfKind("match")).toBe("rec");
    expect(modeOfKind("cloze")).toBe("prod");
    expect(modeOfKind("dictation")).toBe("prod");
    expect(modeOfKind("write")).toBeNull();
  });

  it("seedConcept agenda os dois modos para amanhã sem inventar acertos", () => {
    const c = seedConcept(undefined, "a1-u01:hello", D0, ["rec", "prod"], INT);
    expect(c.rec.due).toBe(addDays(D0, 1));
    expect(c.prod.due).toBe(addDays(D0, 1));
    expect(c.rec.correct + c.prod.correct).toBe(0);
  });
});

describe("fila de revisão e limite diário", () => {
  const build = (n: number): Record<string, ConceptState> => {
    const out: Record<string, ConceptState> = {};
    for (let i = 0; i < n; i++) {
      const id = `a1-u01:c${String(i).padStart(2, "0")}`;
      out[id] = seedConcept(undefined, id, D0, ["prod"], INT);
    }
    return out;
  };

  it("nada vence antes do dia agendado", () => {
    expect(dueItems(build(3), D0)).toHaveLength(0);
    expect(dueItems(build(3), addDays(D0, 1))).toHaveLength(3);
  });

  it("respeita o limite e nunca descarta o excedente", () => {
    const concepts = build(30);
    const day = addDays(D0, 1);
    const q = buildReviewQueue(concepts, day, 12);
    expect(q.today).toHaveLength(12);
    expect(q.totalDue).toBe(30);
    expect(q.deferred).toBe(18);
    // no dia seguinte, quem não foi revisado continua vencido e mais atrasado
    const q2 = buildReviewQueue(concepts, addDays(day, 1), 12);
    expect(q2.totalDue).toBe(30);
    expect(q2.today[0].overdueDays).toBe(1);
  });

  it("descontar o que já foi revisado hoje do limite", () => {
    const q = buildReviewQueue(build(30), addDays(D0, 1), 12, 10);
    expect(q.today).toHaveLength(2);
  });

  it("prioriza os mais atrasados e os de nível mais baixo", () => {
    const concepts: Record<string, ConceptState> = {};
    concepts["a1-u01:late"] = { ...seedConcept(undefined, "a1-u01:late", "2026-09-01", ["prod"], INT) };
    concepts["a1-u01:recent"] = { ...seedConcept(undefined, "a1-u01:recent", "2026-09-28", ["prod"], INT) };
    const q = buildReviewQueue(concepts, D0, 10);
    expect(q.today.map((i) => i.conceptId)).toEqual(["a1-u01:late", "a1-u01:recent"]);
  });

  it("não coloca reconhecer e produzir do mesmo conceito lado a lado", () => {
    const a = seedConcept(undefined, "a1-u01:a", D0, ["rec", "prod"], INT);
    const b = seedConcept(undefined, "a1-u01:b", D0, ["rec", "prod"], INT);
    const q = buildReviewQueue({ [a.id]: a, [b.id]: b }, addDays(D0, 1), 10);
    const ids = q.today.map((i) => i.conceptId);
    expect(ids.slice(0, 2).sort()).toEqual(["a1-u01:a", "a1-u01:b"]);
    expect(new Set(ids.slice(0, 2)).size).toBe(2);
  });

  it("requeueIndex reapresenta o item depois de outros", () => {
    expect(requeueIndex(2, 20)).toBe(6);
    expect(requeueIndex(8, 10)).toBe(10);
  });
});

describe("domínio nunca vem de um único acerto", () => {
  it("um acerto = em aprendizado; precisa de repetição em dias distintos", () => {
    let c = applyReview(undefined, ev("independent", D0), INT);
    expect(conceptStatus(c)).toBe("learning");
    c = applyReview(c, ev("independent", addDays(D0, 1)), INT);
    expect(conceptStatus(c)).toBe("practicing");
  });

  it("só chega a retido com revisões espaçadas bem-sucedidas", () => {
    let c: ConceptState | undefined;
    let day = D0;
    for (let i = 0; i < 5; i++) {
      c = applyReview(c, ev("independent", day), INT);
      if (i < 4) day = c.prod.due!;
    }
    expect(conceptStatus(c)).toBe("retained");
  });

  it("usa o modo mais fraco: reconhecer bem mas nunca produzir não é 'retido'", () => {
    let c: ConceptState | undefined;
    let day = D0;
    for (let i = 0; i < 5; i++) {
      c = applyReview(c, ev("independent", day, "rec"), INT);
      if (i < 4) day = c.rec.due!;
    }
    c = applyReview(c, ev("wrong", day, "prod"), INT);
    expect(conceptStatus(c)).toBe("learning");
  });

  it("conceito desconhecido é novo", () => {
    expect(conceptStatus(undefined)).toBe("new");
  });
});

import { describe, expect, it } from "vitest";
import { cloze, dict, fix, match, mc, order, type as typeEx, write, dialog, speak } from "@/content/builders";
import { gradeResponse, isIndependent, normalize } from "@/engine/grading";

const g = (ex: ReturnType<typeof cloze>, text: string) => gradeResponse(ex, { kind: "cloze", text } as never);

describe("normalize", () => {
  it("ignora caixa, espaços, pontuação final e aspas curvas", () => {
    expect(normalize("  Hello,   Ana! ")).toBe("hello ana");
    expect(normalize("I’m Ana.")).toBe(normalize("I am Ana"));
  });

  it("trata contrações inequívocas como a forma completa", () => {
    expect(normalize("I don't know")).toBe(normalize("I do not know"));
    expect(normalize("She isn't here")).toBe(normalize("She is not here"));
    expect(normalize("They're late")).toBe(normalize("They are late"));
    expect(normalize("I can't swim")).toBe(normalize("I cannot swim"));
    expect(normalize("I won't go")).toBe(normalize("I will not go"));
  });

  it("distingue 's de is e has pelo contexto", () => {
    expect(normalize("He's tired")).toBe(normalize("He is tired"));
    expect(normalize("She's been here")).toBe(normalize("She has been here"));
    expect(normalize("It's gone")).toBe(normalize("It has gone"));
  });

  it("NÃO apaga distinções gramaticais", () => {
    expect(normalize("He works")).not.toBe(normalize("He work"));
    expect(normalize("I am not")).not.toBe(normalize("I am"));
    expect(normalize("He walked")).not.toBe(normalize("He walks"));
    expect(normalize("its")).not.toBe(normalize("it's"));
  });

  it("aceita grafias britânicas equivalentes", () => {
    expect(normalize("my favourite colour")).toBe(normalize("my favorite color"));
  });
});

describe("cloze: lacuna digitada", () => {
  const ex = cloze("e1", "She ___ in a bank.", ["works"], "Terceira pessoa leva -s.", { s: "grammar", cue: "(work)" });

  it("aceita a resposta correta, com caixa e espaços diferentes", () => {
    expect(g(ex, "works").outcome).toBe("correct");
    expect(g(ex, "  WORKS ").outcome).toBe("correct");
  });

  it("rejeita a forma gramaticalmente diferente (work, working, worked)", () => {
    expect(g(ex, "work").outcome).toBe("incorrect");
    expect(g(ex, "working").outcome).toBe("incorrect");
    expect(g(ex, "worked").outcome).toBe("incorrect");
  });

  it("mostra a resposta esperada e marca a diferença", () => {
    const r = g(ex, "work");
    expect(r.correct).toBe(false);
    expect(r.expected).toEqual(["works"]);
    expect(r.userMarks?.[0]).toEqual({ text: "work", state: "wrong" });
  });

  it("usa explicação específica quando o erro foi previsto pelo autor", () => {
    const withTrap = cloze("e2", "He ___ to work.", "goes", "Geral", { t: [["go", "Com he/she/it o verbo ganha -es: goes."]] });
    expect(g(withTrap, "go").feedback).toBe("Com he/she/it o verbo ganha -es: goes.");
  });
});

describe("tolerância a digitação", () => {
  const vocab = cloze("e1", "I have a ___ every morning.", ["breakfast"], "Palavra de vocabulário.", { s: "vocabulary" });
  const grammar = cloze("e2", "I ___ breakfast every day.", ["have"], "Verbo.", { s: "grammar" });

  it("aceita uma troca no meio de palavra longa de vocabulário, avisando", () => {
    const r = g(vocab, "brekfast");
    expect(r.outcome).toBe("typo");
    expect(r.correct).toBe(true);
    expect(r.note).toContain("breakfast");
  });

  it("não aceita alteração no final da palavra (plural, -ed, -ing)", () => {
    expect(g(cloze("e3", "Two ___.", ["teachers"], "x", { s: "vocabulary" }), "teacher").outcome).toBe("incorrect");
    expect(g(cloze("e4", "She ___.", ["worked"], "x", { s: "vocabulary" }), "workes").outcome).toBe("incorrect");
  });

  it("não aceita erro de digitação em exercício de gramática", () => {
    expect(g(grammar, "hve").outcome).toBe("incorrect");
    expect(g(cloze("e5", "I ___ it.", ["understand"], "x", { s: "grammar" }), "undertand").outcome).toBe("incorrect");
  });

  it("palavras curtas nunca recebem tolerância", () => {
    expect(g(cloze("e6", "A ___.", ["bread"], "x", { s: "vocabulary" }), "bred").outcome).toBe("incorrect");
  });
});

describe("apóstrofo essencial", () => {
  const ex = typeEx("e1", "Diga: ela não gosta.", ["she doesn't like it", "she does not like it"], "Negativa com does not.");
  it("aceita contração ou forma completa", () => {
    expect(gradeResponse(ex, { kind: "type", text: "She doesn't like it." }).correct).toBe(true);
    expect(gradeResponse(ex, { kind: "type", text: "She does not like it" }).correct).toBe(true);
  });
  it("sem apóstrofo não passa e explica por quê", () => {
    const r = gradeResponse(ex, { kind: "type", text: "She doesnt like it" });
    expect(r.correct).toBe(false);
    expect(r.note).toContain("apóstrofo");
  });
});

describe("erro previsto tem precedência sobre a expansão de contrações", () => {
  const ex = typeEx("e1", "Resposta curta afirmativa", ["Yes, I am"], "Sem contração na resposta curta.", { t: [["Yes, I'm", "Na resposta curta afirmativa não se contrai."]] });
  it("aceita a forma certa e rejeita a contraída, com a explicação específica", () => {
    expect(gradeResponse(ex, { kind: "type", text: "Yes, I am." }).correct).toBe(true);
    const r = gradeResponse(ex, { kind: "type", text: "yes, I'm" });
    expect(r.correct).toBe(false);
    expect(r.feedback).toContain("não se contrai");
  });
  it("não atrapalha quando a forma contraída também está entre as aceitas", () => {
    const both = typeEx("e2", "x", ["I'm fine", "I am fine"], "Explicação qualquer aqui.", { t: [["I'm fine", "nunca usado"]] });
    expect(gradeResponse(both, { kind: "type", text: "I'm fine" }).correct).toBe(true);
  });
});

describe("mcq", () => {
  const ex = mc("e1", "Qual está certa?", ["He go", "He goes", "He going"], 1, "Com he/she/it: -s.", {
    why: ["Falta o -s.", undefined, "going precisa de is."],
  });
  it("acerta e erra com feedback por alternativa", () => {
    expect(gradeResponse(ex, { kind: "mcq", choice: 1 }).correct).toBe(true);
    const wrong = gradeResponse(ex, { kind: "mcq", choice: 0 });
    expect(wrong.correct).toBe(false);
    expect(wrong.feedback).toBe("Falta o -s.");
    expect(wrong.expected).toEqual(["He goes"]);
  });
  it("sem resposta é erro", () => {
    expect(gradeResponse(ex, { kind: "mcq", choice: null }).outcome).toBe("incorrect");
  });
});

describe("order, ditado e correção", () => {
  it("order aceita variações previstas e rejeita ordem errada", () => {
    const ex = order("e1", "Onde você mora?", ["Where do you live"], "Do vem antes do sujeito.");
    expect(gradeResponse(ex, { kind: "order", tokens: ["Where", "do", "you", "live"] }).correct).toBe(true);
    expect(gradeResponse(ex, { kind: "order", tokens: ["Where", "you", "do", "live"] }).correct).toBe(false);
  });

  it("ditado é estrito e aceita contração equivalente", () => {
    const ex = dict("e1", "I don't understand.", "Ouça com atenção.", { alt: [] });
    expect(gradeResponse(ex, { kind: "dictation", text: "I do not understand" }).correct).toBe(true);
    expect(gradeResponse(ex, { kind: "dictation", text: "I dont understand" }).correct).toBe(false);
    const v = dict("e2", "Nice to meet you.", "x", { s: "vocabulary" });
    expect(gradeResponse(v, { kind: "dictation", text: "Nice to meat you" }).correct).toBe(false);
  });

  it("fix recusa a frase repetida sem correção", () => {
    const ex = fix("e1", "I have 20 years.", ["I am 20 years old", "I'm 20 years old", "I am 20", "I'm 20"], "Idade usa to be.");
    const r = gradeResponse(ex, { kind: "fix", text: "I have 20 years." });
    expect(r.correct).toBe(false);
    expect(r.note).toContain("repetida");
    expect(gradeResponse(ex, { kind: "fix", text: "I'm 20 years old." }).correct).toBe(true);
  });
});

describe("match e dialog", () => {
  it("match só vale sem erros", () => {
    const ex = match("e1", "Associe", [["a", "1"], ["b", "2"], ["c", "3"]], "x");
    expect(gradeResponse(ex, { kind: "match", mistakes: 0, complete: true }).correct).toBe(true);
    expect(gradeResponse(ex, { kind: "match", mistakes: 2, complete: true }).correct).toBe(false);
    expect(gradeResponse(ex, { kind: "match", mistakes: 0, complete: false }).correct).toBe(false);
  });

  it("dialog é correto apenas se todas as escolhas forem adequadas, e explica cada turno", () => {
    const ex = dialog(
      "e1",
      "No café",
      [
        { npc: ["Hi! What can I get you?", "Oi! O que posso servir?"], options: [["A coffee, please.", true, "O atendente sorri.", "Educado e claro."], ["Coffee!", false, "O atendente franze a testa.", "Seco demais."]] },
      ],
      "Pedidos educados.",
    );
    expect(gradeResponse(ex, { kind: "dialog", choices: [0] }).correct).toBe(true);
    const wrong = gradeResponse(ex, { kind: "dialog", choices: [1] });
    expect(wrong.correct).toBe(false);
    expect(wrong.turns?.[0].why).toBe("Seco demais.");
  });
});

describe("tarefas abertas nunca recebem nota", () => {
  it("write e speak são autoavaliadas", () => {
    const w = write("e1", "Escreva", { min: 5, check: ["a", "b", "c"], model: "m" });
    const s = speak("e2", "Fale", ["Hello"], { check: ["a", "b", "c"] });
    const rw = gradeResponse(w, { kind: "write", text: "qualquer coisa", checks: [true, true, true] });
    const rs = gradeResponse(s, { kind: "speak", checks: [true, false, true], recorded: false });
    expect(rw.graded).toBe(false);
    expect(rw.outcome).toBe("self");
    expect(rw.correct).toBe(false);
    expect(rs.graded).toBe(false);
  });
});

describe("independência", () => {
  it("só acerto sem pista, sem revelar e sem repetição conta", () => {
    expect(isIndependent({ outcome: "correct", hints: 0, revealed: false })).toBe(true);
    expect(isIndependent({ outcome: "typo", hints: 0, revealed: false })).toBe(true);
    expect(isIndependent({ outcome: "correct", hints: 1, revealed: false })).toBe(false);
    expect(isIndependent({ outcome: "correct", hints: 0, revealed: true })).toBe(false);
    expect(isIndependent({ outcome: "correct", hints: 0, revealed: false, retry: true })).toBe(false);
    expect(isIndependent({ outcome: "correct", hints: 0, revealed: false, adapted: true })).toBe(false);
    expect(isIndependent({ outcome: "incorrect", hints: 0, revealed: false })).toBe(false);
  });
});

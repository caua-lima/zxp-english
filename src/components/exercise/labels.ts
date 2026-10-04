/**
 * Rótulos da interface de exercícios em português e em inglês.
 * O idioma das instruções é uma configuração: começa em português e pode passar
 * para inglês quando a pessoa quiser (a ajuda em português continua disponível
 * nas explicações).
 */
import type { ExerciseKind } from "@/content/schema";

export type Lang = "pt" | "en";

const KIND: Record<Lang, Record<ExerciseKind, string>> = {
  pt: {
    mcq: "Escolha a resposta",
    listen: "Ouça e escolha",
    cloze: "Complete a lacuna",
    order: "Monte a frase",
    match: "Associe os pares",
    dictation: "Ouça e escreva",
    fix: "Corrija a frase",
    type: "Escreva a resposta",
    dialog: "Escolha o que dizer",
    write: "Escrita",
    speak: "Fala",
  },
  en: {
    mcq: "Choose the answer",
    listen: "Listen and choose",
    cloze: "Fill in the gap",
    order: "Build the sentence",
    match: "Match the pairs",
    dictation: "Listen and write",
    fix: "Fix the sentence",
    type: "Write your answer",
    dialog: "Choose what to say",
    write: "Writing",
    speak: "Speaking",
  },
};

const UI = {
  pt: {
    check: "Verificar",
    continue: "Continuar",
    hint: "Pista",
    reveal: "Mostrar resposta",
    correct: "Correto!",
    typo: "Quase perfeito",
    incorrect: "Ainda não",
    self: "Registrado",
    yourAnswer: "Sua resposta",
    expected: "Resposta esperada",
    alsoAccepted: "Também aceito",
    why: "Por quê",
    listen: "Ouvir",
    slow: "Devagar",
    stop: "Parar",
    transcript: "Mostrar texto",
    clear: "Limpar",
    done: "Terminei",
    finish: "Concluir",
    yourTurn: "Sua vez",
  },
  en: {
    check: "Check",
    continue: "Continue",
    hint: "Hint",
    reveal: "Show answer",
    correct: "Correct!",
    typo: "Almost perfect",
    incorrect: "Not yet",
    self: "Saved",
    yourAnswer: "Your answer",
    expected: "Expected answer",
    alsoAccepted: "Also accepted",
    why: "Why",
    listen: "Listen",
    slow: "Slow",
    stop: "Stop",
    transcript: "Show text",
    clear: "Clear",
    done: "I'm done",
    finish: "Finish",
    yourTurn: "Your turn",
  },
} as const;

export type UiKey = keyof (typeof UI)["pt"];

export function kindLabel(kind: ExerciseKind, lang: Lang): string {
  return KIND[lang][kind];
}

export function ui(lang: Lang): Record<UiKey, string> {
  return UI[lang];
}

export const PHASE_LABEL: Record<string, string> = {
  guided: "Prática guiada",
  independent: "Prática independente",
  application: "Aplicação",
};

/**
 * Diagnóstico opcional: perguntas curtas, agrupadas por etapa, cada uma ligada à
 * unidade que trata do assunto. Serve só para SUGERIR um ponto de partida.
 * Não mede fala, escuta nem escrita, e não declara nível.
 */
import type { Exercise, Stage } from "./schema";
import { cloze, mc, rd } from "./builders";

export interface PlacementItem {
  stage: Stage;
  unitId: string;
  exercise: Exercise;
}

const item = (stage: Stage, unitId: string, exercise: Exercise): PlacementItem => ({
  stage,
  unitId,
  exercise: { ...exercise, id: `pl-${stage}-${exercise.id}` },
});

export const PLACEMENT: PlacementItem[] = [
  // ------------------------------------------------------------------ A1
  item("a1", "a1-u01", mc("1", "Someone says “Nice to meet you.” What do you answer?", ["Nice to meet you too.", "I'm fine, thanks.", "You're welcome."], 0,
    "A resposta a Nice to meet you é Nice to meet you too.", { s: "vocabulary" })),
  item("a1", "a1-u02", cloze("2", "She ___ a teacher.", ["is"], "Com she usamos is: She is a teacher.", { cue: "(be)" })),
  item("a1", "a1-u02", mc("3", "Como se diz “Eu tenho 20 anos” em inglês?", ["I am 20 years old.", "I have 20 years.", "I has 20 years old."], 0,
    "Idade usa o verbo to be: I am 20 years old.")),
  item("a1", "a1-u04", cloze("4", "He ___ to work by bus every day.", ["goes"], "Com he/she/it o verbo ganha -s ou -es: He goes.", { cue: "(go)" })),
  item("a1", "a1-u06", mc("5", "___ two bedrooms in my apartment.", ["There are", "There is", "It has", "Have"], 0,
    "Para dizer que algo existe, usamos there is / there are. Com plural (two bedrooms): There are.")),
  item("a1", "a1-u08", mc("6", "I ___ swim, but I can't dive.", ["can", "am", "do"], 0,
    "Can expressa habilidade: I can swim.")),

  // ------------------------------------------------------------------ A2
  item("a2", "a2-u01", mc("1", "Listen! The baby ___.", ["is crying", "cries", "cry"], 0,
    "Algo que acontece agora pede o presente contínuo: is crying.")),
  item("a2", "a2-u02", cloze("2", "We ___ to the beach last weekend.", ["went"], "O passado de go é irregular: went.", { cue: "(go)" })),
  item("a2", "a2-u04", mc("3", "This phone is ___ than that one.", ["cheaper", "more cheap", "cheapest"], 0,
    "Adjetivos curtos fazem o comparativo com -er: cheaper than.")),
  item("a2", "a2-u05", mc("4", "How ___ water do you drink a day?", ["much", "many", "a lot"], 0,
    "Water é incontável, então a pergunta é How much.")),
  item("a2", "a2-u07", mc("5", "That cough sounds bad. You ___ see a doctor.", ["should", "can", "would"], 0,
    "Should dá um conselho: You should see a doctor.")),
  item("a2", "a2-u08", mc("6", "___ you ever been to Japan?", ["Have", "Did", "Are"], 0,
    "Experiências de vida com ever pedem o present perfect: Have you ever been…?")),

  // ------------------------------------------------------------------ B1
  item("b1", "b1-u01", mc("1", "I ___ dinner when the phone rang.", ["was cooking", "cooked", "am cooking"], 0,
    "Uma ação em andamento interrompida por outra: past continuous (was cooking) + past simple (rang).")),
  item("b1", "b1-u02", cloze("2", "I've lived here ___ 2019.", ["since"], "Com um ponto de partida no tempo usamos since; com duração, for.")),
  item("b1", "b1-u03", mc("3", "If it rains tomorrow, we ___ at home.", ["will stay", "stay", "would stay"], 0,
    "Primeiro condicional: if + presente, will + verbo.")),
  item("b1", "b1-u06", mc("4", "If I ___ more time, I would learn Italian.", ["had", "have", "would have"], 0,
    "Segundo condicional: if + passado simples, would + verbo.")),
  item("b1", "b1-u07", mc("5", "The bridge ___ in 1932.", ["was built", "built", "has built"], 0,
    "A ponte não constrói: ela é construída. Voz passiva no passado: was built.")),

  // ------------------------------------------------------------------ B2
  item("b2", "b2-u02", mc("1", "When I got to the station, I realized I ___ my ticket at home.", ["had left", "have left", "was leaving"], 0,
    "Uma ação anterior a outra no passado pede o past perfect: had left.")),
  item("b2", "b2-u03", mc("2", "If I had known about the traffic, I ___ earlier.", ["would have left", "would leave", "had left"], 0,
    "Terceiro condicional: if + past perfect, would have + particípio.")),
  item("b2", "b2-u04", mc("3", "All the lights are off. They ___ gone out.", ["must have", "should have", "can have"], 0,
    "Dedução sobre o passado com alta certeza: must have + particípio.")),
  item("b2", "b2-u05", mc("4", "Which request is the most polite in a work email?",
    ["I was wondering if you could send me the report.", "Send me the report.", "I want the report today."], 0,
    "I was wondering if you could… é uma forma indireta e educada de pedir.", { s: "vocabulary" })),
  item("b2", "b2-u07", rd("5",
    "Although the company describes the layoffs as “a strategic realignment”, several employees told us they learned about them from the news.",
    "What does the writer suggest?",
    ["The company's wording hides how badly the layoffs were handled.", "The employees agree with the company's description.", "The layoffs were announced carefully to the staff."], 0,
    "O contraste com although e o detalhe de que souberam pela imprensa sugerem crítica à forma como a empresa agiu.")),
];

export function placementByStage(stage: Stage): PlacementItem[] {
  return PLACEMENT.filter((p) => p.stage === stage);
}

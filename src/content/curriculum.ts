/**
 * Mapa curricular: 4 etapas × 8 unidades.
 *
 * Referência: os níveis do CEFR (A1–B2) orientam os *objetivos comunicativos*.
 * O ZXP ENGLISH não é certificado nem validado por nenhuma instituição, e
 * concluir uma etapa não equivale a um resultado oficial de proficiência.
 *
 * A ordem recomendada é a ordem do array; `prerequisites` é o que de fato libera
 * uma unidade (um grafo acíclico, verificado em `tests/content`).
 */
import type { Stage, UnitMeta } from "./schema";

const u = (m: UnitMeta): UnitMeta => m;

export const CURRICULUM: UnitMeta[] = [
  // ================= A1 — Primeiros passos =================
  u({
    id: "a1-u01",
    stage: "a1",
    order: 1,
    title: "Olá! Primeiros contatos",
    subtitle: "Cumprimentar, dizer seu nome e sobreviver quando não entender.",
    canDo: [
      "Cumprimentar e se despedir de forma adequada ao momento do dia.",
      "Dizer seu nome, perguntar o nome de alguém e soletrar.",
      "Pedir que repitam, falar mais devagar ou dizer que não entendeu.",
    ],
    prerequisites: [],
    lessonCount: 4,
    focus: ["Pronúncia: alfabeto e sons do /h/ e do /th/", "Estratégias para pedir esclarecimento", "Formal x informal: Hello / Hi / Good morning"],
  }),
  u({
    id: "a1-u02",
    stage: "a1",
    order: 2,
    title: "Quem sou eu",
    subtitle: "Informações pessoais, países, profissões e o verbo to be.",
    canDo: [
      "Dizer de onde você é, onde mora e o que faz.",
      "Usar I am / you are / he is… em frases, negativas e perguntas.",
      "Dizer sua idade sem usar “I have 20 years”.",
    ],
    prerequisites: ["a1-u01"],
    lessonCount: 4,
    focus: ["Brasileiros: I am 20 (não I have 20 years)", "Pronúncia: thirteen x thirty", "Contrações: I'm, you're, he's"],
  }),
  u({
    id: "a1-u03",
    stage: "a1",
    order: 3,
    title: "Família e pessoas",
    subtitle: "Falar de quem você conhece e descrever pessoas de forma simples.",
    canDo: [
      "Apresentar membros da família e amigos.",
      "Usar my / your / his / her / our / their e o 's de posse.",
      "Descrever aparência e personalidade com frases curtas.",
    ],
    prerequisites: ["a1-u02"],
    lessonCount: 4,
    focus: ["Falso cognato: parents ≠ parentes", "Pronúncia: vogais curtas e longas (ship x sheep)", "have/has para posse e família"],
  }),
  u({
    id: "a1-u04",
    stage: "a1",
    order: 4,
    title: "Minha rotina",
    subtitle: "Falar do que você faz todo dia com o presente simples.",
    canDo: [
      "Descrever sua rotina com verbos no presente simples.",
      "Fazer e responder perguntas com do / does.",
      "Dizer o que você não faz com don't / doesn't.",
    ],
    prerequisites: ["a1-u02"],
    lessonCount: 4,
    focus: ["Brasileiros: He goes (não He go)", "Pronúncia do -s final: /s/, /z/, /ɪz/", "make x do em rotinas: make breakfast, do homework"],
  }),
  u({
    id: "a1-u05",
    stage: "a1",
    order: 5,
    title: "Horas, datas e compromissos",
    subtitle: "Números, horários, dias da semana e frequência.",
    canDo: [
      "Dizer e entender horas, datas e números do dia a dia.",
      "Marcar e confirmar um compromisso simples.",
      "Dizer com que frequência você faz algo (always, sometimes, never).",
    ],
    prerequisites: ["a1-u04"],
    lessonCount: 4,
    focus: ["Pronúncia: tonicidade em thirteen / thirty", "Preposições de tempo: at, on, in", "Perguntas com What time / When"],
  }),
  u({
    id: "a1-u06",
    stage: "a1",
    order: 6,
    title: "Casa e lugares",
    subtitle: "Onde as coisas estão: there is / there are e preposições.",
    canDo: [
      "Descrever a casa e os objetos que há nela.",
      "Dizer onde algo está com in, on, under, next to, between.",
      "Fazer perguntas sobre lugares próximos.",
    ],
    prerequisites: ["a1-u05"],
    lessonCount: 4,
    focus: ["Brasileiros: There is (não It has) para existência", "Pronúncia: there's a (som fraco)", "Collocation: live in, at home, next to"],
  }),
  u({
    id: "a1-u07",
    stage: "a1",
    order: 7,
    title: "Comida e compras",
    subtitle: "Pedir, comprar, perguntar preços e dizer o que você prefere.",
    canDo: [
      "Pedir comida e bebida de forma educada.",
      "Perguntar e entender preços.",
      "Dizer o que você gosta, não gosta e prefere.",
    ],
    prerequisites: ["a1-u06"],
    lessonCount: 4,
    focus: ["Pedidos educados: I'd like…, Can I have…?", "Entonação de perguntas", "Falso cognato: lunch x lanche"],
  }),
  u({
    id: "a1-u08",
    stage: "a1",
    order: 8,
    title: "O que eu sei fazer",
    subtitle: "Habilidades, can / can't, pedidos e orientações.",
    canDo: [
      "Falar do que você consegue e não consegue fazer.",
      "Pedir e dar ajuda e orientações simples.",
      "Fazer pedidos curtos com Can you…? / Could you…?",
    ],
    prerequisites: ["a1-u07"],
    lessonCount: 4,
    focus: ["Pronúncia: can x can't", "Orientações: turn left, go straight", "Estratégia: pedir para escrever ou soletrar"],
  }),

  // ================= A2 — Independência no cotidiano =================
  u({
    id: "a2-u01",
    stage: "a2",
    order: 1,
    title: "Agora e sempre",
    subtitle: "Presente contínuo e o contraste com hábitos.",
    canDo: [
      "Dizer o que está acontecendo agora.",
      "Diferenciar o que você faz habitualmente do que está fazendo agora.",
      "Falar de situações temporárias.",
    ],
    prerequisites: ["a1-u08"],
    lessonCount: 4,
    focus: ["Verbos de estado: know, want, like (sem -ing)", "Pronúncia: -ing fraco", "Marcadores: now, at the moment, usually"],
  }),
  u({
    id: "a2-u02",
    stage: "a2",
    order: 2,
    title: "Ontem foi assim",
    subtitle: "Passado simples: verbos regulares e os irregulares mais comuns.",
    canDo: [
      "Contar o que você fez no fim de semana.",
      "Perguntar e responder sobre o passado com did.",
      "Usar was / were e marcadores como yesterday e last week.",
    ],
    prerequisites: ["a2-u01"],
    lessonCount: 4,
    focus: ["Pronúncia do -ed: /t/, /d/, /ɪd/", "Irregulares frequentes: go, have, see, make", "Brasileiros: Did you go? (não Did you went?)"],
  }),
  u({
    id: "a2-u03",
    stage: "a2",
    order: 3,
    title: "Viagens e imprevistos",
    subtitle: "Transporte, hospedagem e como resolver problemas.",
    canDo: [
      "Comprar passagem, fazer check-in e pedir informações de transporte.",
      "Reclamar de um problema de forma educada e pedir solução.",
      "Entender avisos e anúncios comuns em viagens.",
    ],
    prerequisites: ["a2-u02"],
    lessonCount: 4,
    focus: ["Phrasal verbs: check in, get on, pick up", "Pedidos educados: Could I…? Would you mind…?", "Falso cognato: resume ≠ resumo"],
  }),
  u({
    id: "a2-u04",
    stage: "a2",
    order: 4,
    title: "Comparar e recomendar",
    subtitle: "Comparativos, superlativos, escolhas e sugestões.",
    canDo: [
      "Comparar pessoas, lugares e coisas.",
      "Justificar uma escolha entre duas opções.",
      "Fazer e aceitar recomendações.",
    ],
    prerequisites: ["a2-u02"],
    lessonCount: 4,
    focus: ["Pronúncia: than e as fracos", "as … as, the most", "Falso cognato: actually ≠ atualmente"],
  }),
  u({
    id: "a2-u05",
    stage: "a2",
    order: 5,
    title: "Quanto? Quantos?",
    subtitle: "Contáveis, incontáveis e quantidades nas compras.",
    canDo: [
      "Usar some, any, much, many, a lot of corretamente.",
      "Pedir e descrever quantidades em lojas e restaurantes.",
      "Ler uma receita ou lista de compras simples.",
    ],
    prerequisites: ["a1-u07", "a2-u02"],
    lessonCount: 4,
    focus: ["Brasileiros: some information (não informations)", "Medidas: a bottle of, a slice of", "Pronúncia: weak forms de some / of"],
  }),
  u({
    id: "a2-u06",
    stage: "a2",
    order: 6,
    title: "Planos e intenções",
    subtitle: "Formas frequentes de futuro: going to, will e planos combinados.",
    canDo: [
      "Falar dos seus planos e intenções.",
      "Fazer promessas, ofertas e decisões na hora com will.",
      "Combinar encontros usando o presente contínuo para o futuro.",
    ],
    prerequisites: ["a2-u01", "a2-u04"],
    lessonCount: 4,
    focus: ["Contrações: I'll, I'm going to → gonna (fala)", "Marcadores: tomorrow, next week, in a year", "make x do: make a plan, do a course"],
  }),
  u({
    id: "a2-u07",
    stage: "a2",
    order: 7,
    title: "Saúde e conselhos",
    subtitle: "Dar conselhos, falar de obrigação e pedir permissão.",
    canDo: [
      "Descrever sintomas e pedir ajuda em uma farmácia ou consulta.",
      "Dar e pedir conselhos com should / shouldn't.",
      "Falar de obrigação e permissão com must, have to, can, may.",
    ],
    prerequisites: ["a2-u06"],
    lessonCount: 4,
    focus: ["Brasileiros: I have a headache (não I have headache)", "must x have to; mustn't x don't have to", "Collocations: take medicine, have a cold"],
  }),
  u({
    id: "a2-u08",
    stage: "a2",
    order: 8,
    title: "Convites e experiências",
    subtitle: "Mensagens, convites e a primeira visão do present perfect.",
    canDo: [
      "Convidar, aceitar e recusar com educação, por mensagem e por voz.",
      "Perguntar e contar experiências com ever / never.",
      "Entender e escrever mensagens curtas do dia a dia.",
    ],
    prerequisites: ["a2-u07", "a2-u02"],
    lessonCount: 4,
    focus: ["Particípios irregulares frequentes", "Present perfect: ever, never, been", "Falso cognato: pretend ≠ pretender"],
  }),

  // ================= B1 — Comunicação com autonomia =================
  u({
    id: "b1-u01",
    stage: "b1",
    order: 1,
    title: "Contando histórias",
    subtitle: "Passado simples e contínuo para narrar o que aconteceu.",
    canDo: [
      "Contar uma história com início, meio e fim.",
      "Descrever o cenário (was raining) e as ações (I ran).",
      "Usar when, while, then e after that para organizar a narrativa.",
    ],
    prerequisites: ["a2-u08"],
    lessonCount: 4,
    focus: ["Pronúncia: ritmo e palavras de conteúdo", "when x while", "Phrasal verbs de narrativa: set off, end up"],
  }),
  u({
    id: "b1-u02",
    stage: "b1",
    order: 2,
    title: "Já aconteceu?",
    subtitle: "Present perfect em contraste com o passado simples.",
    canDo: [
      "Falar de experiências e resultados que importam agora.",
      "Usar for, since, already, yet e just.",
      "Escolher entre passado simples e present perfect.",
    ],
    prerequisites: ["b1-u01", "a2-u08"],
    lessonCount: 4,
    focus: ["Brasileiros: I live here for 3 years → I've lived here for 3 years", "Contrações: I've, she's been", "Falso cognato: eventually ≠ eventualmente"],
  }),
  u({
    id: "b1-u03",
    stage: "b1",
    order: 3,
    title: "O que vai acontecer",
    subtitle: "Planos, previsões e condicionais frequentes.",
    canDo: [
      "Fazer previsões e falar de probabilidade (will, might).",
      "Usar o primeiro condicional: If it rains, I'll stay home.",
      "Usar when, as soon as, unless e before com sentido de futuro.",
    ],
    prerequisites: ["b1-u02", "a2-u06"],
    lessonCount: 4,
    focus: ["Brasileiros: if I will go → if I go", "Pronúncia: 'll fraco", "Collocations: make a decision, take a chance"],
  }),
  u({
    id: "b1-u04",
    stage: "b1",
    order: 4,
    title: "Trabalho, estudos e entrevistas",
    subtitle: "Falar da carreira, responder em entrevista e explicar processos.",
    canDo: [
      "Descrever seu trabalho ou estudo e suas responsabilidades.",
      "Responder perguntas comuns de entrevista de forma organizada.",
      "Explicar um processo passo a passo.",
    ],
    prerequisites: ["b1-u02"],
    lessonCount: 4,
    focus: ["Orações relativas: who, which, that", "Sequenciadores: first, then, finally", "Falso cognato: college ≠ colégio"],
  }),
  u({
    id: "b1-u05",
    stage: "b1",
    order: 5,
    title: "Minha opinião",
    subtitle: "Opinar, justificar, concordar e discordar com educação.",
    canDo: [
      "Dar sua opinião e justificá-la com because, so e for example.",
      "Concordar, discordar parcialmente e discordar com educação.",
      "Contrastar ideias com but, although e however.",
    ],
    prerequisites: ["b1-u03"],
    lessonCount: 4,
    focus: ["Marcadores discursivos: well, actually, to be honest", "Suavizar discordância: I see your point, but…", "Falso cognato: sympathetic ≠ simpático"],
  }),
  u({
    id: "b1-u06",
    stage: "b1",
    order: 6,
    title: "E se…?",
    subtitle: "Problemas, hipóteses e o segundo condicional.",
    canDo: [
      "Falar de situações imaginárias: If I had more time, I would…",
      "Dar conselhos com If I were you, I'd…",
      "Expressar desejos sobre o presente com wish.",
    ],
    prerequisites: ["b1-u03"],
    lessonCount: 4,
    focus: ["Brasileiros: if I would have → if I had", "If I were you (were com todos os sujeitos)", "Pronúncia: 'd fraco (would / had)"],
  }),
  u({
    id: "b1-u07",
    stage: "b1",
    order: 7,
    title: "Notícias",
    subtitle: "Voz passiva e discurso relatado.",
    canDo: [
      "Ler e entender manchetes e notícias curtas.",
      "Usar a voz passiva quando o agente não importa ou é desconhecido.",
      "Relatar o que alguém disse com said that e told me.",
    ],
    prerequisites: ["b1-u02", "b1-u06"],
    lessonCount: 4,
    focus: ["say x tell", "Manchetes: tempo verbal e omissões", "Falso cognato: actual ≠ atual"],
  }),
  u({
    id: "b1-u08",
    stage: "b1",
    order: 8,
    title: "Conversas e mal-entendidos",
    subtitle: "Textos conectados, conversas longas e como resolver dúvidas.",
    canDo: [
      "Sustentar uma conversa de vários turnos e reformular o que ouviu.",
      "Resolver um mal-entendido com I mean… e What I meant was…",
      "Escrever um texto conectado de dois ou três parágrafos.",
    ],
    prerequisites: ["b1-u04", "b1-u05", "b1-u07"],
    lessonCount: 4,
    focus: ["Parafrasear: In other words, so you mean…", "Marcadores de coesão", "Estratégias: confirmar, corrigir-se, pedir exemplo"],
  }),

  // ================= B2 — Comunicação mais elaborada =================
  u({
    id: "b2-u01",
    stage: "b2",
    order: 1,
    title: "Argumentar",
    subtitle: "Estruturar uma argumentação com contrapontos.",
    canDo: [
      "Defender uma tese com argumentos organizados e exemplos.",
      "Reconhecer e responder a contra-argumentos.",
      "Usar conectores para guiar o ouvinte (firstly, on the other hand, therefore).",
    ],
    prerequisites: ["b1-u08"],
    lessonCount: 4,
    focus: ["Sinalização do discurso", "Colocações de argumentação: raise an issue, draw a conclusion", "Pronúncia: ênfase e pausas"],
  }),
  u({
    id: "b2-u02",
    stage: "b2",
    order: 2,
    title: "Narrativas complexas",
    subtitle: "Past perfect e relações temporais.",
    canDo: [
      "Narrar eventos em ordem diferente da cronológica usando o past perfect.",
      "Usar by the time, as soon as, until e after having.",
      "Contar uma história longa mantendo a coerência dos tempos verbais.",
    ],
    prerequisites: ["b2-u01"],
    lessonCount: 4,
    focus: ["Contrastar had done x did", "Pronúncia: 'd e had fraco", "Phrasal verbs: turn out, carry on"],
  }),
  u({
    id: "b2-u03",
    stage: "b2",
    order: 3,
    title: "Hipóteses e arrependimentos",
    subtitle: "Condicionais avançadas: terceiro e misto.",
    canDo: [
      "Falar de situações passadas que não aconteceram (If I had known…).",
      "Expressar arrependimento e crítica com wish e should have.",
      "Misturar passado e presente em hipóteses (If I had studied, I would be…).",
    ],
    prerequisites: ["b2-u02", "b1-u06"],
    lessonCount: 4,
    focus: ["Pronúncia: would have → 'would've'", "Brasileiros: if I would have known → if I had known", "Colocações: take the risk, miss the chance"],
  }),
  u({
    id: "b2-u04",
    stage: "b2",
    order: 4,
    title: "Certeza e nuance",
    subtitle: "Dedução, graus de certeza e modalização.",
    canDo: [
      "Fazer deduções sobre o presente e o passado (must be, can't have).",
      "Graduar certeza com probably, definitely, might, seems to.",
      "Atenuar afirmações para soar menos categórico.",
    ],
    prerequisites: ["b2-u03", "a2-u07"],
    lessonCount: 4,
    focus: ["Hedging: tend to, it appears that", "must have x had to", "Pronúncia: ênfase para certeza e dúvida"],
  }),
  u({
    id: "b2-u05",
    stage: "b2",
    order: 5,
    title: "Formal ou informal?",
    subtitle: "Registro, pedidos delicados e negociação.",
    canDo: [
      "Ajustar o registro à situação e ao interlocutor.",
      "Fazer pedidos e recusas delicados.",
      "Negociar uma solução com concessões.",
    ],
    prerequisites: ["b2-u04"],
    lessonCount: 4,
    focus: ["Would you mind…? / I was wondering if…", "Phrasal verbs formais x informais", "Falso cognato: sensible ≠ sensível"],
  }),
  u({
    id: "b2-u06",
    stage: "b2",
    order: 6,
    title: "Reuniões e entrevistas",
    subtitle: "Comunicação profissional: reuniões, apresentações e entrevistas.",
    canDo: [
      "Participar de uma reunião: opinar, interromper e pedir esclarecimento.",
      "Fazer uma apresentação curta e estruturada.",
      "Responder a perguntas de entrevista com exemplos concretos.",
    ],
    prerequisites: ["b2-u05", "b1-u04"],
    lessonCount: 4,
    focus: ["Linguagem de reunião: Let's move on, to sum up", "Pronúncia: ritmo de apresentação", "Collocations: meet a deadline, reach a consensus"],
  }),
  u({
    id: "b2-u07",
    stage: "b2",
    order: 7,
    title: "Ler nas entrelinhas",
    subtitle: "Artigos, inferências, ponto de vista e síntese.",
    canDo: [
      "Identificar tese, argumentos e ponto de vista do autor.",
      "Fazer inferências a partir de pistas do texto.",
      "Resumir um texto com suas próprias palavras e avaliar a força do argumento.",
    ],
    prerequisites: ["b2-u04"],
    lessonCount: 4,
    focus: ["Vocabulário avaliativo: claim, evidence, bias", "Reformular sem copiar (paraphrasing)", "Falso cognato: assume ≠ assumir (uma tarefa)"],
  }),
  u({
    id: "b2-u08",
    stage: "b2",
    order: 8,
    title: "Projeto final",
    subtitle: "Integrar tudo: debate, texto extenso e autonomia de estudo.",
    canDo: [
      "Planejar e entregar um texto de várias partes sobre um tema complexo.",
      "Participar de um debate com turnos, réplicas e síntese.",
      "Montar seu próprio plano de estudo para continuar aprendendo.",
    ],
    prerequisites: ["b2-u06", "b2-u07"],
    lessonCount: 4,
    focus: ["Estratégias de autonomia", "Revisão da própria produção (self-editing)", "Integração das quatro habilidades"],
  }),
];

export const UNIT_BY_ID: Record<string, UnitMeta> = Object.fromEntries(CURRICULUM.map((m) => [m.id, m]));

export function unitsOfStage(stage: Stage): UnitMeta[] {
  return CURRICULUM.filter((m) => m.stage === stage);
}

export function getUnitMeta(id: string): UnitMeta | undefined {
  return UNIT_BY_ID[id];
}

/** ID da unidade a que um conceito pertence (`a1-u02:be` → `a1-u02`). */
export function unitOfConcept(conceptId: string): string {
  return conceptId.split(":")[0];
}

/** ID da unidade a que uma lição/exercício pertence (`a1-u02-l1-e3` → `a1-u02`). */
export function unitOfItem(itemId: string): string {
  return itemId.slice(0, 6);
}

export function lessonIdsOf(meta: UnitMeta): string[] {
  return Array.from({ length: meta.lessonCount }, (_, i) => `${meta.id}-l${i + 1}`);
}

export function checkpointIdOf(unitId: string): string {
  return `${unitId}-cp`;
}

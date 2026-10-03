/**
 * Contrato do conteúdo do ZXP ENGLISH.
 *
 * O conteúdo vive em `src/content/units/*` e é validado por estes schemas
 * (testes + `npm run content:audit`). Nada aqui depende de React ou do navegador.
 *
 * IDs são estáveis: `a1-u01` (unidade), `a1-u01-l1` (lição), `a1-u01-l1-e3`
 * (exercício), `a1-u01:hello` (conceito de revisão). Corrigir o texto de um item
 * não muda o ID, então o progresso do usuário é preservado.
 */
import { z } from "zod";

export const STAGES = ["a1", "a2", "b1", "b2"] as const;
export type Stage = (typeof STAGES)[number];

export const SKILLS = [
  "reading",
  "listening",
  "writing",
  "speaking",
  "interaction",
  "grammar",
  "vocabulary",
  "pronunciation",
] as const;
export type Skill = (typeof SKILLS)[number];

export const SKILL_LABELS: Record<Skill, string> = {
  reading: "Leitura",
  listening: "Compreensão oral",
  writing: "Escrita",
  speaking: "Fala",
  interaction: "Interação",
  grammar: "Gramática em uso",
  vocabulary: "Vocabulário",
  pronunciation: "Pronúncia",
};

export const PHASES = ["guided", "independent", "application"] as const;
export type Phase = (typeof PHASES)[number];

export const EXERCISE_KINDS = [
  "mcq",
  "cloze",
  "order",
  "match",
  "listen",
  "dictation",
  "fix",
  "type",
  "dialog",
  "write",
  "speak",
] as const;
export type ExerciseKind = (typeof EXERCISE_KINDS)[number];

/** Exercícios corrigidos automaticamente. */
export const GRADED_KINDS: readonly ExerciseKind[] = [
  "mcq",
  "cloze",
  "order",
  "match",
  "listen",
  "dictation",
  "fix",
  "type",
  "dialog",
];
/** Exercícios autoavaliados (nunca recebem "nota" automática). */
export const SELF_ASSESSED_KINDS: readonly ExerciseKind[] = ["write", "speak"];
/** Exigem que a pessoa produza a resposta, em vez de reconhecê-la. */
export const PRODUCTION_KINDS: readonly ExerciseKind[] = [
  "cloze",
  "dictation",
  "fix",
  "type",
  "write",
  "speak",
];

const text = z.string().trim().min(1);
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const CONCEPT_ID = /^(?:a1|a2|b1|b2)-u0[1-8]:[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const UNIT_ID = /^(?:a1|a2|b1|b2)-u0[1-8]$/;

const localOrFullId = z.string().regex(slug, "ID inválido (use minúsculas, números e hífens)");
const conceptRef = z.string().regex(CONCEPT_ID, "ID de conceito inválido");

const trap = z.strictObject({ answer: text, why: text });

const base = {
  id: localOrFullId,
  skill: z.enum(SKILLS),
  phase: z.enum(PHASES).optional(),
  concepts: z.array(conceptRef),
  /** Explicação em português, mostrada após a resposta. Obrigatória. */
  explanation: text,
  /** Pistas progressivas (máx. 3). Usar pista torna a tentativa "assistida". */
  hints: z.array(text).max(3).optional(),
  /** Erros comuns previstos, com explicação específica. */
  traps: z.array(trap).optional(),
  /** `typo`: aceita um erro de digitação em palavra longa. Padrão depende da habilidade. */
  tolerance: z.enum(["strict", "typo"]).optional(),
  /** Ajuda em português para instruções escritas em inglês. */
  promptPt: text.optional(),
};

const option = z.strictObject({ text, why: text.optional() });

export const mcqSchema = z.strictObject({
  ...base,
  kind: z.literal("mcq"),
  prompt: text,
  passage: text.optional(),
  /** Usa o contexto (diálogo/texto) da lição como passagem. */
  usesContext: z.boolean().optional(),
  options: z.array(option).min(2).max(4),
  answer: z.number().int().min(0),
  shuffle: z.boolean().optional(),
});

export const listenSchema = z.strictObject({
  ...base,
  kind: z.literal("listen"),
  /** Texto falado (uma ou várias falas). */
  say: z.array(text).min(1),
  prompt: text,
  options: z.array(option).min(2).max(4),
  answer: z.number().int().min(0),
  shuffle: z.boolean().optional(),
});

export const clozeSchema = z.strictObject({
  ...base,
  kind: z.literal("cloze"),
  /** Frase com exatamente uma lacuna `___`. */
  text,
  accepted: z.array(text).min(1),
  /** Dica visível ao lado da lacuna, p. ex. "(work)". */
  cue: text.optional(),
  translation: text.optional(),
});

export const orderSchema = z.strictObject({
  ...base,
  kind: z.literal("order"),
  prompt: text,
  /** Banco de palavras (inclui distratores, se houver). */
  tokens: z.array(text).min(2),
  /** Frases aceitas, escritas com os mesmos tokens separados por espaço. */
  answers: z.array(text).min(1),
});

export const matchSchema = z.strictObject({
  ...base,
  kind: z.literal("match"),
  prompt: text,
  pairs: z.array(z.strictObject({ left: text, right: text })).min(3).max(6),
});

export const dictationSchema = z.strictObject({
  ...base,
  kind: z.literal("dictation"),
  say: text,
  accepted: z.array(text).min(1),
  prompt: text.optional(),
});

export const fixSchema = z.strictObject({
  ...base,
  kind: z.literal("fix"),
  prompt: text.optional(),
  wrong: text,
  accepted: z.array(text).min(1),
});

export const typeSchema = z.strictObject({
  ...base,
  kind: z.literal("type"),
  prompt: text,
  /** Contexto opcional (pergunta, texto curto) mostrado acima do prompt. */
  passage: text.optional(),
  usesContext: z.boolean().optional(),
  accepted: z.array(text).min(1),
});

export const dialogSchema = z.strictObject({
  ...base,
  kind: z.literal("dialog"),
  setup: text,
  turns: z
    .array(
      z.strictObject({
        npc: z.strictObject({ en: text, pt: text }),
        options: z
          .array(
            z.strictObject({
              text,
              ok: z.boolean(),
              /** O que acontece em seguida na conversa (pt). */
              reaction: text,
              why: text,
            }),
          )
          .min(2)
          .max(3),
      }),
    )
    .min(1)
    .max(3),
});

export const writeSchema = z.strictObject({
  ...base,
  kind: z.literal("write"),
  mode: z.enum(["guided", "free", "summary", "argument"]),
  prompt: text,
  frame: z.array(text).optional(),
  source: text.optional(),
  minWords: z.number().int().min(1),
  checklist: z.array(text).min(3).max(6),
  model: text,
});

export const speakSchema = z.strictObject({
  ...base,
  kind: z.literal("speak"),
  mode: z.enum(["repeat", "shadow", "respond"]),
  prompt: text,
  /** Falas-modelo (para ouvir e repetir) ou resposta-modelo. */
  lines: z.array(text).min(1),
  checklist: z.array(text).min(3).max(6),
});

export const exerciseSchema = z.discriminatedUnion("kind", [
  mcqSchema,
  listenSchema,
  clozeSchema,
  orderSchema,
  matchSchema,
  dictationSchema,
  fixSchema,
  typeSchema,
  dialogSchema,
  writeSchema,
  speakSchema,
]);
export type Exercise = z.infer<typeof exerciseSchema>;
export type ExerciseOf<K extends ExerciseKind> = Extract<Exercise, { kind: K }>;

// ---------- Contexto, explicação e lição ----------

const line = z.strictObject({ who: text.optional(), en: text, pt: text });
export const contextSchema = z.strictObject({
  kind: z.enum(["dialogue", "text", "message", "notice", "list"]),
  title: text.optional(),
  lines: z.array(line).min(1),
});
export type ContextBlock = z.infer<typeof contextSchema>;

const example = z.strictObject({ en: text, pt: text, note: text.optional() });
const contrast = z.strictObject({ wrong: text, right: text, why: text });

export const explanationSchema = z.strictObject({
  /** Curta e suficiente (markdown mínimo: **negrito**). */
  summary: text,
  /** Aprofundamento opcional. */
  details: text.optional(),
  examples: z.array(example).min(2),
  contrasts: z.array(contrast).optional(),
  /** Dica de pronúncia, falso cognato ou erro típico de brasileiros. */
  tip: text.optional(),
});
export type Explanation = z.infer<typeof explanationSchema>;

export const lessonSchema = z.strictObject({
  id: localOrFullId,
  title: text,
  /** Uma frase concreta: "Você vai conseguir …". */
  objective: text,
  minutes: z.number().int().min(3).max(20),
  context: contextSchema,
  explanation: explanationSchema,
  exercises: z.array(exerciseSchema).min(6).max(12),
  summary: z.strictObject({
    points: z.array(text).min(2).max(5),
    /** Conceitos enviados para revisão ao concluir a lição. */
    concepts: z.array(conceptRef).min(1),
  }),
});
export type Lesson = z.infer<typeof lessonSchema>;

export const conceptSchema = z.strictObject({
  id: conceptRef,
  type: z.enum(["word", "phrase", "pattern", "sound"]),
  en: text,
  pt: text,
  example: z.strictObject({ en: text, pt: text }).optional(),
  note: text.optional(),
  /** Lição em que o conceito é introduzido (ID completo). */
  lesson: localOrFullId,
  tags: z.array(z.enum(["collocation", "phrasal-verb", "false-friend", "chunk", "pronunciation"])).optional(),
});
export type Concept = z.infer<typeof conceptSchema>;

export const ACTIVITY_KINDS = ["reading", "listening", "writing", "speaking", "mission"] as const;
export type ActivityKind = (typeof ACTIVITY_KINDS)[number];
export const ACTIVITY_LABELS: Record<ActivityKind, string> = {
  reading: "Leitura",
  listening: "Escuta",
  writing: "Escrita",
  speaking: "Fala",
  mission: "Missão prática",
};

export const activitySchema = z.strictObject({
  id: localOrFullId,
  kind: z.enum(ACTIVITY_KINDS),
  title: text,
  goal: text,
  /** Leitura: o texto. Escuta: o roteiro (oculto até o fim). */
  context: contextSchema.optional(),
  exercises: z.array(exerciseSchema).min(1).max(6),
  /** Missão fora do app (autorrelato). */
  outside: z
    .strictObject({
      title: text,
      instructions: text,
      /** O que a pessoa marca como feito (autorrelato). */
      checklist: z.array(text).min(2).max(5),
    })
    .optional(),
});
export type Activity = z.infer<typeof activitySchema>;

export const checkpointSchema = z.strictObject({
  id: localOrFullId,
  intro: text,
  /** Duas versões com perguntas diferentes: tentativa 1 usa A, tentativa 2 usa B, e assim por diante. */
  setA: z.array(exerciseSchema).length(10),
  setB: z.array(exerciseSchema).length(10),
  /** Tarefa de produção da unidade (autoavaliada, registrada à parte). */
  production: z.union([writeSchema, speakSchema]),
});
export type Checkpoint = z.infer<typeof checkpointSchema>;

export const unitContentSchema = z.strictObject({
  id: z.string().regex(UNIT_ID),
  concepts: z.array(conceptSchema).min(8),
  lessons: z.array(lessonSchema).min(4).max(6),
  checkpoint: checkpointSchema,
  activities: z.strictObject({
    reading: activitySchema,
    listening: activitySchema,
    writing: activitySchema,
    speaking: activitySchema,
    mission: activitySchema,
  }),
});
export type UnitContent = z.infer<typeof unitContentSchema>;

// ---------- Mapa curricular ----------

export const unitMetaSchema = z.strictObject({
  id: z.string().regex(UNIT_ID),
  stage: z.enum(STAGES),
  order: z.number().int().min(1).max(8),
  title: text,
  subtitle: text,
  /** Objetivos comunicativos: o que a pessoa conseguirá fazer. */
  canDo: z.array(text).min(3).max(4),
  prerequisites: z.array(z.string().regex(UNIT_ID)),
  lessonCount: z.number().int().min(4).max(6),
  /** Pontos transversais trabalhados (pronúncia, collocations, falsos cognatos…). */
  focus: z.array(text).min(1),
});
export type UnitMeta = z.infer<typeof unitMetaSchema>;

export const STAGE_INFO: Record<Stage, { label: string; name: string; blurb: string }> = {
  a1: { label: "A1", name: "Primeiros passos", blurb: "Do zero: se apresentar, pedir o básico e entender frases de sobrevivência." },
  a2: { label: "A2", name: "Independência no cotidiano", blurb: "Resolver situações do dia a dia, contar o que aconteceu e fazer planos." },
  b1: { label: "B1", name: "Comunicação com autonomia", blurb: "Narrar, opinar, explicar processos e lidar com mal-entendidos." },
  b2: { label: "B2", name: "Comunicação mais elaborada", blurb: "Argumentar, negociar, ajustar o registro e sustentar conversas longas." },
};

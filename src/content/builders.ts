/**
 * Construtores (DSL) para escrever conteúdo de forma compacta.
 *
 * Cada função devolve um exercício com ID *local* (`e1`) e conceitos como *slug*
 * (`hello`). `defineUnit` qualifica tudo (`a1-u01-l1-e1`, `a1-u01:hello`) e o
 * resultado é validado por Zod nos testes (`tests/content`).
 */
import type {
  Activity,
  ActivityKind,
  Concept,
  ContextBlock,
  Exercise,
  Explanation,
  Phase,
  Skill,
  UnitContent,
} from "./schema";

type Opts = {
  /** habilidade principal */
  s?: Skill;
  /** conceitos praticados (slug local ou ID completo) */
  c?: string[];
  /** pistas progressivas em português */
  h?: string[];
  /** erros previstos: [resposta digitada, explicação] */
  t?: [string, string][];
  /** tolerância a digitação */
  tol?: "strict" | "typo";
  /** ajuda em português para prompt em inglês */
  pt?: string;
};

const common = (id: string, explanation: string, defaultSkill: Skill, o: Opts) => ({
  id,
  skill: o.s ?? defaultSkill,
  concepts: o.c ?? [],
  explanation,
  ...(o.h ? { hints: o.h } : {}),
  ...(o.t ? { traps: o.t.map(([answer, why]) => ({ answer, why })) } : {}),
  ...(o.tol ? { tolerance: o.tol } : {}),
  ...(o.pt ? { promptPt: o.pt } : {}),
});

const list = (v: string | string[]) => (Array.isArray(v) ? v : [v]);

/** Múltipla escolha. `why[i]` explica por que a opção i (ordem original) não serve. */
export function mc(
  id: string,
  prompt: string,
  options: string[],
  answer: number,
  explanation: string,
  o: Opts & { why?: (string | undefined)[]; passage?: string; ctx?: boolean; keepOrder?: boolean } = {},
): Exercise {
  return {
    ...common(id, explanation, "grammar", o),
    kind: "mcq",
    prompt,
    ...(o.passage ? { passage: o.passage } : {}),
    ...(o.ctx ? { usesContext: true } : {}),
    options: options.map((text, i) => ({ text, ...(o.why?.[i] ? { why: o.why[i] } : {}) })),
    answer,
    ...(o.keepOrder ? { shuffle: false } : {}),
  };
}

/** Compreensão de texto: múltipla escolha com passagem. */
export function rd(
  id: string,
  passage: string,
  prompt: string,
  options: string[],
  answer: number,
  explanation: string,
  o: Opts & { why?: (string | undefined)[]; keepOrder?: boolean } = {},
): Exercise {
  return mc(id, prompt, options, answer, explanation, { s: "reading", ...o, passage });
}

/** Compreensão oral: ouve o áudio, depois responde. */
export function listen(
  id: string,
  say: string | string[],
  prompt: string,
  options: string[],
  answer: number,
  explanation: string,
  o: Opts & { why?: (string | undefined)[]; keepOrder?: boolean } = {},
): Exercise {
  return {
    ...common(id, explanation, "listening", o),
    kind: "listen",
    say: list(say),
    prompt,
    options: options.map((text, i) => ({ text, ...(o.why?.[i] ? { why: o.why[i] } : {}) })),
    answer,
    ...(o.keepOrder ? { shuffle: false } : {}),
  };
}

/** Lacuna digitada. Use `___` uma vez. `cue` aparece como "(work)". */
export function cloze(
  id: string,
  text: string,
  accepted: string | string[],
  explanation: string,
  o: Opts & { cue?: string; tr?: string } = {},
): Exercise {
  return {
    ...common(id, explanation, "grammar", o),
    kind: "cloze",
    text,
    accepted: list(accepted),
    ...(o.cue ? { cue: o.cue } : {}),
    ...(o.tr ? { translation: o.tr } : {}),
  };
}

/** Ordenar palavras. `extra` adiciona palavras distratoras ao banco. */
export function order(
  id: string,
  prompt: string,
  answer: string | string[],
  explanation: string,
  o: Opts & { extra?: string[] } = {},
): Exercise {
  const answers = list(answer);
  return {
    ...common(id, explanation, "grammar", o),
    kind: "order",
    prompt,
    tokens: [...answers[0].split(/\s+/), ...(o.extra ?? [])],
    answers,
  };
}

/** Associar expressões e significados. */
export function match(
  id: string,
  prompt: string,
  pairs: [string, string][],
  explanation: string,
  o: Opts = {},
): Exercise {
  return {
    ...common(id, explanation, "vocabulary", o),
    kind: "match",
    prompt,
    pairs: pairs.map(([left, right]) => ({ left, right })),
  };
}

/** Ditado curto. `alt` lista grafias/contrações alternativas aceitas. */
export function dict(
  id: string,
  say: string,
  explanation: string,
  o: Opts & { alt?: string[]; prompt?: string } = {},
): Exercise {
  return {
    ...common(id, explanation, "listening", o),
    kind: "dictation",
    say,
    accepted: [say, ...(o.alt ?? [])],
    ...(o.prompt ? { prompt: o.prompt } : {}),
  };
}

/** Identificar e corrigir um erro: a pessoa reescreve a frase corretamente. */
export function fix(
  id: string,
  wrong: string,
  accepted: string | string[],
  explanation: string,
  o: Opts & { prompt?: string } = {},
): Exercise {
  return {
    ...common(id, explanation, "grammar", o),
    kind: "fix",
    wrong,
    accepted: list(accepted),
    ...(o.prompt ? { prompt: o.prompt } : {}),
  };
}

/** Resposta curta ou tradução digitada. */
export function type(
  id: string,
  prompt: string,
  accepted: string | string[],
  explanation: string,
  o: Opts & { passage?: string; ctx?: boolean } = {},
): Exercise {
  return {
    ...common(id, explanation, "vocabulary", o),
    kind: "type",
    prompt,
    accepted: list(accepted),
    ...(o.passage ? { passage: o.passage } : {}),
    ...(o.ctx ? { usesContext: true } : {}),
  };
}

export type TurnInput = {
  npc: [string, string];
  /** [texto, adequada?, reação (pt), por quê (pt)] */
  options: [string, boolean, string, string][];
};

/** Diálogo com escolhas e consequências. */
export function dialog(
  id: string,
  setup: string,
  turns: TurnInput[],
  explanation: string,
  o: Opts = {},
): Exercise {
  return {
    ...common(id, explanation, "interaction", o),
    kind: "dialog",
    setup,
    turns: turns.map((t) => ({
      npc: { en: t.npc[0], pt: t.npc[1] },
      options: t.options.map(([text, ok, reaction, why]) => ({ text, ok, reaction, why })),
    })),
  };
}

/** Escrita guiada/livre/síntese/argumentação (autoavaliada). */
export function write(
  id: string,
  prompt: string,
  o: Opts & {
    mode?: "guided" | "free" | "summary" | "argument";
    frame?: string[];
    source?: string;
    min: number;
    check: string[];
    model: string;
    note?: string;
  },
): Exercise {
  return {
    ...common(
      id,
      o.note ??
        "Compare seu texto com o modelo e marque apenas o que você realmente fez. Não há nota automática: esta é uma autoavaliação.",
      "writing",
      o,
    ),
    kind: "write",
    mode: o.mode ?? "guided",
    prompt,
    ...(o.frame ? { frame: o.frame } : {}),
    ...(o.source ? { source: o.source } : {}),
    minWords: o.min,
    checklist: o.check,
    model: o.model,
  };
}

/** Fala guiada: ouvir, repetir/shadowing ou responder em voz alta (autoavaliada). */
export function speak(
  id: string,
  prompt: string,
  lines: string | string[],
  o: Opts & { mode?: "repeat" | "shadow" | "respond"; check: string[]; note?: string },
): Exercise {
  return {
    ...common(
      id,
      o.note ??
        "Fale em voz alta, ouça o modelo de novo e marque o que conseguiu. Esta é uma autoavaliação: o app não mede sua pronúncia.",
      "speaking",
      o,
    ),
    kind: "speak",
    mode: o.mode ?? "repeat",
    prompt,
    lines: list(lines),
    checklist: o.check,
  };
}

// ---------- Estrutura ----------

export type ConceptInput = Omit<Concept, "id" | "lesson" | "example"> & {
  id: string;
  lesson: string;
  example?: { en: string; pt: string };
};

/** Conceito revisável: `concept('hello','phrase','Hello','Olá','l1', ['Hello, I am Ana.','Olá, eu sou a Ana.'])` */
export function concept(
  id: string,
  type: Concept["type"],
  en: string,
  pt: string,
  lesson: string,
  ex?: [string, string],
  extra: { note?: string; tags?: NonNullable<Concept["tags"]> } = {},
): ConceptInput {
  return {
    id,
    type,
    en,
    pt,
    lesson,
    ...(ex ? { example: { en: ex[0], pt: ex[1] } } : {}),
    ...(extra.note ? { note: extra.note } : {}),
    ...(extra.tags ? { tags: extra.tags } : {}),
  };
}

export type LessonInput = {
  id: string;
  title: string;
  objective: string;
  minutes: number;
  context: ContextBlock;
  explanation: Explanation;
  guided: Exercise[];
  independent: Exercise[];
  application: Exercise[];
  summary: { points: string[]; concepts: string[] };
};

export function lesson(id: string, input: Omit<LessonInput, "id">): LessonInput {
  return { id, ...input };
}

export type ActivityInput = Omit<Activity, "id"> & { id?: string };

export function activity(
  kind: ActivityKind,
  input: Omit<Activity, "id" | "kind">,
): ActivityInput {
  return { kind, ...input };
}

export type UnitInput = {
  id: string;
  concepts: ConceptInput[];
  lessons: LessonInput[];
  checkpoint: {
    intro: string;
    a: Exercise[];
    b: Exercise[];
    production: Exercise;
  };
  activities: Record<ActivityKind, ActivityInput>;
};

const qConcept = (unit: string, c: string) => (c.includes(":") ? c : `${unit}:${c}`);

function qualifyExercise(unit: string, parent: string, ex: Exercise, phase?: Phase): Exercise {
  return {
    ...ex,
    id: `${parent}-${ex.id}`,
    concepts: ex.concepts.map((c) => qConcept(unit, c)),
    ...(phase ? { phase } : {}),
  } as Exercise;
}

/** Qualifica IDs e monta o conteúdo final da unidade. */
export function defineUnit(input: UnitInput): UnitContent {
  const u = input.id;
  const lessons = input.lessons.map((l) => {
    const lid = `${u}-${l.id}`;
    const exercises = [
      ...l.guided.map((e) => qualifyExercise(u, lid, e, "guided")),
      ...l.independent.map((e) => qualifyExercise(u, lid, e, "independent")),
      ...l.application.map((e) => qualifyExercise(u, lid, e, "application")),
    ];
    return {
      id: lid,
      title: l.title,
      objective: l.objective,
      minutes: l.minutes,
      context: l.context,
      explanation: l.explanation,
      exercises,
      summary: {
        points: l.summary.points,
        concepts: l.summary.concepts.map((c) => qConcept(u, c)),
      },
    };
  });

  const cpId = `${u}-cp`;
  const checkpoint = {
    id: cpId,
    intro: input.checkpoint.intro,
    setA: input.checkpoint.a.map((e) => qualifyExercise(u, `${cpId}-a`, e)),
    setB: input.checkpoint.b.map((e) => qualifyExercise(u, `${cpId}-b`, e)),
    production: qualifyExercise(u, `${cpId}-prod`, input.checkpoint.production),
  } as UnitContent["checkpoint"];

  const acts = {} as UnitContent["activities"];
  for (const kind of Object.keys(input.activities) as ActivityKind[]) {
    const a = input.activities[kind];
    const aid = `${u}-act-${kind}`;
    acts[kind] = {
      ...a,
      id: aid,
      kind,
      exercises: a.exercises.map((e) => qualifyExercise(u, aid, e)),
    } as Activity;
  }

  const concepts = input.concepts.map((c) => ({
    ...c,
    id: qConcept(u, c.id),
    lesson: c.lesson.startsWith(u) ? c.lesson : `${u}-${c.lesson}`,
  })) as Concept[];

  return { id: u, concepts, lessons, checkpoint, activities: acts } as UnitContent;
}

/**
 * Produto cartesiano de trechos, para listar respostas aceitas sem repetir à mão.
 * `combos(["I'm fine", "Fine"], ["thanks", "thank you"])` → 4 frases.
 * Use "" em um grupo para tornar o trecho opcional.
 */
export function combos(...groups: string[][]): string[] {
  return groups.reduce<string[]>(
    (acc, group) => acc.flatMap((a) => group.map((b) => (a && b ? `${a} ${b}` : a || b))),
    [""],
  );
}

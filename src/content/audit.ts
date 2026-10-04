/**
 * Auditoria automática do conteúdo.
 *
 * Cobre o que máquina consegue verificar com segurança. A revisão editorial
 * (naturalidade do inglês, fidelidade da tradução, ambiguidade das perguntas)
 * é feita por leitura e registrada em docs/REVISAO-EDITORIAL.md — sem alegar
 * revisão humana especializada.
 */
import {
  GRADED_KINDS,
  PRODUCTION_KINDS,
  unitContentSchema,
  unitMetaSchema,
  type Exercise,
  type UnitContent,
  type UnitMeta,
} from "./schema";
import { exercisesOf, type Located } from "./iter";
import { gradeResponse, normalize, tokenize, type Response } from "@/engine/grading";

export interface Issue {
  level: "error" | "warn";
  unit: string;
  where: string;
  message: string;
}

const PT_CHARS = /[ãõçáéíóúâêôà]/i;
// Marcadores em maiúsculas são sensíveis à caixa: "todo mundo" é português legítimo.
const PLACEHOLDER = /\b(TODO|FIXME|XXX|TBD)\b|\b([Ll]orem ipsum|[Pp]laceholder)\b/;

function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter || 1);
}

/** Texto "da pergunta" de um exercício, para detectar repetições disfarçadas. */
function signature(ex: Exercise): string {
  switch (ex.kind) {
    case "mcq":
      return `${ex.prompt} ${ex.options.map((o) => o.text).join(" ")}`;
    case "listen":
      return `${ex.say.join(" ")} ${ex.options.map((o) => o.text).join(" ")}`;
    case "cloze":
      return ex.text + " " + ex.accepted[0];
    case "order":
      return ex.answers[0];
    case "match":
      return ex.pairs.map((p) => p.left + " " + p.right).join(" ");
    case "dictation":
      return ex.say;
    case "fix":
      return ex.wrong;
    case "type":
      return ex.prompt;
    case "dialog":
      return ex.setup + " " + ex.turns.map((t) => t.npc.en).join(" ");
    case "write":
      return ex.prompt;
    case "speak":
      return ex.prompt + " " + ex.lines.join(" ");
  }
}

function responseFor(ex: Exercise, text: string): Response | null {
  switch (ex.kind) {
    case "cloze":
    case "type":
    case "fix":
    case "dictation":
      return { kind: ex.kind, text };
    case "order":
      return { kind: "order", tokens: text.split(/\s+/) };
    default:
      return null;
  }
}

function auditExercise(L: Located, unitId: string, issues: Issue[]): void {
  const { ex } = L;
  const where = ex.id;
  const err = (message: string) => issues.push({ level: "error", unit: unitId, where, message });
  const warn = (message: string) => issues.push({ level: "warn", unit: unitId, where, message });

  if (ex.explanation.length < 10) err("Explicação curta demais para ser útil.");
  if (PLACEHOLDER.test(JSON.stringify(ex))) err("Contém marcador de placeholder (TODO, lorem, XXX…).");
  if (ex.hints?.some((h) => h.trim().length < 5)) err("Pista vazia ou curta demais.");

  switch (ex.kind) {
    case "mcq":
    case "listen": {
      if (ex.answer >= ex.options.length) err(`answer (${ex.answer}) fora do intervalo das opções.`);
      const norm = ex.options.map((o) => normalize(o.text));
      if (new Set(norm).size !== norm.length) err("Alternativas duplicadas.");
      if (ex.kind === "listen") {
        if (ex.say.some((s) => s.length > 220)) warn("Fala muito longa para um áudio sintético.");
        if (ex.say.some((s) => PT_CHARS.test(s))) err("Texto falado contém caracteres do português.");
      }
      if (ex.kind === "mcq" && ex.options.some((o) => o.text.length > 140)) warn("Alternativa muito longa.");
      const r = gradeResponse(ex, { kind: ex.kind, choice: ex.answer });
      if (!r.correct) err("A alternativa marcada como correta não é aceita pelo corretor.");
      break;
    }
    case "cloze": {
      const blanks = ex.text.split("___").length - 1;
      if (blanks !== 1) err(`A lacuna ___ deve aparecer exatamente uma vez (aparece ${blanks}).`);
      checkAccepted(ex, ex.accepted, err, warn);
      if (ex.accepted.some((a) => PT_CHARS.test(a))) err("Resposta aceita contém caracteres do português.");
      break;
    }
    case "type": {
      checkAccepted(ex, ex.accepted, err, warn);
      break;
    }
    case "fix": {
      checkAccepted(ex, ex.accepted, err, warn);
      if (ex.accepted.some((a) => normalize(a) === normalize(ex.wrong))) err("A frase errada também está na lista de aceitas.");
      if (PT_CHARS.test(ex.wrong)) err("Frase com erro contém caracteres do português.");
      break;
    }
    case "dictation": {
      checkAccepted(ex, ex.accepted, err, warn);
      if (!ex.accepted.some((a) => normalize(a) === normalize(ex.say))) err("O texto falado precisa estar entre as respostas aceitas.");
      if (ex.say.length > 160) warn("Ditado longo demais.");
      if (PT_CHARS.test(ex.say)) err("Texto falado contém caracteres do português.");
      break;
    }
    case "order": {
      const bank = new Map<string, number>();
      for (const t of ex.tokens) bank.set(t, (bank.get(t) ?? 0) + 1);
      for (const a of ex.answers) {
        const need = new Map<string, number>();
        for (const t of a.split(/\s+/)) need.set(t, (need.get(t) ?? 0) + 1);
        for (const [t, n] of need) if ((bank.get(t) ?? 0) < n) err(`A resposta “${a}” usa a palavra “${t}” mais vezes do que o banco tem.`);
        const r = responseFor(ex, a);
        if (r && !gradeResponse(ex, r).correct) err(`A resposta “${a}” não é aceita pelo corretor.`);
      }
      if (ex.tokens.length > 12) warn("Banco de palavras grande (mais de 12).");
      if (ex.answers.some((a) => PT_CHARS.test(a))) err("Resposta contém caracteres do português.");
      break;
    }
    case "match": {
      const l = ex.pairs.map((p) => normalize(p.left));
      const r = ex.pairs.map((p) => normalize(p.right));
      if (new Set(l).size !== l.length) err("Itens da esquerda duplicados.");
      if (new Set(r).size !== r.length) err("Itens da direita duplicados.");
      break;
    }
    case "dialog": {
      ex.turns.forEach((t, i) => {
        if (!t.options.some((o) => o.ok)) err(`Turno ${i + 1} sem opção adequada.`);
        if (!t.options.some((o) => !o.ok)) err(`Turno ${i + 1} sem opção inadequada.`);
        // Comparação literal: "Yes, I am" e "Yes, I'm" são opções diferentes de propósito.
        const n = t.options.map((o) => o.text.trim().toLowerCase());
        if (new Set(n).size !== n.length) err(`Turno ${i + 1} com opções duplicadas.`);
      });
      break;
    }
    case "write": {
      if (wordCount(ex.model) < ex.minWords) err(`O texto-modelo tem menos palavras (${wordCount(ex.model)}) do que o mínimo pedido (${ex.minWords}).`);
      if (PT_CHARS.test(ex.model)) err("Texto-modelo contém caracteres do português.");
      break;
    }
    case "speak": {
      if (ex.lines.some((s) => PT_CHARS.test(s))) err("Fala-modelo contém caracteres do português.");
      if (ex.lines.some((s) => s.length > 220)) warn("Fala-modelo longa para repetição.");
      break;
    }
  }

  // Traps: erro previsto precisa realmente ser rejeitado e ser diferente das aceitas.
  if (ex.traps && "accepted" in ex) {
    for (const t of ex.traps) {
      const r = responseFor(ex, t.answer);
      if (r && gradeResponse(ex, r).correct) err(`A armadilha “${t.answer}” é aceita como correta.`);
    }
  }
  if (ex.traps && !("accepted" in ex) && ex.kind !== "order") warn("`traps` só tem efeito em respostas digitadas e ordenação.");
}

function checkAccepted(
  ex: Exercise,
  accepted: string[],
  err: (m: string) => void,
  warn: (m: string) => void,
): void {
  // O corretor já expande contrações e ignora caixa/pontuação; só avisamos de cópias literais.
  const raw = accepted.map((a) => a.trim().toLowerCase());
  if (new Set(raw).size !== raw.length) warn("Respostas aceitas repetidas.");
  for (const a of accepted) {
    const r = responseFor(ex, a);
    if (!r) continue;
    const g = gradeResponse(ex, r);
    if (g.outcome !== "correct") err(`A resposta aceita “${a}” não passa no corretor (${g.outcome}).`);
  }
}

/** Auditoria de uma lista de unidades já carregadas. `meta` = mapa curricular completo. */
export function auditUnits(units: UnitContent[], meta: UnitMeta[]): Issue[] {
  const issues: Issue[] = [];
  const metaById = new Map(meta.map((m) => [m.id, m]));
  const orderOf = new Map(meta.map((m, i) => [m.id, i]));

  // IDs globais
  const seen = new Map<string, string>();
  const claim = (id: string, unit: string, what: string) => {
    const prev = seen.get(id);
    if (prev) issues.push({ level: "error", unit, where: id, message: `ID duplicado (${what}); já usado em ${prev}.` });
    else seen.set(id, `${unit} (${what})`);
  };

  // Conceitos conhecidos até cada unidade (ordem curricular)
  const conceptsByUnit = new Map<string, Set<string>>();
  for (const u of units) conceptsByUnit.set(u.id, new Set(u.concepts.map((c) => c.id)));

  // Uso de cada conceito no conjunto REVISÁVEL: exercícios corrigidos de lições e atividades.
  // O checkpoint fica de fora: seus itens só entram na revisão depois de uma tentativa.
  const usage = new Map<string, { total: number; production: number }>();
  const bump = (id: string, production: boolean) => {
    const cur = usage.get(id) ?? { total: 0, production: 0 };
    cur.total += 1;
    if (production) cur.production += 1;
    usage.set(id, cur);
  };

  for (const u of units) {
    const m = metaById.get(u.id);
    const parsed = unitContentSchema.safeParse(u);
    if (!parsed.success) {
      for (const i of parsed.error.issues.slice(0, 25)) {
        issues.push({ level: "error", unit: u.id, where: i.path.join("."), message: `Schema: ${i.message}` });
      }
      continue; // sem schema válido, as demais checagens não são confiáveis
    }
    if (!m) {
      issues.push({ level: "error", unit: u.id, where: u.id, message: "Unidade sem entrada no mapa curricular." });
      continue;
    }
    if (u.lessons.length !== m.lessonCount) {
      issues.push({ level: "error", unit: u.id, where: u.id, message: `Mapa curricular prevê ${m.lessonCount} lições; o conteúdo tem ${u.lessons.length}.` });
    }
    u.lessons.forEach((l, i) => {
      if (l.id !== `${u.id}-l${i + 1}`) issues.push({ level: "error", unit: u.id, where: l.id, message: `ID de lição esperado: ${u.id}-l${i + 1}.` });
    });

    const known = new Set<string>();
    for (const [uid, set] of conceptsByUnit) {
      if ((orderOf.get(uid) ?? 99) <= (orderOf.get(u.id) ?? -1)) for (const c of set) known.add(c);
    }

    // IDs
    u.concepts.forEach((c) => claim(c.id, u.id, "conceito"));
    u.lessons.forEach((l) => claim(l.id, u.id, "lição"));
    claim(u.checkpoint.id, u.id, "checkpoint");
    Object.values(u.activities).forEach((a) => claim(a.id, u.id, "atividade"));

    const all = exercisesOf(u);
    all.forEach((L) => claim(L.ex.id, u.id, "exercício"));

    // Conceitos
    const lessonIds = new Set(u.lessons.map((l) => l.id));
    for (const c of u.concepts) {
      if (!c.id.startsWith(`${u.id}:`)) issues.push({ level: "error", unit: u.id, where: c.id, message: "O conceito deve pertencer à unidade (prefixo do ID)." });
      if (!lessonIds.has(c.lesson)) issues.push({ level: "error", unit: u.id, where: c.id, message: `Lição de origem inexistente: ${c.lesson}.` });
      if (PT_CHARS.test(c.en)) issues.push({ level: "error", unit: u.id, where: c.id, message: "Campo en contém caracteres do português." });
    }

    // Lições
    const ownConcepts = conceptsByUnit.get(u.id)!;
    for (const l of u.lessons) {
      const phases = l.exercises.map((e) => e.phase);
      const idx = (p: string | undefined) => ["guided", "independent", "application"].indexOf(p ?? "");
      for (let i = 1; i < phases.length; i++) {
        if (idx(phases[i]) < idx(phases[i - 1])) issues.push({ level: "error", unit: u.id, where: l.id, message: "Exercícios fora da ordem guiado → independente → aplicação." });
      }
      for (const p of ["guided", "independent", "application"] as const) {
        if (!phases.includes(p)) issues.push({ level: "error", unit: u.id, where: l.id, message: `Falta a fase “${p}”.` });
      }
      const kinds = new Set(l.exercises.map((e) => e.kind));
      if (kinds.size < 3) issues.push({ level: "error", unit: u.id, where: l.id, message: "Menos de 3 tipos de exercício diferentes na lição." });
      if (!l.exercises.some((e) => PRODUCTION_KINDS.includes(e.kind))) issues.push({ level: "error", unit: u.id, where: l.id, message: "A lição não tem nenhuma atividade de produção." });
      if (l.exercises.filter((e) => e.kind === "mcq").length > Math.ceil(l.exercises.length * 0.45)) {
        issues.push({ level: "warn", unit: u.id, where: l.id, message: "Mais de 45% da lição é múltipla escolha." });
      }
      for (const c of l.summary.concepts) {
        if (!ownConcepts.has(c)) issues.push({ level: "error", unit: u.id, where: l.id, message: `Resumo envia à revisão um conceito inexistente nesta unidade: ${c}.` });
      }
      if (PLACEHOLDER.test(JSON.stringify(l))) issues.push({ level: "error", unit: u.id, where: l.id, message: "Marcador de placeholder na lição." });
      if (l.context.lines.some((ln) => PT_CHARS.test(ln.en))) issues.push({ level: "error", unit: u.id, where: l.id, message: "Linha em inglês do contexto contém caracteres do português." });
      if (l.explanation.examples.some((e) => PT_CHARS.test(e.en))) issues.push({ level: "error", unit: u.id, where: l.id, message: "Exemplo em inglês contém caracteres do português." });
    }

    // Exercícios individuais
    for (const L of all) {
      auditExercise(L, u.id, issues);
      for (const c of L.ex.concepts) {
        if (!known.has(c)) issues.push({ level: "error", unit: u.id, where: L.ex.id, message: `Referência a conceito inexistente (ou de unidade futura): ${c}.` });
        else if ((L.group === "lesson" || L.group === "activity") && GRADED_KINDS.includes(L.ex.kind)) bump(c, PRODUCTION_KINDS.includes(L.ex.kind));
      }
    }

    // Repetição disfarçada (mesma lição ou mesmo conjunto)
    const groups = new Map<string, Located[]>();
    for (const L of all) {
      const key = L.group === "lesson" ? L.parentId : L.group === "activity" ? L.parentId : L.group;
      groups.set(key, [...(groups.get(key) ?? []), L]);
    }
    for (const [key, list] of groups) {
      const sets = list.map((L) => new Set(tokenize(normalize(signature(L.ex)))));
      for (let i = 0; i < list.length; i++)
        for (let j = i + 1; j < list.length; j++) {
          if (list[i].ex.kind !== list[j].ex.kind) continue;
          if (jaccard(sets[i], sets[j]) >= 0.85) {
            issues.push({ level: "error", unit: u.id, where: `${list[i].ex.id} ~ ${list[j].ex.id}`, message: `Exercícios quase idênticos em ${key}.` });
          }
        }
    }

    // Checkpoint
    const cp = u.checkpoint;
    for (const [label, set] of [["A", cp.setA], ["B", cp.setB]] as const) {
      if (set.some((e) => !GRADED_KINDS.includes(e.kind))) issues.push({ level: "error", unit: u.id, where: cp.id, message: `A versão ${label} do checkpoint só pode ter exercícios corrigidos automaticamente.` });
      if (new Set(set.map((e) => e.kind)).size < 4) issues.push({ level: "error", unit: u.id, where: cp.id, message: `A versão ${label} precisa de pelo menos 4 tipos de exercício.` });
      if (set.filter((e) => PRODUCTION_KINDS.includes(e.kind)).length < 3) issues.push({ level: "error", unit: u.id, where: cp.id, message: `A versão ${label} precisa de pelo menos 3 exercícios de produção.` });
      const covered = new Set(set.flatMap((e) => e.concepts));
      const lessonsCovered = u.lessons.filter((l) => l.summary.concepts.some((c) => covered.has(c))).length;
      if (lessonsCovered < u.lessons.length) issues.push({ level: "error", unit: u.id, where: cp.id, message: `A versão ${label} não cobre conceitos de todas as lições (${lessonsCovered}/${u.lessons.length}).` });
    }
    const sa = new Set(cp.setA.map((e) => normalize(signature(e))));
    for (const e of cp.setB) if (sa.has(normalize(signature(e)))) issues.push({ level: "error", unit: u.id, where: e.id, message: "Pergunta repetida entre as versões A e B do checkpoint." });
    const lessonSigs = new Set(u.lessons.flatMap((l) => l.exercises.map((e) => normalize(signature(e)))));
    for (const e of [...cp.setA, ...cp.setB]) if (lessonSigs.has(normalize(signature(e)))) issues.push({ level: "error", unit: u.id, where: e.id, message: "O checkpoint reutiliza uma pergunta de lição (deve ser situação inédita)." });
    if (cp.production.kind !== "write" && cp.production.kind !== "speak") issues.push({ level: "error", unit: u.id, where: cp.id, message: "Produção do checkpoint deve ser escrita ou fala." });

    // Atividades
    const a = u.activities;
    if (!a.reading.context) issues.push({ level: "error", unit: u.id, where: a.reading.id, message: "Leitura sem texto." });
    if (a.reading.exercises.length < 3 || a.reading.exercises.some((e) => !GRADED_KINDS.includes(e.kind))) issues.push({ level: "error", unit: u.id, where: a.reading.id, message: "Leitura precisa de ≥ 3 exercícios corrigidos." });
    if (a.listening.exercises.filter((e) => e.kind === "listen" || e.kind === "dictation").length < 3) issues.push({ level: "error", unit: u.id, where: a.listening.id, message: "Escuta precisa de ≥ 3 exercícios de áudio." });
    if (!a.writing.exercises.some((e) => e.kind === "write")) issues.push({ level: "error", unit: u.id, where: a.writing.id, message: "Tarefa de escrita ausente." });
    if (!a.speaking.exercises.some((e) => e.kind === "speak")) issues.push({ level: "error", unit: u.id, where: a.speaking.id, message: "Tarefa de fala ausente." });
    if (!a.mission.exercises.some((e) => e.kind === "dialog") || !a.mission.outside) issues.push({ level: "error", unit: u.id, where: a.mission.id, message: "Missão precisa de um diálogo e de uma missão fora do app." });

    // Distribuição na unidade
    const lessonEx = u.lessons.flatMap((l) => l.exercises);
    const kindsUnit = new Set(all.map((x) => x.ex.kind));
    if (kindsUnit.size < 8) issues.push({ level: "error", unit: u.id, where: u.id, message: `Só ${kindsUnit.size} tipos de exercício na unidade (mínimo 8).` });
    const prodShare = lessonEx.filter((e) => PRODUCTION_KINDS.includes(e.kind)).length / lessonEx.length;
    if (prodShare < 0.3) issues.push({ level: "error", unit: u.id, where: u.id, message: `Só ${(prodShare * 100).toFixed(0)}% das atividades das lições exigem produção (mínimo 30%).` });
    const audioEx = lessonEx.filter((e) => e.kind === "listen" || e.kind === "dictation").length;
    if (audioEx < 3) issues.push({ level: "error", unit: u.id, where: u.id, message: "Menos de 3 exercícios de áudio nas lições." });
    if (!lessonEx.some((e) => e.kind === "speak")) issues.push({ level: "error", unit: u.id, where: u.id, message: "Nenhuma tarefa de fala nas lições." });
    if (!lessonEx.some((e) => e.kind === "write")) issues.push({ level: "warn", unit: u.id, where: u.id, message: "Nenhuma tarefa de escrita nas lições." });
    if (!lessonEx.some((e) => e.kind === "dialog")) issues.push({ level: "warn", unit: u.id, where: u.id, message: "Nenhum diálogo com escolhas nas lições." });
  }

  // Cobertura dos conceitos (olhando o uso em todas as unidades)
  for (const u of units) {
    for (const c of u.concepts) {
      const us = usage.get(c.id) ?? { total: 0, production: 0 };
      if (us.total < 2) issues.push({ level: "error", unit: u.id, where: c.id, message: `Conceito com menos de 2 exercícios revisáveis em lições/atividades (${us.total}); a revisão precisa de contextos diferentes.` });
      else if (c.type !== "sound" && us.production < 1) issues.push({ level: "error", unit: u.id, where: c.id, message: "Conceito sem exercício de produção (digitar/ditado/corrigir) em lições/atividades." });
    }
  }

  return issues;
}

/** Mapa curricular: schema, pré-requisitos existentes, ordem e ausência de ciclos. */
export function auditMeta(meta: UnitMeta[]): Issue[] {
  const issues: Issue[] = [];
  const ids = new Set<string>();
  const index = new Map(meta.map((m, i) => [m.id, i]));
  for (const m of meta) {
    const r = unitMetaSchema.safeParse(m);
    if (!r.success) for (const i of r.error.issues) issues.push({ level: "error", unit: m.id, where: i.path.join("."), message: i.message });
    if (ids.has(m.id)) issues.push({ level: "error", unit: m.id, where: m.id, message: "Unidade duplicada no mapa." });
    ids.add(m.id);
    if (!m.id.startsWith(m.stage)) issues.push({ level: "error", unit: m.id, where: m.id, message: "O ID deve começar pela etapa." });
    for (const p of m.prerequisites) {
      if (!index.has(p)) issues.push({ level: "error", unit: m.id, where: p, message: "Pré-requisito inexistente." });
      else if ((index.get(p) ?? 0) >= (index.get(m.id) ?? 0)) issues.push({ level: "error", unit: m.id, where: p, message: "Pré-requisito aponta para unidade posterior (ordem ou ciclo)." });
    }
  }
  // ciclos (defesa em profundidade, caso a ordem acima mude)
  const state = new Map<string, 0 | 1 | 2>();
  const byId = new Map(meta.map((m) => [m.id, m]));
  const visit = (id: string, path: string[]): void => {
    if (state.get(id) === 2) return;
    if (state.get(id) === 1) {
      issues.push({ level: "error", unit: id, where: id, message: `Ciclo de pré-requisitos: ${[...path, id].join(" → ")}` });
      return;
    }
    state.set(id, 1);
    for (const p of byId.get(id)?.prerequisites ?? []) if (byId.has(p)) visit(p, [...path, id]);
    state.set(id, 2);
  };
  for (const m of meta) visit(m.id, []);
  return issues;
}

export interface UnitStats {
  unit: string;
  lessons: number;
  lessonExercises: number;
  checkpointExercises: number;
  activityExercises: number;
  concepts: number;
  kinds: Record<string, number>;
}

export function contentStats(units: UnitContent[]): UnitStats[] {
  return units.map((u) => {
    const kinds: Record<string, number> = {};
    for (const L of exercisesOf(u)) kinds[L.ex.kind] = (kinds[L.ex.kind] ?? 0) + 1;
    return {
      unit: u.id,
      lessons: u.lessons.length,
      lessonExercises: u.lessons.reduce((n, l) => n + l.exercises.length, 0),
      checkpointExercises: u.checkpoint.setA.length + u.checkpoint.setB.length + 1,
      activityExercises: Object.values(u.activities).reduce((n, a) => n + a.exercises.length, 0),
      concepts: u.concepts.length,
      kinds,
    };
  });
}

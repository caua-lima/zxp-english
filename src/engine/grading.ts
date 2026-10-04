/**
 * Correção de respostas.
 *
 * Princípios (ver docs/REGRAS.md):
 * - Normalização só do que NÃO muda o objetivo: caixa, espaços, pontuação
 *   final/interna, aspas curvas, hífen, contrações inequívocas (don't = do not),
 *   grafias americana/britânica.
 * - NÃO se normaliza: negação, tempo verbal, concordância (work ≠ works),
 *   apóstrofo essencial (its ≠ it's).
 * - Tolerância a digitação: no máximo UMA palavra longa (≥ 6 letras) com UMA troca,
 *   inserção, remoção ou transposição no meio da palavra — nunca no final (para não
 *   aprovar work/works, walk/walked) — e só em exercícios de vocabulário.
 * - Respostas abertas (write/speak) NUNCA recebem nota automática.
 */
import type { Exercise } from "@/content/schema";

export type Outcome = "correct" | "typo" | "incorrect" | "self";

export type Response =
  | { kind: "mcq" | "listen"; choice: number | null }
  | { kind: "cloze" | "type" | "fix" | "dictation"; text: string }
  | { kind: "order"; tokens: string[] }
  | { kind: "match"; mistakes: number; complete: boolean }
  | { kind: "dialog"; choices: number[] }
  | { kind: "write"; text: string; checks: boolean[] }
  | { kind: "speak"; checks: boolean[]; recorded: boolean };

export type Mark = { text: string; state: "ok" | "wrong" | "extra" | "missing" };

export interface GradeResult {
  outcome: Outcome;
  /** true para correct e typo. */
  correct: boolean;
  /** false em tarefas autoavaliadas (write/speak). */
  graded: boolean;
  userAnswer: string;
  /** Respostas válidas para exibir (a primeira é a principal). */
  expected: string[];
  /** Feedback específico em português. */
  feedback: string;
  /** Observação curta (digitação, apóstrofo…). */
  note?: string;
  /** Marcações palavra a palavra da resposta do usuário e da esperada. */
  userMarks?: Mark[];
  expectedMarks?: Mark[];
  /** Por turno, em diálogos. */
  turns?: { ok: boolean; picked: string; reaction: string; why: string }[];
}

// ---------- Normalização ----------

const UK_US: Record<string, string> = {
  colour: "color", colours: "colors", favourite: "favorite", favourites: "favorites",
  centre: "center", centres: "centers", theatre: "theater", grey: "gray",
  programme: "program", programmes: "programs", neighbour: "neighbor", neighbours: "neighbors",
  behaviour: "behavior", honour: "honor", labour: "labor", metre: "meter", metres: "meters",
  litre: "liter", litres: "liters", cheque: "check", defence: "defense", organise: "organize",
  organised: "organized", realise: "realize", realised: "realized", recognise: "recognize",
  travelled: "traveled", travelling: "traveling", traveller: "traveler", cancelled: "canceled",
  jewellery: "jewelry", licence: "license", catalogue: "catalog", dialogue: "dialog",
  mum: "mom", analyse: "analyze", apologise: "apologize", memorise: "memorize",
  enrol: "enroll", fulfil: "fulfill", skilful: "skillful", aeroplane: "airplane",
};

const HAS_NEXT = new Set([
  "been", "gone", "done", "got", "gotten", "seen", "taken", "made", "lost", "finished",
  "eaten", "left", "come", "become", "just", "already", "ever", "never", "yet", "had", "broken", "written",
]);
const SUBJECT_S = /\b(he|she|it|that|there|here|what|who|where|how|when|why|everyone|someone|nobody|everything|this)'s\b/g;

function expandContractions(s: string): string {
  let out = s
    .replace(/\bcan't\b/g, "cannot")
    .replace(/\bcan not\b/g, "cannot")
    .replace(/\bwon't\b/g, "will not")
    .replace(/\bshan't\b/g, "shall not")
    .replace(/\blet's\b/g, "let us")
    .replace(/\b(\w+)n't\b/g, "$1 not")
    .replace(/\b(\w+)'m\b/g, "$1 am")
    .replace(/\b(\w+)'re\b/g, "$1 are")
    .replace(/\b(\w+)'ve\b/g, "$1 have")
    .replace(/\b(\w+)'ll\b/g, "$1 will");
  // 's → is / has (pelo contexto imediato)
  out = out.replace(new RegExp(SUBJECT_S.source + "(?:\\s+(\\w+))?", "g"), (_m, subj: string, next?: string) =>
    `${subj} ${next && HAS_NEXT.has(next) ? "has" : "is"}${next ? " " + next : ""}`,
  );
  // 'd → would / had
  out = out.replace(/\b(i|you|he|she|it|we|they|who|there)'d(?:\s+(\w+))?/g, (_m, subj: string, next?: string) =>
    `${subj} ${next && (HAS_NEXT.has(next) || next === "better") ? "had" : "would"}${next ? " " + next : ""}`,
  );
  return out;
}

function baseClean(s: string): string {
  return s
    .normalize("NFKC")
    .replace(/[‘’ʼ`´]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, " ")
    .toLowerCase();
}

/** Forma canônica para comparação. Mantém distinções gramaticais. */
export function normalize(input: string): string {
  let s = baseClean(input);
  s = expandContractions(s);
  s = s.replace(/-/g, " ");
  // remove pontuação (menos apóstrofo e símbolo de moeda)
  s = s.replace(/[.,!?;:"()\[\]{}…]/g, " ");
  s = s.replace(/\s+/g, " ").trim();
  return s
    .split(" ")
    .map((w) => UK_US[w] ?? w)
    .join(" ");
}

/** Forma "como digitada": sem caixa nem pontuação, mas SEM expandir contrações. */
function plainKey(input: string): string {
  return baseClean(input)
    .replace(/[.,!?;:"()\[\]{}…-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Chave sem apóstrofos, para detectar "dont" / "its" digitados sem apóstrofo. */
function looseKey(input: string): string {
  return baseClean(input)
    .replace(/'/g, "")
    .replace(/[.,!?;:"()\[\]{}…-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(normalized: string): string[] {
  return normalized.length ? normalized.split(" ") : [];
}

// ---------- Distâncias ----------

/** Distância de Damerau-Levenshtein restrita (transposição conta 1). */
export function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const d: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = 0; i <= m; i++) d[i][0] = i;
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[m][n];
}

type Op = { op: "eq" | "sub" | "del" | "ins"; user?: string; exp?: string };

function alignTokens(user: string[], exp: string[]): { cost: number; ops: Op[] } {
  const m = user.length;
  const n = exp.length;
  const d: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = 0; i <= m; i++) d[i][0] = i;
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + (user[i - 1] === exp[j - 1] ? 0 : 1),
      );
    }
  }
  const ops: Op[] = [];
  let i = m;
  let j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && d[i][j] === d[i - 1][j - 1] + (user[i - 1] === exp[j - 1] ? 0 : 1)) {
      ops.push(user[i - 1] === exp[j - 1] ? { op: "eq", user: user[i - 1], exp: exp[j - 1] } : { op: "sub", user: user[i - 1], exp: exp[j - 1] });
      i--;
      j--;
    } else if (i > 0 && d[i][j] === d[i - 1][j] + 1) {
      ops.push({ op: "del", user: user[i - 1] });
      i--;
    } else {
      ops.push({ op: "ins", exp: exp[j - 1] });
      j--;
    }
  }
  return { cost: d[m][n], ops: ops.reverse() };
}

function marks(ops: Op[]): { user: Mark[]; expected: Mark[] } {
  const user: Mark[] = [];
  const expected: Mark[] = [];
  for (const o of ops) {
    if (o.op === "eq") {
      user.push({ text: o.user!, state: "ok" });
      expected.push({ text: o.exp!, state: "ok" });
    } else if (o.op === "sub") {
      user.push({ text: o.user!, state: "wrong" });
      expected.push({ text: o.exp!, state: "missing" });
    } else if (o.op === "del") {
      user.push({ text: o.user!, state: "extra" });
    } else {
      expected.push({ text: o.exp!, state: "missing" });
    }
  }
  return { user, expected };
}

/** Uma única palavra longa com erro de digitação no meio. Nunca aceita mudança no final. */
function isTypoOnly(userToks: string[], expToks: string[]): boolean {
  if (userToks.length !== expToks.length) return false;
  const diff: number[] = [];
  for (let i = 0; i < userToks.length; i++) if (userToks[i] !== expToks[i]) diff.push(i);
  if (diff.length !== 1) return false;
  const u = userToks[diff[0]];
  const e = expToks[diff[0]];
  if (e.length < 6 || u.length < 5) return false;
  if (u[0] !== e[0]) return false;
  if (u[u.length - 1] !== e[e.length - 1]) return false; // -s, -ed, -ing, -ly…
  return editDistance(u, e) === 1;
}

// ---------- Correção textual ----------

interface TextVerdict {
  outcome: Outcome;
  closest: string;
  note?: string;
  trap?: string;
  userMarks?: Mark[];
  expectedMarks?: Mark[];
}

function judgeText(
  userRaw: string,
  accepted: string[],
  opts: { typoAllowed: boolean; traps?: { answer: string; why: string }[]; unchangedFrom?: string },
): TextVerdict {
  const user = normalize(userRaw);
  const normAccepted = accepted.map((a) => ({ raw: a, norm: normalize(a) }));

  // Erro previsto pelo autor → explicação específica. Tem precedência quando a forma
  // digitada coincide com ele sem expandir contrações: "Yes, I'm" é um erro mesmo que
  // "Yes, I am" seja aceito, e a expansão de contrações não pode apagar essa diferença.
  const plain = plainKey(userRaw);
  const literalTrap = opts.traps?.find((t) => plainKey(t.answer) === plain && !accepted.some((a) => plainKey(a) === plain));

  const exact = normAccepted.find((a) => a.norm === user);
  if (exact && user.length > 0 && !literalTrap) return { outcome: "correct", closest: exact.raw };

  const trap = literalTrap ?? opts.traps?.find((t) => normalize(t.answer) === user);

  // Escolhe a resposta aceita mais próxima, para marcar diferenças.
  const userToks = tokenize(user);
  let best = normAccepted[0];
  let bestAlign = alignTokens(userToks, tokenize(best.norm));
  for (const cand of normAccepted.slice(1)) {
    const al = alignTokens(userToks, tokenize(cand.norm));
    if (al.cost < bestAlign.cost) {
      best = cand;
      bestAlign = al;
    }
  }
  const m = marks(bestAlign.ops);

  if (opts.typoAllowed && !trap) {
    for (const cand of normAccepted) {
      if (isTypoOnly(userToks, tokenize(cand.norm))) {
        return {
          outcome: "typo",
          closest: cand.raw,
          note: `Quase perfeito: a grafia correta é “${cand.raw}”.`,
          userMarks: m.user,
          expectedMarks: m.expected,
        };
      }
    }
  }

  let note: string | undefined;
  const loose = looseKey(userRaw);
  if (user.length > 0 && normAccepted.some((a) => looseKey(a.raw) === loose)) {
    note = "Quase! Faltou um apóstrofo (por exemplo, don't, it's, I'm). Em inglês ele muda a palavra ou o sentido.";
  } else if (opts.unchangedFrom && normalize(opts.unchangedFrom) === user) {
    note = "A frase foi repetida sem correção. Procure o erro e reescreva.";
  }

  return {
    outcome: "incorrect",
    closest: best.raw,
    note,
    trap: trap?.why,
    userMarks: m.user,
    expectedMarks: m.expected,
  };
}

function typoAllowed(ex: Exercise): boolean {
  if (ex.kind === "dictation") return false;
  const tol = ex.tolerance ?? (ex.skill === "vocabulary" || ex.skill === "pronunciation" ? "typo" : "strict");
  return tol === "typo";
}

// ---------- API principal ----------

export function gradeResponse(ex: Exercise, res: Response): GradeResult {
  switch (ex.kind) {
    case "mcq":
    case "listen": {
      const choice = res.kind === "mcq" || res.kind === "listen" ? res.choice : null;
      const picked = choice != null ? ex.options[choice] : undefined;
      const ok = choice === ex.answer;
      return {
        outcome: ok ? "correct" : "incorrect",
        correct: ok,
        graded: true,
        userAnswer: picked?.text ?? "(sem resposta)",
        expected: [ex.options[ex.answer].text],
        feedback: ok ? ex.explanation : (picked?.why ?? ex.explanation),
        note: ok ? undefined : picked?.why ? ex.explanation : undefined,
      };
    }

    case "cloze":
    case "type":
    case "fix":
    case "dictation": {
      const text = res.kind === "cloze" || res.kind === "type" || res.kind === "fix" || res.kind === "dictation" ? res.text : "";
      const v = judgeText(text, ex.accepted, {
        typoAllowed: typoAllowed(ex),
        traps: ex.traps,
        unchangedFrom: ex.kind === "fix" ? ex.wrong : undefined,
      });
      const ok = v.outcome === "correct" || v.outcome === "typo";
      return {
        outcome: v.outcome,
        correct: ok,
        graded: true,
        userAnswer: text.trim() || "(sem resposta)",
        expected: ex.accepted,
        feedback: !ok && v.trap ? v.trap : ex.explanation,
        note: v.note,
        userMarks: v.userMarks,
        expectedMarks: v.expectedMarks,
      };
    }

    case "order": {
      const tokens = res.kind === "order" ? res.tokens : [];
      const text = tokens.join(" ");
      const v = judgeText(text, ex.answers, { typoAllowed: false, traps: ex.traps });
      const ok = v.outcome === "correct";
      return {
        outcome: ok ? "correct" : "incorrect",
        correct: ok,
        graded: true,
        userAnswer: text || "(sem resposta)",
        expected: ex.answers,
        feedback: !ok && v.trap ? v.trap : ex.explanation,
        userMarks: v.userMarks,
        expectedMarks: v.expectedMarks,
      };
    }

    case "match": {
      const mistakes = res.kind === "match" ? res.mistakes : 99;
      const complete = res.kind === "match" ? res.complete : false;
      const ok = complete && mistakes === 0;
      return {
        outcome: ok ? "correct" : "incorrect",
        correct: ok,
        graded: true,
        userAnswer: ok ? "Todos os pares certos de primeira" : `${mistakes} tentativa(s) errada(s)`,
        expected: ex.pairs.map((p) => `${p.left} = ${p.right}`),
        feedback: ex.explanation,
      };
    }

    case "dialog": {
      const choices = res.kind === "dialog" ? res.choices : [];
      const turns = ex.turns.map((t, i) => {
        const opt = t.options[choices[i]] ?? t.options[0];
        return { ok: choices[i] != null && opt.ok, picked: opt.text, reaction: opt.reaction, why: opt.why };
      });
      const ok = turns.every((t) => t.ok);
      return {
        outcome: ok ? "correct" : "incorrect",
        correct: ok,
        graded: true,
        userAnswer: turns.map((t) => t.picked).join(" → "),
        expected: ex.turns.map((t) => t.options.filter((o) => o.ok).map((o) => o.text).join(" / ")),
        feedback: ex.explanation,
        turns,
      };
    }

    case "write": {
      const text = res.kind === "write" ? res.text : "";
      return {
        outcome: "self",
        correct: false,
        graded: false,
        userAnswer: text,
        expected: [ex.model],
        feedback: ex.explanation,
      };
    }

    case "speak": {
      return {
        outcome: "self",
        correct: false,
        graded: false,
        userAnswer: res.kind === "speak" && res.recorded ? "(gravação ouvida)" : "(feito em voz alta)",
        expected: ex.lines,
        feedback: ex.explanation,
      };
    }
  }
}

/**
 * Acerto "independente": recuperação genuína, sem apoio.
 * Pista, resposta revelada, atividade adaptada (sem áudio) ou repetição imediata
 * de um erro NÃO contam como independentes.
 */
export function isIndependent(p: {
  outcome: Outcome;
  hints: number;
  revealed: boolean;
  adapted?: boolean;
  retry?: boolean;
}): boolean {
  return (p.outcome === "correct" || p.outcome === "typo") && p.hints === 0 && !p.revealed && !p.adapted && !p.retry;
}

/** Resposta em formato "prato feito" para mostrar o modelo de cada exercício. */
export function primaryExpected(ex: Exercise): string {
  switch (ex.kind) {
    case "mcq":
    case "listen":
      return ex.options[ex.answer].text;
    case "cloze":
    case "type":
    case "fix":
    case "dictation":
      return ex.accepted[0];
    case "order":
      return ex.answers[0];
    case "match":
      return ex.pairs.map((p) => `${p.left} = ${p.right}`).join("; ");
    case "dialog":
      return ex.turns.map((t) => t.options.find((o) => o.ok)?.text ?? "").join(" → ");
    case "write":
      return ex.model;
    case "speak":
      return ex.lines.join(" ");
  }
}

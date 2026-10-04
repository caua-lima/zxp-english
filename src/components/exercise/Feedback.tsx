"use client";

import { CircleCheck, CircleX, ClipboardCheck, PenLine } from "lucide-react";
import type { Exercise } from "@/content/schema";
import type { GradeResult, Mark } from "@/engine/grading";
import { ui, type Lang } from "./labels";

function Marks({ marks, kind }: { marks: Mark[]; kind: "user" | "expected" }) {
  return (
    <span lang="en" className="en">
      {marks.map((m, i) => {
        const flagged = m.state !== "ok";
        return (
          <span key={i}>
            {flagged ? (
              <mark
                className={`rounded px-0.5 font-extrabold underline decoration-2 underline-offset-4 ${kind === "user" ? "bg-bad-soft text-ink decoration-wavy" : "bg-ok-soft text-ink"}`}
              >
                {m.text}
                <span className="sr-only">{kind === "user" ? " (diferente do esperado)" : " (o que faltou)"}</span>
              </mark>
            ) : (
              m.text
            )}
            {i < marks.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
}

/**
 * Feedback após a resposta. Mostra SEMPRE: a resposta dada, a esperada (ou exemplos
 * válidos) e uma explicação específica. O resultado é dito em texto e ícone, nunca só em cor.
 */
export function Feedback({
  ex,
  grade,
  lang,
  skipped,
  revealed,
  hints,
  adapted,
  willReturn,
}: {
  ex: Exercise;
  grade: GradeResult;
  lang: Lang;
  skipped: boolean;
  revealed: boolean;
  hints: number;
  adapted: boolean;
  /** O item será reapresentado nesta sessão. */
  willReturn: boolean;
}) {
  const L = ui(lang);
  const outcome = grade.outcome;
  const good = outcome === "correct" || outcome === "typo";
  const self = outcome === "self";

  const tone = self ? "border-line-strong bg-primary-soft" : good ? "border-ok bg-ok-soft" : "border-bad bg-bad-soft";
  const title = self ? L.self : outcome === "correct" ? L.correct : outcome === "typo" ? L.typo : revealed ? "Resposta mostrada" : L.incorrect;
  const Icon = self ? ClipboardCheck : good ? CircleCheck : CircleX;
  const iconColor = self ? "text-primary-text" : good ? "text-ok" : "text-bad";

  const others = grade.expected.slice(1, 4);
  const showAnswers = !self;
  const showUser = showAnswers && !skipped && ex.kind !== "match" && ex.kind !== "dialog";

  return (
    <section className={`anim-rise rounded-2xl border-2 p-4 ${tone}`} role="status" aria-live="polite" aria-label="Resultado">
      <div className="flex items-center gap-2">
        <Icon size={26} className={iconColor} aria-hidden="true" />
        <h3 className="text-xl font-extrabold">{title}</h3>
      </div>

      {self ? (
        <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-ink-2">
          <PenLine size={15} aria-hidden="true" />
          {adapted ? "Tarefa deixada como pendente: não conta como evidência desta habilidade." : "Autoavaliação registrada. Não é uma nota nem uma correção externa."}
        </p>
      ) : null}

      {showAnswers ? (
        <dl className="mt-3 grid gap-2.5 text-[1.02rem]">
          {showUser ? (
            <div>
              <dt className="text-xs font-extrabold uppercase tracking-wider text-ink-2">{L.yourAnswer}</dt>
              <dd className="mt-0.5">
                {grade.userMarks && !good ? <Marks marks={grade.userMarks} kind="user" /> : <span lang="en" className="en">{grade.userAnswer}</span>}
              </dd>
            </div>
          ) : null}
          {skipped ? (
            <div>
              <dt className="text-xs font-extrabold uppercase tracking-wider text-ink-2">{L.yourAnswer}</dt>
              <dd className="mt-0.5 font-semibold text-ink-2">(sem resposta)</dd>
            </div>
          ) : null}

          {ex.kind === "dialog" && grade.turns && !skipped ? (
            <div>
              <dt className="text-xs font-extrabold uppercase tracking-wider text-ink-2">Suas escolhas</dt>
              <dd className="mt-1 grid gap-1.5">
                {grade.turns.map((t, i) => (
                  <p key={i}>
                    <span className={`font-extrabold ${t.ok ? "text-ok" : "text-bad"}`}>{t.ok ? "Adequada: " : "Inadequada: "}</span>
                    <span lang="en" className="en">
                      {t.picked}
                    </span>
                    <span className="block text-sm text-ink-2">{t.why}</span>
                  </p>
                ))}
              </dd>
            </div>
          ) : null}

          {!good || ex.kind === "match" ? (
            <div>
              <dt className="text-xs font-extrabold uppercase tracking-wider text-ink-2">{L.expected}</dt>
              <dd className="mt-0.5">
                {ex.kind === "match" || ex.kind === "dialog" ? (
                  <ul className="grid gap-0.5">
                    {grade.expected.map((e, i) => (
                      <li key={i} lang="en" className="en">
                        {e}
                      </li>
                    ))}
                  </ul>
                ) : grade.expectedMarks && !skipped ? (
                  <Marks marks={grade.expectedMarks} kind="expected" />
                ) : (
                  <span lang="en" className="en">
                    {grade.expected[0]}
                  </span>
                )}
                {ex.kind !== "match" && ex.kind !== "dialog" && ex.kind !== "mcq" && ex.kind !== "listen" ? (
                  <span className="mt-0.5 block text-sm text-ink-2">
                    Forma completa:{" "}
                    <span lang="en" className="en text-ink">
                      {ex.kind === "cloze" ? ex.text.replace("___", grade.expected[0]) : grade.expected[0]}
                    </span>
                  </span>
                ) : null}
              </dd>
            </div>
          ) : null}

          {others.length > 0 && ex.kind !== "match" && ex.kind !== "dialog" && ex.kind !== "mcq" && ex.kind !== "listen" ? (
            <div>
              <dt className="text-xs font-extrabold uppercase tracking-wider text-ink-2">{L.alsoAccepted}</dt>
              <dd className="mt-0.5 text-sm" lang="en">
                {others.join(" · ")}
              </dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      <div className="mt-3">
        <p className="text-xs font-extrabold uppercase tracking-wider text-ink-2">{L.why}</p>
        <p className="mt-0.5">{grade.feedback}</p>
        {grade.note ? <p className="mt-1.5 font-semibold">{grade.note}</p> : null}
      </div>

      {!self && good && (hints > 0 || adapted) ? (
        <p className="mt-3 text-sm font-semibold text-ink-2">
          {adapted
            ? "Feito sem áudio: conta como prática, mas não como evidência de compreensão oral."
            : "Acerto com pista: conta como prática assistida, então este item volta mais cedo na revisão."}
        </p>
      ) : null}
      {willReturn ? (
        <p className="mt-3 text-sm font-semibold text-ink-2">Este item volta daqui a pouco, depois de outros, para você tentar de novo sem olhar.</p>
      ) : null}
    </section>
  );
}

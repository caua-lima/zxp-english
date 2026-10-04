"use client";

import { useMemo } from "react";
import { Dumbbell } from "lucide-react";
import { unitOfConcept, unitOfItem } from "@/content/curriculum";
import { exerciseMap } from "@/content/iter";
import type { Concept, Exercise } from "@/content/schema";
import { dateKey, formatShort } from "@/engine/dates";
import { primaryExpected } from "@/engine/grading";
import { errorNotebook, type ErrorEntry } from "@/engine/review-builder";
import { useProgress } from "@/state/provider";
import { useUnits } from "@/components/content-hooks";
import { Chip, EmptyState, LinkButton, PageTitle, SectionTitle, Skeleton } from "@/components/ui";

const STATUS: Record<ErrorEntry["status"], { label: string; tone: "bad" | "warn" | "ok"; help: string }> = {
  pending: { label: "Pendente", tone: "bad", help: "Ainda sem acerto independente depois do erro." },
  recovering: { label: "Em recuperação", tone: "warn", help: "Já houve um acerto sem ajuda. Falta confirmar em outro dia." },
  resolved: { label: "Resolvido", tone: "ok", help: "Dois acertos sem ajuda, em dias diferentes, depois do último erro." },
};

function Entry({ e, concept, exercise, tz }: { e: ErrorEntry; concept?: Concept; exercise?: Exercise; tz: string }) {
  const st = STATUS[e.status];
  return (
    <li className="card p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p lang="en" className="en text-lg leading-tight">
            {concept?.en ?? (exercise ? primaryExpected(exercise) : "Item de prática")}
          </p>
          {concept ? <p className="text-sm text-ink-2">{concept.pt}</p> : null}
        </div>
        <Chip tone={st.tone}>{st.label}</Chip>
      </div>

      <dl className="mt-3 grid gap-2 text-sm">
        {e.lastAnswers.length > 0 ? (
          <div>
            <dt className="text-xs font-extrabold uppercase tracking-wider text-ink-2">Você respondeu</dt>
            <dd lang="en" className="mt-0.5">
              {e.lastAnswers.map((a, i) => (
                <span key={i} className="mr-2 inline-block rounded-lg bg-bad-soft px-1.5 py-0.5 font-bold">
                  {a}
                </span>
              ))}
            </dd>
          </div>
        ) : null}
        {exercise ? (
          <div>
            <dt className="text-xs font-extrabold uppercase tracking-wider text-ink-2">O esperado era</dt>
            <dd lang="en" className="en mt-0.5">
              {exercise.kind === "cloze" ? exercise.text.replace("___", exercise.accepted[0]) : primaryExpected(exercise)}
            </dd>
          </div>
        ) : null}
        {exercise ? (
          <div>
            <dt className="text-xs font-extrabold uppercase tracking-wider text-ink-2">Explicação</dt>
            <dd className="mt-0.5 text-[0.98rem]">{exercise.explanation}</dd>
          </div>
        ) : null}
        {concept?.note ? (
          <div>
            <dt className="text-xs font-extrabold uppercase tracking-wider text-ink-2">Lembre-se</dt>
            <dd className="mt-0.5">{concept.note}</dd>
          </div>
        ) : null}
        {concept?.example ? (
          <div>
            <dt className="text-xs font-extrabold uppercase tracking-wider text-ink-2">Exemplo</dt>
            <dd className="mt-0.5">
              <span lang="en" className="en">
                {concept.example.en}
              </span>{" "}
              <span className="text-ink-2">— {concept.example.pt}</span>
            </dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {e.conceptId ? (
          <LinkButton href={`/pratica/erros?c=${encodeURIComponent(e.conceptId)}`} variant="secondary" size="sm">
            <Dumbbell size={16} aria-hidden="true" /> Praticar este item
          </LinkButton>
        ) : null}
        <span className="text-xs font-semibold text-ink-2">
          {e.wrongCount} {e.wrongCount === 1 ? "erro" : "erros"} · último em {formatShort(dateKey(e.lastWrongAt, tz))} · {st.help}
        </span>
      </div>
    </li>
  );
}

export function ErrorsScreen() {
  const state = useProgress();
  const tz = state?.settings.timezone ?? "America/Sao_Paulo";
  const entries = useMemo(() => (state ? errorNotebook(state, (iso) => dateKey(iso, tz)) : []), [state, tz]);
  const unitIds = useMemo(
    () => [...new Set(entries.flatMap((e) => [unitOfItem(e.exerciseId), ...(e.conceptId ? [unitOfConcept(e.conceptId)] : [])]))].sort(),
    [entries],
  );
  const loaded = useUnits(unitIds);
  const lookup = useMemo(() => {
    const concepts = new Map<string, Concept>();
    const exercises = new Map<string, Exercise>();
    if (loaded.status === "ready") {
      for (const u of loaded.data) {
        for (const c of u.concepts) concepts.set(c.id, c);
        for (const [id, L] of exerciseMap(u)) exercises.set(id, L.ex);
      }
    }
    return { concepts, exercises };
  }, [loaded]);

  if (!state) return null;

  const open = entries.filter((e) => e.status !== "resolved");
  const resolved = entries.filter((e) => e.status === "resolved");

  return (
    <div>
      <PageTitle title="Caderno de erros" subtitle="Cada erro fica guardado com a sua resposta, a explicação e uma prática direcionada. Errar aqui não bloqueia nada." />

      {entries.length === 0 ? (
        <EmptyState title="Nenhum erro registrado" action={<LinkButton href="/">Ir para o início</LinkButton>}>
          Quando você errar um exercício (ou pedir para ver a resposta), ele aparece aqui com a explicação.
        </EmptyState>
      ) : (
        <>
          {open.length > 0 ? (
            <div className="mb-4">
              <LinkButton href="/pratica/erros">
                <Dumbbell size={18} aria-hidden="true" /> Praticar os {Math.min(open.length, 6)} mais recentes
              </LinkButton>
            </div>
          ) : null}

          <SectionTitle id="abertos" aside={<Chip tone={open.length ? "bad" : "ok"}>{open.length}</Chip>}>
            Para praticar
          </SectionTitle>
          {loaded.status === "loading" ? <Skeleton className="h-32" /> : null}
          {open.length === 0 ? (
            <p className="text-ink-2">Tudo resolvido por enquanto.</p>
          ) : (
            <ul className="grid gap-3" aria-labelledby="abertos">
              {open.map((e) => (
                <Entry
                  key={e.conceptId ?? e.exerciseId}
                  e={e}
                  tz={tz}
                  concept={e.conceptId ? lookup.concepts.get(e.conceptId) : undefined}
                  exercise={lookup.exercises.get(e.exerciseId)}
                />
              ))}
            </ul>
          )}

          {resolved.length > 0 ? (
            <details className="mt-6">
              <summary className="cursor-pointer text-lg font-extrabold">Resolvidos ({resolved.length})</summary>
              <p className="mb-3 mt-1 text-sm text-ink-2">Ficam aqui para consulta. Se você errar de novo, o item volta para a lista de cima.</p>
              <ul className="grid gap-3">
                {resolved.map((e) => (
                  <Entry
                    key={e.conceptId ?? e.exerciseId}
                    e={e}
                    tz={tz}
                    concept={e.conceptId ? lookup.concepts.get(e.conceptId) : undefined}
                    exercise={lookup.exercises.get(e.exerciseId)}
                  />
                ))}
              </ul>
            </details>
          ) : null}
        </>
      )}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CURRICULUM, getUnitMeta, unitOfConcept } from "@/content/curriculum";
import { isPublished } from "@/content/registry";
import { STAGE_INFO, STAGES, type Concept, type Stage } from "@/content/schema";
import { unitStatus } from "@/engine/progression";
import { conceptStatus, MASTERY_LABELS, type MasteryStatus } from "@/engine/srs";
import { useProgress } from "@/state/provider";
import { useSpeaker } from "@/audio/speech";
import { useUnits } from "@/components/content-hooks";
import { SayButton } from "@/components/exercise/AudioPlayer";
import { ExplanationView } from "@/components/lesson/LessonScreen";
import { Chip, EmptyState, Loading, Notice, PageTitle, Segmented, Toggle, type Tone } from "@/components/ui";

const TYPE_LABEL: Record<Concept["type"], string> = { word: "Palavra", phrase: "Expressão", pattern: "Estrutura", sound: "Som" };
const TAG_LABEL: Record<string, string> = {
  collocation: "Collocation",
  "phrasal-verb": "Phrasal verb",
  "false-friend": "Falso cognato",
  chunk: "Bloco pronto",
  pronunciation: "Pronúncia",
};
const MASTERY_TONE: Record<MasteryStatus, Tone> = { new: "neutral", learning: "warn", practicing: "info", consolidating: "primary", retained: "ok" };

const fold = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export function LibraryScreen() {
  const state = useProgress();
  const [tab, setTab] = useState<"vocab" | "notes">("vocab");
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<Stage | "all">("all");
  const [onlyStudied, setOnlyStudied] = useState(true);
  const speaker = useSpeaker({ voiceURI: state?.settings.voiceURI, slowRate: state?.settings.speechRate });

  const published = useMemo(() => CURRICULUM.filter((m) => isPublished(m.id)).map((m) => m.id), []);
  const loaded = useUnits(published);

  const hasStudied = state ? Object.keys(state.concepts).length > 0 : false;
  const studiedOnly = onlyStudied && hasStudied;

  const concepts = useMemo(() => {
    if (loaded.status !== "ready" || !state) return [];
    const q = fold(query.trim());
    return loaded.data
      .flatMap((u) => u.concepts)
      .filter((c) => {
        const meta = getUnitMeta(unitOfConcept(c.id));
        if (!meta) return false;
        if (stage !== "all" && meta.stage !== stage) return false;
        if (studiedOnly && !state.concepts[c.id]) return false;
        if (!q) return true;
        return fold(c.en).includes(q) || fold(c.pt).includes(q) || fold(c.example?.en ?? "").includes(q);
      });
  }, [loaded, state, query, stage, studiedOnly]);

  if (!state) return null;

  const units = loaded.status === "ready" ? loaded.data.filter((u) => stage === "all" || getUnitMeta(u.id)?.stage === stage) : [];

  return (
    <div>
      <PageTitle title="Biblioteca" subtitle="Vocabulário, expressões e explicações do curso, para consultar quando quiser." />

      <Segmented
        label="Seção da biblioteca"
        value={tab}
        onChange={setTab}
        options={[
          { value: "vocab", label: "Vocabulário" },
          { value: "notes", label: "Explicações" },
        ]}
      />

      <div className="mt-4 grid gap-3">
        <label className="grid gap-1">
          <span className="text-sm font-bold">Etapa</span>
          <select className="field" value={stage} onChange={(e) => setStage(e.target.value as Stage | "all")}>
            <option value="all">Todas as etapas</option>
            {STAGES.map((s) => (
              <option key={s} value={s}>
                {STAGE_INFO[s].label} · {STAGE_INFO[s].name}
              </option>
            ))}
          </select>
        </label>
        {tab === "vocab" ? (
          <>
            <label className="relative block">
              <span className="sr-only">Buscar em inglês ou português</span>
              <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3" aria-hidden="true" />
              <input className="field !pl-10" type="search" placeholder="Buscar em inglês ou português" value={query} onChange={(e) => setQuery(e.target.value)} />
            </label>
            {hasStudied ? <Toggle checked={onlyStudied} onChange={setOnlyStudied} label="Só o que já estudei" description="Desative para ver também itens de unidades futuras." /> : null}
          </>
        ) : null}
      </div>

      {loaded.status === "loading" ? <Loading label="Carregando a biblioteca…" /> : null}
      {loaded.status === "error" ? (
        <Notice tone="bad" role="alert" title="Não foi possível carregar" className="mt-4">
          {loaded.message}
        </Notice>
      ) : null}

      {loaded.status === "ready" && tab === "vocab" ? (
        <section className="mt-5" aria-label="Vocabulário e expressões">
          <p className="mb-3 text-sm font-bold text-ink-2" role="status">
            {concepts.length} {concepts.length === 1 ? "item" : "itens"}
          </p>
          {concepts.length === 0 ? (
            <EmptyState title="Nada encontrado">Tente outra busca ou desative o filtro “Só o que já estudei”.</EmptyState>
          ) : (
            <ul className="grid gap-2.5">
              {concepts.map((c) => {
                const meta = getUnitMeta(unitOfConcept(c.id))!;
                const st = conceptStatus(state.concepts[c.id]);
                return (
                  <li key={c.id} className="card flex items-start gap-3 p-3.5">
                    <div className="min-w-0 flex-1">
                      <p lang="en" className="en text-lg leading-tight">
                        {c.en}
                      </p>
                      <p className="text-ink-2">{c.pt}</p>
                      {c.example ? (
                        <p className="mt-1.5 text-sm">
                          <span lang="en" className="font-semibold">
                            {c.example.en}
                          </span>
                          <span className="block text-ink-2">{c.example.pt}</span>
                        </p>
                      ) : null}
                      {c.note ? <p className="mt-1 text-sm font-semibold text-ink-2">{c.note}</p> : null}
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <Chip>
                          {STAGE_INFO[meta.stage].label}·U{meta.order}
                        </Chip>
                        <Chip>{TYPE_LABEL[c.type]}</Chip>
                        {c.tags?.map((t) => (
                          <Chip key={t} tone="info">
                            {TAG_LABEL[t] ?? t}
                          </Chip>
                        ))}
                        <Chip tone={MASTERY_TONE[st]}>{MASTERY_LABELS[st]}</Chip>
                      </div>
                    </div>
                    {c.type !== "sound" ? <SayButton text={c.example?.en ?? c.en} speaker={speaker} label={`Ouvir: ${c.en}`} /> : null}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      ) : null}

      {loaded.status === "ready" && tab === "notes" ? (
        <section className="mt-5 grid gap-3" aria-label="Explicações por unidade">
          {units.map((u) => {
            const meta = getUnitMeta(u.id)!;
            const locked = unitStatus(state, meta) === "locked";
            return (
              <details key={u.id} className="card p-4">
                <summary className="cursor-pointer">
                  <span className="font-extrabold">
                    {STAGE_INFO[meta.stage].label} · Unidade {meta.order}: {meta.title}
                  </span>
                  {locked ? <span className="ml-2 text-sm font-bold text-ink-2">(ainda não liberada)</span> : null}
                </summary>
                <div className="mt-4 grid gap-6">
                  {u.lessons.map((l, i) => (
                    <article key={l.id}>
                      <h3 className="mb-2 text-lg font-extrabold">
                        Lição {i + 1} · {l.title}
                      </h3>
                      <ExplanationView lesson={l} speaker={speaker} />
                    </article>
                  ))}
                </div>
              </details>
            );
          })}
          {published.length < CURRICULUM.length ? (
            <p className="text-sm text-ink-2">
              {CURRICULUM.length - published.length} unidades ainda não têm conteúdo publicado nesta versão.
            </p>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}

"use client";

import Link from "next/link";
import { Award, Lock } from "lucide-react";
import { CURRICULUM } from "@/content/curriculum";
import { SKILL_LABELS, STAGE_INFO, STAGES, type Skill } from "@/content/schema";
import { ACHIEVEMENTS } from "@/engine/achievements";
import { addDays, dateKey, formatShort } from "@/engine/dates";
import { MIN_EVIDENCE } from "@/engine/defaults";
import { stageProgress } from "@/engine/progression";
import { MASTERY_LABELS, type MasteryStatus } from "@/engine/srs";
import { EVIDENCE_LABEL, masteryCounts, skillStats, type Evidence, type SkillStat } from "@/engine/stats";
import { bestStreakOf, currentStreak, studyDays, totalXp, xpByDate } from "@/engine/xp";
import { useNow, useProgress } from "@/state/provider";
import { Card, Chip, PageTitle, ProgressBar, SectionTitle, type Tone } from "@/components/ui";

const EVIDENCE_TONE: Record<Evidence, Tone> = { none: "neutral", insufficient: "warn", some: "info", good: "ok" };
const SKILL_NOTE: Partial<Record<Skill, string>> = {
  writing: "Tarefas de escrita são autoavaliadas: você compara com um modelo e marca critérios.",
  speaking: "Tarefas de fala são autoavaliadas. O app não mede pronúncia nem fluência.",
  listening: "Só contam respostas dadas com áudio. Atividades adaptadas ao texto ficam como pendentes.",
};
const MASTERY_ORDER: MasteryStatus[] = ["learning", "practicing", "consolidating", "retained"];

const pct = (v: number | null) => (v === null ? "—" : `${Math.round(v * 100)}%`);

function SkillRow({ s }: { s: SkillStat }) {
  return (
    <li className="card p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-extrabold">{SKILL_LABELS[s.skill]}</h3>
        <Chip tone={EVIDENCE_TONE[s.evidence]}>{EVIDENCE_LABEL[s.evidence]}</Chip>
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-surface-2 p-2">
          <dt className="text-[0.68rem] font-extrabold uppercase tracking-wide text-ink-2">Desempenho imediato</dt>
          <dd className="text-xl font-extrabold tabular-nums">{pct(s.immediate)}</dd>
          <dd className="text-xs text-ink-2">{s.immediateN} respostas</dd>
        </div>
        <div className="rounded-xl bg-surface-2 p-2">
          <dt className="text-[0.68rem] font-extrabold uppercase tracking-wide text-ink-2">Retenção em revisões</dt>
          <dd className="text-xl font-extrabold tabular-nums">{pct(s.retention)}</dd>
          <dd className="text-xs text-ink-2">{s.retentionN} revisões</dd>
        </div>
        <div className="rounded-xl bg-surface-2 p-2">
          <dt className="text-[0.68rem] font-extrabold uppercase tracking-wide text-ink-2">Autoavaliadas</dt>
          <dd className="text-xl font-extrabold tabular-nums">{s.selfAssessed}</dd>
          <dd className="text-xs text-ink-2">tarefas</dd>
        </div>
      </dl>
      {s.immediate !== null ? <ProgressBar value={s.immediate} label={`Desempenho imediato em ${SKILL_LABELS[s.skill]}`} className="mt-3 !h-2" tone="primary" /> : null}
      {s.evidence === "insufficient" || s.evidence === "none" ? (
        <p className="mt-2 text-sm text-ink-2">
          {s.attempts === 0 && s.selfAssessed === 0
            ? "Ainda sem respostas nesta habilidade."
            : `Poucas respostas até agora (${s.attempts}). A porcentagem só aparece com pelo menos 5, e a evidência passa a "inicial" com ${MIN_EVIDENCE}.`}
        </p>
      ) : null}
      {s.adapted > 0 ? (
        <p className="mt-2 text-sm font-semibold text-warn">
          {s.adapted} atividade{s.adapted > 1 ? "s" : ""} pendente{s.adapted > 1 ? "s" : ""}: feita{s.adapted > 1 ? "s" : ""} sem áudio ou adiada{s.adapted > 1 ? "s" : ""}, não conta{s.adapted > 1 ? "m" : ""} como evidência.
        </p>
      ) : null}
      {SKILL_NOTE[s.skill] ? <p className="mt-2 text-sm text-ink-3">{SKILL_NOTE[s.skill]}</p> : null}
    </li>
  );
}

export function ProgressScreen() {
  const state = useProgress();
  const now = useNow();
  if (!state) return null;

  const tz = state.settings.timezone;
  const today = dateKey(now, tz);
  const days = studyDays(state.xp, tz);
  const streak = currentStreak(days, today);
  const best = Math.max(state.meta.bestStreak, bestStreakOf(days));
  const stats = skillStats(state);
  const counts = masteryCounts(state);
  const lessonsCompleted = Object.values(state.lessons).filter((l) => l.status === "completed").length;
  const totalLessons = CURRICULUM.reduce((n, m) => n + m.lessonCount, 0);
  const byDate = xpByDate(state.xp, tz);
  const goal = state.settings.dailyXpGoal;
  const calendar = Array.from({ length: 28 }, (_, i) => {
    const date = addDays(today, i - 27);
    return { date, xp: byDate.get(date) ?? 0 };
  });
  const tasks = Object.values(state.tasks);
  const unlocked = ACHIEVEMENTS.filter((a) => state.achievements[a.id]);
  const lockedAch = ACHIEVEMENTS.filter((a) => !state.achievements[a.id]);

  return (
    <div>
      <PageTitle title="Progresso" subtitle="O que você estudou, como foi na hora, o que ficou depois e onde ainda falta evidência." />

      <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          ["Lições", `${lessonsCompleted}/${totalLessons}`],
          ["XP total", String(totalXp(state.xp))],
          ["Sequência", `${streak} ${streak === 1 ? "dia" : "dias"}`],
          ["Melhor sequência", `${best} ${best === 1 ? "dia" : "dias"}`],
        ].map(([k, v]) => (
          <div key={k} className="card p-3 text-center">
            <dt className="text-xs font-extrabold uppercase tracking-wide text-ink-2">{k}</dt>
            <dd className="text-2xl font-extrabold tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 text-sm text-ink-3">XP e sequência medem atividade de estudo. Não são medidas de proficiência.</p>

      <SectionTitle id="estudado">Conteúdo estudado</SectionTitle>
      <Card as="section" aria-labelledby="estudado">
        <ul className="grid gap-3">
          {STAGES.map((stage) => {
            const p = stageProgress(state, CURRICULUM, stage);
            return (
              <li key={stage}>
                <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
                  <span className="font-extrabold">
                    <span style={{ color: `var(--stage-${stage})` }}>{STAGE_INFO[stage].label}</span> · {STAGE_INFO[stage].name}
                  </span>
                  <span className="font-bold tabular-nums text-ink-2">
                    {p.completed}/{p.total} unidades{p.skipped ? ` · ${p.skipped} puladas` : ""}
                  </span>
                </div>
                <ProgressBar value={p.completed / p.total} label={`${STAGE_INFO[stage].label}: ${p.completed} de ${p.total}`} />
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-sm text-ink-3">Unidades puladas pelo ponto de partida não entram como estudadas. Estudar um conteúdo não é o mesmo que tê-lo retido: veja abaixo.</p>
      </Card>

      <SectionTitle id="habilidades">Por habilidade</SectionTitle>
      <ul className="grid gap-3 sm:grid-cols-2" aria-labelledby="habilidades">
        {stats.map((s) => (
          <SkillRow key={s.skill} s={s} />
        ))}
      </ul>

      <SectionTitle id="retencao">Retenção dos itens</SectionTitle>
      <Card as="section" aria-labelledby="retencao">
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {MASTERY_ORDER.map((k) => (
            <li key={k} className="rounded-xl bg-surface-2 p-2.5 text-center">
              <p className="text-2xl font-extrabold tabular-nums">{counts[k]}</p>
              <p className="text-xs font-extrabold text-ink-2">{MASTERY_LABELS[k]}</p>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-ink-3">
          Um item só chega a “Retido” depois de várias revisões espaçadas bem-sucedidas. Um único acerto nunca basta. Detalhes em{" "}
          <Link href="/revisar" className="font-bold underline">
            Revisar
          </Link>
          .
        </p>
      </Card>

      <SectionTitle id="producao">Produção (escrita, fala e missões)</SectionTitle>
      <Card as="section" aria-labelledby="producao">
        {tasks.length === 0 ? (
          <p className="text-ink-2">Nenhuma tarefa de produção registrada ainda. Elas aparecem nas lições, nas atividades de cada unidade e após os checkpoints.</p>
        ) : (
          <ul className="grid gap-1.5 text-sm">
            {[
              ["Escrita (autoavaliada)", tasks.filter((t) => t.kind === "writing" || (t.kind === "production" && t.text)).length],
              ["Fala (autoavaliada)", tasks.filter((t) => (t.kind === "speaking" || (t.kind === "production" && !t.text)) && !t.adapted).length],
              ["Fala pendente (adiada)", tasks.filter((t) => t.kind === "speaking" && t.adapted).length],
              ["Missões no app (autoavaliadas)", tasks.filter((t) => t.kind === "mission").length],
              ["Missões fora do app (autorrelato)", tasks.filter((t) => t.kind === "outside").length],
            ].map(([label, n]) => (
              <li key={label as string} className="flex justify-between gap-3">
                <span className="font-bold">{label}</span>
                <span className="tabular-nums">{n}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-sm text-ink-3">Autoavaliação e autorrelato são registros seus. Não são avaliação externa e não geram nota.</p>
      </Card>

      <SectionTitle id="calendario">Últimos 28 dias</SectionTitle>
      <Card as="section" aria-labelledby="calendario">
        <ol className="grid grid-cols-7 gap-1.5">
          {calendar.map((d) => {
            const level = d.xp >= goal ? 3 : d.xp >= 10 ? 2 : d.xp > 0 ? 1 : 0;
            return (
              <li key={d.date}>
                <div
                  className={`grid aspect-square place-items-center rounded-lg border-2 text-[0.7rem] font-extrabold ${
                    level === 3 ? "border-line-strong bg-accent text-accent-ink" : level === 2 ? "border-primary bg-primary-soft text-primary-text" : level === 1 ? "border-line bg-surface-2 text-ink-2" : "border-line bg-surface text-ink-3"
                  }`}
                  title={`${formatShort(d.date)}: ${d.xp} XP`}
                >
                  <span aria-hidden="true">{d.date.slice(8)}</span>
                  <span className="sr-only">
                    {formatShort(d.date)}: {d.xp} XP{level === 3 ? ", meta cumprida" : level === 2 ? ", dia de estudo" : ""}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold text-ink-2">
          <li>
            <span className="mr-1 inline-block h-3 w-3 rounded border-2 border-line-strong bg-accent align-middle" /> meta cumprida
          </li>
          <li>
            <span className="mr-1 inline-block h-3 w-3 rounded border-2 border-primary bg-primary-soft align-middle" /> dia de estudo (≥ 10 XP)
          </li>
          <li>
            <span className="mr-1 inline-block h-3 w-3 rounded border-2 border-line bg-surface-2 align-middle" /> pouca atividade
          </li>
        </ul>
      </Card>

      <SectionTitle id="conquistas" aside={<Chip>{unlocked.length}/{ACHIEVEMENTS.length}</Chip>}>
        Conquistas
      </SectionTitle>
      <ul className="grid gap-2.5 sm:grid-cols-2" aria-labelledby="conquistas">
        {unlocked.map((a) => (
          <li key={a.id} className="card flex items-start gap-3 p-3.5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 border-line-strong bg-accent text-accent-ink">
              <Award size={22} aria-hidden="true" />
            </span>
            <span>
              <span className="block font-extrabold">{a.title}</span>
              <span className="block text-sm text-ink-2">{a.description}</span>
              <span className="block text-xs font-bold text-ink-3">{formatShort(dateKey(state.achievements[a.id].unlockedAt, tz))}</span>
            </span>
          </li>
        ))}
        {lockedAch.map((a) => (
          <li key={a.id} className="card flex items-start gap-3 border-dashed p-3.5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 border-line bg-surface-2 text-ink-3">
              <Lock size={18} aria-hidden="true" />
            </span>
            <span>
              <span className="block font-extrabold">{a.title}</span>
              <span className="block text-sm text-ink-2">Ainda não alcançada.</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CURRICULUM } from "@/content/curriculum";
import { STAGE_INFO } from "@/content/schema";
import { browserTimeZone, isValidTimeZone } from "@/engine/dates";
import { BY_MINUTES } from "@/engine/defaults";
import { GOAL_LABELS, GOALS, type Goal } from "@/engine/model";
import { completeOnboarding, setStartUnit } from "@/state/actions";
import { useProgress, useStore } from "@/state/provider";
import { ImportBackup, StorageExplainer } from "@/components/backup/BackupPanel";
import { Logo, Zip } from "@/components/brand";
import { Notice, ProgressBar, Segmented } from "@/components/ui";

type Start = "zero" | "placement" | "manual";

const GOAL_HINT: Record<Goal, string> = {
  travel: "Aeroporto, hotel, restaurante, pedir ajuda.",
  work: "Reuniões, e-mails, entrevistas.",
  study: "Aulas, leituras, apresentações.",
  culture: "Séries, músicas, jogos, redes.",
  general: "Um pouco de tudo, sem pressa.",
};

export function timeZoneList(): string[] {
  try {
    const fn = (Intl as unknown as { supportedValuesOf?: (k: string) => string[] }).supportedValuesOf;
    const list = fn ? fn("timeZone") : [];
    return list.length ? list : ["America/Sao_Paulo", "America/Manaus", "America/Belem", "America/Fortaleza", "America/Recife", "America/Cuiaba", "America/Rio_Branco", "Europe/Lisbon", "UTC"];
  } catch {
    return ["America/Sao_Paulo", "UTC"];
  }
}

export function OnboardingScreen() {
  const store = useStore();
  const progress = useProgress();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<Goal>("general");
  const [minutes, setMinutes] = useState<10 | 20 | 30>(20);
  // Esta tela só é montada no navegador (o layout mostra o carregamento antes), então dá para ler o fuso direto.
  const [tz, setTz] = useState(() => browserTimeZone());
  const [start, setStart] = useState<Start>("zero");
  const [manualUnit, setManualUnit] = useState("a1-u01");
  const zones = useMemo(() => timeZoneList(), []);

  // Quem já passou pela configuração (ou acabou de restaurar um backup) vai para o início.
  const onboarded = progress?.profile.onboarded ?? false;
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    if (onboarded && !leaving) router.replace("/");
  }, [onboarded, leaving, router]);

  const total = 5;
  const finish = () => {
    const zone = isValidTimeZone(tz) ? tz : browserTimeZone();
    setLeaving(true); // evita que o redirecionamento automático atropele o destino escolhido
    store.run((s, now) => completeOnboarding(s, { goal, minutes, timezone: zone }, now));
    if (start === "manual" && manualUnit !== "a1-u01") store.run((s, now) => setStartUnit(s, manualUnit, "manual", now));
    router.replace(start === "placement" ? "/diagnostico" : "/");
  };

  return (
    <div className="min-h-dvh">
      <header className="mx-auto flex max-w-xl items-center justify-between gap-3 px-4 pt-4">
        <Logo />
        <span className="text-sm font-extrabold tabular-nums text-ink-2">
          {step + 1}/{total}
        </span>
      </header>
      <div className="mx-auto max-w-xl px-4 pt-3">
        <ProgressBar value={(step + 1) / total} label="Etapas da configuração" className="!h-2" />
      </div>

      <main className="mx-auto grid max-w-xl gap-5 px-4 pb-32 pt-6">
        {step === 0 ? (
          <section className="grid gap-4 anim-rise" aria-labelledby="t0">
            <div className="flex justify-center">
              <Zip mood="cheer" size={120} />
            </div>
            <h1 id="t0" className="text-center text-3xl font-extrabold">
              Inglês para usar de verdade
            </h1>
            <p className="text-center text-ink-2">Uma trilha do zero ao B2, com explicações claras em português, prática que exige lembrar e revisão no tempo certo.</p>
            <ul className="rich card p-4">
              <li>Cada unidade diz o que você vai conseguir <strong>fazer</strong> em inglês.</li>
              <li>Você vê o inglês em contexto antes de ser cobrado.</li>
              <li>Errar não bloqueia nada: você recebe a explicação e uma nova chance.</li>
              <li>Sem conta, sem assinatura. O progresso fica neste navegador.</li>
            </ul>
            <p className="text-center text-sm text-ink-2">
              Sem promessa de fluência em um número de dias. O app mostra o que você estudou e o que conseguiu recuperar depois, e deixa claro quando ainda não há evidência suficiente.
            </p>
          </section>
        ) : null}

        {step === 1 ? (
          <section className="grid gap-4 anim-rise" aria-labelledby="t1">
            <h1 id="t1" className="text-2xl font-extrabold">
              Para que você quer o inglês?
            </h1>
            <p className="text-ink-2">Isso ajusta os exemplos destacados. Você pode mudar depois.</p>
            <div className="grid gap-2" role="group" aria-label="Objetivo">
              {GOALS.map((g) => (
                <button key={g} type="button" className="choice" aria-pressed={goal === g} onClick={() => setGoal(g)}>
                  <span>
                    <span className="block font-extrabold">{GOAL_LABELS[g]}</span>
                    <span className="block text-sm font-semibold text-ink-2">{GOAL_HINT[g]}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section className="grid gap-4 anim-rise" aria-labelledby="t2">
            <h1 id="t2" className="text-2xl font-extrabold">
              Quanto tempo por dia?
            </h1>
            <p className="text-ink-2">Melhor pouco todo dia do que muito de vez em quando. O plano diário é montado para caber nesse tempo.</p>
            <Segmented
              label="Tempo diário"
              value={minutes}
              onChange={setMinutes}
              options={[
                { value: 10, label: "10 min", hint: "leve" },
                { value: 20, label: "20 min", hint: "equilibrado" },
                { value: 30, label: "30 min", hint: "intenso" },
              ]}
            />
            <Notice tone="info">
              Meta diária de {BY_MINUTES[minutes].xp} XP e até {BY_MINUTES[minutes].reviewCap} revisões por dia. Você ajusta tudo isso em Ajustes.
            </Notice>
            <label className="grid gap-1">
              <span className="font-bold">Seu fuso horário</span>
              <select className="field" value={tz} onChange={(e) => setTz(e.target.value)}>
                {!zones.includes(tz) ? <option value={tz}>{tz}</option> : null}
                {zones.map((z) => (
                  <option key={z} value={z}>
                    {z.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
              <span className="text-sm text-ink-2">Usado para saber quando o seu dia começa e termina (meta diária, sequência e revisões).</span>
            </label>
          </section>
        ) : null}

        {step === 3 ? (
          <section className="grid gap-4 anim-rise" aria-labelledby="t3">
            <h1 id="t3" className="text-2xl font-extrabold">
              Onde seu progresso fica guardado
            </h1>
            <div className="card p-4">
              <StorageExplainer />
            </div>
            <p className="text-ink-2">Em Ajustes você exporta um backup em arquivo e restaura em outro aparelho quando quiser.</p>
            <div className="card grid gap-2 p-4">
              <p className="font-extrabold">Já usou o ZXP ENGLISH antes?</p>
              <p className="text-sm text-ink-2">Restaure um backup e continue de onde parou.</p>
              <ImportBackup />
            </div>
          </section>
        ) : null}

        {step === 4 ? (
          <section className="grid gap-4 anim-rise" aria-labelledby="t4">
            <h1 id="t4" className="text-2xl font-extrabold">
              Por onde começar?
            </h1>
            <div className="grid gap-2" role="group" aria-label="Ponto de partida">
              <button type="button" className="choice" aria-pressed={start === "zero"} onClick={() => setStart("zero")}>
                <span>
                  <span className="block font-extrabold">Começar do zero</span>
                  <span className="block text-sm font-semibold text-ink-2">Ideal se você é iniciante ou quer rever a base. Dá para pular unidades depois, testando o que sabe.</span>
                </span>
              </button>
              <button type="button" className="choice" aria-pressed={start === "placement"} onClick={() => setStart("placement")}>
                <span>
                  <span className="block font-extrabold">Fazer um diagnóstico curto</span>
                  <span className="block text-sm font-semibold text-ink-2">De 6 a 22 perguntas, uns 5 minutos. Sugere um ponto de partida; não mede seu nível.</span>
                </span>
              </button>
              <button type="button" className="choice" aria-pressed={start === "manual"} onClick={() => setStart("manual")}>
                <span>
                  <span className="block font-extrabold">Escolher uma unidade</span>
                  <span className="block text-sm font-semibold text-ink-2">Você decide. As unidades anteriores ficam marcadas como puladas, não como estudadas.</span>
                </span>
              </button>
            </div>
            {start === "manual" ? (
              <label className="grid gap-1">
                <span className="font-bold">Começar em</span>
                <select className="field" value={manualUnit} onChange={(e) => setManualUnit(e.target.value)}>
                  {CURRICULUM.map((m) => (
                    <option key={m.id} value={m.id}>
                      {STAGE_INFO[m.stage].label} · Unidade {m.order} — {m.title}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
          </section>
        ) : null}
      </main>

      <footer className="safe-bottom fixed inset-x-0 bottom-0 border-t-2 border-line bg-surface px-4 pt-3">
        <div className="mx-auto flex max-w-xl gap-2">
          {step > 0 ? (
            <button type="button" className="btn btn-secondary" onClick={() => setStep((s) => s - 1)}>
              <ArrowLeft size={18} aria-hidden="true" /> <span className="sr-only sm:not-sr-only">Voltar</span>
            </button>
          ) : null}
          {step < total - 1 ? (
            <button type="button" className="btn btn-primary flex-1" onClick={() => setStep((s) => s + 1)}>
              {step === 0 ? "Começar" : "Continuar"} <ArrowRight size={18} aria-hidden="true" />
            </button>
          ) : (
            <button type="button" className="btn btn-primary flex-1" onClick={finish}>
              {start === "placement" ? "Ir para o diagnóstico" : "Começar a estudar"} <ArrowRight size={18} aria-hidden="true" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Volume2 } from "lucide-react";
import { CURRICULUM, getUnitMeta } from "@/content/curriculum";
import { STAGE_INFO } from "@/content/schema";
import { dateKey, formatShort, isValidTimeZone } from "@/engine/dates";
import { DEFAULT_PASS_THRESHOLD, DEFAULT_REVIEW_INTERVALS } from "@/engine/defaults";
import { GOAL_LABELS, GOALS, type Goal, type Settings } from "@/engine/model";
import { setStartUnit, updateProfile, updateSettings } from "@/state/actions";
import { useProgress, useSnapshot, useStore } from "@/state/provider";
import { useSpeaker } from "@/audio/speech";
import { ExportBackup, ImportBackup, StorageExplainer, WipeProgress } from "@/components/backup/BackupPanel";
import { Button, Card, Chip, Dialog, Notice, PageTitle, SectionTitle, Segmented, Toggle } from "@/components/ui";
import { timeZoneList } from "./OnboardingScreen";

function parseIntervals(text: string): number[] | string {
  const parts = text
    .split(/[,\s;]+/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length < 2 || parts.length > 8) return "Informe de 2 a 8 intervalos, separados por vírgula.";
  const nums = parts.map(Number);
  if (nums.some((n) => !Number.isInteger(n) || n < 1 || n > 365)) return "Use apenas números inteiros de 1 a 365.";
  for (let i = 1; i < nums.length; i++) if (nums[i] <= nums[i - 1]) return "Os intervalos precisam estar em ordem crescente.";
  return nums;
}

export function SettingsScreen() {
  const store = useStore();
  const snap = useSnapshot();
  const state = useProgress();
  const zones = useMemo(() => timeZoneList(), []);
  const speaker = useSpeaker({ voiceURI: state?.settings.voiceURI, slowRate: state?.settings.speechRate });
  const [intervalText, setIntervalText] = useState<string | null>(null);
  const [intervalError, setIntervalError] = useState<string | null>(null);
  const [startPick, setStartPick] = useState<string | null>(null);
  const [confirmStart, setConfirmStart] = useState(false);

  if (!state) return null;
  const s = state.settings;
  const tz = s.timezone;
  const set = (patch: Partial<Settings>) => store.run((st, now) => updateSettings(st, patch, now));

  const currentStart = state.profile.startUnit ?? "a1-u01";
  const pick = startPick ?? currentStart;
  const pickMeta = getUnitMeta(pick)!;

  const saveIntervals = () => {
    const parsed = parseIntervals(intervalText ?? s.reviewIntervals.join(", "));
    if (typeof parsed === "string") {
      setIntervalError(parsed);
      return;
    }
    setIntervalError(null);
    setIntervalText(null);
    set({ reviewIntervals: parsed });
  };

  return (
    <div>
      <PageTitle title="Ajustes" subtitle="Rotina, regras de avanço, áudio, aparência, ponto de partida e backup." />

      {/* ---------------- Rotina ---------------- */}
      <SectionTitle id="rotina">Rotina</SectionTitle>
      <Card as="section" aria-labelledby="rotina" className="grid gap-5">
        <div>
          <p className="mb-2 font-bold">Tempo por dia</p>
          <Segmented
            label="Tempo por dia"
            value={s.dailyMinutes}
            onChange={(v) => set({ dailyMinutes: v })}
            options={[
              { value: 10, label: "10 min" },
              { value: 20, label: "20 min" },
              { value: 30, label: "30 min" },
            ]}
          />
          <p className="mt-1.5 text-sm text-ink-2">Mudar o tempo ajusta a meta de XP e o limite de revisões para os valores sugeridos.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1">
            <span className="font-bold">Meta diária (XP)</span>
            <input
              className="field"
              type="number"
              inputMode="numeric"
              min={10}
              max={500}
              step={10}
              value={s.dailyXpGoal}
              onChange={(e) => {
                const v = Math.round(Number(e.target.value));
                if (v >= 10 && v <= 500) set({ dailyXpGoal: v });
              }}
            />
          </label>
          <label className="grid gap-1">
            <span className="font-bold">Limite de revisões por dia</span>
            <input
              className="field"
              type="number"
              inputMode="numeric"
              min={3}
              max={60}
              value={s.reviewCap}
              onChange={(e) => {
                const v = Math.round(Number(e.target.value));
                if (v >= 3 && v <= 60) set({ reviewCap: v });
              }}
            />
            <span className="text-sm text-ink-2">O que passar do limite fica guardado para os dias seguintes.</span>
          </label>
        </div>
        <label className="grid gap-1">
          <span className="font-bold">Fuso horário</span>
          <select className="field" value={tz} onChange={(e) => isValidTimeZone(e.target.value) && set({ timezone: e.target.value })}>
            {!zones.includes(tz) ? <option value={tz}>{tz}</option> : null}
            {zones.map((z) => (
              <option key={z} value={z}>
                {z.replace(/_/g, " ")}
              </option>
            ))}
          </select>
          <span className="text-sm text-ink-2">Define quando seu dia vira. Metas, sequência e datas de revisão seguem este fuso.</span>
        </label>
        <label className="grid gap-1">
          <span className="font-bold">Objetivo</span>
          <select className="field" value={state.profile.goal} onChange={(e) => store.run((st, now) => updateProfile(st, { goal: e.target.value as Goal }, now))}>
            {GOALS.map((g) => (
              <option key={g} value={g}>
                {GOAL_LABELS[g]}
              </option>
            ))}
          </select>
        </label>
      </Card>

      {/* ---------------- Regras ---------------- */}
      <SectionTitle id="regras">Regras de avanço e revisão</SectionTitle>
      <Card as="section" aria-labelledby="regras" className="grid gap-5">
        <label className="grid gap-1">
          <span className="font-bold">Critério para passar no checkpoint</span>
          <select className="field" value={Math.round(s.passThreshold * 100)} onChange={(e) => set({ passThreshold: Number(e.target.value) / 100 })}>
            {[60, 70, 80, 90, 100].map((p) => (
              <option key={p} value={p}>
                {p}% de acertos independentes{p === Math.round(DEFAULT_PASS_THRESHOLD * 100) ? " (padrão)" : ""}
              </option>
            ))}
          </select>
          <span className="text-sm text-ink-2">É uma decisão de produto do app. Não é um limiar científico nem equivale a uma certificação.</span>
        </label>
        <div className="grid gap-1">
          <label htmlFor="intervalos" className="font-bold">
            Intervalos de revisão (dias)
          </label>
          <div className="flex flex-wrap gap-2">
            <input
              id="intervalos"
              className="field !w-auto flex-1"
              value={intervalText ?? s.reviewIntervals.join(", ")}
              onChange={(e) => setIntervalText(e.target.value)}
              aria-describedby="intervalos-ajuda"
              aria-invalid={Boolean(intervalError)}
              inputMode="numeric"
            />
            <Button variant="secondary" size="sm" onClick={saveIntervals} disabled={intervalText === null}>
              Salvar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIntervalText(null);
                setIntervalError(null);
                set({ reviewIntervals: [...DEFAULT_REVIEW_INTERVALS] });
              }}
            >
              Padrão
            </Button>
          </div>
          {intervalError ? (
            <p className="text-sm font-bold text-bad" role="alert">
              {intervalError}
            </p>
          ) : null}
          <p id="intervalos-ajuda" className="text-sm text-ink-2">
            Padrão: {DEFAULT_REVIEW_INTERVALS.join(", ")}. São uma heurística inicial, não uma fórmula universal de aprendizagem. A mudança vale para as próximas revisões.
          </p>
        </div>
        <div>
          <p className="mb-2 font-bold">Idioma das instruções dos exercícios</p>
          <Segmented
            label="Idioma das instruções"
            value={s.instructionLanguage}
            onChange={(v) => set({ instructionLanguage: v })}
            options={[
              { value: "pt", label: "Português" },
              { value: "en", label: "English" },
            ]}
          />
          <p className="mt-1.5 text-sm text-ink-2">Sugestão: passe para inglês a partir do B1. As explicações continuam em português.</p>
        </div>
        <Toggle
          checked={s.showTranslations}
          onChange={(v) => set({ showTranslations: v })}
          label="Mostrar traduções por padrão"
          description="Desative para se expor mais ao inglês. A tradução continua a um toque de distância nos diálogos."
        />
      </Card>

      {/* ---------------- Áudio ---------------- */}
      <SectionTitle id="audio">Áudio</SectionTitle>
      <Card as="section" aria-labelledby="audio" className="grid gap-4">
        {!speaker.info.ready ? (
          <p className="text-ink-2">Verificando as vozes do navegador…</p>
        ) : speaker.info.available ? (
          <>
            <p className="text-sm text-ink-2">
              O áudio usa a síntese de voz do seu navegador. É uma voz sintética: a qualidade e o sotaque variam conforme o aparelho, e o app não consegue garantir um sotaque
              específico.
            </p>
            {speaker.info.voices.length > 0 ? (
              <label className="grid gap-1">
                <span className="font-bold">Voz em inglês</span>
                <select className="field" value={s.voiceURI ?? ""} onChange={(e) => set({ voiceURI: e.target.value || undefined })}>
                  <option value="">Automática ({speaker.info.voiceLabel})</option>
                  {speaker.info.voices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <Notice tone="info">O navegador não lista vozes; será usada a voz padrão do sistema para inglês.</Notice>
            )}
            <label className="grid gap-1">
              <span className="font-bold">Velocidade do modo “Devagar”: {s.speechRate.toFixed(2)}×</span>
              <input type="range" min={0.5} max={0.9} step={0.05} value={s.speechRate} onChange={(e) => set({ speechRate: Number(e.target.value) })} className="accent-[var(--primary)]" />
            </label>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={() => speaker.speak("Hello! Nice to meet you. How are you today?")}>
                <Volume2 size={16} aria-hidden="true" /> Testar
              </Button>
              <Button variant="secondary" size="sm" onClick={() => speaker.speak("Hello! Nice to meet you. How are you today?", { slow: true })}>
                <Volume2 size={16} aria-hidden="true" /> Testar devagar
              </Button>
            </div>
          </>
        ) : (
          <Notice tone="warn" title="Áudio indisponível neste navegador">
            {speaker.info.supported ? "Não há voz em inglês instalada." : "Este navegador não oferece síntese de voz."} O curso continua utilizável: os exercícios de escuta mostram o
            texto e ficam registrados como pendentes, sem contar como evidência de compreensão oral.
          </Notice>
        )}
        <p className="text-sm text-ink-2">O microfone só é pedido quando você toca em “Gravar”. As gravações ficam na memória desta aba e não são enviadas a nenhum serviço.</p>
      </Card>

      {/* ---------------- Aparência ---------------- */}
      <SectionTitle id="aparencia">Aparência</SectionTitle>
      <Card as="section" aria-labelledby="aparencia" className="grid gap-5">
        <div>
          <p className="mb-2 font-bold">Tema</p>
          <Segmented
            label="Tema"
            value={s.theme}
            onChange={(v) => set({ theme: v })}
            options={[
              { value: "system", label: "Sistema" },
              { value: "light", label: "Claro" },
              { value: "dark", label: "Escuro" },
            ]}
          />
        </div>
        <div>
          <p className="mb-2 font-bold">Animações</p>
          <Segmented
            label="Animações"
            value={s.reducedMotion}
            onChange={(v) => set({ reducedMotion: v })}
            options={[
              { value: "system", label: "Sistema" },
              { value: "on", label: "Reduzidas" },
              { value: "off", label: "Completas" },
            ]}
          />
          <p className="mt-1.5 text-sm text-ink-2">“Sistema” respeita a preferência de movimento reduzido do seu aparelho.</p>
        </div>
      </Card>

      {/* ---------------- Ponto de partida ---------------- */}
      <SectionTitle id="partida">Ponto de partida</SectionTitle>
      <Card as="section" aria-labelledby="partida" className="grid gap-4">
        <p>
          Atual:{" "}
          <strong>
            {STAGE_INFO[getUnitMeta(currentStart)!.stage].label} · Unidade {getUnitMeta(currentStart)!.order} — {getUnitMeta(currentStart)!.title}
          </strong>{" "}
          <Chip>{state.profile.startSource === "zero" ? "do zero" : state.profile.startSource === "placement" ? "sugestão do diagnóstico" : "escolha manual"}</Chip>
        </p>
        <label className="grid gap-1">
          <span className="font-bold">Mudar para</span>
          <select className="field" value={pick} onChange={(e) => setStartPick(e.target.value)}>
            {CURRICULUM.map((m) => (
              <option key={m.id} value={m.id}>
                {STAGE_INFO[m.stage].label} · Unidade {m.order} — {m.title}
              </option>
            ))}
          </select>
        </label>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" disabled={pick === currentStart} onClick={() => setConfirmStart(true)}>
            Aplicar ponto de partida
          </Button>
          <Link href="/diagnostico" className="btn btn-ghost">
            Fazer o diagnóstico
          </Link>
        </div>
        <p className="text-sm text-ink-2">
          As unidades antes do ponto de partida ficam marcadas como <strong>puladas</strong>: liberam a trilha, mas não contam como estudadas nem geram XP. O que você já concluiu
          de verdade nunca é desfeito.
        </p>
        <Dialog
          open={confirmStart}
          onClose={() => setConfirmStart(false)}
          title="Mudar o ponto de partida?"
          actions={
            <>
              <Button variant="secondary" onClick={() => setConfirmStart(false)}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  store.run((st, now) => setStartUnit(st, pick === "a1-u01" ? null : pick, pick === "a1-u01" ? "zero" : "manual", now));
                  setStartPick(null);
                  setConfirmStart(false);
                }}
              >
                Aplicar
              </Button>
            </>
          }
        >
          Novo ponto de partida: {STAGE_INFO[pickMeta.stage].label} · Unidade {pickMeta.order} — {pickMeta.title}. Lições concluídas, revisões e XP não são alterados.
        </Dialog>
      </Card>

      {/* ---------------- Backup ---------------- */}
      <SectionTitle id="backup">Backup e restauração</SectionTitle>
      <Card as="section" aria-labelledby="backup" className="grid gap-4">
        <StorageExplainer />
        <p className="text-sm">
          Armazenamento em uso:{" "}
          <Chip tone={snap.storage.kind === "indexeddb" ? "ok" : "warn"}>{snap.storage.kind === "indexeddb" ? "IndexedDB (salvando neste navegador)" : "memória (não está salvando)"}</Chip>
        </p>
        <p className="text-sm">
          Último backup: <strong>{state.meta.lastBackupAt ? formatShort(dateKey(state.meta.lastBackupAt, tz)) : "nunca"}</strong>
        </p>
        <ExportBackup />
        <ImportBackup />
        <p className="text-sm text-ink-2">
          O backup é um arquivo JSON com todo o progresso (lições, revisões, XP, textos das tarefas). Gravações de voz não entram. Para usar em outro aparelho: exporte aqui e
          restaure lá.
        </p>
        <hr className="border-line" />
        <WipeProgress />
      </Card>

      {/* ---------------- IA ---------------- */}
      <SectionTitle id="ia">Inteligência artificial</SectionTitle>
      <Card as="section" aria-labelledby="ia">
        <p>
          <Chip>Desativada</Chip>
        </p>
        <p className="mt-2 text-ink-2">
          O curso inteiro funciona sem IA: nenhum conteúdo é gerado em tempo de execução e os diálogos são roteirizados, não um chatbot. Não há chave, assinatura nem serviço
          pago. Existe apenas uma interface documentada para uma extensão futura e opcional (conversação, correção de textos), que não faz parte desta versão.
        </p>
      </Card>

      <p className="mt-8 text-sm text-ink-3">
        ZXP English · uso pessoal · as etapas A1–B2 usam o CEFR como referência de objetivos, sem certificação nem validação oficial.
      </p>
    </div>
  );
}

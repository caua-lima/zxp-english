"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import {
  BarChart3,
  BookMarked,
  CalendarDays,
  Flame,
  Home,
  Map as MapIcon,
  Menu,
  NotebookPen,
  RefreshCw,
  Settings,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { dateKey } from "@/engine/dates";
import { buildReviewQueue } from "@/engine/srs";
import { reviewsDoneOn } from "@/engine/stats";
import { currentStreak, studyDays, xpOnDate } from "@/engine/xp";
import { useNow, useSnapshot, useStore } from "@/state/provider";
import { Logo, Zip } from "@/components/brand";
import { Notice } from "@/components/ui";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Aparece na barra inferior do celular. */
  primary: boolean;
}

const NAV: NavItem[] = [
  { href: "/", label: "Início", icon: Home, primary: true },
  { href: "/trilha", label: "Trilha", icon: MapIcon, primary: true },
  { href: "/revisar", label: "Revisar", icon: RefreshCw, primary: true },
  { href: "/progresso", label: "Progresso", icon: BarChart3, primary: true },
  { href: "/erros", label: "Caderno de erros", icon: NotebookPen, primary: false },
  { href: "/biblioteca", label: "Biblioteca", icon: BookMarked, primary: false },
  { href: "/semana", label: "Revisão semanal", icon: CalendarDays, primary: false },
  { href: "/ajustes", label: "Ajustes e backup", icon: Settings, primary: false },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/trilha") return pathname.startsWith("/trilha") || pathname.startsWith("/unidade");
  return pathname === href || pathname.startsWith(href + "/");
}

export function Splash() {
  return (
    <div className="grid min-h-dvh place-items-center px-6" role="status">
      <div className="text-center">
        <div className="flex justify-center">
          <Zip mood="think" size={88} />
        </div>
        <p className="mt-3 font-extrabold">Carregando seu progresso…</p>
      </div>
    </div>
  );
}

/** Avisos sobre o armazenamento: falha ao salvar, navegador sem IndexedDB, linhas inválidas. */
export function StorageNotices() {
  const snap = useSnapshot();
  const store = useStore();
  const { error, kind, warnings } = snap.storage;
  if (!error && kind !== "memory" && warnings.length === 0) return null;
  return (
    <div className="grid gap-2">
      {error ? (
        <Notice tone="bad" title="Seu progresso não foi salvo" role="alert">
          <p>{error}</p>
          <p className="mt-1">As respostas desta sessão continuam na memória da aba. Não feche a aba antes de salvar ou exportar um backup.</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => void store.retrySave()}>
              Tentar salvar de novo
            </button>
            <Link href="/ajustes#backup" className="btn btn-secondary btn-sm">
              Exportar backup
            </Link>
          </div>
        </Notice>
      ) : null}
      {kind === "memory" && !error ? (
        <Notice tone="warn" title="Este navegador não está salvando seu progresso" role="status">
          O armazenamento local está bloqueado (isso acontece em alguns modos privados). Você pode estudar, mas tudo se perde ao fechar a aba. Use uma janela normal ou
          exporte um backup em <Link href="/ajustes#backup" className="font-extrabold underline">Ajustes</Link>.
        </Notice>
      ) : null}
      {warnings.length > 0 ? (
        <Notice tone="warn" title="Parte dos dados salvos estava inválida e foi ignorada" role="status">
          <ul className="list-disc pl-5">
            {warnings.slice(0, 3).map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
          {warnings.length > 3 ? <p>… e mais {warnings.length - 3}.</p> : null}
        </Notice>
      ) : null}
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const snap = useSnapshot();
  const pathname = usePathname();
  const router = useRouter();
  const now = useNow();
  const state = snap.state;
  const needsOnboarding = snap.status === "ready" && state !== null && !state.profile.onboarded;

  useEffect(() => {
    if (needsOnboarding) router.replace("/bem-vindo");
  }, [needsOnboarding, router]);

  if (snap.status !== "ready" || !state || needsOnboarding) return <Splash />;

  const tz = state.settings.timezone;
  const today = dateKey(now, tz);
  const streak = currentStreak(studyDays(state.xp, tz), today);
  const xpToday = xpOnDate(state.xp, today, tz);
  const due = buildReviewQueue(state.concepts, today, state.settings.reviewCap, reviewsDoneOn(state, today)).today.length;

  const link = (item: NavItem, compact: boolean) => {
    const active = isActive(pathname, item.href);
    const Icon = item.icon;
    const badge = item.href === "/revisar" && due > 0 ? due : null;
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={
          compact
            ? `relative flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-[0.7rem] font-extrabold ${active ? "bg-primary-soft text-primary-text" : "text-ink-2"}`
            : `relative flex items-center gap-3 rounded-xl px-3 py-2.5 font-bold ${active ? "bg-primary-soft text-primary-text" : "text-ink-2 hover:bg-surface-2"}`
        }
      >
        <Icon size={compact ? 22 : 20} aria-hidden="true" />
        <span>{compact && item.href === "/progresso" ? "Progresso" : item.label}</span>
        {badge ? (
          <span
            className={`grid min-w-5 place-items-center rounded-full bg-accent px-1 text-[0.68rem] font-extrabold text-accent-ink ${compact ? "absolute right-2 top-1" : "ml-auto"}`}
          >
            {badge}
            <span className="sr-only"> itens para revisar hoje</span>
          </span>
        ) : null}
      </Link>
    );
  };

  const moreActive = NAV.filter((n) => !n.primary).some((n) => isActive(pathname, n.href)) || pathname === "/mais";

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[15rem_1fr]">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-xl focus:bg-accent focus:px-3 focus:py-2 focus:font-extrabold focus:text-accent-ink">
        Pular para o conteúdo
      </a>

      {/* Navegação lateral (telas grandes) */}
      <aside className="sticky top-0 hidden h-dvh flex-col gap-1 border-r-2 border-line bg-surface p-4 lg:flex">
        <Link href="/" className="mb-4 inline-flex rounded-xl p-1" aria-label="ZXP English — início">
          <Logo />
        </Link>
        <nav aria-label="Principal" className="grid gap-1">
          {NAV.map((n) => link(n, false))}
        </nav>
        <p className="mt-auto text-xs text-ink-3">Seu progresso fica só neste navegador. Faça backup em Ajustes.</p>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-20 border-b-2 border-line bg-bg/95 backdrop-blur">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-2.5">
            <Link href="/" className="rounded-xl lg:hidden" aria-label="ZXP English — início">
              <Logo size={34} />
            </Link>
            <span className="hidden lg:block" />
            <div className="flex items-center gap-2">
              <Link
                href="/progresso"
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-line bg-surface px-3 py-1.5 text-sm font-extrabold"
                aria-label={`Sequência: ${streak} ${streak === 1 ? "dia" : "dias"}`}
              >
                <Flame size={17} className={streak > 0 ? "text-warn" : "text-ink-3"} aria-hidden="true" />
                <span className="tabular-nums">{streak}</span>
              </Link>
              <Link
                href="/progresso"
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-line bg-surface px-3 py-1.5 text-sm font-extrabold"
                aria-label={`XP de hoje: ${xpToday} de ${state.settings.dailyXpGoal}`}
              >
                <Zap size={17} className="text-primary-text" aria-hidden="true" />
                <span className="tabular-nums">
                  {xpToday}/{state.settings.dailyXpGoal}
                </span>
              </Link>
            </div>
          </div>
        </header>

        <main id="conteudo" className="mx-auto max-w-3xl px-4 pb-28 pt-5 lg:pb-12">
          <div className="mb-4 empty:hidden">
            <StorageNotices />
          </div>
          {children}
        </main>
      </div>

      {/* Navegação inferior (celular) */}
      <nav aria-label="Principal" className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t-2 border-line bg-surface px-2 pt-1.5 lg:hidden">
        <div className="mx-auto flex max-w-xl gap-1">
          {NAV.filter((n) => n.primary).map((n) => link(n, true))}
          <Link
            href="/mais"
            aria-current={moreActive ? "page" : undefined}
            className={`flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-[0.7rem] font-extrabold ${moreActive ? "bg-primary-soft text-primary-text" : "text-ink-2"}`}
          >
            <Menu size={22} aria-hidden="true" />
            <span>Mais</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export const MORE_LINKS = NAV.filter((n) => !n.primary);

/** Para telas de foco (lição, checkpoint…): espera o estado e exige onboarding. */
export function FocusGate({ children }: { children: ReactNode }) {
  const snap = useSnapshot();
  const router = useRouter();
  const pathname = usePathname();
  const allowBeforeOnboarding = pathname.startsWith("/bem-vindo");
  const blocked = snap.status === "ready" && snap.state !== null && !snap.state.profile.onboarded && !allowBeforeOnboarding;
  useEffect(() => {
    if (blocked) router.replace("/bem-vindo");
  }, [blocked, router]);
  if (snap.status !== "ready" || !snap.state || blocked) return <Splash />;
  return (
    <>
      <div className="mx-auto max-w-2xl px-4 pt-3 empty:hidden">
        <StorageNotices />
      </div>
      {children}
    </>
  );
}

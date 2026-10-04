"use client";

/**
 * Kit de interface do ZXP ENGLISH.
 *
 * Poucos componentes, todos sobre elementos nativos (button, a, dialog, input),
 * para herdar teclado, foco e leitores de tela sem bibliotecas extras.
 */
import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

type Variant = "primary" | "secondary" | "accent" | "danger" | "ghost";

function btnClass(variant: Variant, size?: "sm" | "md", block?: boolean, extra?: string): string {
  return ["btn", `btn-${variant}`, size === "sm" ? "btn-sm" : "", block ? "btn-block" : "", extra ?? ""].filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  size,
  block,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: "sm" | "md"; block?: boolean }) {
  return <button type="button" {...rest} className={btnClass(variant, size, block, className)} />;
}

export function LinkButton({
  href,
  variant = "primary",
  size,
  block,
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  size?: "sm" | "md";
  block?: boolean;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}) {
  return (
    <Link href={href} {...rest} className={btnClass(variant, size, block, className)}>
      {children}
    </Link>
  );
}

export function Card({
  children,
  className = "",
  pop,
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  pop?: boolean;
  as?: "div" | "section" | "article" | "li";
  id?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
}) {
  return (
    <Tag {...rest} className={`card ${pop ? "card-pop" : ""} p-4 sm:p-5 ${className}`}>
      {children}
    </Tag>
  );
}

export type Tone = "neutral" | "primary" | "ok" | "bad" | "warn" | "info" | "accent";

const TONE: Record<Tone, string> = {
  neutral: "bg-surface-2 text-ink-2",
  primary: "bg-primary-soft text-primary-text",
  ok: "bg-ok-soft text-ok",
  bad: "bg-bad-soft text-bad",
  warn: "bg-warn-soft text-warn",
  info: "bg-info-soft text-info",
  accent: "bg-accent text-accent-ink",
};

export function Chip({ children, tone = "neutral", className = "" }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-extrabold tracking-wide ${TONE[tone]} ${className}`}>
      {children}
    </span>
  );
}

/** Aviso em caixa: sempre com ícone/título em texto, nunca só cor. */
export function Notice({
  tone = "info",
  title,
  children,
  icon,
  className = "",
  role,
}: {
  tone?: Tone;
  title?: string;
  children?: ReactNode;
  icon?: ReactNode;
  className?: string;
  role?: "status" | "alert" | "note";
}) {
  return (
    <div role={role} className={`flex gap-3 rounded-2xl p-3.5 text-sm ${TONE[tone]} ${className}`}>
      {icon ? <span className="mt-0.5 shrink-0">{icon}</span> : null}
      <div className="min-w-0 text-ink">
        {title ? <p className="font-extrabold">{title}</p> : null}
        {children ? <div className={title ? "mt-0.5" : ""}>{children}</div> : null}
      </div>
    </div>
  );
}

export function ProgressBar({
  value,
  label,
  tone = "primary",
  className = "",
}: {
  /** 0–1 */
  value: number;
  label: string;
  tone?: "primary" | "ok" | "accent";
  className?: string;
}) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);
  const color = tone === "ok" ? "bg-ok" : tone === "accent" ? "bg-accent" : "bg-primary";
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className={`h-3 w-full overflow-hidden rounded-full bg-surface-2 ${className}`}
    >
      <div className={`h-full rounded-full ${color} transition-[width] duration-300`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Ring({
  value,
  size = 64,
  stroke = 7,
  children,
  label,
  color = "var(--primary)",
}: {
  value: number;
  size?: number;
  stroke?: number;
  children?: ReactNode;
  label: string;
  color?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value));
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }} role="img" aria-label={label}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-2)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v)}
          style={{ transition: "stroke-dashoffset 0.4s ease" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}

/** Diálogo modal sobre <dialog> nativo: foco preso, Esc fecha, fundo inerte. */
export function Dialog({
  open,
  onClose,
  title,
  children,
  actions,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby={titleId}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className="p-5">
        <h2 id={titleId} className="text-xl font-extrabold">
          {title}
        </h2>
        <div className="mt-2 text-ink-2">{children}</div>
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">{actions}</div>
      </div>
    </dialog>
  );
}

/** Interruptor acessível (role="switch"). */
export function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p id={id} className="font-bold">
          {label}
        </p>
        {description ? <p className="text-sm text-ink-2">{description}</p> : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={id}
        onClick={() => onChange(!checked)}
        className={`relative h-8 w-14 shrink-0 rounded-full border-2 border-line-strong transition-colors ${checked ? "bg-primary" : "bg-surface-2"}`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full border-2 border-line-strong bg-surface transition-[left] ${checked ? "left-[26px]" : "left-0.5"}`}
        />
        <span className="sr-only">{checked ? "Ativado" : "Desativado"}</span>
      </button>
    </div>
  );
}

/** Grupo de opções mutuamente exclusivas (botões com aria-pressed, navegáveis por Tab). */
export function Segmented<T extends string | number>({
  value,
  onChange,
  options,
  label,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; hint?: string }[];
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="grid gap-2" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className="choice flex-col items-center justify-center !gap-0 text-center"
        >
          <span className="font-extrabold">{o.label}</span>
          {o.hint ? <span className="text-xs font-semibold text-ink-2">{o.hint}</span> : null}
        </button>
      ))}
    </div>
  );
}

/** Markdown mínimo: parágrafos, listas com "- " e **negrito**. */
export function RichText({ text, className = "" }: { text: string; className?: string }) {
  const blocks = text.split(/\n{2,}/);
  return (
    <div className={`rich ${className}`}>
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        const listLines = lines.filter((l) => l.startsWith("- "));
        if (listLines.length === lines.length) {
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>{inline(l.slice(2))}</li>
              ))}
            </ul>
          );
        }
        if (listLines.length > 0) {
          const head = lines.filter((l) => !l.startsWith("- "));
          return (
            <div key={i}>
              <p>{inline(head.join(" "))}</p>
              <ul className="mt-2">
                {listLines.map((l, j) => (
                  <li key={j}>{inline(l.slice(2))}</li>
                ))}
              </ul>
            </div>
          );
        }
        return <p key={i}>{inline(lines.join(" "))}</p>;
      })}
    </div>
  );
}

function inline(s: string): ReactNode[] {
  return s.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : <span key={i}>{part}</span>,
  );
}

export function PageTitle({ title, subtitle, eyebrow }: { title: string; subtitle?: string; eyebrow?: ReactNode }) {
  return (
    <header className="mb-5">
      {eyebrow ? <div className="mb-1.5">{eyebrow}</div> : null}
      <h1 className="text-2xl font-extrabold sm:text-3xl">{title}</h1>
      {subtitle ? <p className="mt-1.5 text-ink-2">{subtitle}</p> : null}
    </header>
  );
}

export function SectionTitle({ children, id, aside }: { children: ReactNode; id?: string; aside?: ReactNode }) {
  return (
    <div className="mb-3 mt-7 flex items-end justify-between gap-3">
      <h2 id={id} className="text-lg font-extrabold">
        {children}
      </h2>
      {aside}
    </div>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-surface-2 ${className}`} aria-hidden="true" />;
}

export function Loading({ label = "Carregando…" }: { label?: string }) {
  return (
    <div role="status" className="grid gap-3 py-6">
      <span className="sr-only">{label}</span>
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-28" />
      <Skeleton className="h-28" />
    </div>
  );
}

export function EmptyState({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <Card className="text-center">
      <p className="text-lg font-extrabold">{title}</p>
      {children ? <div className="mx-auto mt-1 max-w-prose text-ink-2">{children}</div> : null}
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </Card>
  );
}

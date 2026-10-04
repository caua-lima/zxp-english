/**
 * Marca do ZXP English, da família ZXP Solutions.
 *
 * O "Z" é o símbolo compartilhado pelos apps ZXP: traço (stroke), nunca
 * preenchimento, com a geometria exata da marca (pontos 30,47 170,47 30,153 170,153,
 * espessura 34, junção em esquadria, ponta reta) sobre ônix. O que muda de app para
 * app é a cor de assinatura; no English, o violeta elétrico. Estas cores são da logo
 * e por isso não mudam com o tema do app. O mascote Zip é um desenho original.
 */
export const BRAND = { onyx: "#10100E", violet: "#9B8CFF", ivory: "#F6F3E8" } as const;

const Z_POINTS = "30,47 170,47 30,153 170,153";

/** Só o "Z" de traço, sem contêiner. */
export function MarkZ({ size = 36, color = BRAND.violet }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <polyline points={Z_POINTS} fill="none" stroke={color} strokeWidth="34" strokeLinejoin="miter" strokeLinecap="butt" />
    </svg>
  );
}

/** O "Z" dentro do contêiner ônix arredondado: a forma do ícone do app. */
export function Mark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <rect width="200" height="200" rx="44" fill={BRAND.onyx} />
      <polyline points={Z_POINTS} fill="none" stroke={BRAND.violet} strokeWidth="34" strokeLinejoin="miter" strokeLinecap="butt" />
    </svg>
  );
}

export function Logo({ size = 36, compact = false }: { size?: number; compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Mark size={size} />
      {!compact ? (
        <span className="font-display leading-none">
          <span className="block text-[1.25rem] font-extrabold tracking-tight text-primary-text">ZXP</span>
          <span className="block text-[0.62rem] font-medium tracking-[0.3em] text-ink">ENGLISH</span>
        </span>
      ) : null}
      <span className="sr-only">ZXP English</span>
    </span>
  );
}

export type Mood = "happy" | "cheer" | "think" | "rest";

/** Zip, a faísca: aparece nos momentos de boas-vindas, resultado e pausa. */
export function Zip({ mood = "happy", size = 96 }: { mood?: Mood; size?: number }) {
  const mouth =
    mood === "cheer" ? (
      <path d="M40 60c4 7 16 7 20 0z" fill="var(--line-strong)" />
    ) : mood === "think" ? (
      <path d="M43 62h13" stroke="var(--line-strong)" strokeWidth="3" strokeLinecap="round" />
    ) : mood === "rest" ? (
      <path d="M43 62c3-2 10-2 13 0" stroke="var(--line-strong)" strokeWidth="3" strokeLinecap="round" fill="none" />
    ) : (
      <path d="M42 59c4 5 12 5 16 0" stroke="var(--line-strong)" strokeWidth="3" strokeLinecap="round" fill="none" />
    );
  const eyes =
    mood === "rest" ? (
      <>
        <path d="M37 47c2 2 5 2 7 0" stroke="var(--line-strong)" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M55 47c2 2 5 2 7 0" stroke="var(--line-strong)" strokeWidth="3" strokeLinecap="round" fill="none" />
      </>
    ) : (
      <>
        <circle cx="41" cy="46" r="4.2" fill="var(--line-strong)" />
        <circle cx="58" cy="46" r="4.2" fill="var(--line-strong)" />
        <circle cx="42.4" cy="44.6" r="1.4" fill="#fff" />
        <circle cx="59.4" cy="44.6" r="1.4" fill="#fff" />
      </>
    );
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      {mood === "cheer" ? (
        <g stroke="var(--primary)" strokeWidth="3.5" strokeLinecap="round">
          <path d="M12 26l7 5M88 26l-7 5M50 4v8M24 10l4 7M76 10l-4 7" />
        </g>
      ) : null}
      <path
        d="M24 18h54c4 0 6 4 3 7L60 44h18c4 0 6 5 3 8L42 92c-3 3-8 0-6-4l9-24H24c-4 0-6-4-4-7l1-35c0-2 1-4 3-4z"
        fill="var(--accent)"
        stroke="var(--line-strong)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {eyes}
      {mouth}
      {mood === "think" ? <circle cx="82" cy="20" r="5" fill="var(--primary)" stroke="var(--line-strong)" strokeWidth="2.5" /> : null}
    </svg>
  );
}

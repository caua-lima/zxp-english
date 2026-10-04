"use client";

import Link from "next/link";
import { ChevronRight, Compass } from "lucide-react";
import { MORE_LINKS } from "@/components/shell/AppShell";
import { PageTitle } from "@/components/ui";

const HINT: Record<string, string> = {
  "/erros": "Seus erros, com explicação e prática direcionada.",
  "/biblioteca": "Vocabulário, expressões e explicações do curso.",
  "/semana": "Resumo da semana: o que foi feito e o que ajustar.",
  "/ajustes": "Rotina, áudio, aparência, ponto de partida e backup.",
};

export function MoreScreen() {
  return (
    <div>
      <PageTitle title="Mais" />
      <ul className="grid gap-2.5">
        {MORE_LINKS.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link href={item.href} className="card flex items-center gap-3 p-4 hover:border-ink-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-text">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-extrabold">{item.label}</span>
                  <span className="block text-sm text-ink-2">{HINT[item.href]}</span>
                </span>
                <ChevronRight size={20} className="shrink-0 text-ink-3" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
        <li>
          <Link href="/diagnostico" className="card flex items-center gap-3 p-4 hover:border-ink-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-text">
              <Compass size={20} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-extrabold">Diagnóstico</span>
              <span className="block text-sm text-ink-2">Sugestão de ponto de partida. Opcional e curto.</span>
            </span>
            <ChevronRight size={20} className="shrink-0 text-ink-3" aria-hidden="true" />
          </Link>
        </li>
      </ul>
    </div>
  );
}

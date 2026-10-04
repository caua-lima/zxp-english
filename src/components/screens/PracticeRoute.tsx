"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loading } from "@/components/ui";
import { PracticeScreen, type PracticeMode } from "./PracticeScreen";

function Inner({ mode }: { mode: PracticeMode }) {
  const params = useSearchParams();
  const concept = params.get("c");
  return <PracticeScreen key={`${mode}:${concept ?? ""}`} mode={mode} concept={concept} />;
}

/** `useSearchParams` precisa de um limite de Suspense para a página poder ser pré-renderizada. */
export function PracticeRoute({ mode }: { mode: PracticeMode }) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-2xl px-4 pt-6"><Loading /></div>}>
      <Inner mode={mode} />
    </Suspense>
  );
}

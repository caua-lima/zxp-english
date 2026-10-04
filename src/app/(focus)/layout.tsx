import type { ReactNode } from "react";
import { FocusGate } from "@/components/shell/AppShell";

/** Telas de foco (lição, checkpoint, prática…): sem navegação, para não distrair. */
export default function FocusLayout({ children }: { children: ReactNode }) {
  return <FocusGate>{children}</FocusGate>;
}

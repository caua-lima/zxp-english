import type { Metadata } from "next";
import { ProgressScreen } from "@/components/screens/ProgressScreen";

export const metadata: Metadata = { title: "Progresso" };

export default function Page() {
  return <ProgressScreen />;
}

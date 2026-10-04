import type { Metadata } from "next";
import { SettingsScreen } from "@/components/screens/SettingsScreen";

export const metadata: Metadata = { title: "Ajustes" };

export default function Page() {
  return <SettingsScreen />;
}

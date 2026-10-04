import type { Metadata } from "next";
import { PlacementScreen } from "@/components/screens/PlacementScreen";

export const metadata: Metadata = { title: "Diagnóstico" };

export default function Page() {
  return <PlacementScreen />;
}

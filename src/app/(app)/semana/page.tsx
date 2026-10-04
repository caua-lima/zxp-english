import type { Metadata } from "next";
import { WeekScreen } from "@/components/screens/WeekScreen";

export const metadata: Metadata = { title: "Revisão semanal" };

export default function Page() {
  return <WeekScreen />;
}

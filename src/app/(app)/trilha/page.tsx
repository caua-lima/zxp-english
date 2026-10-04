import type { Metadata } from "next";
import { TrailScreen } from "@/components/screens/TrailScreen";

export const metadata: Metadata = { title: "Trilha" };

export default function Page() {
  return <TrailScreen />;
}

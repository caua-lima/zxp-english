import type { Metadata } from "next";
import { MoreScreen } from "@/components/screens/MoreScreen";

export const metadata: Metadata = { title: "Mais" };

export default function Page() {
  return <MoreScreen />;
}

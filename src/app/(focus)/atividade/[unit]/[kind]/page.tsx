import type { Metadata } from "next";
import { CURRICULUM } from "@/content/curriculum";
import { ACTIVITY_KINDS, type ActivityKind } from "@/content/schema";
import { ActivityScreen } from "@/components/screens/ActivityScreen";

type Params = { params: Promise<{ unit: string; kind: string }> };

export function generateStaticParams() {
  return CURRICULUM.flatMap((m) => ACTIVITY_KINDS.map((kind) => ({ unit: m.id, kind })));
}
export const dynamicParams = false;
export const metadata: Metadata = { title: "Atividade" };

export default async function Page({ params }: Params) {
  const { unit, kind } = await params;
  return <ActivityScreen unitId={unit} kind={kind as ActivityKind} />;
}

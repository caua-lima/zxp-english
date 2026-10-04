import type { Metadata } from "next";
import { CURRICULUM } from "@/content/curriculum";
import { CheckpointScreen } from "@/components/screens/CheckpointScreen";

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return CURRICULUM.map((m) => ({ id: m.id }));
}
export const dynamicParams = false;
export const metadata: Metadata = { title: "Checkpoint" };

export default async function Page({ params }: Params) {
  const { id } = await params;
  return <CheckpointScreen unitId={id} />;
}

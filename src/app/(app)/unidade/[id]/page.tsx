import type { Metadata } from "next";
import { CURRICULUM, getUnitMeta } from "@/content/curriculum";
import { UnitScreen } from "@/components/screens/UnitScreen";

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return CURRICULUM.map((m) => ({ id: m.id }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  return { title: getUnitMeta(id)?.title ?? "Unidade" };
}

export default async function Page({ params }: Params) {
  const { id } = await params;
  return <UnitScreen unitId={id} />;
}

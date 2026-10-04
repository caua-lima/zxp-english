import type { Metadata } from "next";
import { CURRICULUM, lessonIdsOf } from "@/content/curriculum";
import { LessonScreen } from "@/components/lesson/LessonScreen";

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return CURRICULUM.flatMap((m) => lessonIdsOf(m).map((id) => ({ id })));
}
export const dynamicParams = false;
export const metadata: Metadata = { title: "Lição" };

export default async function Page({ params }: Params) {
  const { id } = await params;
  return <LessonScreen lessonId={id} />;
}

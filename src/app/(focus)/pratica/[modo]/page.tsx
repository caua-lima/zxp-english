import type { Metadata } from "next";
import { PracticeRoute } from "@/components/screens/PracticeRoute";

type Params = { params: Promise<{ modo: string }> };

export function generateStaticParams() {
  return [{ modo: "revisao" }, { modo: "erros" }];
}
export const dynamicParams = false;
export const metadata: Metadata = { title: "Prática" };

export default async function Page({ params }: Params) {
  const { modo } = await params;
  return <PracticeRoute mode={modo === "erros" ? "erros" : "revisao"} />;
}

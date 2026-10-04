import type { Metadata } from "next";
import { ErrorsScreen } from "@/components/screens/ErrorsScreen";

export const metadata: Metadata = { title: "Caderno de erros" };

export default function Page() {
  return <ErrorsScreen />;
}

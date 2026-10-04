import type { Metadata } from "next";
import { ReviewScreen } from "@/components/screens/ReviewScreen";

export const metadata: Metadata = { title: "Revisar" };

export default function Page() {
  return <ReviewScreen />;
}

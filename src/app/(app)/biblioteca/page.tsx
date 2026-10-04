import type { Metadata } from "next";
import { LibraryScreen } from "@/components/screens/LibraryScreen";

export const metadata: Metadata = { title: "Biblioteca" };

export default function Page() {
  return <LibraryScreen />;
}

import Link from "next/link";
import { Zip } from "@/components/brand";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6 text-center">
      <div>
        <div className="flex justify-center">
          <Zip mood="think" size={104} />
        </div>
        <h1 className="mt-3 text-3xl font-extrabold">Página não encontrada</h1>
        <p className="mt-1 text-ink-2">Este endereço não existe no ZXP English.</p>
        <Link href="/" className="btn btn-primary mt-5">
          Ir para o início
        </Link>
      </div>
    </main>
  );
}

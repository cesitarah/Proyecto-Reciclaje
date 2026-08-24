import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="text-center">
        <h1 className="mb-6 text-3xl font-bold text-white">
          Nueva Vida
        </h1>

        <Link
          href="/vendedor-publicar-ofertas"
          className="rounded-full bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-600"
        >
          Ir a Vendedor
        </Link>
      </div>
    </main>
  );
}
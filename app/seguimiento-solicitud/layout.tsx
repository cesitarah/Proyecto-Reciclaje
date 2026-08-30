import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-nv-page text-sm text-[#40534A]">
          Cargando...
        </main>
      }
    >
      {children}
    </Suspense>
  );
}

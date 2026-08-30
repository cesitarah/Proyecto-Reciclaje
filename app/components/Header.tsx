"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleCerrarSesion = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });

      setMenuAbierto(false);
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const cerrarSesionClassName =
    "flex items-center justify-center gap-2 rounded-lg bg-[#E99A9A] px-4 py-2.5 text-sm font-semibold text-[#5C2424] shadow-sm transition duration-200 hover:bg-[#E27D7D] active:scale-95 touch-manipulation";

  return (
    <header className="relative w-full bg-[#39734A] px-3 py-3 shadow-md sm:px-6 sm:py-4 lg:px-10 xl:px-12 2xl:px-16">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-2 lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px]">
        <Link
          href="/principal"
          className="flex min-w-0 shrink items-center gap-1.5 text-white sm:gap-2"
          onClick={() => setMenuAbierto(false)}
        >
          <span className="nv-animate-float shrink-0 text-lg text-[#C3F4D4] sm:text-2xl">♻️</span>
          <span className="truncate text-sm font-semibold tracking-wide sm:text-xl">
            NUEVA VIDA
          </span>
        </Link>

        <nav className="hidden items-center gap-4 lg:gap-6 md:flex">
          <Link
            href="/principal"
            className="text-sm text-white transition-colors hover:text-[#B9E6F2]"
          >
            Inicio
          </Link>

          <Link
            href="/registro"
            className="text-sm text-white transition-colors hover:text-[#B9E6F2]"
          >
            Registrarse
          </Link>

          <Link
            href="/login"
            className="rounded-lg bg-[#B9E6F2] px-4 py-2 text-sm font-semibold text-[#31583D] transition-colors hover:bg-[#D5F2F7]"
          >
            Iniciar sesión
          </Link>

          <button
            type="button"
            onClick={handleCerrarSesion}
            className={cerrarSesionClassName}
          >
            <span className="text-base">↪</span>
            Cerrar sesión
          </button>
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={handleCerrarSesion}
            title="Cerrar sesión"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E99A9A] text-[#5C2424] shadow-sm touch-manipulation active:scale-95"
          >
            <span className="text-base">↪</span>
          </button>

          <button
            type="button"
            onClick={() => setMenuAbierto((prev) => !prev)}
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2F5F3D] text-white touch-manipulation active:scale-95"
          >
            <i
              className={`fa-solid text-lg ${menuAbierto ? "fa-xmark" : "fa-bars"}`}
            />
          </button>
        </div>
      </div>

      {menuAbierto && (
        <nav className="absolute left-0 right-0 top-full z-50 border-t border-[#2F5F3D] bg-[#39734A] px-3 py-3 shadow-lg md:hidden">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px]">
            <Link
              href="/principal"
              onClick={() => setMenuAbierto(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-white hover:bg-[#2F5F3D]"
            >
              Inicio
            </Link>
            <Link
              href="/registro"
              onClick={() => setMenuAbierto(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-white hover:bg-[#2F5F3D]"
            >
              Registrarse
            </Link>
            <Link
              href="/login"
              onClick={() => setMenuAbierto(false)}
              className="rounded-lg bg-[#B9E6F2] px-3 py-2.5 text-center text-sm font-semibold text-[#31583D]"
            >
              Iniciar sesión
            </Link>
            <button
              type="button"
              onClick={handleCerrarSesion}
              className={`${cerrarSesionClassName} w-full`}
            >
              <span className="text-base">↪</span>
              Cerrar sesión
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}

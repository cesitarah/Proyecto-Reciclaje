"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-[#3D4641] px-6 py-4 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between">

        {/* LOGO */}
        <Link
          href="/principal"
          className="flex items-center gap-2 text-[#F5F3EC]"
        >
          <span className="text-2xl">♻️</span>

          <span className="text-xl font-semibold">
            NUEVA VIDA
          </span>
        </Link>

        {/* MENU */}
        <nav className="flex items-center gap-6">

          <Link
            href="/principal"
            className="text-sm text-[#F5F3EC] hover:text-[#B8D4D8] transition-colors"
          >
            Inicio
          </Link>

          <Link
            href="/registro"
            className="text-sm text-[#F5F3EC] hover:text-[#B8D4D8] transition-colors"
          >
            Registrarse
          </Link>

          <Link
            href="/login"
            className="rounded-lg bg-[#6F806C] px-4 py-2 text-sm text-white hover:bg-[#81937D] transition-colors"
          >
            Iniciar sesión
          </Link>

        </nav>

      </div>
    </header>
  );
}
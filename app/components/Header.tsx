"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  // CERRAR SESIÓN
  const handleCerrarSesion = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="w-full bg-[#39734A] px-6 py-4 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between">

        {/* LOGO */}
        <Link
          href="/principal"
          className="flex items-center gap-2 text-white"
        >
          <span className="text-2xl text-[#C3F4D4]">♻️</span>

          <span className="text-xl font-semibold">
            NUEVA VIDA
          </span>
        </Link>

        {/* MENU */}
        <nav className="flex items-center gap-6">

          <Link
            href="/principal"
            className="text-sm text-white hover:text-[#B9E6F2] transition-colors"
          >
            Inicio
          </Link>

          <Link
            href="/registro"
            className="text-sm text-white hover:text-[#B9E6F2] transition-colors"
          >
            Registrarse
          </Link>

          {/* INICIAR SESIÓN */}
          <Link
            href="/login"
            className="
              rounded-lg
              bg-[#B9E6F2]
              px-4
              py-2
              text-sm
              font-semibold
              text-[#31583D]
              hover:bg-[#D5F2F7]
              transition-colors
            "
          >
            Iniciar sesión
          </Link>

          {/* CERRAR SESIÓN */}
          <button
            type="button"
            onClick={handleCerrarSesion}
            className="
              flex
              items-center
              gap-2
              rounded-lg
              bg-[#E99A9A]
              px-4
              py-2
              text-sm
              font-semibold
              text-[#5C2424]
              shadow-sm
              transition
              duration-200
              hover:bg-[#E27D7D]
              hover:shadow-md
              active:scale-95
            "
          >
            {/* ICONO */}
            <span className="text-base">
              ↪
            </span>

            Cerrar sesión
          </button>

        </nav>

      </div>
    </header>
  );
}
"use client";

import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/principal");
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#F3F1E8] p-6">

      {/* CONTENEDOR PRINCIPAL */}
      <div className="w-full max-w-[750px] h-[500px] flex rounded-2xl overflow-hidden shadow-lg border border-[#6D756D]">

        {/* ================= LADO IZQUIERDO ================= */}
        <div className="w-1/2 bg-[#A8B39F] flex items-center justify-center">

          <div className="w-[275px] h-[390px] rounded-2xl bg-[#3D4641] flex flex-col items-center justify-center px-8">

            {/* TITULO */}
            <h1 className="text-2xl font-serif text-[#F5F3EC] mb-2">
              NUEVA VIDA
            </h1>

            <p className="text-sm font-serif text-[#DDE3D9] mb-10">
              Iniciar sesión
            </p>

            {/* FORMULARIO */}
            <form
              className="w-full flex flex-col gap-5"
              onSubmit={handleLogin}
            >

              {/* NOMBRE */}
              <input
                type="text"
                placeholder="Nombre:"
                className="w-full h-11 rounded-xl bg-[#30262D] text-[#F5F3EC] px-4 outline-none placeholder-[#D6D0D3] focus:ring-2 focus:ring-[#A8B39F]"
              />

              {/* CONTRASEÑA */}
              <input
                type="password"
                placeholder="Contraseña:"
                className="w-full h-11 rounded-xl bg-[#30262D] text-[#F5F3EC] px-4 outline-none placeholder-[#D6D0D3] focus:ring-2 focus:ring-[#A8B39F]"
              />

              {/* BOTON INGRESAR */}
              <button
                type="submit"
                className="mx-auto mt-8 px-6 py-2 rounded-lg bg-[#6F806C] text-white font-serif text-sm hover:bg-[#81937D] transition-colors"
              >
                Ingresar
              </button>

            </form>

            {/* BOTON REGISTRARSE */}
            <a
              href="/registro"
              className="mt-3 w-full text-center py-1.5 rounded-lg bg-[#30262D] text-[#F5F3EC] font-serif text-sm hover:bg-[#463842] transition-colors"
            >
              Registrarse
            </a>

          </div>
        </div>

        {/* ================= LADO DERECHO ================= */}
        <div className="w-1/2 relative overflow-hidden">

          {/* IMAGEN */}
          <img
            src="/erik-mclean-GjCx5KhulZI-unsplash.jpg"
            alt="Nueva Vida - Reciclaje"
            className="w-full h-full object-cover"
          />

          {/* CAPA SOBRE LA IMAGEN */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">

            <div className="text-center px-8">

              <div className="text-6xl mb-5">
                ♻️
              </div>

              <h2 className="text-3xl font-serif text-white drop-shadow-lg">
                NUEVA VIDA
              </h2>

              <p className="mt-3 text-lg font-serif text-white drop-shadow-lg">
                Recicla hoy,
                <br />
                transforma mañana.
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}
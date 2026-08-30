"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMensaje("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          contrasena,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMensaje(data.error || "No se pudo iniciar sesión.");
        return;
      }

      // Redirección según el rol
      if (data.usuario.rol === "Administrador") {
        router.push("/administrador");
        return;
      }

      if (data.usuario.rol === "Vendedor") {
        router.push("/principal");
        return;
      }

      if (data.usuario.rol === "Comprador") {
        router.push("/principal");
        return;
      }

      setMensaje("El rol del usuario no es válido.");

    } catch (error) {
      console.error(error);
      setMensaje("Error de conexión con el servidor.");
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#E8F6FA] p-6">

      {/* CONTENEDOR PRINCIPAL */}
      <div className="w-full max-w-[750px] h-[500px] flex rounded-2xl overflow-hidden shadow-xl border border-[#A8D5BA]">

        {/* ================= LADO IZQUIERDO ================= */}
        <div className="w-1/2 bg-[#A8D5BA] flex items-center justify-center">

          <div className="w-[275px] h-[390px] rounded-2xl bg-[#E8F5EC] flex flex-col items-center justify-center px-8 shadow-md">

            {/* TITULO */}
            <h1 className="text-2xl font-serif font-bold text-[#39734A] mb-2">
              NUEVA VIDA
            </h1>

            <p className="text-sm font-serif text-[#4F7560] mb-10">
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
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                className="
                  w-full
                  h-11
                  rounded-xl
                  bg-[#FFFDF5]
                  text-[#31583D]
                  px-4
                  outline-none
                  border
                  border-[#B9E6F2]
                  placeholder-[#789083]
                  focus:border-[#6FAF7B]
                  focus:ring-2
                  focus:ring-[#B9E6F2]
                "
              />

              {/* CONTRASEÑA */}
              <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Contraseña"
                className="
                  w-full
                  h-11
                  rounded-xl
                  bg-[#FFFDF5]
                  text-[#31583D]
                  px-4
                  outline-none
                  border
                  border-[#B9E6F2]
                  placeholder-[#789083]
                  focus:border-[#6FAF7B]
                  focus:ring-2
                  focus:ring-[#B9E6F2]
                "
              />

              {/* BOTON INGRESAR */}
              <button
                type="submit"
                className="
                  mx-auto
                  mt-8
                  px-7
                  py-2
                  rounded-lg
                  bg-[#6FAF7B]
                  text-white
                  font-serif
                  text-sm
                  font-semibold
                  shadow-sm
                  hover:bg-[#5F9E6B]
                  transition-colors
                "
              >
                Ingresar
              </button>

            </form>

            {/* MENSAJE */}
            {mensaje && (
              <p className="mt-3 text-center text-xs font-serif text-[#B45F5F]">
                {mensaje}
              </p>
            )}

            {/* BOTON REGISTRARSE */}
            <a
              href="/registro"
              className="
                mt-3
                w-full
                text-center
                py-1.5
                rounded-lg
                bg-[#B9E6F2]
                text-[#31583D]
                font-serif
                text-sm
                font-semibold
                hover:bg-[#A5DCEB]
                transition-colors
              "
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
          <div className="absolute inset-0 flex items-center justify-center bg-[#39734A]/35">

            <div className="text-center px-8">

              {/* ICONO */}
              <div className="text-6xl mb-5">
                ♻️
              </div>

              <h2 className="text-3xl font-serif font-bold text-white drop-shadow-lg">
                NUEVA VIDA
              </h2>

              <p className="mt-3 text-lg font-serif text-[#FFF1B8] drop-shadow-lg">
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
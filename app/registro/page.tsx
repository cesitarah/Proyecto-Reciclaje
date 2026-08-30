"use client";

import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleRegistro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMensaje("");

    try {
      const response = await fetch("/api/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          correo,
          telefono,
          contrasena,
          tipoUsuario,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMensaje(data.error || "No se pudo crear la cuenta.");
        return;
      }

      setMensaje("¡Cuenta creada correctamente!");

      setNombre("");
      setCorreo("");
      setTelefono("");
      setContrasena("");
      setTipoUsuario("");
    } catch (error) {
      console.error(error);
      setMensaje("Error de conexión con el servidor.");
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-nv-page px-4 py-5">

      {/* ================= CUADRO PRINCIPAL ================= */}
      <div className="w-full max-w-[390px] rounded-2xl bg-[#E8F5EC] px-7 py-5 shadow-xl border border-[#A8D5BA]">

        {/* ================= LOGO Y TÍTULO ================= */}
        <div className="flex flex-col items-center mb-4">

          {/* ICONO */}
          <div className="flex h-11 w-11 items-center justify-center">
            <span className="text-[30px] leading-none">
              ♻️
            </span>
          </div>

          {/* TÍTULO */}
          <h1 className="mt-1 text-[22px] font-serif font-bold tracking-wider text-[#39734A]">
            NUEVA VIDA
          </h1>

          {/* SUBTÍTULO */}
          <p className="text-[12px] font-serif text-[#4F7560]">
            Crea tu cuenta
          </p>

        </div>

        {/* ================= FORMULARIO ================= */}
        <form
          className="flex flex-col"
          onSubmit={handleRegistro}
        >

          {/* NOMBRE */}
          <label className="text-[12px] font-serif text-[#31583D]">
            Nombre completo
          </label>

          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="
              mt-1
              h-8
              w-full
              rounded-lg
              border
              border-[#B9E6F2]
              bg-[#FFFDF5]
              px-3
              text-[12px]
              text-[#31583D]
              outline-none
              focus:border-[#6FAF7B]
              focus:ring-1
              focus:ring-[#B9E6F2]
            "
          />

          {/* CORREO */}
          <label className="mt-2.5 text-[12px] font-serif text-[#31583D]">
            Correo electrónico
          </label>

          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="
              mt-1
              h-8
              w-full
              rounded-lg
              border
              border-[#B9E6F2]
              bg-[#FFFDF5]
              px-3
              text-[12px]
              text-[#31583D]
              outline-none
              focus:border-[#6FAF7B]
              focus:ring-1
              focus:ring-[#B9E6F2]
            "
          />

          {/* TELÉFONO */}
          <label className="mt-2.5 text-[12px] font-serif text-[#31583D]">
            Teléfono
          </label>

          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="
              mt-1
              h-8
              w-full
              rounded-lg
              border
              border-[#B9E6F2]
              bg-[#FFFDF5]
              px-3
              text-[12px]
              text-[#31583D]
              outline-none
              focus:border-[#6FAF7B]
              focus:ring-1
              focus:ring-[#B9E6F2]
            "
          />

          {/* CONTRASEÑA */}
          <label className="mt-2.5 text-[12px] font-serif text-[#31583D]">
            Contraseña
          </label>

          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="
              mt-1
              h-8
              w-full
              rounded-lg
              border
              border-[#B9E6F2]
              bg-[#FFFDF5]
              px-3
              text-[12px]
              text-[#31583D]
              outline-none
              focus:border-[#6FAF7B]
              focus:ring-1
              focus:ring-[#B9E6F2]
            "
          />

          {/* ================= TIPO DE USUARIO ================= */}
          <p className="mt-4 text-center text-[13px] font-serif text-[#31583D]">
            ¿Cómo quieres registrarte?
          </p>

          <div className="mt-2 flex justify-center gap-14">

            {/* COMPRADOR */}
            <label className="flex cursor-pointer flex-col items-center">

              <span className="text-[12px] font-serif text-[#31583D]">
                Comprador
              </span>

              <input
                type="radio"
                name="tipoUsuario"
                value="Comprador"
                checked={tipoUsuario === "Comprador"}
                onChange={(e) => setTipoUsuario(e.target.value)}
                className="mt-1 h-4 w-4 accent-[#6FAF7B]"
              />

            </label>

            {/* VENDEDOR */}
            <label className="flex cursor-pointer flex-col items-center">

              <span className="text-[12px] font-serif text-[#31583D]">
                Vendedor
              </span>

              <input
                type="radio"
                name="tipoUsuario"
                value="Vendedor"
                checked={tipoUsuario === "Vendedor"}
                onChange={(e) => setTipoUsuario(e.target.value)}
                className="mt-1 h-4 w-4 accent-[#6FAF7B]"
              />

            </label>

          </div>

          {/* ================= BOTÓN ================= */}
          <div className="mt-4 flex justify-center">

            <button
              type="submit"
              className="
                rounded-lg
                bg-[#6FAF7B]
                px-7
                py-2
                font-serif
                text-[12px]
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-[#5F9E6B]
                active:scale-95
              "
            >
              Crear cuenta
            </button>

          </div>

          {/* ================= MENSAJE ================= */}
          {mensaje && (
            <p className="mt-2 text-center text-[11px] font-serif text-[#39734A]">
              {mensaje}
            </p>
          )}

        </form>

        {/* ================= LOGIN ================= */}
        <div className="mt-3 flex items-center justify-center gap-2 text-[11px] font-serif">

          <span className="text-[#31583D]">
            ¿Ya tienes una cuenta?
          </span>

          <Link
            href="/login"
            className="font-semibold text-[#4C8A91] hover:text-[#326A70]"
          >
            Iniciar sesión
          </Link>

        </div>

      </div>

    </main>
  );
}
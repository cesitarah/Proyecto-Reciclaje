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
    <main className="min-h-screen w-full flex items-center justify-center bg-[#F3F1E8] py-6">

      <div className="w-[330px] rounded-lg bg-[#A8B39F] px-7 py-4 shadow-md">

        {/* LOGO Y TITULO */}
        <div className="flex justify-center mb-5">

          <div className="flex items-center gap-3">

            {/* LOGO */}
            <div className="w-[65px] h-[55px] bg-[#FAF9F4] flex items-center justify-center">
              <span className="text-3xl">
                ♻️
              </span>
            </div>

            {/* NOMBRE */}
            <div>
              <h1 className="text-[22px] font-serif text-[#26382C]">
                NUEVA VIDA
              </h1>

              <p className="text-[13px] font-serif text-[#26382C] text-center">
                Crea tu cuenta
              </p>
            </div>

          </div>

        </div>

        {/* FORMULARIO */}
        <form
          className="flex flex-col gap-1.5"
          onSubmit={handleRegistro}
        >

          {/* NOMBRE COMPLETO */}
          <label className="text-[13px] font-serif text-[#26382C]">
            Nombre completo
          </label>

          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full h-8 rounded-md bg-[#FAF9F4] px-3 text-[#26382C] outline-none border border-[#D8D8D0] focus:border-[#607A64]"
          />

          {/* CORREO ELECTRÓNICO */}
          <label className="text-[13px] font-serif text-[#26382C] mt-1">
            Correo electrónico
          </label>

          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full h-8 rounded-md bg-[#FAF9F4] px-3 text-[#26382C] outline-none border border-[#D8D8D0] focus:border-[#607A64]"
          />

          {/* TELÉFONO */}
          <label className="text-[13px] font-serif text-[#26382C] mt-1">
            Teléfono
          </label>

          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full h-8 rounded-md bg-[#FAF9F4] px-3 text-[#26382C] outline-none border border-[#D8D8D0] focus:border-[#607A64]"
          />

          {/* CONTRASEÑA */}
          <label className="text-[13px] font-serif text-[#26382C] mt-1">
            Contraseña
          </label>

          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="w-full h-8 rounded-md bg-[#FAF9F4] px-3 text-[#26382C] outline-none border border-[#D8D8D0] focus:border-[#607A64]"
          />

          {/* TIPO DE USUARIO */}
          <p className="text-center text-[13px] font-serif text-[#26382C] mt-2">
            ¿Cómo quieres registrarte?
          </p>

          <div className="flex justify-center gap-16 mt-2">

            {/* COMPRADOR */}
            <label className="flex flex-col items-center cursor-pointer">

              <span className="text-[13px] font-serif text-[#26382C]">
                Comprador
              </span>

              <input
                type="radio"
                name="tipoUsuario"
                value="Comprador"
                checked={tipoUsuario === "Comprador"}
                onChange={(e) => setTipoUsuario(e.target.value)}
                className="mt-1 w-4 h-4 accent-[#607A64]"
              />

            </label>

            {/* VENDEDOR */}
            <label className="flex flex-col items-center cursor-pointer">

              <span className="text-[13px] font-serif text-[#26382C]">
                Vendedor
              </span>

              <input
                type="radio"
                name="tipoUsuario"
                value="Vendedor"
                checked={tipoUsuario === "Vendedor"}
                onChange={(e) => setTipoUsuario(e.target.value)}
                className="mt-1 w-4 h-4 accent-[#607A64]"
              />

            </label>

          </div>

          {/* BOTÓN CREAR CUENTA */}
          <div className="flex justify-center mt-5">

            <button
              type="submit"
              className="bg-[#607A64] hover:bg-[#506653] text-[#FAF9F4] rounded-md px-8 py-2 font-serif text-[13px] transition-colors"
            >
              Crear cuenta
            </button>

          </div>

          {/* MENSAJE */}
          {mensaje && (
            <p className="mt-3 text-center text-[12px] font-serif text-[#26382C]">
              {mensaje}
            </p>
          )}

        </form>

        {/* VOLVER AL LOGIN */}
        <div className="flex justify-center items-center gap-2 mt-4 text-[12px] font-serif">

          <span className="text-[#26382C]">
            ¿Ya tienes una cuenta?
          </span>

          <Link
            href="/login"
            className="text-[#496A50] hover:text-[#304A36]"
          >
            Iniciar sesión
          </Link>

        </div>

      </div>

    </main>
  );
}
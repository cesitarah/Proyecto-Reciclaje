"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type Oferta = {
  id_oferta: number;
  cantidad_disponible: string | number;
  ubicacion: string;
  estado: string;
  material: {
    nombre: string;
    precio_por_kg: string | number;
  };
};

export default function VendedorPublicarOfertas() {
  const searchParams = useSearchParams();

  const materialSeleccionado =
    searchParams.get("material") || "Plástico";

  const [cantidad, setCantidad] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [precio, setPrecio] = useState("Cargando...");

  /* ==========================================
     CARGAR PRECIO DEL MATERIAL
  ========================================== */
  const cargarPrecio = async () => {
    try {
      const response = await fetch(
        `/api/materiales?nombre=${encodeURIComponent(
          materialSeleccionado
        )}`
      );

      const data = await response.json();

      if (!response.ok) {
        setPrecio("No disponible");
        return;
      }

      setPrecio(`Bs ${data.precio_por_kg}`);

    } catch (error) {
      console.error(error);
      setPrecio("No disponible");
    }
  };

  /* ==========================================
     CARGAR MIS OFERTAS
  ========================================== */
  const cargarOfertas = async () => {
    try {
      /*
        No enviamos material aquí.
        La API reconoce que somos vendedores
        y devuelve únicamente nuestras ofertas.
      */
      const response = await fetch("/api/ofertas");

      const data = await response.json();

      if (!response.ok) {
        setMensaje(
          data.error || "No se pudieron cargar las ofertas."
        );
        return;
      }

      setOfertas(data);

    } catch (error) {
      console.error(error);
      setMensaje("Error de conexión.");
    }
  };

  /* ==========================================
     CARGAR DATOS INICIALES
  ========================================== */
  useEffect(() => {
    cargarPrecio();
    cargarOfertas();
  }, [materialSeleccionado]);

  /* ==========================================
     PUBLICAR OFERTA
  ========================================== */
  const publicarOferta = async () => {
    setMensaje("");

    if (!cantidad || !ubicacion) {
      setMensaje("Completa la cantidad y la ubicación.");
      return;
    }

    try {
      const response = await fetch("/api/ofertas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cantidad,
          ubicacion,
          nombreMaterial: materialSeleccionado,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMensaje(
          data.error || "Error al publicar la oferta."
        );
        return;
      }

      setMensaje("¡Oferta publicada correctamente!");

      setCantidad("");
      setUbicacion("");

      /* Actualizar la tabla inmediatamente */
      cargarOfertas();

    } catch (error) {
      console.error(error);
      setMensaje("Error de conexión.");
    }
  };

  return (
    <main className="min-h-screen bg-[#F3F1E8] px-4 py-8 text-[#26382C] md:px-8">

      <div className="mx-auto max-w-5xl">

        {/* ENCABEZADO */}
        <section className="overflow-hidden rounded-2xl border border-[#6D756D] bg-white shadow-lg">

          <div className="bg-[#3D4641] px-6 py-3">

            <h1 className="text-xl font-bold tracking-wider text-[#F5F3EC]">
              VENDEDOR
            </h1>

          </div>

          {/* BANNER */}
          <div className="relative flex h-40 w-full items-center justify-center overflow-hidden px-6 text-center text-white shadow-inner">

            <Image
              src="/reciclaje-banner.jpg"
              alt="Imagen de reciclaje"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-[#40534A]/65"></div>

            <div className="relative z-10 space-y-1">

              <span className="block text-2xl font-black tracking-widest text-[#F5F3EC] drop-shadow">
                RECYCLE
              </span>

              <p className="text-xs font-medium text-[#DDE3D9]">
                Plataforma de gestión de residuos y materiales
              </p>

            </div>

          </div>

        </section>

        {/* PUBLICAR NUEVO LOTE */}
        <section className="mt-8 rounded-2xl border border-[#6D756D] bg-[#A8B39F] p-6 shadow-lg md:p-8">

          <h2 className="mb-6 text-xl font-bold text-[#26382C]">
            PUBLICAR NUEVO LOTE
          </h2>

          <div className="space-y-6">

            {/* FILA 1 */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              {/* MATERIAL */}
              <div>

                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                  Material
                </label>

                <input
                  type="text"
                  value={materialSeleccionado}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-[#6D756D] bg-[#DDE3D9] px-4 py-2.5 text-sm font-medium text-[#40534A] outline-none"
                />

                <p className="mt-1.5 text-xs text-[#40534A]">
                  Material seleccionado automáticamente.
                </p>

              </div>

              {/* CANTIDAD */}
              <div>

                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                  Cantidad disponible (kg)
                </label>

                <input
                  type="number"
                  min="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  placeholder="Ej. 15"
                  className="w-full rounded-xl border border-[#6D756D] bg-[#30262D] px-4 py-2.5 text-sm text-[#F5F3EC] outline-none transition placeholder-[#D6D0D3] focus:border-[#6F806C] focus:ring-2 focus:ring-[#6F806C]"
                />

              </div>

              {/* UBICACIÓN */}
              <div>

                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                  Ubicación
                </label>

                <input
                  type="text"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  placeholder="Ej. Santa Cruz"
                  className="w-full rounded-xl border border-[#6D756D] bg-[#30262D] px-4 py-2.5 text-sm text-[#F5F3EC] outline-none transition placeholder-[#D6D0D3] focus:border-[#6F806C] focus:ring-2 focus:ring-[#6F806C]"
                />

              </div>

            </div>

            {/* FILA 2 */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              {/* PRECIO */}
              <div>

                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                  Precio establecido ($/kg)
                </label>

                <input
                  type="text"
                  value={precio}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-[#6D756D] bg-[#DDE3D9] px-4 py-2.5 text-sm font-medium text-[#40534A] outline-none"
                />

                <p className="mt-1.5 text-xs text-[#40534A]">
                  Precio establecido por el administrador.
                </p>

              </div>

            </div>

            {/* BOTÓN PUBLICAR */}
            <div className="flex justify-center pt-2">

              <button
                type="button"
                onClick={publicarOferta}
                className="rounded-full bg-[#6F806C] px-10 py-2.5 font-semibold text-white shadow-sm transition hover:bg-[#81937D] active:scale-95"
              >
                Publicar
              </button>

            </div>

            {/* MENSAJE */}
            {mensaje && (
              <p className="text-center text-sm font-semibold text-[#40534A]">
                {mensaje}
              </p>
            )}

          </div>
        </section>

        {/* MIS OFERTAS ACTUALES */}
        <section className="mt-8 rounded-2xl border border-[#6D756D] bg-white p-6 shadow-lg md:p-8">

          <h2 className="mb-6 text-center text-xl font-bold text-[#26382C]">
            MIS OFERTAS ACTUALES
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px] text-left text-sm">

              <thead>

                <tr className="border-b border-[#D0D4CF] text-xs font-semibold uppercase tracking-wider text-[#40534A]">

                  <th className="px-4 py-3">
                    #
                  </th>

                  <th className="px-4 py-3">
                    Material
                  </th>

                  <th className="px-4 py-3">
                    Cantidad
                  </th>

                  <th className="px-4 py-3">
                    Ubicación
                  </th>

                  <th className="px-4 py-3">
                    Status
                  </th>

                  <th className="px-4 py-3">
                    Acción
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-[#E2E4E0]">

                {ofertas.length === 0 ? (

                  <tr>

                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-sm text-[#6D756D]"
                    >
                      Todavía no tienes ofertas publicadas.
                    </td>

                  </tr>

                ) : (

                  ofertas.map((oferta, index) => (

                    <tr
                      key={oferta.id_oferta}
                      className={
                        index === 0
                          ? "bg-[#DDE3D9] font-medium text-[#26382C]"
                          : "transition hover:bg-[#F3F1E8]"
                      }
                    >

                      <td className="px-4 py-4 font-bold text-[#40534A]">
                        {String(index + 1).padStart(2, "0")}
                      </td>

                      <td className="px-4 py-4 font-semibold text-[#26382C]">
                        {oferta.material.nombre}
                      </td>

                      <td className="px-4 py-4">
                        {String(oferta.cantidad_disponible)} kg
                      </td>

                      <td className="px-4 py-4">
                        {oferta.ubicacion}
                      </td>

                      <td className="px-4 py-4">

                        <span className="inline-flex items-center rounded-full bg-[#B8D4D8] px-3 py-1 text-xs font-bold text-[#26382C]">
                          {oferta.estado}
                        </span>

                      </td>

                      <td className="px-4 py-4">

                        {oferta.estado === "Solicitada" ? (

                          <Link
                            href="/gestion-solicitud"
                            className="inline-flex items-center rounded-lg border border-[#D4C8CC] bg-[#F0E7E9] px-3 py-1.5 text-xs font-semibold text-[#6B555E] transition hover:bg-[#E7DDE0]"
                          >
                            Ver solicitud
                          </Link>

                        ) : (

                          <span className="text-xs text-[#6D756D]">
                            Sin solicitudes
                          </span>

                        )}

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>
        </section>

      </div>
    </main>
  );
}
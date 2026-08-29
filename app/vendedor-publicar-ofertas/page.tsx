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

type SolicitudRecibida = {
  id_solicitud: number;
  id_oferta: number;
  cantidad_solicitada: number;
  estado: string;
  oferta: {
    material: {
      nombre: string;
    };
  };
  comprador: {
    nombre: string;
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
  const [solicitudes, setSolicitudes] = useState<SolicitudRecibida[]>([]);
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
     CARGAR SOLICITUDES RECIBIDAS
  ========================================== */
  const cargarSolicitudes = async () => {
    try {
      const response = await fetch("/api/solicitudes?vendedor=me");
      const data = await response.json();

      if (!response.ok) {
        return;
      }

      setSolicitudes(data);
    } catch (error) {
      console.error(error);
    }
  };

  /* ==========================================
     CARGAR MIS OFERTAS
  ========================================== */
  const cargarOfertas = async () => {
    try {
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
    cargarSolicitudes();
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

      cargarOfertas();
      cargarSolicitudes();
    } catch (error) {
      console.error(error);
      setMensaje("Error de conexión.");
    }
  };

  return (
    <main className="min-h-screen bg-[#CFEFF5] px-4 py-5 text-[#1F1F1F] md:px-8">

      <div className="mx-auto max-w-5xl">

        {/* ===================================================== */}
        {/* ENCABEZADO */}
        {/* ===================================================== */}

        <section className="overflow-hidden rounded-xl border border-[#A8D5BA] bg-[#E8F5EC] shadow-md">

          {/* TITULO VENDEDOR + CASITA */}

          <div className="flex items-center justify-between bg-[#C3F4D4] px-5 py-3">

            <h1 className="text-base font-bold tracking-wide text-[#1F1F1F]">
              VENDEDOR
            </h1>

            {/* ================= CASITA ================= */}

            <Link
              href="/principal"
              title="Volver a principal"
              className="
                group
                relative
                flex
                h-8
                w-8
                items-center
                justify-center
                overflow-hidden
                rounded-full
                bg-[#F7DD7A]
                text-[#6D5A12]
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#F4D35E]
                hover:shadow-[0_0_12px_rgba(244,211,94,0.9)]
                active:scale-95
              "
            >

              {/* DESTELLO */}

              <span
                className="
                  absolute
                  inset-0
                  -translate-x-full
                  bg-gradient-to-r
                  from-transparent
                  via-white/70
                  to-transparent
                  transition-transform
                  duration-700
                  group-hover:translate-x-full
                "
              ></span>

              {/* ICONO */}

              <i
                className="
                  fa-solid
                  fa-house
                  relative
                  z-10
                  text-xs
                  transition-all
                  duration-300
                  group-hover:scale-110
                  group-hover:rotate-3
                "
              ></i>

            </Link>

          </div>


          {/* ================================================= */}
          {/* BANNER */}
          {/* ================================================= */}

          <div className="relative flex h-40 w-full items-center justify-center overflow-hidden px-6 text-center text-white shadow-inner">

            <Image
              src="/reciclaje-banner.jpg"
              alt="Imagen de reciclaje"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-[#39734A]/35"></div>

            <div className="relative z-10 space-y-1">

              <span className="block text-2xl font-black tracking-widest text-white drop-shadow">
                NUEVA VIDA
              </span>

              <p className="text-xs font-medium text-white">
                Plataforma de gestión de residuos y materiales
              </p>

            </div>

          </div>

        </section>


        {/* ===================================================== */}
        {/* PUBLICAR NUEVO LOTE */}
        {/* ===================================================== */}

        <section className="mt-6 rounded-xl border border-[#A8D5BA] bg-[#E8F5EC] p-6 shadow-md md:p-8">

          <h2 className="mb-6 text-xl font-bold text-[#1F1F1F]">
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
                  className="
                    w-full
                    cursor-not-allowed
                    rounded-xl
                    border
                    border-[#A8D5BA]
                    bg-[#CFEFF5]
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    text-[#1F1F1F]
                    outline-none
                  "
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
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#A8D5BA]
                    bg-white
                    px-4
                    py-2.5
                    text-sm
                    text-[#1F1F1F]
                    outline-none
                    transition
                    placeholder-[#789083]
                    focus:border-[#6FAF7B]
                    focus:ring-2
                    focus:ring-[#A8D5BA]
                  "
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
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#A8D5BA]
                    bg-white
                    px-4
                    py-2.5
                    text-sm
                    text-[#1F1F1F]
                    outline-none
                    transition
                    placeholder-[#789083]
                    focus:border-[#6FAF7B]
                    focus:ring-2
                    focus:ring-[#A8D5BA]
                  "
                />

              </div>

            </div>


            {/* FILA 2 */}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              {/* PRECIO */}

              <div>

                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                  Precio establecido (Bs/kg)
                </label>

                <input
                  type="text"
                  value={precio}
                  readOnly
                  className="
                    w-full
                    cursor-not-allowed
                    rounded-xl
                    border
                    border-[#A8D5BA]
                    bg-[#CFEFF5]
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    text-[#1F1F1F]
                    outline-none
                  "
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
                className="
                  rounded-full
                  bg-[#6FAF7B]
                  px-10
                  py-2.5
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-[#5F9E6B]
                  hover:scale-105
                  active:scale-95
                "
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


        {/* ===================================================== */}
        {/* MIS OFERTAS ACTUALES */}
        {/* ===================================================== */}

        <section className="mt-6 rounded-xl border border-[#A8D5BA] bg-white p-6 shadow-md md:p-8">

          <h2 className="mb-6 text-center text-xl font-bold text-[#1F1F1F]">
            MIS OFERTAS ACTUALES
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px] text-left text-sm">

              <thead>

                <tr className="border-b border-[#A8D5BA] text-xs font-semibold uppercase tracking-wider text-[#40534A]">

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

              <tbody className="divide-y divide-[#DDF4F7]">

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
                          ? "bg-[#E8F5EC] font-medium text-[#1F1F1F]"
                          : "transition hover:bg-[#F3FBFC]"
                      }
                    >

                      <td className="px-4 py-4 font-bold text-[#39734A]">
                        {String(index + 1).padStart(2, "0")}
                      </td>

                      <td className="px-4 py-4 font-semibold text-[#1F1F1F]">
                        {oferta.material.nombre}
                      </td>

                      <td className="px-4 py-4 text-[#40534A]">
                        {String(oferta.cantidad_disponible)} kg
                      </td>

                      <td className="px-4 py-4 text-[#40534A]">
                        {oferta.ubicacion}
                      </td>

                      <td className="px-4 py-4">

                        <span className="inline-flex items-center rounded-full bg-[#B8D4D8] px-3 py-1 text-xs font-bold text-[#26382C]">
                          {oferta.estado}
                        </span>

                      </td>

                      <td className="px-4 py-4">

                        {solicitudes.some(
                          (s) =>
                            s.id_oferta === oferta.id_oferta &&
                            s.estado !== "Entrega confirmada" &&
                            s.estado !== "Rechazada"
                        ) ? (

                          <Link
                            href={`/gestion-solicitud?id_solicitud=${
                              solicitudes.find(
                                (s) => s.id_oferta === oferta.id_oferta
                              )?.id_solicitud ?? ""
                            }`}
                            className="
                              inline-flex
                              items-center
                              rounded-lg
                              border
                              border-[#D4C8CC]
                              bg-[#F0E7E9]
                              px-3
                              py-1.5
                              text-xs
                              font-semibold
                              text-[#6B555E]
                              transition
                              hover:bg-[#E7DDE0]
                            "
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


        {/* ===================================================== */}
        {/* SOLICITUDES RECIBIDAS */}
        {/* ===================================================== */}

        <section className="mt-6 rounded-xl border border-[#A8D5BA] bg-white p-6 shadow-md md:p-8">

          <h2 className="mb-6 text-center text-xl font-bold text-[#1F1F1F]">
            SOLICITUDES RECIBIDAS
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px] text-left text-sm">

              <thead>
                <tr className="border-b border-[#A8D5BA] text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                  <th className="px-4 py-3">Material</th>
                  <th className="px-4 py-3">Cantidad</th>
                  <th className="px-4 py-3">Comprador</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Acción</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#DDF4F7]">

                {solicitudes.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-sm text-[#6D756D]"
                    >
                      Todavía no tienes solicitudes recibidas.
                    </td>
                  </tr>
                ) : (
                  solicitudes.map((solicitud) => (
                    <tr key={solicitud.id_solicitud} className="transition hover:bg-[#F3FBFC]">
                      <td className="px-4 py-4 font-semibold text-[#1F1F1F]">
                        {solicitud.oferta.material.nombre}
                      </td>
                      <td className="px-4 py-4 text-[#40534A]">
                        {solicitud.cantidad_solicitada} kg
                      </td>
                      <td className="px-4 py-4 text-[#40534A]">
                        {solicitud.comprador.nombre}
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center rounded-full bg-[#F7DD7A] px-3 py-1 text-xs font-bold text-[#6D5A12]">
                          {solicitud.estado}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <Link
                          href={`/gestion-solicitud?id_solicitud=${solicitud.id_solicitud}`}
                          className="
                            inline-flex
                            items-center
                            rounded-lg
                            border
                            border-[#D4C8CC]
                            bg-[#F0E7E9]
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            text-[#6B555E]
                            transition
                            hover:bg-[#E7DDE0]
                          "
                        >
                          Gestionar
                        </Link>
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
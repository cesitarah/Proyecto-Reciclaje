"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageContainer from "../components/PageContainer";
import { useSearchParams } from "next/navigation";
import type { getOfertasComprador } from "@/lib/data/vendedor";

type CompradorBuscarClientProps = {
  materialInicial: string;
  cantidadInicial: string;
  initialOfertas: Awaited<ReturnType<typeof getOfertasComprador>>;
};

type Oferta = CompradorBuscarClientProps["initialOfertas"][number];

export default function CompradorBuscarClient({
  materialInicial,
  cantidadInicial,
  initialOfertas,
}: CompradorBuscarClientProps) {
  const searchParams = useSearchParams();

  const materialSeleccionado =
    searchParams.get("material") || materialInicial;

  const [cantidad, setCantidad] = useState(
    () => searchParams.get("cantidad") || cantidadInicial
  );
  const [ofertas, setOfertas] = useState<Oferta[]>(initialOfertas);
  const [mensaje, setMensaje] = useState("");
  const omitirPrimeraBusqueda = useRef(true);

  const buscarOfertas = async () => {
    setMensaje("");

    try {
      let url = `/api/ofertas?material=${encodeURIComponent(
        materialSeleccionado
      )}`;

      if (cantidad) {
        url += `&cantidad=${encodeURIComponent(cantidad)}`;
      }

      const response = await fetch(url);
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

  useEffect(() => {
    setCantidad(searchParams.get("cantidad") || "");
  }, [searchParams]);

  useEffect(() => {
    if (omitirPrimeraBusqueda.current) {
      omitirPrimeraBusqueda.current = false;
      return;
    }

    buscarOfertas();
  }, [materialSeleccionado, cantidad]);

  return (
    <main className="min-h-screen bg-nv-page px-4 py-5 text-[#1F1F1F] md:px-8 lg:px-10 xl:px-12 2xl:px-16">

      <PageContainer>

        {/* ===================================================== */}
        {/* ENCABEZADO */}
        {/* ===================================================== */}

        <section className="overflow-hidden rounded-xl border border-[#A8D5BA] bg-[#E8F5EC] shadow-md">

          {/* ================================================= */}
          {/* TITULO COMPRADOR + CASITA */}
          {/* ================================================= */}

          <div className="flex items-center justify-between bg-[#C3F4D4] px-5 py-3">

            <h1 className="text-base font-bold tracking-wide text-[#1F1F1F]">
              COMPRADOR
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

          <div className="relative h-40 overflow-hidden md:h-48">

            <Image
              src="/reciclaje-banner.jpg"
              alt="Imagen de reciclaje"
              fill
              className="object-cover"
            />

            {/* CAPA VERDE SUAVE */}

            <div className="absolute inset-0 bg-[#39734A]/35"></div>

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">

              <h2 className="text-2xl font-black tracking-[0.15em] text-white drop-shadow-md md:text-4xl">
                NUEVA VIDA
              </h2>

              <p className="mt-2 max-w-lg text-xs font-medium text-white md:text-sm">
                Encuentra materiales reciclables disponibles
              </p>

            </div>

          </div>

        </section>


        {/* ===================================================== */}
        {/* BUSCAR OFERTAS */}
        {/* ===================================================== */}

        <section className="mt-6 rounded-xl border border-[#A8D5BA] bg-[#E8F5EC] p-6 shadow-md md:p-8">

          <h2 className="mb-6 text-xl font-bold text-[#1F1F1F]">
            BUSCAR OFERTAS
          </h2>


          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              buscarOfertas();
            }}
          >

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

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
                  Material seleccionado desde el panel principal.
                </p>

              </div>


              {/* CANTIDAD */}

              <div>

                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                  Cantidad que necesita (kg)
                </label>

                <input
                  type="number"
                  min="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  placeholder="Ej. 10"
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


            {/* BOTÓN BUSCAR */}

            <div className="flex justify-center pt-2">

              <button
                type="submit"
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
                Buscar
              </button>

            </div>


            {/* MENSAJE */}

            {mensaje && (
              <p className="text-center text-sm font-semibold text-[#40534A]">
                {mensaje}
              </p>
            )}

          </form>

        </section>


        {/* ===================================================== */}
        {/* OFERTAS DISPONIBLES */}
        {/* ===================================================== */}

        <section className="mt-6 rounded-xl border border-[#A8D5BA] bg-white p-6 shadow-md md:p-8">

          <h2 className="mb-2 text-center text-xl font-bold text-[#1F1F1F] md:mb-6">
            OFERTAS DISPONIBLES
          </h2>

          <p className="mb-4 text-center text-xs text-[#6D756D] md:hidden">
            Desliza horizontalmente para ver todas las columnas →
          </p>

          <div className="overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">

            <table className="w-full min-w-[750px] text-left text-sm">

              <thead>

                <tr className="border-b border-[#A8D5BA] text-xs font-semibold uppercase tracking-wider text-[#40534A]">

                  <th className="px-4 py-3">
                    #
                  </th>

                  <th className="px-4 py-3">
                    Material
                  </th>

                  <th className="px-4 py-3">
                    Cantidad disponible
                  </th>

                  <th className="px-4 py-3">
                    Ubicación
                  </th>

                  <th className="px-4 py-3">
                    Vendedor
                  </th>

                  <th className="px-4 py-3 text-right">
                    Acción
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-[#DDF4F7]">

                {ofertas.length === 0 ? (

                  <tr>

                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-sm text-[#6D756D]"
                    >
                      No hay ofertas disponibles para este material y cantidad.
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

                      <td className="px-4 py-4 text-[#40534A]">
                        {oferta.vendedor.nombre}
                      </td>

                      <td className="px-4 py-4 text-right">

                        <Link
                          href={`/comprador-solicitar-oferta?id_oferta=${oferta.id_oferta}&material=${encodeURIComponent(materialSeleccionado)}${cantidad ? `&cantidad=${encodeURIComponent(cantidad)}` : ""}`}
                          className="
                            inline-block
                            rounded-lg
                            bg-[#6FAF7B]
                            px-4
                            py-1.5
                            text-xs
                            font-semibold
                            text-white
                            transition
                            hover:bg-[#5F9E6B]
                            hover:scale-105
                            active:scale-95
                          "
                        >
                          Solicitar
                        </Link>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </section>

      </PageContainer>

    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Oferta = {
  id_oferta: number;
  cantidad_disponible: string | number;
  ubicacion: string;
  estado: string;
  material: {
    nombre: string;
    precio_por_kg: string | number;
  };
  vendedor: {
    nombre: string;
  };
};

export default function CompradorBuscarOfertas() {
  const searchParams = useSearchParams();

  const materialSeleccionado =
    searchParams.get("material") || "Plástico";

  const [cantidad, setCantidad] = useState("");
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [mensaje, setMensaje] = useState("");

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
        setMensaje(data.error || "No se pudieron cargar las ofertas.");
        return;
      }

      setOfertas(data);

    } catch (error) {
      console.error(error);
      setMensaje("Error de conexión.");
    }
  };

  useEffect(() => {
    buscarOfertas();
  }, [materialSeleccionado]);

  return (
    <main className="min-h-screen bg-[#F3F1E8] px-4 py-8 text-[#26382C] md:px-8">

      <div className="mx-auto max-w-5xl">

        {/* ENCABEZADO */}
        <section className="overflow-hidden rounded-2xl border border-[#6D756D] bg-white shadow-lg">

          <div className="bg-[#3D4641] px-6 py-3">

            <h1 className="text-xl font-bold tracking-wider text-[#F5F3EC]">
              COMPRADOR
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
                NUEVA VIDA
              </span>

              <p className="text-xs font-medium text-[#DDE3D9]">
                Encuentra materiales reciclables disponibles
              </p>

            </div>

          </div>

        </section>

        {/* BUSCAR OFERTAS */}
        <section className="mt-8 rounded-2xl border border-[#6D756D] bg-[#A8B39F] p-6 shadow-lg md:p-8">

          <h2 className="mb-6 text-xl font-bold text-[#26382C]">
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
                  className="w-full cursor-not-allowed rounded-xl border border-[#6D756D] bg-[#DDE3D9] px-4 py-2.5 text-sm font-medium text-[#40534A] outline-none"
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
                  className="w-full rounded-xl border border-[#6D756D] bg-[#30262D] px-4 py-2.5 text-sm text-[#F5F3EC] outline-none transition placeholder-[#D6D0D3] focus:border-[#6F806C] focus:ring-2 focus:ring-[#6F806C]"
                />

              </div>

            </div>

            {/* BOTÓN BUSCAR */}
            <div className="flex justify-center pt-2">

              <button
                type="submit"
                className="rounded-full bg-[#6F806C] px-10 py-2.5 font-semibold text-white shadow-sm transition hover:bg-[#81937D] active:scale-95"
              >
                Buscar
              </button>

            </div>

            {mensaje && (
              <p className="text-center text-sm font-semibold text-[#40534A]">
                {mensaje}
              </p>
            )}

          </form>

        </section>

        {/* OFERTAS DISPONIBLES */}
        <section className="mt-8 rounded-2xl border border-[#6D756D] bg-white p-6 shadow-lg md:p-8">

          <h2 className="mb-6 text-center text-xl font-bold text-[#26382C]">
            OFERTAS DISPONIBLES
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[750px] text-left text-sm">

              <thead>

                <tr className="border-b border-[#D0D4CF] text-xs font-semibold uppercase tracking-wider text-[#40534A]">

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

              <tbody className="divide-y divide-[#E2E4E0]">

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
                        {oferta.vendedor.nombre}
                      </td>

                      <td className="px-4 py-4 text-right">

                        <Link
                          href={`/comprador-solicitar-oferta?id_oferta=${oferta.id_oferta}`}
                          className="inline-block rounded-lg bg-[#6F806C] px-4 py-1.5 text-xs font-medium text-white transition hover:bg-[#81937D] active:scale-95"
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

      </div>
    </main>
  );
}
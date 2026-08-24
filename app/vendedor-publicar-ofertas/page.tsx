
"use client";

import Image from "next/image";
import Link from "next/link";

export default function VendedorPublicarOfertas() {
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

          {/* BANNER DE RECICLAJE */}
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

          <form className="space-y-6">

            {/* FILA 1 */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              {/* MATERIAL SELECCIONADO AUTOMÁTICAMENTE */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                  Material
                </label>

                <input
                  type="text"
                  value="Plástico PET"
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
                  placeholder="Ej. Santa Cruz"
                  className="w-full rounded-xl border border-[#6D756D] bg-[#30262D] px-4 py-2.5 text-sm text-[#F5F3EC] outline-none transition placeholder-[#D6D0D3] focus:border-[#6F806C] focus:ring-2 focus:ring-[#6F806C]"
                />
              </div>

            </div>

            {/* FILA 2 */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              {/* PRECIO AUTOMÁTICO */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                  Precio establecido ($/kg)
                </label>

                <input
                  type="number"
                  value="5.50"
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
                className="rounded-full bg-[#6F806C] px-10 py-2.5 font-semibold text-white shadow-sm transition hover:bg-[#81937D] active:scale-95"
              >
                Publicar
              </button>

            </div>

          </form>
        </section>

        {/* MIS OFERTAS ACTUALES */}
        <section className="mt-8 rounded-2xl border border-[#6D756D] bg-white p-6 shadow-lg md:p-8">

          <h2 className="mb-6 text-center text-xl font-bold text-[#26382C]">
            MIS OFERTAS ACTUALES
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[650px] text-left text-sm">

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

                </tr>
              </thead>

              <tbody className="divide-y divide-[#E2E4E0]">

                {/* OFERTA 1 */}
                <tr className="bg-[#DDE3D9] font-medium text-[#26382C]">

                  <td className="px-4 py-4 font-bold text-[#40534A]">
                    01
                  </td>

                  <td className="px-4 py-4 font-semibold text-[#26382C]">
                    Plástico PET
                  </td>

                  <td className="px-4 py-4">
                    15 kg
                  </td>

                  <td className="px-4 py-4">
                    Santa Cruz
                  </td>

                  <td className="px-4 py-4">

                    <span className="inline-flex items-center rounded-full bg-[#B8D4D8] px-3 py-1 text-xs font-bold text-[#26382C]">
                      Disponible
                    </span>

                  </td>

                </tr>

                {/* OFERTA 2 - SOLICITADA */}
                <tr className="transition hover:bg-[#F3F1E8]">

                  <td className="px-4 py-4 text-[#6D756D]">
                    02
                  </td>

                  <td className="px-4 py-4 font-medium text-[#40534A]">
                    Cartón
                  </td>

                  <td className="px-4 py-4 text-[#6D756D]">
                    10 kg
                  </td>

                  <td className="px-4 py-4 text-[#6D756D]">
                    Santa Cruz
                  </td>

                  <td className="px-4 py-4">

                    <Link
                      href="/gestion-solicitud"
                      className="inline-flex items-center rounded-full border border-[#D4C8CC] bg-[#F0E7E9] px-3 py-1 text-xs font-semibold text-[#6B555E] transition hover:bg-[#E7DDE0]"
                    >
                      Solicitada
                    </Link>

                  </td>

                </tr>

                {/* OFERTA 3 */}
                <tr className="transition hover:bg-[#F3F1E8]">

                  <td className="px-4 py-4 text-[#6D756D]">
                    03
                  </td>

                  <td className="px-4 py-4 font-medium text-[#40534A]">
                    Vidrio
                  </td>

                  <td className="px-4 py-4 text-[#6D756D]">
                    20 kg
                  </td>

                  <td className="px-4 py-4 text-[#6D756D]">
                    Santa Cruz
                  </td>

                  <td className="px-4 py-4">

                    <span className="inline-flex items-center rounded-full bg-[#E6E8E4] px-3 py-1 text-xs font-semibold text-[#6D756D]">
                      Agotada
                    </span>

                  </td>

                </tr>

              </tbody>
            </table>
          </div>
        </section>

      </div>
    </main>
  );
}



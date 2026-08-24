
"use client";

import Link from "next/link";

export default function CompradorSolicitarOferta() {
  return (
    <main className="min-h-screen bg-[#F3F1E8] px-4 py-8 text-[#26382C] md:px-8">
      <div className="mx-auto max-w-2xl">

        {/* BOTÓN CANCELAR / VOLVER */}
        <div className="mb-6">
          <Link
            href="/comprador-buscar-ofertas"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#6F806C] transition hover:text-[#40534A]"
          >
            ← Cancelar y volver
          </Link>
        </div>

        {/* CONTENEDOR PRINCIPAL */}
        <section className="overflow-hidden rounded-2xl border border-[#6D756D] bg-white shadow-lg">

          {/* ENCABEZADO */}
          <div className="bg-[#3D4641] px-6 py-4">
            <h1 className="text-xl font-bold tracking-wider text-[#F5F3EC]">
              COMPRADOR
            </h1>
          </div>

          <div className="space-y-6 p-6 md:p-8">

            {/* TITULO */}
            <div>
              <h2 className="text-2xl font-bold text-[#26382C]">
                CONFIRMAR SOLICITUD
              </h2>

              <p className="mt-2 text-sm text-[#6D756D]">
                Revisa la oferta seleccionada e indica la cantidad que deseas comprar.
              </p>
            </div>

            {/* RESUMEN DE LA OFERTA */}
            <div className="space-y-2">

              <label className="block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                Resumen de la oferta
              </label>

              <div className="space-y-3 rounded-xl border border-[#D0D4CF] bg-[#F3F1E8] p-5">

                <div className="flex justify-between border-b border-[#D0D4CF] pb-3">
                  <span className="font-medium text-[#6D756D]">
                    Material:
                  </span>

                  <span className="font-bold text-[#26382C]">
                    Plástico PET
                  </span>
                </div>

                <div className="flex justify-between border-b border-[#D0D4CF] pb-3">
                  <span className="font-medium text-[#6D756D]">
                    Cantidad disponible:
                  </span>

                  <span className="font-semibold text-[#26382C]">
                    25 kg
                  </span>
                </div>

                <div className="flex justify-between border-b border-[#D0D4CF] pb-3">
                  <span className="font-medium text-[#6D756D]">
                    Ubicación:
                  </span>

                  <span className="font-semibold text-[#26382C]">
                    Santa Cruz
                  </span>
                </div>

                <div className="flex justify-between pt-1">
                  <span className="font-medium text-[#6D756D]">
                    Precio establecido:
                  </span>

                  <span className="font-bold text-[#6F806C]">
                    $ 5.50 / kg
                  </span>
                </div>

              </div>

              <p className="text-xs text-[#6D756D]">
                La información de la oferta se carga automáticamente y no puede ser modificada.
              </p>

            </div>

            {/* CANTIDAD SOLICITADA */}
            <div className="space-y-2">

              <label className="block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                Cantidad solicitada (kg)
              </label>

              <input
                type="number"
                min="1"
                max="25"
                placeholder="Ej. 10"
                className="w-full rounded-xl border border-[#6D756D] bg-[#30262D] px-4 py-3 text-sm text-[#F5F3EC] outline-none transition placeholder-[#D6D0D3] focus:border-[#6F806C] focus:ring-2 focus:ring-[#6F806C]"
              />

              <p className="text-xs text-[#6D756D]">
                Puedes solicitar hasta 25 kg, que corresponde a la cantidad disponible de esta oferta.
              </p>

            </div>

            {/* BOTONES */}
            <div className="flex flex-col gap-3 border-t border-[#E2E4E0] pt-6 sm:flex-row sm:justify-center">

              {/* CANCELAR */}
              <Link
                href="/comprador-buscar-ofertas"
                className="rounded-full border border-[#6D756D] bg-white px-8 py-3 text-center text-sm font-semibold text-[#40534A] transition hover:bg-[#F3F1E8]"
              >
                Cancelar
              </Link>

              {/* CONFIRMAR SOLICITUD */}
              <button
                type="button"
                className="rounded-full bg-[#6F806C] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#81937D] active:scale-95"
              >
                Confirmar solicitud
              </button>

            </div>

          </div>
        </section>

      </div>
    </main>
  );
}

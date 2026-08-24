
"use client";

import Link from "next/link";

export default function GestionSolicitudPage() {
  return (
    <main className="min-h-screen bg-[#F3F1E8] px-4 py-8 text-[#26382C] md:px-8">
      <div className="mx-auto max-w-2xl">

        {/* BOTÓN VOLVER */}
        <div className="mb-6">
          <Link
            href="/vendedor-publicar-ofertas"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#6F806C] transition hover:text-[#40534A]"
          >
            ← Volver a mis ofertas
          </Link>
        </div>

        {/* CONTENEDOR PRINCIPAL */}
        <section className="overflow-hidden rounded-2xl border border-[#6D756D] bg-white shadow-lg">

          {/* ENCABEZADO */}
          <div className="bg-[#3D4641] px-6 py-4">
            <h1 className="text-xl font-bold tracking-wider text-[#F5F3EC]">
              VENDEDOR
            </h1>
          </div>

          <div className="space-y-6 p-6 md:p-8">

            {/* RESUMEN DEL PEDIDO */}
            <div className="space-y-2">

              <label className="block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                Resumen del pedido
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
                    Cantidad solicitada:
                  </span>

                  <span className="font-semibold text-[#26382C]">
                    13 kg
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

                <div className="flex justify-between border-b border-[#D0D4CF] pb-3">
                  <span className="font-medium text-[#6D756D]">
                    Comprador:
                  </span>

                  <span className="font-semibold text-[#26382C]">
                    Juan Pérez
                  </span>
                </div>

                <div className="flex justify-between pt-1">
                  <span className="font-medium text-[#6D756D]">
                    Total estimado:
                  </span>

                  <span className="font-bold text-[#6F806C]">
                    $ 71.50
                  </span>
                </div>

              </div>

              <p className="text-xs text-[#6D756D]">
                Estos datos serán cargados automáticamente desde la solicitud realizada por el comprador.
              </p>

            </div>

            {/* DESCRIPCIÓN / INDICACIONES */}
            <div className="space-y-2">

              <label className="block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                Indicaciones de entrega
              </label>

              <textarea
                rows={4}
                placeholder="Ej. Pasar el día lunes a las 11:00 de la mañana."
                className="w-full resize-none rounded-xl border border-[#D0D4CF] bg-[#30262D] p-4 text-sm text-[#F5F3EC] outline-none transition placeholder-[#D6D0D3] focus:border-[#6F806C] focus:bg-[#3D4641] focus:ring-2 focus:ring-[#6F806C]"
              />

              <p className="text-xs text-[#6D756D]">
                Escriba aquí las indicaciones que desea enviar al comprador.
              </p>

            </div>

            {/* CONFIRMAR ENTREGA */}
            <div className="border-t border-[#E2E4E0] pt-6">

              <p className="mb-4 text-center text-sm text-[#6D756D]">
                Al confirmar, las indicaciones serán enviadas al comprador y la solicitud cambiará de estado.
              </p>

              <div className="flex justify-center">
                <button
                  type="button"
                  className="w-full rounded-full bg-[#6F806C] px-10 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#81937D] active:scale-95 sm:w-auto"
                >
                  Confirmar entrega
                </button>
              </div>

            </div>

          </div>
        </section>

      </div>
    </main>
  );
}

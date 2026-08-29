"use client";

import Link from "next/link";

export default function GestionSolicitudPage() {
  return (
    <main className="min-h-screen bg-[#CFEFF5] px-4 py-5 text-[#1F1F1F] md:px-8">
      <div className="mx-auto max-w-2xl">

        {/* BOTÓN VOLVER */}
        <div className="mb-6">
          <Link
            href="/vendedor-publicar-ofertas"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-[#39734A]
              transition
              hover:text-[#6FAF7B]
            "
          >
            ← Volver a mis ofertas
          </Link>
        </div>

        {/* CONTENEDOR PRINCIPAL */}
        <section className="overflow-hidden rounded-xl border border-[#A8D5BA] bg-[#E8F5EC] shadow-md">

          {/* ENCABEZADO */}
          <div className="bg-[#C3F4D4] px-5 py-3">

            <h1 className="text-base font-bold tracking-wide text-[#1F1F1F]">
              VENDEDOR
            </h1>

          </div>

          <div className="space-y-6 p-6 md:p-8">

            {/* RESUMEN DEL PEDIDO */}
            <div className="space-y-2">

              <label className="block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                Resumen del pedido
              </label>

              <div className="space-y-3 rounded-xl border border-[#A8D5BA] bg-white p-5">

                <div className="flex justify-between border-b border-[#A8D5BA] pb-3">

                  <span className="font-medium text-[#40534A]">
                    Material:
                  </span>

                  <span className="font-bold text-[#1F1F1F]">
                    Plástico PET
                  </span>

                </div>

                <div className="flex justify-between border-b border-[#A8D5BA] pb-3">

                  <span className="font-medium text-[#40534A]">
                    Cantidad solicitada:
                  </span>

                  <span className="font-semibold text-[#1F1F1F]">
                    13 kg
                  </span>

                </div>

                <div className="flex justify-between border-b border-[#A8D5BA] pb-3">

                  <span className="font-medium text-[#40534A]">
                    Ubicación:
                  </span>

                  <span className="font-semibold text-[#1F1F1F]">
                    Santa Cruz
                  </span>

                </div>

                <div className="flex justify-between border-b border-[#A8D5BA] pb-3">

                  <span className="font-medium text-[#40534A]">
                    Comprador:
                  </span>

                  <span className="font-semibold text-[#1F1F1F]">
                    Juan Pérez
                  </span>

                </div>

                <div className="flex justify-between pt-1">

                  <span className="font-medium text-[#40534A]">
                    Total estimado:
                  </span>

                  <span className="font-bold text-[#39734A]">
                    $ 71.50
                  </span>

                </div>

              </div>

              <p className="text-xs text-[#40534A]">
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
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-[#A8D5BA]
                  bg-white
                  p-4
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

              <p className="text-xs text-[#40534A]">
                Escriba aquí las indicaciones que desea enviar al comprador.
              </p>

            </div>

            {/* CONFIRMAR ENTREGA */}
            <div className="border-t border-[#A8D5BA] pt-6">

              <p className="mb-4 text-center text-sm text-[#40534A]">
                Al confirmar, las indicaciones serán enviadas al comprador y la solicitud cambiará de estado.
              </p>

              <div className="flex justify-center">

                <button
                  type="button"
                  className="
                    w-full
                    rounded-full
                    bg-[#6FAF7B]
                    px-10
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:bg-[#5F9E6B]
                    hover:scale-105
                    active:scale-95
                    sm:w-auto
                  "
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
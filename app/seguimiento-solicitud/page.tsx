"use client";

import Link from "next/link";

export default function SeguimientoSolicitud() {
  return (
    <main className="min-h-screen bg-[#CFEFF5] px-4 py-8 text-[#26382C] md:px-8">
      <div className="mx-auto max-w-2xl">

        {/* BOTÓN VOLVER */}
        <div className="mb-6">
          <Link
            href="/comprador-buscar-ofertas"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#6FAF7B] transition hover:text-[#39734A]"
          >
            ← Volver
          </Link>
        </div>

        {/* CONTENEDOR PRINCIPAL */}
        <section className="overflow-hidden rounded-2xl border border-[#A8D5BA] bg-white shadow-lg">

          {/* ENCABEZADO */}
          <div className="bg-[#39734A] px-6 py-4">
            <h1 className="text-xl font-bold tracking-wider text-white">
              COMPRADOR
            </h1>
          </div>

          <div className="space-y-8 p-6 md:p-8">

            {/* TITULO */}
            <div>
              <h2 className="text-2xl font-bold text-[#26382C]">
                SEGUIMIENTO DE MI PEDIDO
              </h2>

              <p className="mt-2 text-sm text-[#6D756D]">
                Consulta en qué etapa se encuentra tu solicitud.
              </p>
            </div>

            {/* ESTADO ACTUAL */}
            <div className="rounded-xl border border-[#A8D5BA] bg-[#E8F5EC] p-5">

              <p className="text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                Estado actual
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <span className="text-lg font-bold text-[#26382C]">
                  Solicitud en proceso
                </span>

                <span className="rounded-full bg-[#F7DD7A] px-4 py-1.5 text-xs font-bold text-[#6D5A12]">
                  En gestión
                </span>
              </div>

              <p className="mt-2 text-xs text-[#6D756D]">
                El vendedor recibió tu solicitud y está preparando la entrega.
              </p>

            </div>

            {/* SEGUIMIENTO VISUAL */}
            <div className="space-y-4">

              <label className="block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                Seguimiento de la solicitud
              </label>

              <div className="rounded-xl border border-[#A8D5BA] bg-[#F8FCF9] p-6">

                {/* ETAPA 1 */}
                <div className="relative flex gap-4">

                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6FAF7B] text-sm font-bold text-white">
                      ✓
                    </div>

                    <div className="h-12 w-0.5 bg-[#6FAF7B]"></div>
                  </div>

                  <div className="pb-7">
                    <h3 className="font-bold text-[#26382C]">
                      Solicitud enviada
                    </h3>

                    <p className="mt-1 text-sm text-[#6D756D]">
                      Tu solicitud fue enviada correctamente al vendedor.
                    </p>

                    <span className="mt-2 block text-xs text-[#6D756D]">
                      Hoy · 10:25
                    </span>
                  </div>

                </div>

                {/* ETAPA 2 */}
                <div className="relative flex gap-4">

                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6FAF7B] text-sm font-bold text-white">
                      ✓
                    </div>

                    <div className="h-12 w-0.5 bg-[#6FAF7B]"></div>
                  </div>

                  <div className="pb-7">
                    <h3 className="font-bold text-[#26382C]">
                      Vendedor recibió la solicitud
                    </h3>

                    <p className="mt-1 text-sm text-[#6D756D]">
                      El vendedor está revisando tu pedido.
                    </p>

                    <span className="mt-2 block text-xs text-[#6D756D]">
                      Hoy · 10:27
                    </span>
                  </div>

                </div>

                {/* ETAPA 3 - ACTUAL */}
                <div className="relative flex gap-4">

                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 animate-pulse items-center justify-center rounded-full bg-[#F7DD7A] text-sm font-bold text-[#6D5A12] ring-4 ring-[#F7DD7A]/40">
                      •
                    </div>

                    <div className="h-12 w-0.5 bg-[#A8D5BA]"></div>
                  </div>

                  <div className="pb-7">
                    <h3 className="font-bold text-[#26382C]">
                      Preparando entrega
                    </h3>

                    <p className="mt-1 text-sm text-[#6D756D]">
                      El vendedor está preparando el material para la entrega.
                    </p>

                    <span className="mt-2 block text-xs font-semibold text-[#6FAF7B]">
                      En proceso
                    </span>
                  </div>

                </div>

                {/* ETAPA 4 */}
                <div className="relative flex gap-4">

                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#D0D4CF] bg-white text-sm text-[#6D756D]">
                      4
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#6D756D]">
                      Entrega confirmada
                    </h3>

                    <p className="mt-1 text-sm text-[#9AA09A]">
                      Esta etapa se completará cuando el vendedor confirme la entrega.
                    </p>
                  </div>

                </div>

              </div>
            </div>

            {/* DETALLES DE LA ENTREGA */}
            <div className="space-y-2">

              <label className="block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                Detalles de la entrega
              </label>

              <div className="rounded-xl border border-[#A8D5BA] bg-[#E8F5EC] p-5">

                <p className="text-sm leading-6 text-[#40534A]">
                  Pasar el día lunes a las 11:00 de la mañana para recoger el material.
                </p>

              </div>

              <p className="text-xs text-[#6D756D]">
                Este mensaje fue enviado por el vendedor.
              </p>

            </div>

            {/* DETALLES DE LA VENTA */}
            <div className="space-y-2">

              <label className="block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                Detalles de la venta
              </label>

              <div className="space-y-3 rounded-xl border border-[#A8D5BA] bg-[#E8F5EC] p-5">

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
                    Cantidad:
                  </span>

                  <span className="font-semibold text-[#26382C]">
                    10 kg
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
                    Precio:
                  </span>

                  <span className="font-bold text-[#6FAF7B]">
                    $ 55.00
                  </span>
                </div>

              </div>

            </div>

            {/* INFORMACIÓN DEL VENDEDOR */}
            <div className="rounded-xl border border-[#A8D5BA] bg-[#B94A48] p-5 text-center">

              <p className="text-sm font-medium text-white">
                Para mayor información, comunicarse con
              </p>

              <p className="mt-2 text-lg font-bold text-[#F7DD7A]">
                70000000
              </p>

            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
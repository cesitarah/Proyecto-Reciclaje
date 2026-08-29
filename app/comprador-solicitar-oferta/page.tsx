"use client";

import Link from "next/link";

export default function CompradorSolicitarOferta() {
  return (
    <main className="min-h-screen bg-[#CFEFF5] px-4 py-5 text-[#1F1F1F] md:px-8">
      <div className="mx-auto max-w-2xl">

        {/* BOTÓN CANCELAR / VOLVER */}
        <div className="mb-6">
          <Link
            href="/comprador-buscar-ofertas"
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
            ← Cancelar y volver
          </Link>
        </div>

        {/* CONTENEDOR PRINCIPAL */}
        <section className="overflow-hidden rounded-xl border border-[#A8D5BA] bg-[#E8F5EC] shadow-md">

          {/* ENCABEZADO */}
          <div className="bg-[#C3F4D4] px-5 py-3">

            <h1 className="text-base font-bold tracking-wide text-[#1F1F1F]">
              COMPRADOR
            </h1>

          </div>

          <div className="space-y-6 p-6 md:p-8">

            {/* TITULO */}
            <div>

              <h2 className="text-2xl font-bold text-[#1F1F1F]">
                CONFIRMAR SOLICITUD
              </h2>

              <p className="mt-2 text-sm text-[#40534A]">
                Revisa la oferta seleccionada e indica la cantidad que deseas comprar.
              </p>

            </div>

            {/* RESUMEN DE LA OFERTA */}
            <div className="space-y-2">

              <label className="block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                Resumen de la oferta
              </label>

              {/* AQUÍ EL FONDO AHORA ES BLANCO */}
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
                    Cantidad disponible:
                  </span>

                  <span className="font-semibold text-[#1F1F1F]">
                    25 kg
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

                <div className="flex justify-between pt-1">

                  <span className="font-medium text-[#40534A]">
                    Precio establecido:
                  </span>

                  <span className="font-bold text-[#39734A]">
                    $ 5.50 / kg
                  </span>

                </div>

              </div>

              <p className="text-xs text-[#40534A]">
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
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#A8D5BA]
                  bg-white
                  px-4
                  py-3
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
                Puedes solicitar hasta 25 kg, que corresponde a la cantidad disponible de esta oferta.
              </p>

            </div>

            {/* BOTONES */}
            <div className="flex flex-col gap-3 border-t border-[#A8D5BA] pt-6 sm:flex-row sm:justify-center">

              {/* CANCELAR */}
              <Link
                href="/comprador-buscar-ofertas"
                className="
                  rounded-full
                  border
                  border-[#A8D5BA]
                  bg-white
                  px-8
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-[#40534A]
                  transition
                  hover:bg-[#CFEFF5]
                "
              >
                Cancelar
              </Link>

              {/* CONFIRMAR SOLICITUD */}
              <button
                type="button"
                className="
                  rounded-full
                  bg-[#6FAF7B]
                  px-8
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-[#5F9E6B]
                  hover:scale-105
                  active:scale-95
                "
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
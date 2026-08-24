"use client";
import Image from "next/image";
import Link from "next/link";

export default function VendedorPublicarOfertas() {
  return (
    <main className="min-h-screen bg-emerald-50/60 px-4 py-8 text-slate-800 md:px-8">
      <div className="mx-auto max-w-5xl">

        {/* ENCABEZADO */}
        <section className="overflow-hidden rounded-2xl bg-white shadow-sm border border-emerald-100">
          <div className="bg-slate-900 px-6 py-3">
            <h1 className="text-xl font-bold tracking-wider text-white">
              VENDEDOR
            </h1>
          </div>

        {/* BANNER DE RECICLAJE */}
        <div className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-xl px-6 text-center text-white shadow-inner">

        <Image
            src="/reciclaje-banner.jpg"
            alt="Imagen de reciclaje"
            fill
            className="object-cover"
        />

        <div className="absolute inset-0 bg-emerald-900/60"></div>

        <div className="relative z-10 space-y-1">
            <span className="block text-2xl font-black tracking-widest text-white drop-shadow">
            RECYCLE
            </span>

            <p className="text-xs font-medium text-emerald-50">
            Plataforma de gestión de residuos y materiales
            </p>
        </div>

        </div>
        </section>

        {/* FORMULARIO: PUBLICAR NUEVO LOTE */}
        <section className="mt-8 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 text-xl font-bold text-slate-800">
            PUBLICAR NUEVO LOTE
          </h2>

          <form className="space-y-6">

            {/* FILA 1 */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Tipo
                </label>

                <input type="text" placeholder="Ej. Plástico"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 
                  text-sm text-slate-800 outline-none transition focus:border-emerald-500 
                  focus:bg-white focus:ring-2 focus:ring-emerald-200"/>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Cantidad (kg)
                </label>

                <input type="number" placeholder="Ej. 15"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 
                  text-sm text-slate-800 outline-none transition focus:border-emerald-500 
                  focus:bg-white focus:ring-2 focus:ring-emerald-200"/>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Ubicación
                </label>

                <input type="text" placeholder="Ej. Santa Cruz"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 
                  text-sm text-slate-800 outline-none transition focus:border-emerald-500 
                  focus:bg-white focus:ring-2 focus:ring-emerald-200"/>
              </div>
            </div>

            {/* FILA 2 */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Precio ($/kg)
                </label>

                <input type="number" step="0.01" placeholder="Ej. 5.50"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 
                  text-sm text-slate-800 outline-none transition focus:border-emerald-500 
                  focus:bg-white focus:ring-2 focus:ring-emerald-200"/>
              </div>
            </div>

            {/* BOTÓN PUBLICAR */}
            <div className="flex justify-center pt-2">
              <button type="button"
                className="rounded-full bg-emerald-600 px-10 py-2.5 font-semibold text-white 
                shadow-sm transition hover:bg-emerald-700 active:scale-95">
                Publicar
              </button>
            </div>
          </form>
        </section>

        {/* TABLA: MIS OFERTAS ACTUALES */}
        <section className="mt-8 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 text-center text-xl font-bold text-slate-800">
            MIS OFERTAS ACTUALES
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Material</th>
                  <th className="px-4 py-3">Cantidad</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">▲</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {/* FILA 1 - DESTACADA / SELECCIONADA */}
                <tr className="bg-emerald-50/80 font-medium text-emerald-950">
                  <td className="px-4 py-4 text-emerald-800 font-bold">
                    01
                  </td>

                  <td className="px-4 py-4 font-semibold text-emerald-900">
                    Plástico
                  </td>

                  <td className="px-4 py-4">
                    15 kg
                  </td>

                  <td className="px-4 py-4">
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                      Disponible
                    </span>
                  </td>

                  <td className="px-4 py-4 text-right">
                    <Link href="/gestion-solicitud"
                      className="inline-block rounded-lg bg-emerald-600 px-3 py-1.5 
                      text-xs font-medium text-white transition hover:bg-emerald-700 
                      active:scale-95">
                      Ver
                    </Link>
                  </td>
                </tr>

                {/* FILA 2 */}
                <tr className="hover:bg-slate-50/80 transition">
                  <td className="px-4 py-4 text-slate-400">
                    02
                  </td>

                  <td className="px-4 py-4 font-medium text-slate-700">
                    Cartón
                  </td>

                  <td className="px-4 py-4 text-slate-600">
                    10 kg
                  </td>

                  <td className="px-4 py-4">
                    <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 
                    text-xs font-semibold text-amber-700 border border-amber-200">
                      Solicitada
                    </span>
                  </td>

                  <td className="px-4 py-4 text-right">
                    <Link href="/gestion-solicitud"
                      className="inline-block rounded-lg border border-slate-200 px-3 py-1.5 
                      text-xs font-medium text-slate-600 hover:bg-slate-100 transition">
                      Ver
                    </Link>
                  </td>
                </tr>

                {/* FILA 3 */}
                <tr className="hover:bg-slate-50/80 transition">
                  <td className="px-4 py-4 text-slate-400">
                    03
                  </td>

                  <td className="px-4 py-4 font-medium text-slate-700">
                    Vidrio
                  </td>

                  <td className="px-4 py-4 text-slate-600">
                    20 kg
                  </td>

                  <td className="px-4 py-4">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 
                    text-xs font-semibold text-slate-500">
                      Agotada
                    </span>
                  </td>

                  <td className="px-4 py-4 text-right">
                    <Link href="/gestion-solicitud"
                      className="inline-block rounded-lg border border-slate-200 px-3 py-1.5 
                      text-xs font-medium text-slate-600 hover:bg-slate-100 transition">
                      Ver
                    </Link>
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
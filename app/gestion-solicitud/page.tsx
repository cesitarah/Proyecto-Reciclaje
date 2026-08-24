"use client";

import Link from "next/link";

export default function GestionSolicitudPage() {
  return (
    <main className="min-h-screen bg-emerald-50/60 px-4 py-8 text-slate-800 md:px-8">
      <div className="mx-auto max-w-2xl">
        
        {/* BOTÓN VOLVER */}
        <div className="mb-6">
          <Link
            href="/vendedor-publicar-ofertas"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900 transition"
          >
            ← Volver a mis ofertas
          </Link>
        </div>

        {/* CONTENEDOR PRINCIPAL */}
        <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
          
          {/* ENCABEZADO "VENDEDOR" */}
          <div className="bg-slate-900 px-6 py-4">
            <h1 className="text-xl font-bold tracking-wider text-white">
              VENDEDOR
            </h1>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            
            {/* SECCIÓN: RESUMEN DEL PEDIDO */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Resumen del pedido
              </label>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 space-y-2">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-medium text-slate-500">Material:</span>
                  <span className="font-bold text-emerald-900">Plástico PET</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-medium text-slate-500">Cantidad solicitada:</span>
                  <span className="font-semibold text-slate-800">15 kg</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-medium text-slate-500">Comprador:</span>
                  <span className="font-semibold text-slate-800">Juan Pérez</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-medium text-slate-500">Total estimado:</span>
                  <span className="font-bold text-emerald-700">$ 82.50</span>
                </div>
              </div>
            </div>

            {/* SECCIÓN: DESCRIPCIÓN / MENSAJE DE ENTREGA */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Descripción / Instrucciones de entrega
              </label>
              <textarea
                rows={3}
                placeholder="Indica al comprador el lugar, día y hora en que puede pasar a recoger el material..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200 resize-none"
              />
            </div>

            {/* BOTÓN CONFIRMAR ENTREGA */}
            <div className="flex justify-center pt-4">
              <button
                type="button"
                className="w-full sm:w-auto rounded-full bg-emerald-600 px-10 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-95"
              >
                Confirmar Entrega
              </button>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
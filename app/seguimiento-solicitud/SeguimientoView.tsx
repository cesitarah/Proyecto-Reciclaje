import Link from "next/link";
import type { getSolicitudById } from "@/lib/data/solicitudes";

type Solicitud = NonNullable<Awaited<ReturnType<typeof getSolicitudById>>>;

type SeguimientoViewProps = {
  solicitud: Solicitud;
};

function formatearFecha(fecha: string) {
  return new Date(fecha).toLocaleString("es-BO", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function obtenerDescripcionEstado(estado: string) {
  switch (estado) {
    case "Pendiente":
      return "Tu solicitud fue enviada y el vendedor aún no la ha gestionado.";
    case "En gestión":
      return "El vendedor recibió tu solicitud y está preparando la entrega.";
    case "Entrega confirmada":
      return "La entrega fue confirmada por el vendedor.";
    case "Rechazada":
      return "El vendedor rechazó esta solicitud.";
    default:
      return "Consulta el estado de tu solicitud.";
  }
}

function obtenerColorEstado(estado: string) {
  switch (estado) {
    case "Pendiente":
      return "bg-[#F7DD7A] text-[#6D5A12]";
    case "En gestión":
      return "bg-[#B8D4D8] text-[#26382C]";
    case "Entrega confirmada":
      return "bg-[#6FAF7B] text-white";
    case "Rechazada":
      return "bg-[#F5D0CE] text-[#8B3A3A]";
    default:
      return "bg-[#B8D4D8] text-[#26382C]";
  }
}

function pasoCompletado(estado: string, paso: number) {
  const orden: Record<string, number> = {
    Pendiente: 1,
    "En gestión": 3,
    "Entrega confirmada": 4,
    Rechazada: 1,
  };
  return (orden[estado] ?? 1) >= paso;
}

function pasoActivo(estado: string, paso: number) {
  const orden: Record<string, number> = {
    Pendiente: 2,
    "En gestión": 3,
    "Entrega confirmada": 4,
    Rechazada: 0,
  };
  return (orden[estado] ?? 1) === paso;
}

export default function SeguimientoView({ solicitud }: SeguimientoViewProps) {
  const indicaciones =
    solicitud.mensajes.find((m) => m.mensaje)?.mensaje ?? null;

  const etapas = [
    {
      paso: 1,
      titulo: "Solicitud enviada",
      descripcion: "Tu solicitud fue enviada correctamente al vendedor.",
    },
    {
      paso: 2,
      titulo: "Vendedor recibió la solicitud",
      descripcion: "El vendedor está revisando tu pedido.",
    },
    {
      paso: 3,
      titulo: "Preparando entrega",
      descripcion: "El vendedor está preparando el material para la entrega.",
    },
    {
      paso: 4,
      titulo: "Entrega confirmada",
      descripcion: "Esta etapa se completará cuando el vendedor confirme la entrega.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#CFEFF5] px-4 py-8 text-[#26382C] md:px-8">
      <div className="mx-auto max-w-2xl">

        <div className="mb-6">
          <Link
            href="/principal"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#6FAF7B] transition hover:text-[#39734A]"
          >
            ← Volver al panel principal
          </Link>
        </div>

        <section className="overflow-hidden rounded-2xl border border-[#A8D5BA] bg-white shadow-lg">

          <div className="bg-[#39734A] px-6 py-4">
            <h1 className="text-xl font-bold tracking-wider text-white">
              COMPRADOR
            </h1>
          </div>

          <div className="space-y-8 p-6 md:p-8">

            <div>
              <h2 className="text-2xl font-bold text-[#26382C]">
                SEGUIMIENTO DE MI PEDIDO
              </h2>
              <p className="mt-2 text-sm text-[#6D756D]">
                Consulta en qué etapa se encuentra tu solicitud.
              </p>
            </div>

            <div className="rounded-xl border border-[#A8D5BA] bg-[#E8F5EC] p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                    Estado actual
                  </p>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-lg font-bold text-[#39734A]">
                      Solicitud #{String(solicitud.id_solicitud).padStart(3, "0")}
                    </span>

                    <span
                      className={`rounded-full px-4 py-1.5 text-xs font-bold ${obtenerColorEstado(solicitud.estado)}`}
                    >
                      {solicitud.estado}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-[#6D756D]">
                    {obtenerDescripcionEstado(solicitud.estado)}
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                    Seguimiento de la solicitud
                  </label>

                  <div className="rounded-xl border border-[#A8D5BA] bg-[#F8FCF9] p-6">
                    {etapas.map((etapa, index) => {
                      const completado = pasoCompletado(solicitud.estado, etapa.paso);
                      const activo = pasoActivo(solicitud.estado, etapa.paso);
                      const esUltimo = index === etapas.length - 1;

                      return (
                        <div key={etapa.paso} className="relative flex gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                                completado
                                  ? "bg-[#6FAF7B] text-white"
                                  : activo
                                    ? "animate-pulse bg-[#F7DD7A] text-[#6D5A12] ring-4 ring-[#F7DD7A]/40"
                                    : "border-2 border-[#D0D4CF] bg-white text-[#6D756D]"
                              }`}
                            >
                              {completado ? "✓" : activo ? "•" : etapa.paso}
                            </div>

                            {!esUltimo && (
                              <div
                                className={`h-12 w-0.5 ${
                                  completado ? "bg-[#6FAF7B]" : "bg-[#A8D5BA]"
                                }`}
                              />
                            )}
                          </div>

                          <div className={esUltimo ? "" : "pb-7"}>
                            <h3
                              className={`font-bold ${
                                completado || activo
                                  ? "text-[#26382C]"
                                  : "font-semibold text-[#6D756D]"
                              }`}
                            >
                              {etapa.titulo}
                            </h3>

                            <p className="mt-1 text-sm text-[#6D756D]">
                              {etapa.descripcion}
                            </p>

                            {etapa.paso === 1 && (
                              <span className="mt-2 block text-xs text-[#6D756D]">
                                {formatearFecha(solicitud.fecha_solicitud)}
                              </span>
                            )}

                            {activo && (
                              <span className="mt-2 block text-xs font-semibold text-[#6FAF7B]">
                                En proceso
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                    Detalles de la entrega
                  </label>

                  <div className="rounded-xl border border-[#A8D5BA] bg-[#E8F5EC] p-5">
                    {indicaciones ? (
                      <p className="text-sm leading-6 text-[#40534A]">
                        {indicaciones}
                      </p>
                    ) : (
                      <p className="text-sm italic text-[#6D756D]">
                        El vendedor aún no ha enviado indicaciones de entrega.
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-[#6D756D]">
                    Este mensaje fue enviado por el vendedor.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                    Detalles de la venta
                  </label>

                  <div className="space-y-3 rounded-xl border border-[#A8D5BA] bg-[#E8F5EC] p-5">
                    <div className="flex justify-between border-b border-[#D0D4CF] pb-3">
                      <span className="font-medium text-[#6D756D]">Material:</span>
                      <span className="font-bold text-[#26382C]">
                        {solicitud.oferta.material.nombre}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-[#D0D4CF] pb-3">
                      <span className="font-medium text-[#6D756D]">Cantidad:</span>
                      <span className="font-semibold text-[#26382C]">
                        {solicitud.cantidad_solicitada} kg
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-[#D0D4CF] pb-3">
                      <span className="font-medium text-[#6D756D]">Ubicación:</span>
                      <span className="font-semibold text-[#26382C]">
                        {solicitud.oferta.ubicacion}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-[#D0D4CF] pb-3">
                      <span className="font-medium text-[#6D756D]">Precio por kg:</span>
                      <span className="font-semibold text-[#26382C]">
                        Bs {solicitud.oferta.material.precio_por_kg.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between pt-1">
                      <span className="font-medium text-[#6D756D]">Total:</span>
                      <span className="font-bold text-[#6FAF7B]">
                        Bs {solicitud.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {solicitud.oferta.vendedor.telefono && (
                  <div className="rounded-xl border border-[#A8D5BA] bg-[#39734A] p-5 text-center">
                    <p className="text-sm font-medium text-white">
                      Para mayor información, comunicarse con
                    </p>
                    <p className="mt-2 text-lg font-bold text-[#F7DD7A]">
                      {solicitud.oferta.vendedor.telefono}
                    </p>
                  </div>
                )}

          </div>
        </section>

      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { getSolicitudById } from "@/lib/data/solicitudes";

type Solicitud = NonNullable<Awaited<ReturnType<typeof getSolicitudById>>>;

type GestionClientProps = {
  initialSolicitud: Solicitud;
};

const ESTADOS = [
  "Pendiente",
  "En gestión",
  "Entrega confirmada",
  "Rechazada",
];

export default function GestionClient({ initialSolicitud }: GestionClientProps) {
  const router = useRouter();

  const [solicitud, setSolicitud] = useState<Solicitud>(initialSolicitud);
  const [estado, setEstado] = useState(initialSolicitud.estado);
  const [indicaciones, setIndicaciones] = useState(
    initialSolicitud.mensajes[0]?.mensaje ?? ""
  );
  const [mensaje, setMensaje] = useState("");
  const [guardando, setGuardando] = useState(false);

  const solicitudFinalizada =
    solicitud?.estado === "Entrega confirmada" ||
    solicitud?.estado === "Rechazada";

  const guardarCambios = async () => {
    if (!solicitud) return;

    setMensaje("");
    setGuardando(true);

    try {
      const response = await fetch(`/api/solicitudes/${solicitud.id_solicitud}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estado,
          indicaciones: indicaciones.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMensaje(data.error || "No se pudo actualizar la solicitud.");
        setGuardando(false);
        return;
      }

      setMensaje("¡Cambios guardados correctamente!");
      setSolicitud(data);
      setEstado(data.estado);

      setTimeout(() => {
        router.push("/vendedor-publicar-ofertas");
      }, 1500);
    } catch {
      setMensaje("Error de conexión.");
      setGuardando(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#CFEFF5] px-4 py-5 text-[#1F1F1F] md:px-8">
      <div className="mx-auto max-w-2xl">

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

        <section className="overflow-hidden rounded-xl border border-[#A8D5BA] bg-[#E8F5EC] shadow-md">

          <div className="bg-[#C3F4D4] px-5 py-3">
            <h1 className="text-base font-bold tracking-wide text-[#1F1F1F]">
              VENDEDOR
            </h1>
          </div>

          <div className="space-y-6 p-6 md:p-8">

              <>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                    Resumen del pedido
                  </label>

                  <div className="space-y-3 rounded-xl border border-[#A8D5BA] bg-white p-5">
                    <div className="flex justify-between border-b border-[#A8D5BA] pb-3">
                      <span className="font-medium text-[#40534A]">Material:</span>
                      <span className="font-bold text-[#1F1F1F]">
                        {solicitud.oferta.material.nombre}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-[#A8D5BA] pb-3">
                      <span className="font-medium text-[#40534A]">
                        Cantidad solicitada:
                      </span>
                      <span className="font-semibold text-[#1F1F1F]">
                        {solicitud.cantidad_solicitada} kg
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-[#A8D5BA] pb-3">
                      <span className="font-medium text-[#40534A]">Ubicación:</span>
                      <span className="font-semibold text-[#1F1F1F]">
                        {solicitud.oferta.ubicacion}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-[#A8D5BA] pb-3">
                      <span className="font-medium text-[#40534A]">Comprador:</span>
                      <span className="font-semibold text-[#1F1F1F]">
                        {solicitud.comprador.nombre}
                      </span>
                    </div>

                    <div className="flex justify-between pt-1">
                      <span className="font-medium text-[#40534A]">
                        Total estimado:
                      </span>
                      <span className="font-bold text-[#39734A]">
                        Bs {solicitud.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                    Estado de la solicitud
                  </label>

                  <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    disabled={solicitudFinalizada}
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
                      focus:border-[#6FAF7B]
                      focus:ring-2
                      focus:ring-[#A8D5BA]
                      disabled:cursor-not-allowed
                      disabled:bg-[#CFEFF5]
                      disabled:text-[#6D756D]
                    "
                  >
                    {ESTADOS.map((opcion) => (
                      <option key={opcion} value={opcion}>
                        {opcion}
                      </option>
                    ))}
                  </select>

                  {solicitudFinalizada && (
                    <p className="text-xs text-[#6D756D]">
                      Esta solicitud ya fue finalizada y no puede modificarse.
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                    Indicaciones de entrega
                  </label>

                  <textarea
                    rows={4}
                    value={indicaciones}
                    onChange={(e) => setIndicaciones(e.target.value)}
                    readOnly={solicitudFinalizada}
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
                      read-only:cursor-not-allowed
                      read-only:bg-[#CFEFF5]
                    "
                  />

                  <p className="text-xs text-[#40534A]">
                    Escriba aquí las indicaciones que desea enviar al comprador.
                  </p>
                </div>

                <div className="border-t border-[#A8D5BA] pt-6">
                  {!solicitudFinalizada ? (
                    <>
                      <p className="mb-4 text-center text-sm text-[#40534A]">
                        Al confirmar, las indicaciones serán enviadas al comprador y la solicitud cambiará de estado.
                      </p>

                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={guardarCambios}
                          disabled={guardando}
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
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                            sm:w-auto
                          "
                        >
                          {guardando ? "Guardando..." : "Confirmar entrega"}
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="text-center text-sm text-[#40534A]">
                      Esta solicitud ya no admite cambios.
                    </p>
                  )}
                </div>

                {mensaje && (
                  <p className="text-center text-sm font-semibold text-[#39734A]">
                    {mensaje}
                  </p>
                )}
              </>

          </div>
        </section>

      </div>
    </main>
  );
}

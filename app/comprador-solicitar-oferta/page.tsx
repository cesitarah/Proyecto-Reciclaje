"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type Oferta = {
  id_oferta: number;
  cantidad_disponible: number;
  ubicacion: string;
  estado: string;
  material: {
    nombre: string;
    precio_por_kg: number;
  };
};

export default function CompradorSolicitarOferta() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idOferta = searchParams.get("id_oferta");
  const materialParam = searchParams.get("material");
  const cantidadParam = searchParams.get("cantidad");

  const [oferta, setOferta] = useState<Oferta | null>(null);
  const [cantidad, setCantidad] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (!idOferta) {
      setMensaje("No se seleccionó ninguna oferta.");
      setCargando(false);
      return;
    }

    const cargarOferta = async () => {
      try {
        const response = await fetch(`/api/ofertas/${idOferta}`);
        const data = await response.json();

        if (!response.ok) {
          setMensaje(data.error || "No se pudo cargar la oferta.");
          return;
        }

        if (data.estado !== "Disponible") {
          setMensaje("Esta oferta ya no está disponible.");
          return;
        }

        setOferta(data);
      } catch {
        setMensaje("Error de conexión.");
      } finally {
        setCargando(false);
      }
    };

    cargarOferta();
  }, [idOferta]);

  const confirmarSolicitud = async () => {
    if (!oferta) return;

    setMensaje("");
    setEnviando(true);

    const cantidadNumero = Number(cantidad);

    if (!cantidad || cantidadNumero <= 0) {
      setMensaje("Indica una cantidad válida.");
      setEnviando(false);
      return;
    }

    if (cantidadNumero > oferta.cantidad_disponible) {
      setMensaje(
        `La cantidad no puede superar los ${oferta.cantidad_disponible} kg disponibles.`
      );
      setEnviando(false);
      return;
    }

    try {
      const response = await fetch("/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_oferta: oferta.id_oferta,
          cantidad_solicitada: cantidadNumero,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMensaje(data.error || "No se pudo crear la solicitud.");
        setEnviando(false);
        return;
      }

      router.push(
        `/seguimiento-solicitud?id_solicitud=${data.id_solicitud}`
      );
    } catch {
      setMensaje("Error de conexión.");
      setEnviando(false);
    }
  };

  const volverUrl = (() => {
    const material =
      materialParam || oferta?.material.nombre || "Plástico";
    let url = `/comprador-buscar-ofertas?material=${encodeURIComponent(material)}`;
    if (cantidadParam) {
      url += `&cantidad=${encodeURIComponent(cantidadParam)}`;
    }
    return url;
  })();

  return (
    <main className="min-h-screen bg-nv-page px-4 py-5 text-[#1F1F1F] md:px-8">
      <div className="mx-auto max-w-2xl">

        <div className="mb-6">
          <Link
            href={volverUrl}
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

        <section className="overflow-hidden rounded-xl border border-[#A8D5BA] bg-[#E8F5EC] shadow-md">

          <div className="bg-[#C3F4D4] px-5 py-3">
            <h1 className="text-base font-bold tracking-wide text-[#1F1F1F]">
              COMPRADOR
            </h1>
          </div>

          <div className="space-y-6 p-6 md:p-8">

            <div>
              <h2 className="text-2xl font-bold text-[#1F1F1F]">
                CONFIRMAR SOLICITUD
              </h2>
              <p className="mt-2 text-sm text-[#40534A]">
                Revisa la oferta seleccionada e indica la cantidad que deseas comprar.
              </p>
            </div>

            {cargando ? (
              <p className="text-center text-sm text-[#40534A]">
                Cargando oferta...
              </p>
            ) : oferta ? (
              <>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                    Resumen de la oferta
                  </label>

                  <div className="space-y-3 rounded-xl border border-[#A8D5BA] bg-white p-5">
                    <div className="flex justify-between border-b border-[#A8D5BA] pb-3">
                      <span className="font-medium text-[#40534A]">Material:</span>
                      <span className="font-bold text-[#1F1F1F]">
                        {oferta.material.nombre}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-[#A8D5BA] pb-3">
                      <span className="font-medium text-[#40534A]">
                        Cantidad disponible:
                      </span>
                      <span className="font-semibold text-[#1F1F1F]">
                        {oferta.cantidad_disponible} kg
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-[#A8D5BA] pb-3">
                      <span className="font-medium text-[#40534A]">Ubicación:</span>
                      <span className="font-semibold text-[#1F1F1F]">
                        {oferta.ubicacion}
                      </span>
                    </div>

                    <div className="flex justify-between pt-1">
                      <span className="font-medium text-[#40534A]">
                        Precio establecido:
                      </span>
                      <span className="font-bold text-[#39734A]">
                        Bs {oferta.material.precio_por_kg.toFixed(2)} / kg
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#40534A]">
                    La información de la oferta se carga automáticamente y no puede ser modificada.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                    Cantidad solicitada (kg)
                  </label>

                  <input
                    type="number"
                    min="1"
                    max={oferta.cantidad_disponible}
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
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
                    Puedes solicitar hasta {oferta.cantidad_disponible} kg, que corresponde a la cantidad disponible de esta oferta.
                  </p>
                </div>

                <div className="flex flex-col gap-3 border-t border-[#A8D5BA] pt-6 sm:flex-row sm:justify-center">
                  <Link
                    href={volverUrl}
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

                  <button
                    type="button"
                    onClick={confirmarSolicitud}
                    disabled={enviando}
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
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    {enviando ? "Enviando..." : "Confirmar solicitud"}
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center text-sm font-semibold text-[#B94A48]">
                {mensaje || "No se encontró la oferta."}
              </p>
            )}

            {mensaje && oferta && (
              <p className="text-center text-sm font-semibold text-[#B94A48]">
                {mensaje}
              </p>
            )}

          </div>
        </section>

      </div>
    </main>
  );
}

import Link from "next/link";
import { redirect } from "next/navigation";
import PageContainer from "../components/PageContainer";
import { requireSession } from "@/lib/auth/session";
import { getPedidosComprador } from "@/lib/data/solicitudes";

function formatearFecha(fecha: string) {
  return new Date(fecha).toLocaleDateString("es-BO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function colorEstado(estado: string) {
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
      return "bg-[#E8F5EC] text-[#40534A]";
  }
}

export default async function CompradorMisPedidos() {
  const session = await requireSession();

  if (!session) {
    redirect("/login");
  }

  if (session.usuarioRol !== "Comprador") {
    redirect("/principal");
  }

  const pedidos = await getPedidosComprador(session.usuarioId);

  return (
    <main className="min-h-screen bg-nv-page px-4 py-5 text-[#1F1F1F] md:px-8 lg:px-10 xl:px-12 2xl:px-16">
      <PageContainer>
        <div className="mb-6">
          <Link
            href="/principal"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#39734A] transition hover:text-[#6FAF7B]"
          >
            ← Volver al panel principal
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
              <h2 className="text-2xl font-bold text-[#1F1F1F]">MIS PEDIDOS</h2>
              <p className="mt-2 text-sm text-[#40534A]">
                Revisa el estado de cada solicitud que has realizado.
              </p>
            </div>

            {pedidos.length === 0 ? (
              <p className="text-center text-sm text-[#6D756D]">
                Todavía no tienes pedidos realizados.
              </p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-[#A8D5BA] bg-white">
                <table className="w-full min-w-[700px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#A8D5BA] text-xs font-semibold uppercase tracking-wider text-[#40534A]">
                      <th className="px-4 py-3">Referencia</th>
                      <th className="px-4 py-3">Material</th>
                      <th className="px-4 py-3">Cantidad</th>
                      <th className="px-4 py-3">Vendedor</th>
                      <th className="px-4 py-3">Fecha</th>
                      <th className="px-4 py-3">Estado</th>
                      <th className="px-4 py-3">Total</th>
                      <th className="px-4 py-3">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DDF4F7]">
                    {pedidos.map((pedido) => (
                      <tr
                        key={pedido.id_solicitud}
                        className="transition hover:bg-[#F3FBFC]"
                      >
                        <td className="px-4 py-4 font-bold text-[#39734A]">
                          #{String(pedido.id_solicitud).padStart(3, "0")}
                        </td>
                        <td className="px-4 py-4 font-semibold">
                          {pedido.oferta.material.nombre}
                        </td>
                        <td className="px-4 py-4 text-[#40534A]">
                          {pedido.cantidad_solicitada} kg
                        </td>
                        <td className="px-4 py-4 text-[#40534A]">
                          {pedido.oferta.vendedor.nombre}
                        </td>
                        <td className="px-4 py-4 text-[#40534A]">
                          {formatearFecha(pedido.fecha_solicitud)}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${colorEstado(pedido.estado)}`}
                          >
                            {pedido.estado}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-semibold text-[#39734A]">
                          Bs {pedido.total.toFixed(2)}
                        </td>
                        <td className="px-4 py-4">
                          <Link
                            href={`/seguimiento-solicitud?id_solicitud=${pedido.id_solicitud}`}
                            className="inline-flex rounded-lg bg-[#6FAF7B] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#5F9E6B]"
                          >
                            Ver seguimiento
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </PageContainer>
    </main>
  );
}

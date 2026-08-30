import Link from "next/link";
import { redirect } from "next/navigation";
import SeguimientoView from "./SeguimientoView";
import { requireSession } from "@/lib/auth/session";
import { getSolicitudById } from "@/lib/data/solicitudes";

type PageProps = {
  searchParams: Promise<{ id_solicitud?: string }>;
};

export default async function SeguimientoSolicitudPage({
  searchParams,
}: PageProps) {
  const session = await requireSession();

  if (!session) {
    redirect("/login");
  }

  const params = await searchParams;
  const idSolicitud = Number(params.id_solicitud);

  if (!params.id_solicitud || Number.isNaN(idSolicitud)) {
    return (
      <main className="min-h-screen bg-nv-page px-4 py-8 text-[#26382C] md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-[#39734A]">
            No se indicó ninguna solicitud.
          </p>
          <Link href="/comprador-mis-pedidos" className="mt-4 inline-block text-[#6FAF7B]">
            Volver a mis pedidos
          </Link>
        </div>
      </main>
    );
  }

  const solicitud = await getSolicitudById(idSolicitud);

  if (!solicitud || solicitud.id_comprador !== session.usuarioId) {
    return (
      <main className="min-h-screen bg-nv-page px-4 py-8 text-[#26382C] md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-[#39734A]">
            No se encontró la solicitud.
          </p>
        </div>
      </main>
    );
  }

  return <SeguimientoView solicitud={solicitud} />;
}

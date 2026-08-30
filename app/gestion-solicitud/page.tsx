import Link from "next/link";
import { redirect } from "next/navigation";
import GestionClient from "./GestionClient";
import { requireSession } from "@/lib/auth/session";
import { getSolicitudById } from "@/lib/data/solicitudes";

type PageProps = {
  searchParams: Promise<{ id_solicitud?: string }>;
};

export default async function GestionSolicitudPage({
  searchParams,
}: PageProps) {
  const session = await requireSession();

  if (!session) {
    redirect("/login");
  }

  if (session.usuarioRol !== "Vendedor") {
    redirect("/principal");
  }

  const params = await searchParams;
  const idSolicitud = Number(params.id_solicitud);

  if (!params.id_solicitud || Number.isNaN(idSolicitud)) {
    return (
      <main className="min-h-screen bg-nv-page px-4 py-5 text-[#1F1F1F] md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-[#B94A48]">
            No se indicó ninguna solicitud.
          </p>
          <Link href="/vendedor-publicar-ofertas" className="mt-4 inline-block text-[#39734A]">
            Volver al panel del vendedor
          </Link>
        </div>
      </main>
    );
  }

  const solicitud = await getSolicitudById(idSolicitud);

  if (!solicitud || solicitud.oferta.vendedor.id_usuario !== session.usuarioId) {
    return (
      <main className="min-h-screen bg-nv-page px-4 py-5 text-[#1F1F1F] md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-[#B94A48]">
            No se encontró la solicitud.
          </p>
        </div>
      </main>
    );
  }

  return <GestionClient initialSolicitud={solicitud} />;
}

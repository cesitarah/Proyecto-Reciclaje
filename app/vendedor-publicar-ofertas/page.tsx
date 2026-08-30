import { redirect } from "next/navigation";
import VendedorPanel from "./VendedorPanel";
import { requireSession } from "@/lib/auth/session";
import { getVendedorPanel } from "@/lib/data/vendedor";

type PageProps = {
  searchParams: Promise<{ material?: string }>;
};

export default async function VendedorPublicarOfertasPage({
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
  const material = params.material || "Plástico";
  const initial = await getVendedorPanel(session.usuarioId, material);

  return (
    <VendedorPanel materialInicial={material} initial={initial} />
  );
}

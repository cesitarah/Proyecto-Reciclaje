import { redirect } from "next/navigation";
import CompradorBuscarClient from "./CompradorBuscarClient";
import { requireSession } from "@/lib/auth/session";
import { getOfertasComprador } from "@/lib/data/vendedor";

type PageProps = {
  searchParams: Promise<{ material?: string; cantidad?: string }>;
};

export default async function CompradorBuscarOfertasPage({
  searchParams,
}: PageProps) {
  const session = await requireSession();

  if (!session) {
    redirect("/login");
  }

  if (session.usuarioRol !== "Comprador") {
    redirect("/principal");
  }

  const params = await searchParams;
  const material = params.material || "Plástico";
  const cantidad = params.cantidad || "";
  const cantidadNumero = cantidad ? Number(cantidad) : undefined;
  const initialOfertas = await getOfertasComprador(
    material,
    cantidadNumero && !Number.isNaN(cantidadNumero) ? cantidadNumero : undefined
  );

  return (
    <CompradorBuscarClient
      materialInicial={material}
      cantidadInicial={cantidad}
      initialOfertas={initialOfertas}
    />
  );
}

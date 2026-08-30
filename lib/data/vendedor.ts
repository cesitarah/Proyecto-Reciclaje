import prisma from "@/lib/prisma";
import { getSolicitudesVendedor } from "@/lib/data/solicitudes";

export async function getVendedorPanel(vendedorId: number, materialNombre: string) {
  const [material, ofertas, solicitudes] = await Promise.all([
    prisma.material.findFirst({
      where: { nombre: materialNombre, estado: "activo" },
      select: { precio_por_kg: true, nombre: true },
    }),
    prisma.oferta.findMany({
      where: { id_vendedor: vendedorId },
      include: { material: true, vendedor: true },
      orderBy: { fecha_publicacion: "desc" },
    }),
    getSolicitudesVendedor(vendedorId),
  ]);

  return {
    precio: material
      ? `Bs ${Number(material.precio_por_kg)}`
      : "No disponible",
    ofertas: ofertas.map((o) => ({
      id_oferta: o.id_oferta,
      cantidad_disponible: Number(o.cantidad_disponible),
      ubicacion: o.ubicacion,
      estado: o.estado,
      material: {
        nombre: o.material.nombre,
        precio_por_kg: Number(o.material.precio_por_kg),
      },
    })),
    solicitudes,
  };
}

export async function getOfertasComprador(material: string, cantidad?: number) {
  const ofertas = await prisma.oferta.findMany({
    where: {
      estado: "Disponible",
      material: { nombre: material },
      ...(cantidad && cantidad > 0
        ? { cantidad_disponible: { gte: cantidad } }
        : {}),
    },
    include: { material: true, vendedor: true },
    orderBy: { fecha_publicacion: "desc" },
  });

  return ofertas.map((o) => ({
    id_oferta: o.id_oferta,
    cantidad_disponible: Number(o.cantidad_disponible),
    ubicacion: o.ubicacion,
    estado: o.estado,
    material: {
      nombre: o.material.nombre,
      precio_por_kg: Number(o.material.precio_por_kg),
    },
    vendedor: { nombre: o.vendedor.nombre },
  }));
}

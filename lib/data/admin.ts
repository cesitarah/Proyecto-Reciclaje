import prisma from "@/lib/prisma";

export async function getAdminDashboard() {
  const [materiales, solicitudes, statsRows] = await Promise.all([
    prisma.material.findMany({ orderBy: { nombre: "asc" } }),
    prisma.solicitud.findMany({
      include: {
        oferta: { include: { material: true } },
        comprador: true,
      },
      orderBy: { fecha_solicitud: "desc" },
    }),
    Promise.all([
      prisma.usuario.count(),
      prisma.solicitud.count({
        where: { estado: { notIn: ["Entrega confirmada", "Rechazada"] } },
      }),
      prisma.solicitud.count({ where: { estado: "Entrega confirmada" } }),
      prisma.solicitud.aggregate({
        where: { estado: "Entrega confirmada" },
        _sum: { cantidad_solicitada: true },
      }),
    ]),
  ]);

  const [usuarios, solicitudesActivas, ventasCompletadas, materialReciclado] =
    statsRows;

  return {
    stats: {
      usuarios,
      solicitudesActivas,
      ventasCompletadas,
      materialReciclado: Number(materialReciclado._sum.cantidad_solicitada ?? 0),
    },
    materiales: materiales.map((m) => ({
      id_material: m.id_material,
      nombre: m.nombre,
      precio_por_kg: Number(m.precio_por_kg),
      estado: m.estado,
    })),
    solicitudes: solicitudes.map((s) => ({
      id_solicitud: s.id_solicitud,
      material: s.oferta.material.nombre,
      cantidad_solicitada: Number(s.cantidad_solicitada),
      estado: s.estado,
      fecha_solicitud: s.fecha_solicitud.toISOString(),
      comprador: s.comprador.nombre,
    })),
  };
}

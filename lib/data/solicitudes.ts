import prisma from "@/lib/prisma";

export const solicitudDetailInclude = {
  oferta: {
    include: {
      material: true,
      vendedor: true,
    },
  },
  comprador: true,
  mensajes: {
    orderBy: { fecha: "desc" as const },
    include: { usuario: true },
  },
};

export const pedidoListInclude = {
  oferta: {
    include: {
      material: { select: { nombre: true, precio_por_kg: true } },
      vendedor: { select: { nombre: true } },
    },
  },
};

export const solicitudVendedorListInclude = {
  oferta: {
    include: {
      material: { select: { nombre: true } },
    },
  },
  comprador: { select: { nombre: true } },
};

type SolicitudDetail = {
  id_solicitud: number;
  id_oferta: number;
  id_comprador: number;
  cantidad_solicitada: { toString(): string } | number;
  estado: string;
  fecha_solicitud: Date;
  oferta: {
    id_oferta: number;
    cantidad_disponible: { toString(): string } | number;
    ubicacion: string;
    estado: string;
    material: {
      id_material: number;
      nombre: string;
      precio_por_kg: { toString(): string } | number;
    };
    vendedor: {
      id_usuario: number;
      nombre: string;
      telefono: string | null;
    };
  };
  comprador: {
    id_usuario: number;
    nombre: string;
    telefono: string | null;
  };
  mensajes: Array<{
    id_mensaje: number;
    mensaje: string;
    tipo: string | null;
    fecha: Date;
    usuario: { id_usuario: number; nombre: string };
  }>;
};

export function formatSolicitudDetail(solicitud: SolicitudDetail) {
  const cantidad = Number(solicitud.cantidad_solicitada);
  const precioKg = Number(solicitud.oferta.material.precio_por_kg);

  return {
    id_solicitud: solicitud.id_solicitud,
    id_oferta: solicitud.id_oferta,
    id_comprador: solicitud.id_comprador,
    cantidad_solicitada: cantidad,
    estado: solicitud.estado,
    fecha_solicitud: solicitud.fecha_solicitud.toISOString(),
    total: cantidad * precioKg,
    oferta: {
      id_oferta: solicitud.oferta.id_oferta,
      cantidad_disponible: Number(solicitud.oferta.cantidad_disponible),
      ubicacion: solicitud.oferta.ubicacion,
      estado: solicitud.oferta.estado,
      material: {
        id_material: solicitud.oferta.material.id_material,
        nombre: solicitud.oferta.material.nombre,
        precio_por_kg: precioKg,
      },
      vendedor: {
        id_usuario: solicitud.oferta.vendedor.id_usuario,
        nombre: solicitud.oferta.vendedor.nombre,
        telefono: solicitud.oferta.vendedor.telefono,
      },
    },
    comprador: {
      id_usuario: solicitud.comprador.id_usuario,
      nombre: solicitud.comprador.nombre,
      telefono: solicitud.comprador.telefono,
    },
    mensajes: solicitud.mensajes.map((m) => ({
      id_mensaje: m.id_mensaje,
      mensaje: m.mensaje,
      tipo: m.tipo,
      fecha: m.fecha.toISOString(),
      usuario: {
        id_usuario: m.usuario.id_usuario,
        nombre: m.usuario.nombre,
      },
    })),
  };
}

export function formatPedidoListItem(solicitud: {
  id_solicitud: number;
  cantidad_solicitada: { toString(): string } | number;
  estado: string;
  fecha_solicitud: Date;
  oferta: {
    ubicacion: string;
    material: { nombre: string; precio_por_kg: { toString(): string } | number };
    vendedor: { nombre: string };
  };
}) {
  const cantidad = Number(solicitud.cantidad_solicitada);
  const precioKg = Number(solicitud.oferta.material.precio_por_kg);

  return {
    id_solicitud: solicitud.id_solicitud,
    cantidad_solicitada: cantidad,
    estado: solicitud.estado,
    fecha_solicitud: solicitud.fecha_solicitud.toISOString(),
    total: cantidad * precioKg,
    oferta: {
      ubicacion: solicitud.oferta.ubicacion,
      material: { nombre: solicitud.oferta.material.nombre },
      vendedor: { nombre: solicitud.oferta.vendedor.nombre },
    },
  };
}

export async function getPedidosComprador(compradorId: number) {
  const solicitudes = await prisma.solicitud.findMany({
    where: { id_comprador: compradorId },
    include: pedidoListInclude,
    orderBy: { fecha_solicitud: "desc" },
  });

  return solicitudes.map(formatPedidoListItem);
}

export async function getSolicitudById(id: number) {
  const solicitud = await prisma.solicitud.findUnique({
    where: { id_solicitud: id },
    include: solicitudDetailInclude,
  });

  if (!solicitud) return null;

  return formatSolicitudDetail(solicitud);
}

export async function getSolicitudesVendedor(vendedorId: number) {
  const solicitudes = await prisma.solicitud.findMany({
    where: {
      oferta: { id_vendedor: vendedorId },
    },
    include: solicitudVendedorListInclude,
    orderBy: { fecha_solicitud: "desc" },
  });

  return solicitudes.map((s) => ({
    id_solicitud: s.id_solicitud,
    id_oferta: s.id_oferta,
    cantidad_solicitada: Number(s.cantidad_solicitada),
    estado: s.estado,
    oferta: {
      material: { nombre: s.oferta.material.nombre },
    },
    comprador: { nombre: s.comprador.nombre },
  }));
}

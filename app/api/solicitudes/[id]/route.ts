import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

const solicitudInclude = {
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

function formatSolicitud(solicitud: {
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
}) {
  const cantidad = Number(solicitud.cantidad_solicitada);
  const precioKg = Number(solicitud.oferta.material.precio_por_kg);

  return {
    id_solicitud: solicitud.id_solicitud,
    id_oferta: solicitud.id_oferta,
    id_comprador: solicitud.id_comprador,
    cantidad_solicitada: cantidad,
    estado: solicitud.estado,
    fecha_solicitud: solicitud.fecha_solicitud,
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
      fecha: m.fecha,
      usuario: {
        id_usuario: m.usuario.id_usuario,
        nombre: m.usuario.nombre,
      },
    })),
  };
}

const ESTADOS_VALIDOS = [
  "Pendiente",
  "En gestión",
  "Entrega confirmada",
  "Rechazada",
];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const usuarioId = cookieStore.get("usuario_id")?.value;

    if (!usuarioId) {
      return NextResponse.json(
        { error: "Debes iniciar sesión." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const idSolicitud = Number(id);

    if (Number.isNaN(idSolicitud)) {
      return NextResponse.json(
        { error: "Identificador de solicitud inválido." },
        { status: 400 }
      );
    }

    const solicitud = await prisma.solicitud.findUnique({
      where: { id_solicitud: idSolicitud },
      include: solicitudInclude,
    });

    if (!solicitud) {
      return NextResponse.json(
        { error: "La solicitud no existe." },
        { status: 404 }
      );
    }

    const esComprador = solicitud.id_comprador === Number(usuarioId);
    const esVendedor =
      solicitud.oferta.vendedor.id_usuario === Number(usuarioId);

    if (!esComprador && !esVendedor) {
      return NextResponse.json(
        { error: "No tienes permiso para ver esta solicitud." },
        { status: 403 }
      );
    }

    return NextResponse.json(formatSolicitud(solicitud));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudo consultar la solicitud." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const usuarioId = cookieStore.get("usuario_id")?.value;
    const usuarioRol = cookieStore.get("usuario_rol")?.value;

    if (!usuarioId || usuarioRol !== "Vendedor") {
      return NextResponse.json(
        { error: "Debes iniciar sesión como vendedor." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const idSolicitud = Number(id);

    if (Number.isNaN(idSolicitud)) {
      return NextResponse.json(
        { error: "Identificador de solicitud inválido." },
        { status: 400 }
      );
    }

    const solicitud = await prisma.solicitud.findUnique({
      where: { id_solicitud: idSolicitud },
      include: {
        oferta: true,
      },
    });

    if (!solicitud) {
      return NextResponse.json(
        { error: "La solicitud no existe." },
        { status: 404 }
      );
    }

    if (solicitud.oferta.id_vendedor !== Number(usuarioId)) {
      return NextResponse.json(
        { error: "No tienes permiso para gestionar esta solicitud." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { estado, indicaciones } = body;

    if (estado && !ESTADOS_VALIDOS.includes(estado)) {
      return NextResponse.json(
        { error: "Estado no válido." },
        { status: 400 }
      );
    }

    const nuevoEstado = estado || solicitud.estado;

    const solicitudActualizada = await prisma.$transaction(async (tx) => {
      if (indicaciones && indicaciones.trim()) {
        await tx.mensaje.create({
          data: {
            id_solicitud: idSolicitud,
            id_usuario: Number(usuarioId),
            mensaje: indicaciones.trim(),
            tipo: "indicaciones_entrega",
          },
        });
      }

      if (nuevoEstado === "Entrega confirmada") {
        await tx.oferta.update({
          where: { id_oferta: solicitud.id_oferta },
          data: { estado: "Completada" },
        });
      }

      if (nuevoEstado === "Rechazada") {
        await tx.oferta.update({
          where: { id_oferta: solicitud.id_oferta },
          data: { estado: "Disponible" },
        });
      }

      return tx.solicitud.update({
        where: { id_solicitud: idSolicitud },
        data: { estado: nuevoEstado },
        include: solicitudInclude,
      });
    });

    return NextResponse.json(formatSolicitud(solicitudActualizada));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudo actualizar la solicitud." },
      { status: 500 }
    );
  }
}

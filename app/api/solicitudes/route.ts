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

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const usuarioId = cookieStore.get("usuario_id")?.value;
    const usuarioRol = cookieStore.get("usuario_rol")?.value;

    if (!usuarioId) {
      return NextResponse.json(
        { error: "Debes iniciar sesión." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const vendedor = searchParams.get("vendedor");
    const comprador = searchParams.get("comprador");

    if (vendedor === "me" && usuarioRol === "Vendedor") {
      const solicitudes = await prisma.solicitud.findMany({
        where: {
          oferta: {
            id_vendedor: Number(usuarioId),
          },
        },
        include: solicitudInclude,
        orderBy: { fecha_solicitud: "desc" },
      });

      return NextResponse.json(solicitudes.map(formatSolicitud));
    }

    if (comprador === "me" && usuarioRol === "Comprador") {
      const solicitudes = await prisma.solicitud.findMany({
        where: {
          id_comprador: Number(usuarioId),
        },
        include: solicitudInclude,
        orderBy: { fecha_solicitud: "desc" },
      });

      return NextResponse.json(solicitudes.map(formatSolicitud));
    }

    return NextResponse.json(
      { error: "Parámetros de consulta no válidos." },
      { status: 400 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudieron consultar las solicitudes." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const usuarioId = cookieStore.get("usuario_id")?.value;
    const usuarioRol = cookieStore.get("usuario_rol")?.value;

    if (!usuarioId || usuarioRol !== "Comprador") {
      return NextResponse.json(
        { error: "Debes iniciar sesión como comprador." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id_oferta, cantidad_solicitada } = body;

    if (!id_oferta || !cantidad_solicitada) {
      return NextResponse.json(
        { error: "La oferta y la cantidad son obligatorias." },
        { status: 400 }
      );
    }

    const cantidad = Number(cantidad_solicitada);

    if (Number.isNaN(cantidad) || cantidad <= 0) {
      return NextResponse.json(
        { error: "La cantidad debe ser mayor a cero." },
        { status: 400 }
      );
    }

    const oferta = await prisma.oferta.findUnique({
      where: { id_oferta: Number(id_oferta) },
    });

    if (!oferta) {
      return NextResponse.json(
        { error: "La oferta no existe." },
        { status: 404 }
      );
    }

    if (oferta.estado !== "Disponible") {
      return NextResponse.json(
        { error: "Esta oferta ya no está disponible." },
        { status: 400 }
      );
    }

    const cantidadDisponible = Number(oferta.cantidad_disponible);

    if (cantidad > cantidadDisponible) {
      return NextResponse.json(
        {
          error: `La cantidad no puede superar los ${cantidadDisponible} kg disponibles.`,
        },
        { status: 400 }
      );
    }

    const solicitudExistente = await prisma.solicitud.findFirst({
      where: {
        id_oferta: oferta.id_oferta,
        estado: { not: "Rechazada" },
      },
    });

    if (solicitudExistente) {
      return NextResponse.json(
        { error: "Esta oferta ya tiene una solicitud activa." },
        { status: 400 }
      );
    }

    const solicitud = await prisma.$transaction(async (tx) => {
      await tx.oferta.update({
        where: { id_oferta: oferta.id_oferta },
        data: { estado: "Solicitada" },
      });

      return tx.solicitud.create({
        data: {
          id_oferta: oferta.id_oferta,
          id_comprador: Number(usuarioId),
          cantidad_solicitada: cantidad,
          estado: "Pendiente",
        },
        include: solicitudInclude,
      });
    });

    return NextResponse.json(formatSolicitud(solicitud), { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudo crear la solicitud." },
      { status: 500 }
    );
  }
}

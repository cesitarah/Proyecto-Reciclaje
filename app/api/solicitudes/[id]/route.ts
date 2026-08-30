import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  formatSolicitudDetail,
  solicitudDetailInclude,
} from "@/lib/data/solicitudes";
import prisma from "@/lib/prisma";

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
      include: solicitudDetailInclude,
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

    return NextResponse.json(formatSolicitudDetail(solicitud));
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
    const estadoAnterior = solicitud.estado;

    if (
      (estadoAnterior === "Entrega confirmada" ||
        estadoAnterior === "Rechazada") &&
      nuevoEstado !== estadoAnterior
    ) {
      return NextResponse.json(
        {
          error:
            "No se puede modificar una solicitud que ya fue confirmada o rechazada.",
        },
        { status: 400 }
      );
    }

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

      if (
        nuevoEstado === "Entrega confirmada" &&
        estadoAnterior !== "Entrega confirmada"
      ) {
        const cantidadActual = Number(solicitud.oferta.cantidad_disponible);
        const cantidadVendida = Number(solicitud.cantidad_solicitada);
        const restante = cantidadActual - cantidadVendida;

        await tx.oferta.update({
          where: { id_oferta: solicitud.id_oferta },
          data: {
            cantidad_disponible: Math.max(restante, 0),
            estado: restante > 0 ? "Disponible" : "Completada",
          },
        });
      }

      return tx.solicitud.update({
        where: { id_solicitud: idSolicitud },
        data: { estado: nuevoEstado },
        include: solicitudDetailInclude,
      });
    });

    return NextResponse.json(formatSolicitudDetail(solicitudActualizada));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudo actualizar la solicitud." },
      { status: 500 }
    );
  }
}

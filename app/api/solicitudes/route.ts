import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  formatSolicitudDetail,
  getPedidosComprador,
  getSolicitudesVendedor,
  solicitudDetailInclude,
} from "@/lib/data/solicitudes";
import prisma from "@/lib/prisma";

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
      return NextResponse.json(
        await getSolicitudesVendedor(Number(usuarioId))
      );
    }

    if (comprador === "me" && usuarioRol === "Comprador") {
      return NextResponse.json(
        await getPedidosComprador(Number(usuarioId))
      );
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

    const solicitudPendiente = await prisma.solicitud.findFirst({
      where: {
        id_oferta: oferta.id_oferta,
        estado: { in: ["Pendiente", "En gestión"] },
      },
    });

    if (solicitudPendiente) {
      return NextResponse.json(
        { error: "Esta oferta ya tiene una solicitud en proceso." },
        { status: 400 }
      );
    }

    const solicitud = await prisma.$transaction(async (tx) => {
      return tx.solicitud.create({
        data: {
          id_oferta: oferta.id_oferta,
          id_comprador: Number(usuarioId),
          cantidad_solicitada: cantidad,
          estado: "Pendiente",
        },
        include: solicitudDetailInclude,
      });
    });

    return NextResponse.json(formatSolicitudDetail(solicitud), { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudo crear la solicitud." },
      { status: 500 }
    );
  }
}

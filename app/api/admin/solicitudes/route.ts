import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

async function verificarAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get("usuario_rol")?.value === "Administrador";
}

export async function GET() {
  try {
    if (!(await verificarAdmin())) {
      return NextResponse.json(
        { error: "Debes iniciar sesión como administrador." },
        { status: 401 }
      );
    }

    const solicitudes = await prisma.solicitud.findMany({
      include: {
        oferta: {
          include: { material: true },
        },
        comprador: true,
      },
      orderBy: { fecha_solicitud: "desc" },
    });

    return NextResponse.json(
      solicitudes.map((s) => ({
        id_solicitud: s.id_solicitud,
        material: s.oferta.material.nombre,
        cantidad_solicitada: Number(s.cantidad_solicitada),
        estado: s.estado,
        fecha_solicitud: s.fecha_solicitud,
        comprador: s.comprador.nombre,
      }))
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudieron cargar las solicitudes." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

async function verificarAdmin() {
  const cookieStore = await cookies();
  const rol = cookieStore.get("usuario_rol")?.value;

  if (rol !== "Administrador") {
    return false;
  }

  return true;
}

export async function GET() {
  try {
    if (!(await verificarAdmin())) {
      return NextResponse.json(
        { error: "Debes iniciar sesión como administrador." },
        { status: 401 }
      );
    }

    const [
      totalUsuarios,
      solicitudesActivas,
      ventasCompletadas,
      materialReciclado,
    ] = await Promise.all([
      prisma.usuario.count(),
      prisma.solicitud.count({
        where: {
          estado: {
            notIn: ["Entrega confirmada", "Rechazada"],
          },
        },
      }),
      prisma.solicitud.count({
        where: { estado: "Entrega confirmada" },
      }),
      prisma.solicitud.aggregate({
        where: { estado: "Entrega confirmada" },
        _sum: { cantidad_solicitada: true },
      }),
    ]);

    return NextResponse.json({
      usuarios: totalUsuarios,
      solicitudesActivas,
      ventasCompletadas,
      materialReciclado: Number(materialReciclado._sum.cantidad_solicitada ?? 0),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudieron cargar las estadísticas." },
      { status: 500 }
    );
  }
}

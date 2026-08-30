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

    const materiales = await prisma.material.findMany({
      orderBy: { nombre: "asc" },
    });

    return NextResponse.json(
      materiales.map((m) => ({
        id_material: m.id_material,
        nombre: m.nombre,
        descripcion: m.descripcion,
        precio_por_kg: Number(m.precio_por_kg),
        estado: m.estado,
      }))
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudieron cargar los materiales." },
      { status: 500 }
    );
  }
}

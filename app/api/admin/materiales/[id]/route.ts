import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

async function verificarAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get("usuario_rol")?.value === "Administrador";
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await verificarAdmin())) {
      return NextResponse.json(
        { error: "Debes iniciar sesión como administrador." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const idMaterial = Number(id);

    if (Number.isNaN(idMaterial)) {
      return NextResponse.json(
        { error: "Identificador de material inválido." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { precio_por_kg } = body;

    const precio = Number(precio_por_kg);

    if (Number.isNaN(precio) || precio <= 0) {
      return NextResponse.json(
        { error: "El precio debe ser mayor a cero." },
        { status: 400 }
      );
    }

    const material = await prisma.material.update({
      where: { id_material: idMaterial },
      data: { precio_por_kg: precio },
    });

    return NextResponse.json({
      id_material: material.id_material,
      nombre: material.nombre,
      descripcion: material.descripcion,
      precio_por_kg: Number(material.precio_por_kg),
      estado: material.estado,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudo actualizar el precio." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await verificarAdmin())) {
      return NextResponse.json(
        { error: "Debes iniciar sesión como administrador." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const idMaterial = Number(id);

    if (Number.isNaN(idMaterial)) {
      return NextResponse.json(
        { error: "Identificador de material inválido." },
        { status: 400 }
      );
    }

    const material = await prisma.material.update({
      where: { id_material: idMaterial },
      data: { estado: "inactivo" },
    });

    return NextResponse.json({
      id_material: material.id_material,
      nombre: material.nombre,
      precio_por_kg: Number(material.precio_por_kg),
      estado: material.estado,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudo eliminar el material." },
      { status: 500 }
    );
  }
}

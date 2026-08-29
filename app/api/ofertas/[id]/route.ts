import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

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
    const idOferta = Number(id);

    if (Number.isNaN(idOferta)) {
      return NextResponse.json(
        { error: "Identificador de oferta inválido." },
        { status: 400 }
      );
    }

    const oferta = await prisma.oferta.findUnique({
      where: { id_oferta: idOferta },
      include: {
        material: true,
        vendedor: true,
      },
    });

    if (!oferta) {
      return NextResponse.json(
        { error: "La oferta no existe." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id_oferta: oferta.id_oferta,
      cantidad_disponible: Number(oferta.cantidad_disponible),
      ubicacion: oferta.ubicacion,
      estado: oferta.estado,
      material: {
        id_material: oferta.material.id_material,
        nombre: oferta.material.nombre,
        precio_por_kg: Number(oferta.material.precio_por_kg),
      },
      vendedor: {
        id_usuario: oferta.vendedor.id_usuario,
        nombre: oferta.vendedor.nombre,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudo consultar la oferta." },
      { status: 500 }
    );
  }
}

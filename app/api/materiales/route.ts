import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const nombre = searchParams.get("nombre");

    if (!nombre) {
      return NextResponse.json(
        {
          error: "Debes indicar el nombre del material.",
        },
        {
          status: 400,
        }
      );
    }

    const material = await prisma.material.findFirst({
      where: {
        nombre: nombre,
        estado: "activo",
      },
    });

    if (!material) {
      return NextResponse.json(
        {
          error: "El material no existe.",
        },
        {
          status: 404,
        }
      );
    }

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
      {
        error: "No se pudo consultar el material.",
      },
      {
        status: 500,
      }
    );
  }
}
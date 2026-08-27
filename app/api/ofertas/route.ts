import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();

    const usuarioId = cookieStore.get("usuario_id")?.value;
    const usuarioRol = cookieStore.get("usuario_rol")?.value;

    const { searchParams } = new URL(request.url);

    const nombreMaterial = searchParams.get("material");
    const cantidad = searchParams.get("cantidad");

    const where: any = {
      estado: "Disponible",
    };

    /*
      VENDEDOR:
      Solo muestra sus propias ofertas.
      No se filtran por material porque "Mis ofertas actuales"
      debe mostrar todas sus publicaciones.
    */
    if (usuarioRol === "Vendedor") {
      if (!usuarioId) {
        return NextResponse.json(
          {
            error: "No hay una sesión de vendedor activa.",
          },
          {
            status: 401,
          }
        );
      }

      where.id_vendedor = Number(usuarioId);
    }

    /*
      COMPRADOR:
      Puede buscar ofertas según el material seleccionado.
    */
    if (usuarioRol === "Comprador") {
      if (nombreMaterial) {
        where.material = {
          nombre: nombreMaterial,
        };
      }

      if (cantidad) {
        where.cantidad_disponible = {
          gte: Number(cantidad),
        };
      }
    }

    const ofertas = await prisma.oferta.findMany({
      where,
      include: {
        material: true,
        vendedor: true,
      },
      orderBy: {
        fecha_publicacion: "desc",
      },
    });

    return NextResponse.json(ofertas);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "No se pudieron consultar las ofertas.",
      },
      {
        status: 500,
      }
    );
  }
}


export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();

    const usuarioId = cookieStore.get("usuario_id")?.value;
    const usuarioRol = cookieStore.get("usuario_rol")?.value;

    if (!usuarioId || usuarioRol !== "Vendedor") {
      return NextResponse.json(
        {
          error: "Debes iniciar sesión como vendedor.",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    const {
      cantidad,
      ubicacion,
      nombreMaterial,
    } = body;

    if (!cantidad || !ubicacion || !nombreMaterial) {
      return NextResponse.json(
        {
          error: "La cantidad, ubicación y material son obligatorios.",
        },
        {
          status: 400,
        }
      );
    }

    const cantidadNumero = Number(cantidad);

    if (cantidadNumero <= 0) {
      return NextResponse.json(
        {
          error: "La cantidad debe ser mayor a cero.",
        },
        {
          status: 400,
        }
      );
    }

    const material = await prisma.material.findFirst({
      where: {
        nombre: nombreMaterial,
        estado: "activo",
      },
    });

    if (!material) {
      return NextResponse.json(
        {
          error: "El material seleccionado no existe.",
        },
        {
          status: 404,
        }
      );
    }

    const oferta = await prisma.oferta.create({
      data: {
        id_vendedor: Number(usuarioId),
        id_material: material.id_material,
        cantidad_disponible: cantidadNumero,
        ubicacion: ubicacion,
        estado: "Disponible",
      },
      include: {
        material: true,
      },
    });

    return NextResponse.json(
      {
        id_oferta: oferta.id_oferta,
        id_vendedor: oferta.id_vendedor,
        cantidad_disponible: Number(oferta.cantidad_disponible),
        ubicacion: oferta.ubicacion,
        estado: oferta.estado,
        material: {
          id_material: oferta.material.id_material,
          nombre: oferta.material.nombre,
          precio_por_kg: Number(oferta.material.precio_por_kg),
        },
      },
      {
        status: 201,
      }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "No se pudo guardar la oferta.",
      },
      {
        status: 500,
      }
    );
  }
}
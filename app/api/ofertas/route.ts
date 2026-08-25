import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { cantidad, ubicacion } = body;

    if (!cantidad || !ubicacion) {
      return NextResponse.json(
        { error: "La cantidad y ubicación son obligatorias." },
        { status: 400 }
      );
    }

    // Buscar o crear el rol Vendedor
    let rolVendedor = await prisma.rol.findFirst({
      where: {
        nombre: "Vendedor",
      },
    });

    if (!rolVendedor) {
      rolVendedor = await prisma.rol.create({
        data: {
          nombre: "Vendedor",
        },
      });
    }

    // Buscar o crear un vendedor de prueba
    let vendedor = await prisma.usuario.findUnique({
      where: {
        correo: "vendedor@nuevavida.com",
      },
    });

    if (!vendedor) {
      vendedor = await prisma.usuario.create({
        data: {
          nombre: "Vendedor Demo",
          correo: "vendedor@nuevavida.com",
          contrasena: "123456",
          telefono: "70000000",
          id_rol: rolVendedor.id_rol,
        },
      });
    }

    // Buscar o crear material de prueba
    let material = await prisma.material.findFirst({
      where: {
        nombre: "Plástico",
      },
    });

    if (!material) {
      material = await prisma.material.create({
        data: {
          nombre: "Plástico",
          descripcion: "Material plástico reciclable",
          precio_por_kg: 1.50,
          estado: "activo",
        },
      });
    }

    // Crear la oferta
    const oferta = await prisma.oferta.create({
      data: {
        id_vendedor: vendedor.id_usuario,
        id_material: material.id_material,
        cantidad_disponible: Number(cantidad),
        ubicacion: ubicacion,
        estado: "Disponible",
      },
      include: {
        material: true,
      },
    });

    return NextResponse.json(oferta, { status: 201 });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "No se pudo guardar la oferta." },
      { status: 500 }
    );
  }
}
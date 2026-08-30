import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      nombre,
      correo,
      telefono,
      contrasena,
      tipoUsuario,
    } = body;

    // Verificar que todos los campos necesarios estén completos
    if (
      !nombre ||
      !correo ||
      !telefono ||
      !contrasena ||
      !tipoUsuario
    ) {
      return NextResponse.json(
        {
          error: "Todos los campos son obligatorios.",
        },
        {
          status: 400,
        }
      );
    }

    // Comprobar si ya existe un usuario con ese correo
    const usuarioExistente = await prisma.usuario.findUnique({
      where: {
        correo: correo,
      },
    });

    if (usuarioExistente) {
      return NextResponse.json(
        {
          error: "Ya existe un usuario con ese correo.",
        },
        {
          status: 400,
        }
      );
    }

    // Buscar el rol seleccionado
    const rol = await prisma.rol.findFirst({
      where: {
        nombre: tipoUsuario,
      },
    });

    if (!rol) {
      return NextResponse.json(
        {
          error: "El tipo de usuario seleccionado no existe.",
        },
        {
          status: 400,
        }
      );
    }

    // Crear el usuario
    const usuario = await prisma.usuario.create({
      data: {
        nombre: nombre,
        correo: correo,
        telefono: telefono,
        contrasena: contrasena,
        id_rol: rol.id_rol,
      },
    });

    return NextResponse.json(
      {
        mensaje: "Usuario creado correctamente.",
        usuario: {
          id_usuario: usuario.id_usuario,
          nombre: usuario.nombre,
          correo: usuario.correo,
          telefono: usuario.telefono,
          id_rol: usuario.id_rol,
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
        error: "No se pudo registrar el usuario.",
      },
      {
        status: 500,
      }
    );
  }
}
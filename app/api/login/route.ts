import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { nombre, contrasena } = body;

    if (!nombre || !contrasena) {
      return NextResponse.json(
        {
          error: "El nombre y la contraseña son obligatorios.",
        },
        {
          status: 400,
        }
      );
    }

    // Buscar usuario por nombre
    const usuario = await prisma.usuario.findFirst({
      where: {
        nombre: nombre,
      },
      include: {
        rol: true,
      },
    });

    if (!usuario) {
      return NextResponse.json(
        {
          error: "El usuario no existe.",
        },
        {
          status: 401,
        }
      );
    }

    // Comprobar contraseña
    if (usuario.contrasena !== contrasena) {
      return NextResponse.json(
        {
          error: "La contraseña es incorrecta.",
        },
        {
          status: 401,
        }
      );
    }

    // Crear respuesta
    const response = NextResponse.json(
      {
        mensaje: "Inicio de sesión correcto.",
        usuario: {
          id_usuario: usuario.id_usuario,
          nombre: usuario.nombre,
          rol: usuario.rol.nombre,
        },
      },
      {
        status: 200,
      }
    );

    // Guardar información del usuario
    response.cookies.set(
      "usuario_id",
      String(usuario.id_usuario),
      {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      }
    );

    response.cookies.set(
      "usuario_rol",
      usuario.rol.nombre,
      {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      }
    );

    return response;

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "No se pudo iniciar sesión.",
      },
      {
        status: 500,
      }
    );
  }
}
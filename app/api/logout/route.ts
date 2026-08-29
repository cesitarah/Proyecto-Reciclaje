import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const response = NextResponse.json({
      mensaje: "Sesión cerrada correctamente.",
    });

    response.cookies.set("usuario_id", "", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    response.cookies.set("usuario_rol", "", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudo cerrar la sesión." },
      { status: 500 }
    );
  }
}

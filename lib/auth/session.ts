import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();
  const usuarioId = cookieStore.get("usuario_id")?.value;
  const usuarioRol = cookieStore.get("usuario_rol")?.value;

  return {
    usuarioId: usuarioId ? Number(usuarioId) : null,
    usuarioRol: usuarioRol ?? null,
  };
}

export async function requireSession() {
  const session = await getSession();

  if (!session.usuarioId) {
    return null;
  }

  return {
    usuarioId: session.usuarioId,
    usuarioRol: session.usuarioRol,
  };
}

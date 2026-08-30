import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

function createClient(url: string) {
  const adapter = new PrismaPg({ connectionString: url });
  return new PrismaClient({ adapter });
}

async function main() {
  const sourceUrl = process.env.SOURCE_DATABASE_URL;
  const targetUrl = process.env.DATABASE_URL;

  if (!sourceUrl) {
    throw new Error(
      "Agrega SOURCE_DATABASE_URL al .env con la URL de tu base de datos anterior."
    );
  }

  if (!targetUrl) {
    throw new Error("Falta DATABASE_URL en .env (Neon).");
  }

  const source = createClient(sourceUrl);
  const target = createClient(targetUrl);

  try {
    const roles = await source.rol.findMany();
    const usuarios = await source.usuario.findMany();
    const materiales = await source.material.findMany();
    const ofertas = await source.oferta.findMany();
    const solicitudes = await source.solicitud.findMany();
    const mensajes = await source.mensaje.findMany();

    console.log("Origen:", {
      roles: roles.length,
      usuarios: usuarios.length,
      materiales: materiales.length,
      ofertas: ofertas.length,
      solicitudes: solicitudes.length,
      mensajes: mensajes.length,
    });

    await target.$transaction(async (tx) => {
      await tx.mensaje.deleteMany();
      await tx.solicitud.deleteMany();
      await tx.oferta.deleteMany();
      await tx.usuario.deleteMany();
      await tx.material.deleteMany();
      await tx.rol.deleteMany();

      if (roles.length) await tx.rol.createMany({ data: roles });
      if (materiales.length) await tx.material.createMany({ data: materiales });
      if (usuarios.length) await tx.usuario.createMany({ data: usuarios });
      if (ofertas.length) await tx.oferta.createMany({ data: ofertas });
      if (solicitudes.length)
        await tx.solicitud.createMany({ data: solicitudes });
      if (mensajes.length) await tx.mensaje.createMany({ data: mensajes });
    });

    const tables = [
      ["Rol", "id_rol"],
      ["Material", "id_material"],
      ["Usuario", "id_usuario"],
      ["Oferta", "id_oferta"],
      ["Solicitud", "id_solicitud"],
      ["Mensaje", "id_mensaje"],
    ] as const;

    for (const [table, column] of tables) {
      await target.$executeRawUnsafe(
        `SELECT setval(pg_get_serial_sequence('"${table}"', '${column}'), COALESCE((SELECT MAX("${column}") FROM "${table}"), 1), true);`
      );
    }

    console.log("Migración completada hacia Neon.");
  } finally {
    await source.$disconnect();
    await target.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

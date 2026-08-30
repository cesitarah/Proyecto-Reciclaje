import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

function createClient(url: string) {
  const adapter = new PrismaPg({ connectionString: url });
  return new PrismaClient({ adapter });
}

async function countDb(label: string, url: string) {
  const prisma = createClient(url);

  try {
    const [usuarios, ofertas, solicitudes, materiales, roles] =
      await Promise.all([
        prisma.usuario.count(),
        prisma.oferta.count(),
        prisma.solicitud.count(),
        prisma.material.count(),
        prisma.rol.count(),
      ]);

    console.log(`${label}:`, {
      roles,
      usuarios,
      materiales,
      ofertas,
      solicitudes,
    });
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  const neonUrl = process.env.DATABASE_URL;
  const localUrl = process.env.SOURCE_DATABASE_URL;

  if (!neonUrl) {
    throw new Error("Falta DATABASE_URL en .env");
  }

  await countDb("Destino (Neon)", neonUrl);

  if (localUrl) {
    await countDb("Origen (SOURCE_DATABASE_URL)", localUrl);
  } else {
    console.log(
      "No hay SOURCE_DATABASE_URL. Agregala al .env con la URL de tu base de datos anterior."
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

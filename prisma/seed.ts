import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const roles = ["Comprador", "Vendedor", "Administrador"];

const materiales = [
  {
    nombre: "Plástico",
    descripcion: "Bolsas, envases y otros plásticos reciclables",
    precio_por_kg: 1.5,
  },
  {
    nombre: "Botellas PET",
    descripcion: "Botellas de agua, gaseosas, etc.",
    precio_por_kg: 2.0,
  },
  {
    nombre: "Cartón",
    descripcion: "Cajas y cartón corrugado",
    precio_por_kg: 0.8,
  },
  {
    nombre: "Aluminio",
    descripcion: "Latas y otros objetos de aluminio",
    precio_por_kg: 7.0,
  },
  {
    nombre: "Papel",
    descripcion: "Hojas, periódicos, revistas, etc.",
    precio_por_kg: 1.5,
  },
  {
    nombre: "Vidrio",
    descripcion: "Botellas y frascos de vidrio",
    precio_por_kg: 1.0,
  },
  {
    nombre: "Chatarra",
    descripcion: "Hierro y otros metales",
    precio_por_kg: 1.0,
  },
];

async function main() {
  for (const nombre of roles) {
    const existente = await prisma.rol.findFirst({
      where: { nombre },
    });

    if (!existente) {
      await prisma.rol.create({ data: { nombre } });
    }
  }

  for (const material of materiales) {
    const existente = await prisma.material.findFirst({
      where: { nombre: material.nombre },
    });

    if (existente) {
      await prisma.material.update({
        where: { id_material: existente.id_material },
        data: {
          descripcion: material.descripcion,
          precio_por_kg: material.precio_por_kg,
          estado: "activo",
        },
      });
    } else {
      await prisma.material.create({
        data: {
          ...material,
          estado: "activo",
        },
      });
    }
  }

  console.log("Seed completado: roles y materiales listos.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

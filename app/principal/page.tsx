import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";

const materiales = [
  {
    nombre: "Plástico",
    imagen: "/materiales/plastico.jpg",
    descripcion: "Bolsas, envases y otros plásticos reciclables",
    precio: "Bs 1,50/kg",
  },
  {
    nombre: "Botellas PET",
    imagen: "/materiales/pet.jpg",
    descripcion: "Botellas de agua, gaseosas, etc.",
    precio: "Bs 2,00/kg",
  },
  {
    nombre: "Cartón",
    imagen: "/materiales/carton.jpg",
    descripcion: "Cajas y cartón corrugado",
    precio: "Bs 0,80/kg",
  },
  {
    nombre: "Aluminio",
    imagen: "/materiales/aluminio.jpg",
    descripcion: "Latas y otros objetos de aluminio",
    precio: "Bs 7,00/kg",
  },
  {
    nombre: "Papel",
    imagen: "/materiales/papel.jpg",
    descripcion: "Hojas, periódicos, revistas, etc.",
    precio: "Bs 1,50/kg",
  },
  {
    nombre: "Vidrio",
    imagen: "/materiales/vidrio.jpg",
    descripcion: "Botellas y frascos de vidrio",
    precio: "Bs 1,00/kg",
  },
  {
    nombre: "Chatarra",
    imagen: "/materiales/chatarra.jpg",
    descripcion: "Hierro y otros metales",
    precio: "Bs 1,00/kg",
  },
];

export default async function Home() {
  const cookieStore = await cookies();
  const rol = cookieStore.get("usuario_rol")?.value;

  return (
    <main className="min-h-screen bg-[#F3F1E8] px-4 py-5 md:px-8">

      <div className="mx-auto max-w-5xl">

        {/* CONTENEDOR PRINCIPAL */}
        <section className="overflow-hidden rounded-xl border border-[#6D756D] bg-white shadow-md">

          {/* TÍTULO */}
          <div className="bg-[#3D4641] px-5 py-2.5">
            <h1 className="text-base font-semibold tracking-wide text-[#F5F3EC]">
              Página Principal
            </h1>
          </div>

          {/* BANNER */}
          <div className="relative h-40 overflow-hidden md:h-48">

            <Image
              src="/reciclaje-banner.jpg"
              alt="Reciclaje"
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-[#40534A]/55" />

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">

              <h2 className="text-2xl font-black tracking-[0.15em] text-[#F5F3EC] drop-shadow-md md:text-4xl">
                NUEVA VIDA
              </h2>

              <p className="mt-2 max-w-lg text-xs font-medium text-[#DDE3D9] md:text-sm">
                Dale una nueva oportunidad a los materiales reciclables
              </p>

            </div>

          </div>

        </section>

        {/* MATERIALES */}
        <section className="mt-6">

          <div className="mb-4 text-center">

            <h2 className="text-xl font-bold tracking-wide text-[#26382C]">
              Materiales reciclables
            </h2>

            <p className="mt-1 text-sm text-[#6D756D]">
              Selecciona un material para continuar
            </p>

          </div>

          {/* GRID DE TARJETAS */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">

            {materiales.map((material) => {

              let ruta = "#";

              if (rol === "Comprador") {
                ruta = `/comprador-buscar-ofertas?material=${encodeURIComponent(
                  material.nombre
                )}`;
              }

              if (rol === "Vendedor") {
                ruta = `/vendedor-publicar-ofertas?material=${encodeURIComponent(
                  material.nombre
                )}`;
              }

              if (rol === "Administrador") {
                ruta = "/admin";
              }

              return (
                <Link
                  key={material.nombre}
                  href={ruta}
                  className="group overflow-hidden rounded-xl border border-[#6D756D] bg-[#A8B39F] shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                >

                  {/* NOMBRE */}
                  <div className="px-3 pt-3 text-center">

                    <h3 className="text-sm font-semibold text-[#26382C]">
                      {material.nombre}
                    </h3>

                  </div>

                  {/* IMAGEN */}
                  <div className="relative mx-3 mt-2 h-24 overflow-hidden rounded-lg">

                    <Image
                      src={material.imagen}
                      alt={material.nombre}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />

                  </div>

                  {/* INFORMACIÓN */}
                  <div className="px-3 py-3 text-center">

                    <p className="min-h-[32px] text-[11px] leading-4 text-[#40534A]">
                      {material.descripcion}
                    </p>

                    <p className="mt-1.5 text-sm font-bold text-[#26382C]">
                      {material.precio}
                    </p>

                  </div>

                </Link>
              );
            })}

          </div>

        </section>

      </div>

    </main>
  );
}
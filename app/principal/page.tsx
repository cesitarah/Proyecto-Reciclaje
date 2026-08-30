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
    <main className="min-h-screen w-full overflow-x-hidden bg-[#CFEFF5] px-3 py-4 sm:px-4 sm:py-5 md:px-8">

      <div className="mx-auto w-full max-w-5xl">

        {/* ================= CONTENEDOR PRINCIPAL ================= */}
        <section className="w-full overflow-hidden rounded-xl border border-[#A8D5BA] bg-[#E8F5EC] shadow-md">

          {/* ================= TÍTULO ================= */}
          <div className="bg-[#C3F4D4] px-4 py-3 sm:px-5">

            <h1 className="text-sm font-bold tracking-wide text-[#1F1F1F] sm:text-base">
              Página Principal
            </h1>

          </div>

          {/* ================= BANNER ================= */}
          <div className="relative h-44 w-full overflow-hidden sm:h-40 md:h-48">

            <Image
              src="/reciclaje-banner.jpg"
              alt="Reciclaje"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover object-center"
            />

            {/* CAPA VERDE SUAVE */}
            <div className="absolute inset-0 bg-[#39734A]/35" />

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center sm:px-5">

              <h2 className="text-xl font-black tracking-[0.08em] text-white drop-shadow-md sm:text-2xl md:text-4xl md:tracking-[0.15em]">
                NUEVA VIDA
              </h2>

              <p className="mt-2 max-w-lg text-[11px] font-medium leading-snug text-white sm:text-xs md:text-sm">
                Dale una nueva oportunidad a los materiales reciclables
              </p>

            </div>

          </div>

        </section>

        {/* ================= ACCESO RÁPIDO COMPRADOR ================= */}
        {rol === "Comprador" && (
          <section className="mt-6 flex justify-center">
            <Link
              href="/comprador-mis-pedidos"
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#6FAF7B]
                px-8
                py-3
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-[#5F9E6B]
                hover:scale-105
                active:scale-95
              "
            >
              <i className="fa-solid fa-box-open text-sm" />
              Mis pedidos
            </Link>
          </section>
        )}

        {/* ================= MATERIALES ================= */}
        <section className="mt-6">

          {/* TÍTULO */}
          <div className="mb-4 text-center">

            <h2 className="text-xl font-bold tracking-wide text-[#1F1F1F]">
              Materiales reciclables
            </h2>

          </div>

          {/* ================= GRID ================= */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">

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
                ruta = "/administrador";
              }

              return (
                <Link
                  key={material.nombre}
                  href={ruta}
                  className="
                    group
                    overflow-hidden
                    rounded-xl
                    border
                    border-[#A8D5BA]
                    bg-[#C3F4D4]
                    shadow-md
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#B5EFC9]
                    hover:shadow-[0_8px_20px_rgba(111,175,123,0.35)]
                  "
                >

                  {/* ================= NOMBRE ================= */}
                  <div className="px-3 py-2.5">

                    <h3 className="text-sm font-bold text-[#1F1F1F]">
                      {material.nombre}
                    </h3>

                  </div>

                  {/* ================= IMAGEN ================= */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">

                    <Image
                      src={material.imagen}
                      alt={material.nombre}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="
                        object-cover
                        object-center
                        transition-transform
                        duration-300
                        group-hover:scale-105
                      "
                    />

                  </div>

                  {/* ================= INFORMACIÓN ================= */}
                  <div className="px-3 py-2.5">

                    {/* DESCRIPCIÓN */}
                    <p className="text-[11px] leading-4 text-[#39734A]">
                      {material.descripcion}
                    </p>

                    {/* PRECIO */}
                    <div className="mt-2 flex justify-end">

                      <span className="text-sm font-bold text-[#1F1F1F]">
                        {material.precio}
                      </span>

                    </div>

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
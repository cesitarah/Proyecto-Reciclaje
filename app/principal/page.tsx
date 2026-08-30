import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import PageContainer from "../components/PageContainer";

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

const pilares = [
  { icono: "fa-recycle", texto: "Reciclar" },
  { icono: "fa-seedling", texto: "Reutilizar" },
  { icono: "fa-earth-americas", texto: "Cuidar" },
];

export default async function Home() {
  const cookieStore = await cookies();
  const rol = cookieStore.get("usuario_rol")?.value;

  return (
    <main className="w-full overflow-x-hidden px-3 py-4 sm:px-4 sm:py-5 md:px-8 lg:px-10 xl:px-12 2xl:px-16">

      <PageContainer>

        <section className="nv-animate-scale-in w-full overflow-hidden rounded-xl border border-[#A8D5BA] bg-[#E8F5EC] shadow-md">

          <div className="bg-[#C3F4D4] px-4 py-3 sm:px-5">

            <h1 className="text-sm font-bold tracking-wide text-[#1F1F1F] sm:text-base">
              Página Principal
            </h1>

          </div>

          <div className="relative h-44 w-full overflow-hidden sm:h-40 md:h-52 lg:h-60 xl:h-72">

            <Image
              src="/reciclaje-banner.jpg"
              alt="Reciclaje"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />

            <div className="nv-animate-banner-glow absolute inset-0 bg-[#39734A]/35" />

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center sm:px-5">

              <h2
                className="nv-animate-fade-in-up text-xl font-black tracking-[0.08em] text-white drop-shadow-md sm:text-2xl md:text-4xl lg:text-5xl md:tracking-[0.15em]"
                style={{ animationDelay: "0.15s" }}
              >
                NUEVA VIDA
              </h2>

              <p
                className="nv-animate-fade-in-up mt-2 max-w-lg text-[11px] font-medium leading-snug text-white sm:text-xs md:text-sm"
                style={{ animationDelay: "0.3s" }}
              >
                Dale una nueva oportunidad a los materiales reciclables
              </p>

            </div>

          </div>

        </section>

        {rol === "Comprador" && (
          <section
            className="nv-animate-fade-in-up mt-6 flex justify-center"
            style={{ animationDelay: "0.35s" }}
          >
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
                shadow-md
                transition-all
                duration-300
                hover:bg-[#5F9E6B]
                hover:scale-105
                hover:shadow-lg
                active:scale-95
              "
            >
              <i className="fa-solid fa-box-open text-sm" />
              Mis pedidos
            </Link>
          </section>
        )}

        <section
          className="nv-animate-fade-in-up mt-6"
          style={{ animationDelay: "0.4s" }}
        >

          <div className="mb-4 text-center">

            <h2 className="text-xl font-bold tracking-wide text-[#1F1F1F]">
              Materiales reciclables
            </h2>

            <p className="mt-1 text-xs text-[#40534A] sm:text-sm">
              Selecciona un material para continuar
            </p>

          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5 xl:gap-6">

            {materiales.map((material, index) => {

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
                    nv-animate-fade-in-up
                    group
                    overflow-hidden
                    rounded-xl
                    border
                    border-[#A8D5BA]
                    bg-[#C3F4D4]
                    shadow-md
                    transition-all
                    duration-300
                    hover:-translate-y-1.5
                    hover:bg-[#B5EFC9]
                    hover:shadow-[0_10px_24px_rgba(111,175,123,0.35)]
                    active:scale-[0.98]
                  "
                  style={{ animationDelay: `${0.45 + index * 0.07}s` }}
                >

                  <div className="px-3 py-2.5 transition-colors duration-300 group-hover:bg-[#B8EBCA]/50">

                    <h3 className="text-sm font-bold text-[#1F1F1F]">
                      {material.nombre}
                    </h3>

                  </div>

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
                        duration-500
                        group-hover:scale-110
                      "
                    />

                    <div className="absolute inset-0 bg-[#39734A]/0 transition-colors duration-300 group-hover:bg-[#39734A]/10" />

                  </div>

                  <div className="px-3 py-2.5">

                    <p className="text-[11px] leading-4 text-[#39734A]">
                      {material.descripcion}
                    </p>

                    <div className="mt-2 flex items-center justify-between">

                      <span className="text-[10px] font-semibold uppercase tracking-wide text-[#6FAF7B] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        Ver más →
                      </span>

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

        <section
          className="nv-animate-fade-in-up mt-8 rounded-xl border border-[#A8D5BA] bg-[#E8F5EC] px-5 py-7 text-center shadow-md sm:mt-10 sm:px-8 sm:py-8"
          style={{ animationDelay: "0.9s" }}
        >

          <h3 className="text-lg font-bold text-[#39734A] sm:text-xl">
            Juntos por un planeta más limpio
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[#40534A]">
            Cada kilo reciclado cuenta. Compra y vende materiales de forma
            responsable y ayuda a darles una nueva vida.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">

            {pilares.map((pilar, index) => (
              <span
                key={pilar.texto}
                className="nv-animate-scale-in inline-flex items-center gap-2 rounded-full border border-[#A8D5BA] bg-[#C3F4D4] px-4 py-2 text-xs font-semibold text-[#31583D] shadow-sm transition-transform duration-300 hover:scale-105 sm:text-sm"
                style={{ animationDelay: `${1 + index * 0.12}s` }}
              >
                <i className={`fa-solid ${pilar.icono}`} />
                {pilar.texto}
              </span>
            ))}

          </div>

        </section>

      </PageContainer>

    </main>
  );
}

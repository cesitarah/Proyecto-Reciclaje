"use client";

import Link from "next/link";

const precios = [
  {
    material: "Cartón",
    precio: "Bs 0,80/kg",
    fecha: "18/08/2026",
  },
  {
    material: "Aluminio",
    precio: "Bs 7,00/kg",
    fecha: "18/08/2026",
  },
  {
    material: "Vidrio",
    precio: "Bs 1,00/kg",
    fecha: "18/08/2026",
  },
];

const solicitudes = [
  {
    id: "01",
    material: "Cartón",
    cantidad: "250 kg",
    estado: "Pendiente",
    fecha: "18/08/2026",
  },
  {
    id: "02",
    material: "Cartón",
    cantidad: "220 kg",
    estado: "Aceptada",
    fecha: "18/08/2026",
  },
  {
    id: "03",
    material: "Cartón",
    cantidad: "250 kg",
    estado: "Pendiente",
    fecha: "16/08/2026",
  },
];

export default function Administrador() {
  return (
    <main className="min-h-screen bg-[#CFEFF5] px-4 py-5 text-[#1F1F1F] md:px-8">

      <div className="mx-auto max-w-6xl">

        {/* ===================================================== */}
        {/* HEADER */}
        {/* ===================================================== */}

        <header className="rounded-t-2xl bg-[#3D4641] px-6 py-4 shadow-lg">

          <div className="flex items-center justify-between">

            {/* TITULO */}

            <div>
              <h1 className="text-xl font-bold tracking-wider text-[#F5F3EC]">
                ADMINISTRADOR
              </h1>

              <p className="mt-1 text-xs text-[#C3D0C6]">
                Panel de administración
              </p>
            </div>


            {/* ================================================= */}
            {/* ICONOS DERECHA */}
            {/* ================================================= */}

            <div className="flex items-center gap-3">

              {/* ================================================= */}
              {/* CASITA AMARILLA */}
              {/* ================================================= */}

              <Link
                href="/principal"
                title="Volver a principal"
                className="
                  group
                  relative
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  bg-[#F7DD7A]
                  text-[#3D4641]
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#F4D35E]
                  hover:shadow-[0_0_14px_rgba(244,211,94,0.8)]
                  active:scale-95
                "
              >

                {/* DESTELLO */}

                <span
                  className="
                    absolute
                    inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/70
                    to-transparent
                    transition-transform
                    duration-700
                    group-hover:translate-x-full
                  "
                ></span>

                {/* ICONO */}

                <i
                  className="
                    fa-solid
                    fa-house
                    relative
                    z-10
                    text-sm
                    transition-all
                    duration-300
                    group-hover:scale-110
                    group-hover:rotate-3
                  "
                ></i>

              </Link>


              {/* ================================================= */}
              {/* CERRAR SESIÓN */}
              {/* ================================================= */}

              <button
                type="button"
                title="Cerrar sesión"
                className="
                  group
                  relative
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  bg-[#D96C6C]
                  text-[#1F1F1F]
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#E47D7D]
                  hover:shadow-[0_0_14px_rgba(217,108,108,0.7)]
                  active:scale-95
                "
              >

                {/* DESTELLO */}

                <span
                  className="
                    absolute
                    inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/70
                    to-transparent
                    transition-transform
                    duration-700
                    group-hover:translate-x-full
                  "
                ></span>

                {/* ICONO */}

                <i
                  className="
                    fa-solid
                    fa-right-from-bracket
                    relative
                    z-10
                    text-sm
                    transition-all
                    duration-300
                    group-hover:scale-110
                    group-hover:-rotate-3
                  "
                ></i>

              </button>

            </div>

          </div>

        </header>


        {/* ===================================================== */}
        {/* CONTENIDO */}
        {/* ===================================================== */}

        <section
          className="
            rounded-b-2xl
            bg-[#E8F5EC]
            px-5
            py-7
            shadow-lg
            md:px-8
          "
        >

          {/* ================================================= */}
          {/* TITULO */}
          {/* ================================================= */}

          <div className="mb-7">

            <h2 className="text-3xl font-serif font-semibold text-[#26382C]">
              Administración
            </h2>

            <p className="mt-1 text-sm text-[#40534A]">
              Control general del sistema Nueva Vida
            </p>

          </div>


          {/* ===================================================== */}
          {/* TARJETAS */}
          {/* ===================================================== */}

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">


            {/* ================================================= */}
            {/* USUARIOS */}
            {/* ================================================= */}

            <div
              className="
                rounded-xl
                border
                border-[#A8D5BA]
                bg-[#DDEFE1]
                p-4
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#D2EBDD]
                hover:shadow-lg
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-semibold text-[#40534A]">
                    Usuarios
                  </p>

                  <p className="mt-2 text-2xl font-bold text-[#26382C]">
                    18
                  </p>

                </div>


                {/* ICONO NEGRO */}

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-[#B8D4D8]
                    text-[#1F1F1F]
                  "
                >
                  <i className="fa-solid fa-users"></i>
                </div>

              </div>


              <div className="mt-3 h-1 w-12 rounded-full bg-[#6F806C]" />

            </div>


            {/* ================================================= */}
            {/* SOLICITUDES */}
            {/* ================================================= */}

            <div
              className="
                rounded-xl
                border
                border-[#A8D5BA]
                bg-[#DDEFE1]
                p-4
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#D2EBDD]
                hover:shadow-lg
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-semibold text-[#40534A]">
                    Solicitudes activas
                  </p>

                  <p className="mt-2 text-2xl font-bold text-[#26382C]">
                    12
                  </p>

                </div>


                {/* ICONO NEGRO */}

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-[#B8D4D8]
                    text-[#1F1F1F]
                  "
                >
                  <i className="fa-solid fa-clipboard-list"></i>
                </div>

              </div>


              <div className="mt-3 h-1 w-12 rounded-full bg-[#6F806C]" />

            </div>


            {/* ================================================= */}
            {/* VENTAS */}
            {/* ================================================= */}

            <div
              className="
                rounded-xl
                border
                border-[#A8D5BA]
                bg-[#DDEFE1]
                p-4
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#D2EBDD]
                hover:shadow-lg
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-semibold text-[#40534A]">
                    Ventas completadas
                  </p>

                  <p className="mt-2 text-2xl font-bold text-[#26382C]">
                    8
                  </p>

                </div>


                {/* ICONO NEGRO */}

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-[#B8D4D8]
                    text-[#1F1F1F]
                  "
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                </div>

              </div>


              <div className="mt-3 h-1 w-12 rounded-full bg-[#6F806C]" />

            </div>


            {/* ================================================= */}
            {/* MATERIAL RECICLADO */}
            {/* ================================================= */}

            <div
              className="
                rounded-xl
                border
                border-[#A8D5BA]
                bg-[#DDEFE1]
                p-4
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#D2EBDD]
                hover:shadow-lg
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-semibold text-[#40534A]">
                    Material reciclado
                  </p>

                  <p className="mt-2 text-2xl font-bold text-[#26382C]">
                    1.250
                    <span className="ml-1 text-sm">
                      kg
                    </span>
                  </p>

                </div>


                {/* ICONO NEGRO */}

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-[#B8D4D8]
                    text-[#1F1F1F]
                  "
                >
                  <i className="fa-solid fa-recycle"></i>
                </div>

              </div>


              <div className="mt-3 h-1 w-12 rounded-full bg-[#6F806C]" />

            </div>

          </div>


          {/* ===================================================== */}
          {/* PRECIOS OFICIALES */}
          {/* ===================================================== */}

          <section
            className="
              mt-6
              rounded-xl
              border
              border-[#A8D5BA]
              bg-[#DDEFE1]
              p-5
              shadow-sm
              md:p-6
            "
          >

            <div className="mb-4 flex items-center gap-3">

              {/* ICONO NEGRO */}

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-[#B8D4D8]
                  text-[#1F1F1F]
                "
              >
                <i className="fa-solid fa-tags"></i>
              </div>


              <h3 className="font-serif text-lg font-semibold text-[#26382C]">
                Precios oficiales
              </h3>

            </div>


            <div className="overflow-x-auto">

              <table className="w-full text-left text-sm">

                <thead>

                  <tr
                    className="
                      border-b
                      border-[#A8D5BA]
                      text-xs
                      uppercase
                      tracking-wide
                      text-[#40534A]
                    "
                  >

                    <th className="px-3 py-3">
                      Material
                    </th>

                    <th className="px-3 py-3">
                      Precio
                    </th>

                    <th className="px-3 py-3">
                      Última actualización
                    </th>

                    <th className="px-3 py-3 text-center">
                      Acciones
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {precios.map((precio) => (

                    <tr
                      key={precio.material}
                      className="
                        border-b
                        border-[#C7DED0]
                        last:border-0
                        transition
                        hover:bg-[#CFE5D4]
                      "
                    >

                      <td className="px-3 py-3 font-semibold text-[#26382C]">
                        {precio.material}
                      </td>


                      {/* PRECIO VERDE */}

                      <td className="px-3 py-3 font-bold text-[#39734A]">
                        {precio.precio}
                      </td>


                      <td className="px-3 py-3 text-[#40534A]">
                        {precio.fecha}
                      </td>


                      <td className="px-3 py-3">

                        <div className="flex justify-center gap-5">

                          {/* EDITAR */}

                          <button
                            type="button"
                            title="Editar precio"
                            className="
                              text-[#1F1F1F]
                              transition-all
                              duration-300
                              hover:scale-125
                              hover:text-[#39734A]
                            "
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>


                          {/* ELIMINAR */}

                          <button
                            type="button"
                            title="Eliminar precio"
                            className="
                              text-[#D96C6C]
                              transition-all
                              duration-300
                              hover:scale-125
                              hover:text-[#C94F4F]
                            "
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>


          {/* ===================================================== */}
          {/* SOLICITUDES */}
          {/* ===================================================== */}

          <section
            className="
              mt-5
              rounded-xl
              border
              border-[#A8D5BA]
              bg-[#DDEFE1]
              p-5
              shadow-sm
              md:p-6
            "
          >

            <div className="mb-4 flex items-center gap-3">

              {/* ICONO NEGRO */}

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-[#B8D4D8]
                  text-[#1F1F1F]
                "
              >
                <i className="fa-solid fa-list-check"></i>
              </div>


              <h3 className="font-serif text-lg font-semibold text-[#26382C]">
                Gestión de solicitudes
              </h3>

            </div>


            <div className="overflow-x-auto">

              <table className="w-full min-w-[650px] text-left text-sm">

                <thead>

                  <tr
                    className="
                      border-b
                      border-[#A8D5BA]
                      text-xs
                      uppercase
                      tracking-wide
                      text-[#40534A]
                    "
                  >

                    <th className="px-3 py-3">
                      ID
                    </th>

                    <th className="px-3 py-3">
                      Material
                    </th>

                    <th className="px-3 py-3">
                      Cantidad
                    </th>

                    <th className="px-3 py-3">
                      Estado
                    </th>

                    <th className="px-3 py-3">
                      Fecha
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {solicitudes.map((solicitud) => (

                    <tr
                      key={solicitud.id}
                      className="
                        border-b
                        border-[#C7DED0]
                        last:border-0
                        transition
                        hover:bg-[#CFE5D4]
                      "
                    >

                      <td className="px-3 py-3 font-semibold text-[#26382C]">
                        {solicitud.id}
                      </td>


                      <td className="px-3 py-3 text-[#40534A]">
                        {solicitud.material}
                      </td>


                      <td className="px-3 py-3 text-[#40534A]">
                        {solicitud.cantidad}
                      </td>


                      <td className="px-3 py-3">

                        <span
                          className={`
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            px-3
                            py-1
                            text-[11px]
                            font-semibold
                            text-white
                            ${
                              solicitud.estado === "Aceptada"
                                ? "bg-[#6FAF7B]"
                                : "bg-[#78958A]"
                            }
                          `}
                        >

                          <i
                            className={
                              solicitud.estado === "Aceptada"
                                ? "fa-solid fa-check"
                                : "fa-solid fa-clock"
                            }
                          ></i>

                          {solicitud.estado}

                        </span>

                      </td>


                      <td className="px-3 py-3 text-[#40534A]">
                        {solicitud.fecha}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>

        </section>

      </div>

    </main>
  );
}
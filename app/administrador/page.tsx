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
    <main className="min-h-screen bg-[#F3F1E8] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <header className="rounded-t-2xl bg-[#3D4641] px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">

            <div>
              <h1 className="text-xl font-semibold tracking-wide text-[#F5F3EC]">
                ADMINISTRADOR
              </h1>

              <p className="mt-1 text-xs text-[#DDE3D9]">
                Panel de administración
              </p>
            </div>

            <Link
              href="/principal"
              title="Volver a principal"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#F5F3EC] transition hover:bg-[#506653]"
            >
              <i className="fa-solid fa-house text-sm"></i>
            </Link>

          </div>
        </header>

        {/* CONTENIDO */}
        <section className="rounded-b-2xl bg-[#A8B39F] px-5 py-6 shadow-lg md:px-8">

          {/* TÍTULO */}
          <div className="mb-6">
            <h2 className="text-3xl font-serif font-semibold text-[#26382C]">
              Administración
            </h2>

            <p className="mt-1 text-sm text-[#40534A]">
              Control general del sistema Nueva Vida
            </p>
          </div>

          {/* TARJETAS */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

            {/* USUARIOS */}
            <div className="rounded-xl border border-[#6D756D] bg-[#DDE3D9] p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-semibold text-[#40534A]">
                    Usuarios
                  </p>

                  <p className="mt-2 text-2xl font-bold text-[#26382C]">
                    18
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A8B39F] text-[#26382C]">
                  <i className="fa-solid fa-users"></i>
                </div>

              </div>

              <div className="mt-3 h-1 w-12 rounded-full bg-[#6F806C]" />
            </div>

            {/* SOLICITUDES */}
            <div className="rounded-xl border border-[#6D756D] bg-[#DDE3D9] p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-semibold text-[#40534A]">
                    Solicitudes activas
                  </p>

                  <p className="mt-2 text-2xl font-bold text-[#26382C]">
                    12
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A8B39F] text-[#26382C]">
                  <i className="fa-solid fa-clipboard-list"></i>
                </div>

              </div>

              <div className="mt-3 h-1 w-12 rounded-full bg-[#6F806C]" />
            </div>

            {/* VENTAS */}
            <div className="rounded-xl border border-[#6D756D] bg-[#DDE3D9] p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-semibold text-[#40534A]">
                    Ventas completadas
                  </p>

                  <p className="mt-2 text-2xl font-bold text-[#26382C]">
                    8
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A8B39F] text-[#26382C]">
                  <i className="fa-solid fa-cart-shopping"></i>
                </div>

              </div>

              <div className="mt-3 h-1 w-12 rounded-full bg-[#6F806C]" />
            </div>

            {/* MATERIAL RECICLADO */}
            <div className="rounded-xl border border-[#6D756D] bg-[#DDE3D9] p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

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

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A8B39F] text-[#26382C]">
                  <i className="fa-solid fa-recycle"></i>
                </div>

              </div>

              <div className="mt-3 h-1 w-12 rounded-full bg-[#6F806C]" />
            </div>

          </div>

          {/* PRECIOS OFICIALES */}
          <section className="mt-6 rounded-xl border border-[#6D756D] bg-[#DDE3D9] p-5 shadow-sm">

            <div className="mb-4 flex items-center gap-2">

              <i className="fa-solid fa-tags text-[#40534A]"></i>

              <h3 className="font-serif text-lg font-semibold text-[#26382C]">
                Precios oficiales
              </h3>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-left text-sm">

                <thead>
                  <tr className="border-b border-[#6D756D] text-xs uppercase tracking-wide text-[#40534A]">

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
                      className="border-b border-[#6D756D] last:border-0"
                    >

                      <td className="px-3 py-3 font-medium text-[#26382C]">
                        {precio.material}
                      </td>

                      <td className="px-3 py-3 font-semibold text-[#40534A]">
                        {precio.precio}
                      </td>

                      <td className="px-3 py-3 text-[#40534A]">
                        {precio.fecha}
                      </td>

                      <td className="px-3 py-3">

                        <div className="flex justify-center gap-4">

                          <button
                            type="button"
                            title="Editar precio"
                            className="text-[#40534A] transition hover:scale-110 hover:text-[#26382C]"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>

                          <button
                            type="button"
                            title="Eliminar precio"
                            className="text-[#40534A] transition hover:scale-110 hover:text-red-700"
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

          {/* SOLICITUDES */}
          <section className="mt-5 rounded-xl border border-[#6D756D] bg-[#DDE3D9] p-5 shadow-sm">

            <div className="mb-4 flex items-center gap-2">

              <i className="fa-solid fa-list-check text-[#40534A]"></i>

              <h3 className="font-serif text-lg font-semibold text-[#26382C]">
                Gestión de solicitudes
              </h3>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[650px] text-left text-sm">

                <thead>

                  <tr className="border-b border-[#6D756D] text-xs uppercase tracking-wide text-[#40534A]">

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
                      className="border-b border-[#6D756D] last:border-0"
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
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-white ${
                            solicitud.estado === "Aceptada"
                              ? "bg-[#4F9D50]"
                              : "bg-[#6F806C]"
                          }`}
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

          {/* BOTONES INFERIORES */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">

            <Link
              href="/principal"
              className="flex items-center gap-2 rounded-full bg-[#6F806C] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#81937D] active:scale-95"
            >
              <i className="fa-solid fa-house"></i>
              Principal
            </Link>

            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-[#6D756D] bg-[#DDE3D9] px-6 py-2.5 text-sm font-semibold text-[#40534A] transition hover:bg-[#A8B39F] active:scale-95"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              Cerrar sesión
            </button>

          </div>

        </section>

      </div>
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Stats = {
  usuarios: number;
  solicitudesActivas: number;
  ventasCompletadas: number;
  materialReciclado: number;
};

type Material = {
  id_material: number;
  nombre: string;
  precio_por_kg: number;
  estado: string;
};

type SolicitudAdmin = {
  id_solicitud: number;
  material: string;
  cantidad_solicitada: number;
  estado: string;
  fecha_solicitud: string;
  comprador: string;
};

function formatearFecha(fecha: string) {
  return new Date(fecha).toLocaleDateString("es-BO");
}

function colorEstadoSolicitud(estado: string) {
  switch (estado) {
    case "Entrega confirmada":
      return "bg-[#6FAF7B]";
    case "Rechazada":
      return "bg-[#F5D0CE] text-[#8B3A3A]";
    case "En gestión":
      return "bg-[#B8D4D8] text-[#26382C]";
    default:
      return "bg-[#78958A]";
  }
}

function iconoEstado(estado: string) {
  if (estado === "Entrega confirmada") return "fa-solid fa-check";
  if (estado === "Rechazada") return "fa-solid fa-xmark";
  return "fa-solid fa-clock";
}

export default function Administrador() {
  const router = useRouter();

  const [stats, setStats] = useState<Stats | null>(null);
  const [materiales, setMateriales] = useState<Material[]>([]);
  const [solicitudes, setSolicitudes] = useState<SolicitudAdmin[]>([]);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [precioEditado, setPrecioEditado] = useState("");

  const cargarDatos = async () => {
    setCargando(true);
    setMensaje("");

    try {
      const [statsRes, materialesRes, solicitudesRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/materiales"),
        fetch("/api/admin/solicitudes"),
      ]);

      const statsData = await statsRes.json();
      const materialesData = await materialesRes.json();
      const solicitudesData = await solicitudesRes.json();

      if (!statsRes.ok) {
        setMensaje(statsData.error || "No se pudieron cargar los datos.");
        return;
      }

      setStats(statsData);
      setMateriales(materialesRes.ok ? materialesData : []);
      setSolicitudes(solicitudesRes.ok ? solicitudesData : []);
    } catch {
      setMensaje("Error de conexión.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleCerrarSesion = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const iniciarEdicion = (material: Material) => {
    setEditandoId(material.id_material);
    setPrecioEditado(String(material.precio_por_kg));
    setMensaje("");
  };

  const guardarPrecio = async (idMaterial: number) => {
    const precio = Number(precioEditado);

    if (Number.isNaN(precio) || precio <= 0) {
      setMensaje("Indica un precio válido.");
      return;
    }

    try {
      const response = await fetch(`/api/admin/materiales/${idMaterial}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ precio_por_kg: precio }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMensaje(data.error || "No se pudo actualizar el precio.");
        return;
      }

      setMateriales((prev) =>
        prev.map((m) => (m.id_material === idMaterial ? data : m))
      );
      setEditandoId(null);
      setPrecioEditado("");
      setMensaje("Precio actualizado correctamente.");
    } catch {
      setMensaje("Error de conexión.");
    }
  };

  const cambiarEstadoMaterial = async (material: Material) => {
    const esActivo = material.estado === "activo";

    if (
      !confirm(
        esActivo
          ? `¿Desactivar el precio oficial de "${material.nombre}"? Ya no aparecerá disponible para nuevas ofertas.`
          : `¿Reactivar el precio oficial de "${material.nombre}"? Volverá a estar disponible para nuevas ofertas.`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/materiales/${material.id_material}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        setMensaje(data.error || "No se pudo cambiar el estado del material.");
        return;
      }

      setMateriales((prev) =>
        prev.map((m) =>
          m.id_material === material.id_material ? data : m
        )
      );
      setMensaje(
        data.estado === "activo"
          ? "Material reactivado correctamente."
          : "Material desactivado correctamente."
      );
    } catch {
      setMensaje("Error de conexión.");
    }
  };

  return (
    <main className="min-h-screen bg-[#CFEFF5] px-4 py-5 text-[#1F1F1F] md:px-8">

      <div className="mx-auto max-w-6xl">

        <header className="rounded-t-2xl bg-[#3D4641] px-4 py-4 shadow-lg sm:px-6">

          <div className="flex items-center justify-between gap-3">

            <div className="min-w-0">
              <h1 className="truncate text-base font-bold tracking-wider text-[#F5F3EC] sm:text-xl">
                ADMINISTRADOR
              </h1>
              <p className="mt-1 text-xs text-[#C3D0C6]">
                Panel de administración
              </p>
            </div>

            <div className="flex items-center gap-3">

              <Link
                href="/principal"
                title="Volver a principal"
                className="
                  group relative flex h-9 w-9 items-center justify-center
                  overflow-hidden rounded-full bg-[#F7DD7A] text-[#3D4641]
                  shadow-sm transition-all duration-300
                  hover:-translate-y-0.5 hover:bg-[#F4D35E]
                  hover:shadow-[0_0_14px_rgba(244,211,94,0.8)] active:scale-95
                "
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <i className="fa-solid fa-house relative z-10 text-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" />
              </Link>

              <button
                type="button"
                title="Cerrar sesión"
                onClick={handleCerrarSesion}
                className="
                  group relative flex h-9 w-9 items-center justify-center
                  overflow-hidden rounded-full bg-[#D96C6C] text-[#1F1F1F]
                  shadow-sm transition-all duration-300
                  hover:-translate-y-0.5 hover:bg-[#E47D7D]
                  hover:shadow-[0_0_14px_rgba(217,108,108,0.7)] active:scale-95
                "
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <i className="fa-solid fa-right-from-bracket relative z-10 text-sm transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3" />
              </button>

            </div>

          </div>

        </header>

        <section className="rounded-b-2xl bg-[#E8F5EC] px-5 py-7 shadow-lg md:px-8">

          <div className="mb-7">
            <h2 className="text-3xl font-serif font-semibold text-[#26382C]">
              Administración
            </h2>
            <p className="mt-1 text-sm text-[#40534A]">
              Control general del sistema Nueva Vida
            </p>
          </div>

          {mensaje && (
            <p className="mb-4 text-center text-sm font-semibold text-[#39734A]">
              {mensaje}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

            <div className="rounded-xl border border-[#A8D5BA] bg-[#DDEFE1] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#D2EBDD] hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#40534A]">Usuarios</p>
                  <p className="mt-2 text-2xl font-bold text-[#26382C]">
                    {cargando ? "..." : stats?.usuarios ?? 0}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B8D4D8] text-[#1F1F1F]">
                  <i className="fa-solid fa-users" />
                </div>
              </div>
              <div className="mt-3 h-1 w-12 rounded-full bg-[#6F806C]" />
            </div>

            <div className="rounded-xl border border-[#A8D5BA] bg-[#DDEFE1] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#D2EBDD] hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#40534A]">Solicitudes activas</p>
                  <p className="mt-2 text-2xl font-bold text-[#26382C]">
                    {cargando ? "..." : stats?.solicitudesActivas ?? 0}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B8D4D8] text-[#1F1F1F]">
                  <i className="fa-solid fa-clipboard-list" />
                </div>
              </div>
              <div className="mt-3 h-1 w-12 rounded-full bg-[#6F806C]" />
            </div>

            <div className="rounded-xl border border-[#A8D5BA] bg-[#DDEFE1] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#D2EBDD] hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#40534A]">Ventas completadas</p>
                  <p className="mt-2 text-2xl font-bold text-[#26382C]">
                    {cargando ? "..." : stats?.ventasCompletadas ?? 0}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B8D4D8] text-[#1F1F1F]">
                  <i className="fa-solid fa-cart-shopping" />
                </div>
              </div>
              <div className="mt-3 h-1 w-12 rounded-full bg-[#6F806C]" />
            </div>

            <div className="rounded-xl border border-[#A8D5BA] bg-[#DDEFE1] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#D2EBDD] hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#40534A]">Material reciclado</p>
                  <p className="mt-2 text-2xl font-bold text-[#26382C]">
                    {cargando
                      ? "..."
                      : (stats?.materialReciclado ?? 0).toLocaleString("es-BO")}
                    <span className="ml-1 text-sm">kg</span>
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B8D4D8] text-[#1F1F1F]">
                  <i className="fa-solid fa-recycle" />
                </div>
              </div>
              <div className="mt-3 h-1 w-12 rounded-full bg-[#6F806C]" />
            </div>

          </div>

          <section className="mt-6 rounded-xl border border-[#A8D5BA] bg-[#DDEFE1] p-5 shadow-sm md:p-6">

            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B8D4D8] text-[#1F1F1F]">
                <i className="fa-solid fa-tags" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#26382C]">
                Precios oficiales
              </h3>
            </div>

            <p className="mb-3 text-center text-xs text-[#6D756D] md:hidden">
              Desliza horizontalmente para ver todas las columnas →
            </p>

            <div className="overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[#A8D5BA] text-xs uppercase tracking-wide text-[#40534A]">
                    <th className="px-3 py-3">Material</th>
                    <th className="px-3 py-3">Precio</th>
                    <th className="px-3 py-3">Estado</th>
                    <th className="px-3 py-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {materiales.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-3 py-6 text-center text-[#6D756D]">
                        {cargando ? "Cargando materiales..." : "No hay materiales registrados."}
                      </td>
                    </tr>
                  ) : (
                    materiales.map((material) => (
                      <tr
                        key={material.id_material}
                        className="border-b border-[#C7DED0] last:border-0 transition hover:bg-[#CFE5D4]"
                      >
                        <td className="px-3 py-3 font-semibold text-[#26382C]">
                          {material.nombre}
                        </td>
                        <td className="px-3 py-3 font-bold text-[#39734A]">
                          {editandoId === material.id_material ? (
                            <input
                              type="number"
                              min="0.01"
                              step="0.01"
                              value={precioEditado}
                              onChange={(e) => setPrecioEditado(e.target.value)}
                              className="w-28 rounded-lg border border-[#A8D5BA] bg-white px-2 py-1 text-sm text-[#1F1F1F] outline-none focus:border-[#6FAF7B]"
                            />
                          ) : (
                            `Bs ${material.precio_por_kg.toFixed(2)}/kg`
                          )}
                        </td>
                        <td className="px-3 py-3 text-[#40534A] capitalize">
                          {material.estado}
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex justify-center gap-2 sm:gap-5">
                            {editandoId === material.id_material ? (
                              <>
                                <button
                                  type="button"
                                  title="Guardar precio"
                                  onClick={() => guardarPrecio(material.id_material)}
                                  className="flex h-11 w-11 items-center justify-center rounded-lg text-[#39734A] transition-all duration-300 hover:bg-[#CFE5D4] active:scale-95 touch-manipulation"
                                >
                                  <i className="fa-solid fa-check text-base" />
                                </button>
                                <button
                                  type="button"
                                  title="Cancelar edición"
                                  onClick={() => {
                                    setEditandoId(null);
                                    setPrecioEditado("");
                                  }}
                                  className="flex h-11 w-11 items-center justify-center rounded-lg text-[#6D756D] transition-all duration-300 hover:bg-[#E8ECE8] active:scale-95 touch-manipulation"
                                >
                                  <i className="fa-solid fa-xmark text-base" />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  title="Editar precio"
                                  onClick={() => iniciarEdicion(material)}
                                  disabled={material.estado === "inactivo"}
                                  className="flex h-11 w-11 items-center justify-center rounded-lg text-[#1F1F1F] transition-all duration-300 hover:bg-[#CFE5D4] hover:text-[#39734A] active:scale-95 touch-manipulation disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                  <i className="fa-solid fa-pen-to-square text-base" />
                                </button>
                                <button
                                  type="button"
                                  title={
                                    material.estado === "activo"
                                      ? "Desactivar precio"
                                      : "Reactivar precio"
                                  }
                                  onClick={() => cambiarEstadoMaterial(material)}
                                  className={`flex h-11 w-11 items-center justify-center rounded-lg transition-all duration-300 active:scale-95 touch-manipulation ${
                                    material.estado === "activo"
                                      ? "text-[#D96C6C] hover:bg-[#F5D0CE] hover:text-[#C94F4F]"
                                      : "text-[#39734A] hover:bg-[#CFE5D4] hover:text-[#6FAF7B]"
                                  }`}
                                >
                                  <i
                                    className={`text-base ${
                                      material.estado === "activo"
                                        ? "fa-solid fa-trash"
                                        : "fa-solid fa-rotate-left"
                                    }`}
                                  />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </section>

          <section className="mt-5 rounded-xl border border-[#A8D5BA] bg-[#DDEFE1] p-5 shadow-sm md:p-6">

            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B8D4D8] text-[#1F1F1F]">
                <i className="fa-solid fa-list-check" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#26382C]">
                Gestión de solicitudes
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[#A8D5BA] text-xs uppercase tracking-wide text-[#40534A]">
                    <th className="px-3 py-3">ID</th>
                    <th className="px-3 py-3">Material</th>
                    <th className="px-3 py-3">Cantidad</th>
                    <th className="px-3 py-3">Comprador</th>
                    <th className="px-3 py-3">Estado</th>
                    <th className="px-3 py-3">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudes.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-3 py-6 text-center text-[#6D756D]">
                        {cargando ? "Cargando solicitudes..." : "No hay solicitudes registradas."}
                      </td>
                    </tr>
                  ) : (
                    solicitudes.map((solicitud) => (
                      <tr
                        key={solicitud.id_solicitud}
                        className="border-b border-[#C7DED0] last:border-0 transition hover:bg-[#CFE5D4]"
                      >
                        <td className="px-3 py-3 font-semibold text-[#26382C]">
                          {String(solicitud.id_solicitud).padStart(2, "0")}
                        </td>
                        <td className="px-3 py-3 text-[#40534A]">
                          {solicitud.material}
                        </td>
                        <td className="px-3 py-3 text-[#40534A]">
                          {solicitud.cantidad_solicitada} kg
                        </td>
                        <td className="px-3 py-3 text-[#40534A]">
                          {solicitud.comprador}
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-white ${colorEstadoSolicitud(solicitud.estado)}`}
                          >
                            <i className={iconoEstado(solicitud.estado)} />
                            {solicitud.estado}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-[#40534A]">
                          {formatearFecha(solicitud.fecha_solicitud)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </section>

        </section>

      </div>

    </main>
  );
}

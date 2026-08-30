import { redirect } from "next/navigation";
import AdminPanel from "./AdminPanel";
import { requireSession } from "@/lib/auth/session";
import { getAdminDashboard } from "@/lib/data/admin";

export default async function AdministradorPage() {
  const session = await requireSession();

  if (!session) {
    redirect("/login");
  }

  if (session.usuarioRol !== "Administrador") {
    redirect("/principal");
  }

  const initial = await getAdminDashboard();

  return <AdminPanel initial={initial} />;
}

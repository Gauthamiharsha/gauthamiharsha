import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken } from "@/lib/admin-auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const token = cookieStore.get("admin_session")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  const session = await verifyAdminToken(token);

  if (!session) {
    redirect("/admin/login");
  }

  return children;
}
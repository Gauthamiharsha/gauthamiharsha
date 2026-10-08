import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/admin-auth";

export async function requireAdmin() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("admin_session")?.value;

  if (!token) {
    return false;
  }

  const session =
    await verifyAdminToken(token);

  return Boolean(session);
}
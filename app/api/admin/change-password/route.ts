import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import clientPromise from "@/lib/mongodb";
import { verifyAdminToken } from "@/lib/admin-auth";
import { hashAdminPassword, verifyAdminPassword } from "@/lib/admin-password";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;

    if (!token) {
      return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
    }

    const session = await verifyAdminToken(token);
    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

    if (!session || typeof session.email !== "string" ||
        session.email.toLowerCase() !== adminEmail) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const currentPassword = String(body.currentPassword || "");
    const newPassword = String(body.newPassword || "");
    const confirmPassword = String(body.confirmPassword || "");

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json({ error: "Please complete all fields." }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "New password must be at least 8 characters." }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: "New passwords do not match." }, { status: 400 });
    }

    if (currentPassword === newPassword) {
      return NextResponse.json({ error: "Choose a different new password." }, { status: 400 });
    }

    const mongo = await clientPromise;
    const collection = mongo.db("gauthami").collection<{
      _id: string;
      email: string;
      passwordHash: string;
    }>("adminCredentials");

    const credentials = await collection.findOne({ _id: "primary" });
    let currentPasswordIsValid = false;

    if (credentials?.passwordHash) {
      currentPasswordIsValid = await verifyAdminPassword(
        currentPassword,
        credentials.passwordHash
      );
    } else {
      currentPasswordIsValid = currentPassword === process.env.ADMIN_PASSWORD;
    }

    if (!currentPasswordIsValid) {
      return NextResponse.json({ error: "Your current password is incorrect." }, { status: 401 });
    }

    const passwordHash = await hashAdminPassword(newPassword);

    await collection.updateOne(
      { _id: "primary" },
      {
        $set: {
          email: adminEmail,
          passwordHash,
          updatedAt: new Date().toISOString(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true, message: "Password changed successfully." });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { error: "Unable to change password. Please try again." },
      { status: 500 }
    );
  }
}
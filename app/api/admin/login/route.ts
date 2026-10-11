import { NextResponse } from "next/server";
import { createAdminToken } from "@/lib/admin-auth";
import {
  hashAdminPassword,
  verifyAdminPassword,
} from "@/lib/admin-password";
import clientPromise from "@/lib/mongodb";

type AdminCredentials = {
  _id: string;
  email: string;
  passwordHash: string;
  updatedAt?: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: "Admin credentials are not configured." },
        { status: 500 }
      );
    }

    if (email !== adminEmail || !password) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const mongo = await clientPromise;
    const collection = mongo
      .db("gauthami")
      .collection<AdminCredentials>("adminCredentials");

    const credentials = await collection.findOne({ _id: "primary" });

    let validPassword = false;

    if (credentials?.passwordHash) {
      validPassword = await verifyAdminPassword(
        password,
        credentials.passwordHash
      );
    } else {
      validPassword = password === adminPassword;

      if (validPassword) {
        await collection.updateOne(
          { _id: "primary" },
          {
            $setOnInsert: {
              email: adminEmail,
              passwordHash: await hashAdminPassword(adminPassword),
              updatedAt: new Date().toISOString(),
            },
          },
          { upsert: true }
        );
      }
    }

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = await createAdminToken(email);
    const response = NextResponse.json({ success: true });

    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
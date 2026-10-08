import { NextResponse } from "next/server";
import { createAdminToken } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body.email || "").trim();
    const password = String(body.password || "");

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        {
          error: "Admin credentials are not configured.",
        },
        { status: 500 }
      );
    }

    if (
      email.toLowerCase() !== adminEmail.toLowerCase() ||
      password !== adminPassword
    ) {
      return NextResponse.json(
        {
          error: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    const token = await createAdminToken(email);

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        error: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}
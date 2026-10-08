import { SignJWT, jwtVerify } from "jose";

const secret = process.env.ADMIN_AUTH_SECRET;

if (!secret) {
  throw new Error("ADMIN_AUTH_SECRET is not configured.");
}

const secretKey = new TextEncoder().encode(secret);

export async function createAdminToken(email: string) {
  return new SignJWT({
    email,
    role: "admin",
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);

    if (
      payload.role !== "admin" ||
      typeof payload.email !== "string"
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
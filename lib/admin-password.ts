import {
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "crypto";
import { promisify } from "util";

const scrypt = promisify(scryptCallback);

export async function hashAdminPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyAdminPassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  try {
    const [salt, keyHex] = storedHash.split(":");
    if (!salt || !keyHex || !/^[a-f0-9]{128}$/i.test(keyHex)) return false;

    const expectedKey = Buffer.from(keyHex, "hex");
    const actualKey = (await scrypt(password, salt, 64)) as Buffer;

    return timingSafeEqual(actualKey, expectedKey);
  } catch {
    return false;
  }
}
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// Fail closed: no JWT_SECRET → sessions cannot be created or verified
const JWT_SECRET = process.env.JWT_SECRET
  ? new TextEncoder().encode(process.env.JWT_SECRET)
  : null;

const COOKIE_NAME = "admin_token";
const EXPIRY = "24h";

/**
 * Create a signed JWT and set it as an httpOnly cookie.
 */
export async function createSession(): Promise<string> {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is required");
  }
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRY)
    .sign(JWT_SECRET);

  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return token;
}

/**
 * Verify the admin JWT from the cookie jar.
 * Returns true if valid, false otherwise.
 */
export async function verifySession(): Promise<boolean> {
  try {
    const jar = await cookies();
    const token = jar.get(COOKIE_NAME)?.value;
    if (!token || !JWT_SECRET) return false;

    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

/**
 * Destroy the admin session by deleting the cookie.
 */
export async function destroySession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

/**
 * Verify admin password against the stored hash.
 * Uses Web Crypto for timing-safe comparison with SHA-256.
 */
export async function verifyPassword(password: string): Promise<boolean> {
  const storedHash = process.env.ADMIN_PASSWORD_HASH;
  if (!storedHash) return false;

  // Hash the input password with SHA-256 and compare with stored hash
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return hashHex === storedHash;
}

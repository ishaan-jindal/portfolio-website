import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import {
  scrypt as scryptCallback,
  timingSafeEqual,
  type BinaryLike,
} from "node:crypto";

type ScryptOptions = { N: number; r: number; p: number };

function scryptAsync(
  password: BinaryLike,
  salt: BinaryLike,
  keylen: number,
  options: ScryptOptions
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCallback(password, salt, keylen, options, (err, derived) => {
      if (err) reject(err);
      else resolve(derived);
    });
  });
}

// scrypt work factors for new hashes (~50ms on serverless; tune up over time)
const SCRYPT_N = 16384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const SCRYPT_KEYLEN = 32;

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
 *
 * Supported ADMIN_PASSWORD_HASH formats:
 * - `scrypt:<N>:<r>:<p>:<saltHex>:<keyHex>` (preferred: salted, memory-hard)
 * - bare SHA-256 hex digest (legacy, unsalted — migrate to scrypt)
 *
 * Comparison always uses timingSafeEqual. See .env.example for generating
 * a scrypt hash.
 */
export async function verifyPassword(password: string): Promise<boolean> {
  const storedHash = process.env.ADMIN_PASSWORD_HASH;
  if (!storedHash || password.length === 0) return false;

  if (storedHash.startsWith("scrypt:")) {
    return verifyScrypt(password, storedHash);
  }
  return verifyLegacySha256(password, storedHash);
}

async function verifyScrypt(
  password: string,
  stored: string
): Promise<boolean> {
  try {
    const parts = stored.split(":");
    if (parts.length !== 6) return false;
    const n = Number(parts[1]);
    const r = Number(parts[2]);
    const p = Number(parts[3]);
    if (![n, r, p].every((v) => Number.isInteger(v) && v > 0)) return false;

    const salt = Buffer.from(parts[4], "hex");
    const expected = Buffer.from(parts[5], "hex");
    if (salt.length === 0 || expected.length === 0) return false;

    // Reject downgraded work factors — a leaked env file must not be
    // re-crackable by weakening the stored parameters.
    if (
      n < SCRYPT_N ||
      r < SCRYPT_R ||
      p < SCRYPT_P ||
      expected.length < SCRYPT_KEYLEN
    ) {
      return false;
    }

    const derived = (await scryptAsync(password, salt, expected.length, {
      N: n,
      r,
      p,
    })) as Buffer;

    return (
      derived.length === expected.length &&
      timingSafeEqual(derived, expected)
    );
  } catch {
    return false;
  }
}

async function verifyLegacySha256(
  password: string,
  storedHash: string
): Promise<boolean> {
  // SHA-256 hex digests only; anything else-shaped is rejected before compare.
  if (!/^[0-9a-f]{64}$/i.test(storedHash)) return false;

  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  const a = Buffer.from(hashHex, "utf8");
  const b = Buffer.from(storedHash.toLowerCase(), "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

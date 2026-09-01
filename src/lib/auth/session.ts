import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { AdminUser } from "./admin";

const AUTH_COOKIE_NAME = "digiforge_admin_session";
const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET || "digiforge-ultra-secure-jwt-auth-secret-key-32chars"
);

export interface SessionPayload {
  sub: string;
  email: string;
  name: string;
  role: "admin";
  iat: number;
  exp: number;
}

/**
 * Sign JWT session token
 */
export async function signSessionToken(
  user: AdminUser,
  rememberMe: boolean = true
): Promise<string> {
  const expiresIn = rememberMe ? "30d" : "1d";
  return new SignJWT({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: "admin",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(SECRET_KEY);
}

/**
 * Verify JWT session token
 */
export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * Set HTTP-Only Session Cookie
 */
export async function createSessionCookie(
  user: AdminUser,
  rememberMe: boolean = true
) {
  const token = await signSessionToken(user, rememberMe);
  const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60; // 30 days or 1 day

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

/**
 * Get current authenticated session from cookies (Server Components / Actions)
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

/**
 * Remove session cookie
 */
export async function removeSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

export { AUTH_COOKIE_NAME };

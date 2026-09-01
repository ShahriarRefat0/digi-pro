"use server";

import { verifyAdminCredentials } from "@/lib/auth/admin";
import { createSessionCookie, removeSessionCookie } from "@/lib/auth/session";

export interface LoginResult {
  success: boolean;
  error?: string;
}

export async function loginAdminAction(
  email: string,
  password: string,
  rememberMe: boolean = true
): Promise<LoginResult> {
  try {
    if (!email || !password) {
      return { success: false, error: "Invalid email or password." };
    }

    const admin = await verifyAdminCredentials(email, password);

    if (!admin) {
      // Generic secure error message
      return { success: false, error: "Invalid email or password." };
    }

    await createSessionCookie(admin, rememberMe);
    return { success: true };
  } catch (error) {
    console.error("Login action error:", error);
    return { success: false, error: "Invalid email or password." };
  }
}

export async function logoutAdminAction(): Promise<void> {
  await removeSessionCookie();
}

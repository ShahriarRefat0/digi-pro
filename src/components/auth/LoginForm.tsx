"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { loginAdminAction } from "@/app/actions/auth";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/dashboard";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(true);

  const [fieldErrors, setFieldErrors] = React.useState<{ [key: string]: string }>({});
  const [authError, setAuthError] = React.useState<string | null>(null);
  const [isPending, setIsPending] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address";
    }

    if (!password.trim()) {
      errs.password = "Password is required";
    } else if (password.length < 8) {
      errs.password = "Password must be at least 8 characters";
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!validate()) return;

    setIsPending(true);

    try {
      const result = await loginAdminAction(email, password, rememberMe);

      if (!result.success) {
        setAuthError(result.error || "Invalid email or password.");
        setIsPending(false);
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.push(redirectTo);
        router.refresh();
      }, 500);
    } catch {
      setAuthError("Invalid email or password.");
      setIsPending(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-950/90 p-7 sm:p-9 shadow-2xl backdrop-blur-xl relative">
      {/* Card Header */}
      <div className="text-center mb-6">
        <div className="size-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#EEF35F] mx-auto mb-4 shadow-sm">
          <KeyRound className="size-6" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
          Admin Sign In
        </h1>
        <p className="text-xs text-neutral-400 mt-1.5 font-normal">
          Enter administrative credentials to access product management and store dashboard.
        </p>
      </div>

      {/* Generic Authentication Error Alert */}
      {authError && (
        <div className="mb-5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-400 flex items-center gap-2.5 animate-in fade-in duration-200">
          <AlertCircle className="size-4 shrink-0" />
          <span>{authError}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-mono font-semibold text-neutral-300 mb-1.5"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
            <Input
              id="email"
              type="email"
              value={email}
              autoComplete="email"
              disabled={isPending || isSuccess}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: "" }));
                if (authError) setAuthError(null);
              }}
              placeholder="admin@example.com"
              className={`pl-10 ${fieldErrors.email ? "border-rose-500" : ""}`}
            />
          </div>
          {fieldErrors.email && (
            <p className="mt-1 flex items-center gap-1 text-[11px] text-rose-400">
              <AlertCircle className="size-3" />
              <span>{fieldErrors.email}</span>
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-mono font-semibold text-neutral-300"
            >
              Password
            </label>
            <span className="text-[11px] font-mono text-neutral-500">
              Min 8 characters
            </span>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              autoComplete="current-password"
              disabled={isPending || isSuccess}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password)
                  setFieldErrors((prev) => ({ ...prev, password: "" }));
                if (authError) setAuthError(null);
              }}
              placeholder="••••••••••••"
              className={`pl-10 pr-10 ${fieldErrors.password ? "border-rose-500" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isPending || isSuccess}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="mt-1 flex items-center gap-1 text-[11px] text-rose-400">
              <AlertCircle className="size-3" />
              <span>{fieldErrors.password}</span>
            </p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center pt-1">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              disabled={isPending || isSuccess}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="size-4 rounded border-neutral-800 bg-black text-[#EEF35F] focus:ring-[#EEF35F]"
            />
            <span className="text-xs text-neutral-400 font-normal select-none">
              Remember me
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isPending || isSuccess}
            className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#EEF35F] px-8 text-xs sm:text-sm font-bold text-black hover:bg-[#e5ea4e] hover:shadow-[0_0_20px_rgba(238,243,95,0.3)] transition-all active:scale-95 disabled:opacity-80 shadow-md shadow-[#EEF35F]/20 cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="size-4" />
                <span>Authenticated • Redirecting...</span>
              </>
            ) : (
              <span>Sign In &rarr;</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

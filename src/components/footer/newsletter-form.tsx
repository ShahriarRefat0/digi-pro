"use client"

import * as React from "react"
import { Send, CheckCircle2, Loader2, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function NewsletterForm() {
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@") || !email.includes(".")) {
      setStatus("error")
      setErrorMessage("Please enter a valid email address.")
      return
    }

    setStatus("loading")
    setErrorMessage("")

    // Simulate API subscription delay
    setTimeout(() => {
      setStatus("success")
      setEmail("")
    }, 1000)
  }

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="gap-1 font-semibold text-[10px]">
          <Sparkles className="size-3 text-amber-500" />
          Weekly Curated Drops
        </Badge>
        <span className="text-xs text-muted-foreground">Join 45,000+ creators</span>
      </div>

      <p className="text-xs text-muted-foreground">
        Get free digital assets, weekly design inspiration, and exclusive discount codes directly to your inbox.
      </p>

      {status === "success" ? (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-emerald-600 dark:text-emerald-400 flex items-start gap-2.5 animate-in fade-in-50">
          <CheckCircle2 className="size-4 shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <p className="font-semibold">You&apos;re in! Welcome aboard 🎉</p>
            <p className="text-[11px] text-muted-foreground">
              We&apos;ve sent your 20% welcome discount code to your inbox.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status === "error") setStatus("idle")
                }}
                placeholder="Enter your email address..."
                className="h-10 rounded-xl bg-background text-xs border-border/80 focus-visible:ring-1 shadow-2xs"
                disabled={status === "loading"}
              />
            </div>
            <Button
              type="submit"
              disabled={status === "loading"}
              className="h-10 rounded-xl px-5 text-xs font-semibold gap-1.5 shadow-sm shrink-0"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <Send className="size-3.5" />
                </>
              )}
            </Button>
          </div>

          {status === "error" && (
            <p className="text-[11px] text-destructive font-medium">{errorMessage}</p>
          )}

          <p className="text-[10px] text-muted-foreground/70">
            Zero spam. Unsubscribe at any time with one click.
          </p>
        </form>
      )}
    </div>
  )
}

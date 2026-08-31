import * as React from "react"
import Link from "next/link"

export function StatusBadge() {
  return (
    <Link
      href="/admin"
      className="group inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15 transition-colors"
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
      </span>
      <span>All Systems Operational</span>
      <span className="text-[10px] text-emerald-600/70 dark:text-emerald-400/70 font-mono">99.99%</span>
    </Link>
  )
}

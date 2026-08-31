"use client"

import * as React from "react"
import { Search, X, TrendingUp, Sparkles, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const POPULAR_SEARCHES = [
  { title: "Next.js SaaS Boilerplate", category: "Templates", tag: "Hot" },
  { title: "Glassmorphism UI Kit", category: "UI Kits", tag: "Popular" },
  { title: "3D Fintech & Crypto Icons", category: "3D Assets", tag: "New" },
  { title: "Minimalist Portfolio Figma", category: "Design", tag: "Free" },
  { title: "Full-Stack E-Commerce Template", category: "Code", tag: "Featured" },
]

const QUICK_TAGS = ["UI Kits", "Templates", "3D Icons", "Fonts", "Figma", "Tailwind"]

export function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = React.useState("")
  const [isOpen, setIsOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Listen for Cmd+K / Ctrl+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
        setIsOpen(true)
      } else if (e.key === "Escape") {
        setIsOpen(false)
        inputRef.current?.blur()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredSearches = query.trim()
    ? POPULAR_SEARCHES.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : POPULAR_SEARCHES

  const handleSelect = (text: string) => {
    setQuery(text)
    setIsOpen(false)
  }

  const handleClear = () => {
    setQuery("")
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className={cn("relative w-full max-w-sm", className)}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 size-4 text-muted-foreground pointer-events-none" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search templates, UI kits, 3D assets..."
          className="h-9 w-full rounded-full bg-muted/60 pl-9 pr-16 text-sm placeholder:text-muted-foreground/70 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary/40 border-border/60 transition-all shadow-xs"
        />

        <div className="absolute right-2.5 flex items-center gap-1.5">
          {query ? (
            <button
              onClick={handleClear}
              className="p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
              aria-label="Clear search"
            >
              <X className="size-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          )}
        </div>
      </div>

      {/* Interactive suggestions dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border bg-popover/95 p-3 text-popover-foreground shadow-xl backdrop-blur-md animate-in fade-in-0 zoom-in-98 duration-150">
          {/* Quick tags */}
          <div className="mb-2.5 flex flex-wrap items-center gap-1.5 pb-2 border-b border-border/60">
            <span className="text-[11px] font-medium text-muted-foreground mr-1">Trending:</span>
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleSelect(tag)}
                className="inline-flex items-center rounded-md bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results list */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-2 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <TrendingUp className="size-3 text-primary" />
                {query ? "Search Results" : "Top Suggestions"}
              </span>
              <span>{filteredSearches.length} items</span>
            </div>

            {filteredSearches.length === 0 ? (
              <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                No digital assets found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              filteredSearches.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => handleSelect(item.title)}
                  className="group flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Sparkles className="size-3.5 text-primary/70 shrink-0 group-hover:text-primary" />
                    <span className="font-medium truncate">{item.title}</span>
                    <span className="text-[10px] text-muted-foreground/80 bg-muted px-1.5 py-0.5 rounded shrink-0">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Badge
                      variant={item.tag === "Hot" ? "destructive" : item.tag === "Free" ? "secondary" : "outline"}
                      className="text-[10px] h-4 px-1.5 font-semibold"
                    >
                      {item.tag}
                    </Badge>
                    <ArrowRight className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

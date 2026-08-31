"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function subscribeTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {}
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

function getThemeSnapshot() {
  if (typeof window === "undefined") return "light"
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

function getServerSnapshot() {
  return "light"
}

export function ThemeToggle() {
  const theme = React.useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerSnapshot
  )

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark")
    if (isDark) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
            aria-label="Toggle theme"
          />
        }
      >
        {theme === "dark" ? (
          <Moon className="size-4 text-primary transition-transform rotate-0 scale-100" />
        ) : (
          <Sun className="size-4 text-amber-500 transition-transform rotate-0 scale-100" />
        )}
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Switch to {theme === "light" ? "Dark" : "Light"} mode</p>
      </TooltipContent>
    </Tooltip>
  )
}

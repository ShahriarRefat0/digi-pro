"use client"

import * as React from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            className="size-8 rounded-full border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted transition-all active:scale-95"
            aria-label="Scroll back to top"
          />
        }
      >
        <ArrowUp className="size-4" />
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>Back to top</p>
      </TooltipContent>
    </Tooltip>
  )
}

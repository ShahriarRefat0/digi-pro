"use client"

import * as React from "react"
import { Globe, ChevronDown, Check } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const CURRENCIES = [
  { code: "USD", symbol: "$", name: "United States Dollar", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", flag: "🇯🇵" },
]

export function CurrencySelector() {
  const [selected, setSelected] = React.useState(CURRENCIES[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 rounded-lg border-border/70 bg-background/50 text-xs text-muted-foreground hover:text-foreground font-medium"
          />
        }
      >
        <Globe className="size-3.5 text-muted-foreground" />
        <span>{selected.flag} {selected.code} ({selected.symbol})</span>
        <ChevronDown className="size-3 opacity-60" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 p-1.5 shadow-xl rounded-xl">
        <DropdownMenuLabel className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Select Currency & Region
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {CURRENCIES.map((curr) => (
          <DropdownMenuItem
            key={curr.code}
            onClick={() => setSelected(curr)}
            className="flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">{curr.flag}</span>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground">
                  {curr.code} ({curr.symbol})
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {curr.name}
                </span>
              </div>
            </div>
            {selected.code === curr.code && (
              <Check className="size-3.5 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

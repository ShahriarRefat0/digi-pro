import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full min-h-[44px] rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 shadow-xs transition-colors file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-gray-400 focus-visible:border-[#0F766E] focus-visible:ring-1 focus-visible:ring-[#0F766E] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };


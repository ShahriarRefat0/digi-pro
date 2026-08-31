import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full rounded-xl border border-neutral-800 bg-black px-3 py-1 text-xs sm:text-sm text-white shadow-xs transition-colors file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-neutral-600 focus-visible:border-[#EEF35F] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };

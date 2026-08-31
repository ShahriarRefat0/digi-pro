import * as React from "react";
import { ProductStatus } from "@/lib/products";
import { Badge } from "@/components/ui/badge";

interface ProductStatusBadgeProps {
  status: ProductStatus;
}

export function ProductStatusBadge({ status }: ProductStatusBadgeProps) {
  if (status === "published") {
    return (
      <Badge
        variant="outline"
        className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[11px] font-semibold"
      >
        <span className="size-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
        Published
      </Badge>
    );
  }

  if (status === "draft") {
    return (
      <Badge
        variant="outline"
        className="border-amber-500/30 bg-amber-500/10 text-amber-300 font-mono text-[11px] font-semibold"
      >
        <span className="size-1.5 rounded-full bg-amber-400 mr-1" />
        Draft
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="border-neutral-800 bg-neutral-900 text-neutral-400 font-mono text-[11px] font-semibold"
    >
      Archived
    </Badge>
  );
}

export default ProductStatusBadge;

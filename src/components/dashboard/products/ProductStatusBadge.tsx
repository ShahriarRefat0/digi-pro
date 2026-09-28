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
        className="border-emerald-200 bg-emerald-50 text-emerald-700 font-semibold text-[11px]"
      >
        <span className="size-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
        Published
      </Badge>
    );
  }

  if (status === "draft") {
    return (
      <Badge
        variant="outline"
        className="border-amber-200 bg-amber-50 text-amber-700 font-semibold text-[11px]"
      >
        <span className="size-1.5 rounded-full bg-amber-500 mr-1.5" />
        Draft
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="border-gray-200 bg-gray-100 text-gray-600 font-semibold text-[11px]"
    >
      Archived
    </Badge>
  );
}

export default ProductStatusBadge;


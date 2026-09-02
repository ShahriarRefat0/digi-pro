import { NextRequest, NextResponse } from "next/server";
import { searchAll } from "@/lib/search";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const isFull = searchParams.get("full") === "true";

    const results = await searchAll(query, {
      limitPerCategory: isFull
        ? { products: 50, services: 20, blogs: 20, pages: 10 }
        : { products: 5, services: 3, blogs: 3, pages: 3 },
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("API Search error:", error);
    return NextResponse.json(
      {
        products: [],
        services: [],
        blogs: [],
        pages: [],
        totalCount: 0,
        error: "Failed to perform search",
      },
      { status: 500 }
    );
  }
}

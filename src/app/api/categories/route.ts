import { NextResponse } from "next/server";
import { getCategories, seedInitialCategoriesIfEmpty } from "@/lib/categories/category.repository";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const navbarOnly = searchParams.get("navbar") === "true";
    const activeOnly = searchParams.get("active") !== "false";

    await seedInitialCategoriesIfEmpty();
    const categories = await getCategories({
      activeOnly,
      navbarOnly,
    });

    return NextResponse.json({ success: true, categories });
  } catch (error: any) {
    console.error("API GET /api/categories error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

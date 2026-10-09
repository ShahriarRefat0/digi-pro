import * as React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import {
  getCategories,
  seedInitialCategoriesIfEmpty,
} from "@/lib/categories/category.repository";
import { CategoriesAdminClient } from "./categories-admin-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Category Management — Careoffbd Admin",
  description: "Manage storefront product categories, navbar visibility, and hierarchy.",
};

export default async function AdminCategoriesPage() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    redirect("/login");
  }

  // Ensure database has default categories seeded if empty
  await seedInitialCategoriesIfEmpty();
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-gray-900 tracking-tight">
          Category Management
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Manage product categories, subcategories, navbar display order, and storefront filters.
        </p>
      </div>

      <CategoriesAdminClient initialCategories={categories} />
    </div>
  );
}

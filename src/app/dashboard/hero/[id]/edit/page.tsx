import { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { getHeroSlideById } from "@/lib/hero/hero.repository";
import { HeroSlideForm } from "@/components/dashboard/hero/HeroSlideForm";

export const metadata: Metadata = {
  title: "Edit Hero Slide | Careproff Admin",
  description: "Edit existing hero slide details",
};

interface EditHeroSlidePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditHeroSlidePage({ params }: EditHeroSlidePageProps) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    redirect("/login");
  }

  const { id } = await params;
  const slide = await getHeroSlideById(id);

  if (!slide) {
    notFound();
  }

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto">
      <HeroSlideForm initialData={slide} isEdit />
    </div>
  );
}

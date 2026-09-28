import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { getHeroSlides } from "@/lib/hero/hero.repository";
import { HeroSlidesTable } from "@/components/dashboard/hero/HeroSlidesTable";

export const metadata: Metadata = {
  title: "Manage Hero Slides | Careproff Admin",
  description: "Admin hero carousel slide management",
};

export const dynamic = "force-dynamic";

export default async function ManageHeroPage() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    redirect("/login");
  }

  const slides = await getHeroSlides();

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      <HeroSlidesTable slides={slides} />
    </div>
  );
}

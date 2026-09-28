import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { HeroSlideForm } from "@/components/dashboard/hero/HeroSlideForm";

export const metadata: Metadata = {
  title: "Add Hero Slide | Careproff Admin",
  description: "Create a new homepage hero carousel slide",
};

export default async function NewHeroSlidePage() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto">
      <HeroSlideForm />
    </div>
  );
}

import { redirect } from "next/navigation";

interface BlogSlugParams {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogSlugRedirectPage({ params }: BlogSlugParams) {
  const { slug } = await params;
  redirect(`/care-journal/${slug}`);
}

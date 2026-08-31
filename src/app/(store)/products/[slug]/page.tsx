import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 w-full">
        <div className="rounded-2xl border bg-card p-8 shadow-sm">
          <Badge variant="secondary" className="mb-3">
            Digital Asset Details
          </Badge>
          <h1 className="text-3xl font-extrabold font-heading mb-2">
            Product: {slug}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Instant digital download package with full commercial licensing and lifetime updates.
          </p>

          <div className="flex items-center gap-3">
            <Button className="gap-2">
              <Download className="size-4" />
              Download Asset
            </Button>
            <Button variant="outline">Preview Files</Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

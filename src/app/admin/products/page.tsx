import * as React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, UploadCloud } from "lucide-react";

export default function AdminProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center gap-2 mb-6">
          <Button
            variant="ghost"
            size="sm"
            render={<Link href="/admin" />}
            className="gap-1 text-xs"
          >
            <ArrowLeft className="size-3.5" />
            Back to Dashboard
          </Button>
        </div>

        <div className="rounded-2xl border bg-card p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b">
            <div>
              <Badge variant="secondary" className="mb-1 text-xs">
                Creator Studio
              </Badge>
              <h1 className="text-2xl font-extrabold tracking-tight font-heading">
                Publish Digital Asset
              </h1>
              <p className="text-xs text-muted-foreground mt-1">
                Upload your UI kit, 3D icon set, or Next.js template to start
                earning.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-12 text-center bg-muted/20">
            <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <UploadCloud className="size-7" />
            </div>
            <h3 className="text-base font-bold text-foreground mb-1">
              Drag and drop your asset files here
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mb-6">
              Supports .ZIP, .FIG, .GLTF, .BLENDER, and .OTF files up to 2GB per
              asset.
            </p>
            <Button
              size="sm"
              className="rounded-xl px-5 text-xs font-semibold gap-2"
            >
              <Plus className="size-3.5" />
              Select ZIP Archive
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { generateSignedUploadParams } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // 1. Verify admin authentication
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in as an admin to upload images." },
        { status: 401 }
      );
    }

    // 2. Parse parameters to sign
    const body = await request.json().catch(() => ({}));
    const folder = body.folder || "digiforge/products";
    const publicId = body.public_id || undefined;

    const paramsToSign: Record<string, string | number> = {
      folder,
    };

    if (publicId) {
      paramsToSign.public_id = publicId;
    }

    // 3. Generate signed upload parameters
    const signedData = await generateSignedUploadParams(paramsToSign);

    return NextResponse.json(signedData);
  } catch (error: any) {
    console.error("Error signing Cloudinary upload params:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate upload signature" },
      { status: 500 }
    );
  }
}

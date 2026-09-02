import { v2 as cloudinary } from "cloudinary";

function getCleanEnv(val?: string): string {
  if (!val) return "";
  return val.trim().replace(/^["']|["']$/g, "");
}

cloudinary.config({
  cloud_name: getCleanEnv(
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      process.env.CLOUDINARY_CLOUD_NAME
  ),
  api_key: getCleanEnv(
    process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY
  ),
  api_secret: getCleanEnv(process.env.CLOUDINARY_API_SECRET),
  secure: true,
});

export interface SignedUploadParams {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder?: string;
}

/**
 * Generate secure signature for signed Cloudinary uploads
 */
export async function generateSignedUploadParams(
  paramsToSign: Record<string, string | number> = {}
): Promise<SignedUploadParams> {
  const apiSecret = getCleanEnv(process.env.CLOUDINARY_API_SECRET);
  const apiKey = getCleanEnv(
    process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY
  );
  const cloudName = getCleanEnv(
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      process.env.CLOUDINARY_CLOUD_NAME
  );

  if (!apiSecret || !apiKey || !cloudName) {
    const missing: string[] = [];
    if (!cloudName) missing.push("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME");
    if (!apiKey) missing.push("NEXT_PUBLIC_CLOUDINARY_API_KEY");
    if (!apiSecret) missing.push("CLOUDINARY_API_SECRET");

    throw new Error(
      `Cloudinary configuration missing in .env (${missing.join(", ")}). Please configure them and restart the dev server.`
    );
  }

  const timestamp = Math.round(new Date().getTime() / 1000);
  const cleanParams: Record<string, string | number> = {
    timestamp,
    ...paramsToSign,
  };

  // Remove undefined / empty keys before signing
  Object.keys(cleanParams).forEach((key) => {
    if (cleanParams[key] === undefined || cleanParams[key] === "") {
      delete cleanParams[key];
    }
  });

  const signature = cloudinary.utils.api_sign_request(cleanParams, apiSecret);

  return {
    signature,
    timestamp,
    apiKey,
    cloudName,
    folder: paramsToSign.folder as string | undefined,
  };
}

/**
 * Delete a single asset from Cloudinary using publicId
 */
export async function deleteCloudinaryImage(publicId: string): Promise<boolean> {
  if (!publicId) return false;
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
      resource_type: "image",
    });
    return result.result === "ok";
  } catch (error) {
    console.error(`Error deleting Cloudinary image (${publicId}):`, error);
    return false;
  }
}

/**
 * Batch delete multiple assets from Cloudinary using publicIds
 */
export async function deleteMultipleCloudinaryImages(
  publicIds: (string | undefined | null)[]
): Promise<void> {
  const validIds = publicIds.filter((id): id is string => Boolean(id && typeof id === "string"));
  if (validIds.length === 0) return;

  try {
    await Promise.allSettled(
      validIds.map((id) =>
        cloudinary.uploader.destroy(id, { invalidate: true, resource_type: "image" })
      )
    );
  } catch (error) {
    console.error("Error deleting Cloudinary images in batch:", error);
  }
}

export default cloudinary;

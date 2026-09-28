import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || "";
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || "";
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || "";
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "digi-pro-store-r2";
const R2_PUBLIC_URL = (process.env.NEXT_PUBLIC_R2_PUBLIC_URL || process.env.R2_PUBLIC_URL || "").replace(/\/$/, "");

const isR2Configured = Boolean(
  R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY
);

let s3Client: S3Client | null = null;

if (isR2Configured) {
  const endpoint = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
  s3Client = new S3Client({
    region: "auto",
    endpoint,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });
}

export interface UploadR2Result {
  url: string;
  key: string;
}

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * Validate image MIME type and file size server-side
 */
export function validateHeroImageFile(file: File | { type: string; size: number }): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: "No image file provided" };
  }
  if (!ALLOWED_MIME_TYPES.has(file.type.toLowerCase())) {
    return { valid: false, error: "Invalid image format. Allowed: JPG, PNG, WEBP, AVIF" };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: "File size exceeds 10MB limit" };
  }
  return { valid: true };
}

/**
 * Upload buffer or file to Cloudflare R2 (or fallback storage if R2 env is not configured)
 */
export async function uploadToR2(
  buffer: Buffer,
  fileName: string,
  contentType: string,
  variant: "desktop" | "mobile"
): Promise<UploadR2Result> {
  const uniqueId = crypto.randomBytes(8).toString("hex");
  const ext = fileName.split(".").pop()?.toLowerCase() || "webp";
  const key = `hero/${uniqueId}/${variant}.${ext}`;

  if (s3Client && R2_BUCKET_NAME) {
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    });

    await s3Client.send(command);

    const publicUrl = R2_PUBLIC_URL
      ? `${R2_PUBLIC_URL}/${key}`
      : `https://${R2_BUCKET_NAME}.${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${key}`;

    return { url: publicUrl, key };
  }

  // Fallback storage in development when R2 environment variables are missing
  const localDir = path.join(process.cwd(), "public", "uploads", "hero", uniqueId);
  await fs.promises.mkdir(localDir, { recursive: true });
  const filePath = path.join(localDir, `${variant}.${ext}`);
  await fs.promises.writeFile(filePath, buffer);

  const localUrl = `/uploads/hero/${uniqueId}/${variant}.${ext}`;
  return { url: localUrl, key };
}

/**
 * Delete R2 object by key (or delete local fallback file if applicable)
 */
export async function deleteFromR2(key: string): Promise<boolean> {
  if (!key) return false;

  try {
    if (s3Client && R2_BUCKET_NAME) {
      const command = new DeleteObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
      });
      await s3Client.send(command);
      return true;
    }

    // Local fallback deletion
    if (key.startsWith("hero/")) {
      const localPath = path.join(process.cwd(), "public", "uploads", key);
      if (fs.existsSync(localPath)) {
        await fs.promises.unlink(localPath);
      }
    }
    return true;
  } catch (error) {
    console.error(`Error deleting object from R2 (key: ${key}):`, error);
    return false;
  }
}

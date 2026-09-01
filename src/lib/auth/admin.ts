import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { getDatabase } from "@/lib/mongodb";

export interface AdminDocument {
  _id?: ObjectId;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: Date;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

const ADMIN_COLLECTION = "admins";

/**
 * Look up admin document by email (case-insensitive)
 */
export async function getAdminByEmail(email: string): Promise<AdminDocument | null> {
  try {
    const db = await getDatabase();
    const admin = await db
      .collection<AdminDocument>(ADMIN_COLLECTION)
      .findOne({ email: email.toLowerCase().trim() });
    return admin;
  } catch (error) {
    console.error("Database lookup error:", error);
    return null;
  }
}

/**
 * Verify admin credentials securely against bcrypt hash in MongoDB
 */
export async function verifyAdminCredentials(
  email: string,
  plainPassword: string
): Promise<AdminUser | null> {
  if (!email || !plainPassword) return null;

  const admin = await getAdminByEmail(email);
  if (!admin || !admin.passwordHash) {
    return null;
  }

  const isValid = await bcrypt.compare(plainPassword, admin.passwordHash);
  if (!isValid) {
    return null;
  }

  return {
    id: admin._id ? admin._id.toString() : "admin",
    email: admin.email,
    name: admin.name || "Admin",
  };
}

/**
 * Create initial admin (idempotent: only creates if no admin exists)
 */
export async function createInitialAdmin(
  email: string,
  plainPassword: string,
  name: string = "Admin"
): Promise<{ success: boolean; message: string }> {
  try {
    const db = await getDatabase();
    const count = await db.collection(ADMIN_COLLECTION).countDocuments();

    if (count > 0) {
      return { success: false, message: "Admin account already exists in database." };
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(plainPassword, salt);

    const newAdmin: AdminDocument = {
      email: email.toLowerCase().trim(),
      passwordHash,
      name,
      createdAt: new Date(),
    };

    await db.collection<AdminDocument>(ADMIN_COLLECTION).insertOne(newAdmin);
    return { success: true, message: `Admin account created successfully for ${email}.` };
  } catch (error: any) {
    console.error("Error creating admin account:", error);
    return { success: false, message: error.message || "Failed to create admin." };
  }
}

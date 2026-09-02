import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

async function seedAdmin() {
  const uri = process.env.DATA_BASE_URL;
  const email = process.env.USER_EMAIL?.toLowerCase().trim();
  const plainPassword = process.env.USER_PASSWORD;
  const name = process.env.USER_ROLE?.trim();

  if (!uri) {
    console.error("❌ Error: DATA_BASE_URL is not defined in .env");
    process.exit(1);
  }

  if (!email) {
    console.error("❌ Error: USER_EMAIL is not defined in .env");
    process.exit(1);
  }

  if (!plainPassword) {
    console.error("❌ Error: USER_PASSWORD is not defined in .env");
    process.exit(1);
  }

  if (!name) {
    console.error("❌ Error: USER_ROLE is not defined in .env");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB.");

    const db = client.db("digipro_store");
    const adminsCollection = db.collection("admins");

    // Check if admin already exists
    const existingCount = await adminsCollection.countDocuments();
    if (existingCount > 0) {
      const existingAdmin = await adminsCollection.findOne({});
      console.log(`ℹ️  Admin already exists: ${existingAdmin?.email}. No action required.`);
      return;
    }

    // Hash the password securely
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(plainPassword, salt);

    const newAdmin = {
      email,
      passwordHash,
      name,
      createdAt: new Date(),
    };

    await adminsCollection.insertOne(newAdmin);
    console.log(`✅ Admin account created successfully!`);
    console.log(`   Email: ${email}`);
    console.log(`   Role: ${name}`);
    console.log(`   Password hash stored securely in MongoDB collection 'admins'.`);
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  } finally {
    await client.close();
    console.log("Database connection closed.");
  }
}

seedAdmin();

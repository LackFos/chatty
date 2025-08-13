import mongoose from "mongoose";
import AppSetupError from "@/enums/app.setup.error";

async function connectToDatabase(): Promise<void> {
  try {
    console.log("🚀 Connecting to MongoDB...");

    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("⚠️ MONGODB_URI env is not defined");
    }

    await mongoose.connect(uri);
    const db = mongoose.connection.db;

    if (!db) {
      throw new Error("⚠️ Failed to connect to MongoDB");
    }

    const ping = await db.command({ ping: 1 });

    if (ping.ok !== 1) {
      throw new Error("⚠️ Failed to ping MongoDB");
    }

    console.log("⚡️ Connected to MongoDB");
  } catch (error) {
    throw Error(`${AppSetupError.DATABASE_SETUP_ERROR}: ${error}`);
  }
}

export default connectToDatabase;

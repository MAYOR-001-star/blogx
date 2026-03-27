import mongoose from "mongoose";

export const connectToDb = async () => {
  // readyState: 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
  if (mongoose.connection.readyState === 1) return;

  try {
    // Use the connection string from .env
    const mongoUri = process.env.MONGO as string;

    await mongoose.connect(mongoUri, {
      // TLS options (optional but recommended for secure connections)
      tls: true,
      // For local self-signed certificates, provide the CA file
      // tlsCAFile: "./ca.pem", // uncomment and set path for local dev
      // tlsAllowInvalidCertificates: false, // true only for testing
    });

    console.log("✅ Connected to database:", mongoose.connection.name);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

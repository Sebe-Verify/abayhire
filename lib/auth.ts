import { betterAuth } from "better-auth";
import { Pool } from "pg";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

export const auth = betterAuth({
  database: new Pool({
    connectionString,
  }),
  emailAndPassword: { enabled: true },
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"],
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});
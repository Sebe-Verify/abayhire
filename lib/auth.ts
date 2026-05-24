import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import "dotenv/config";

const appUrl =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  experimental: {
    joins: true,
  },
  emailAndPassword: { enabled: true },
  trustedOrigins: [appUrl],
  baseURL: appUrl,
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "JOB_SEEKER",
        input: true,
      },
    },
  },
});

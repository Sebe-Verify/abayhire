"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import "dotenv/config";

export async function checkVerificationStatus(): Promise<{
  verified: boolean;
  verifiedAt: Date | null;
}> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { verified: false, verifiedAt: null };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { verifiedAt: true },
  });

  const verifiedAt = user?.verifiedAt;

  return {
    verified: !!verifiedAt,
    verifiedAt: verifiedAt || null,
  };
}

export async function completeVerification(
  _sessionId: string,
): Promise<{ success: boolean }> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { verifiedAt: new Date() },
  });

  return { success: true };
}

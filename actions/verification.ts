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
  sessionId: string,
): Promise<{ success: boolean }> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Store the SebeVerify session ID so the webhook can link it back to this user.
  // verifiedAt is set by the webhook once the backend confirms the result.
  await prisma.user.update({
    where: { id: session.user.id },
    data: { pendingVerificationSessionId: sessionId },
  });

  return { success: true };
}

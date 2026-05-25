"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import "dotenv/config";

export async function checkVerificationStatus(): Promise<{
  verified: boolean;
  verifiedAt: Date | null;
  failed: boolean;
  failureReason: string | null;
  pending: boolean;
  pendingSessionId: string | null;
}> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return {
      verified: false,
      verifiedAt: null,
      failed: false,
      failureReason: null,
      pending: false,
      pendingSessionId: null,
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      verifiedAt: true,
      verificationFailedAt: true,
      verificationFailureReason: true,
      pendingVerificationSessionId: true,
    },
  });

  const verifiedAt = user?.verifiedAt ?? null;

  return {
    verified: !!verifiedAt,
    verifiedAt,
    failed: !verifiedAt && !!user?.verificationFailedAt,
    failureReason: user?.verificationFailureReason ?? null,
    pending: !verifiedAt && !!user?.pendingVerificationSessionId,
    pendingSessionId: user?.pendingVerificationSessionId ?? null,
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
  // Clear any prior failure state — this is a fresh attempt; the webhook will
  // set verifiedAt or verificationFailedAt once the backend reports the result.
  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      pendingVerificationSessionId: sessionId,
      verificationFailedAt: null,
      verificationFailureReason: null,
    },
  });

  return { success: true };
}

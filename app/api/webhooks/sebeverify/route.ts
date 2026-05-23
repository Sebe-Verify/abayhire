import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Statuses the SebeVerify backend can send
const TERMINAL_VERIFIED = "VERIFIED";
const TERMINAL_FAILED = new Set(["FAILED", "OCR_FAILED", "FACE_MATCH_FAILED"]);

const FAILURE_REASONS: Record<string, string> = {
  OCR_FAILED:
    "We couldn't read your ID document clearly. Please try again with a sharper, well-lit photo.",
  FACE_MATCH_FAILED:
    "Your selfie didn't match the photo on your ID. Please try again in good lighting.",
  FAILED:
    "Verification didn't go through. Please try again.",
};

interface WebhookPayload {
  request_id: string;
  project_id: string;
  org_id: string;
  status: string;
  document_type: string | null;
  risk_score: number | null;
  meta_data: Record<string, unknown>;
  sent_at: string;
}

export async function POST(req: NextRequest) {
  let payload: WebhookPayload;
  try {
    payload = (await req.json()) as WebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const expectedProjectId = process.env.NEXT_PUBLIC_SEBEVERIFY_PROJECT_ID;
  if (!expectedProjectId || payload.project_id !== expectedProjectId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { status, meta_data } = payload;
  const sessionId = meta_data?.session_id;

  if (typeof sessionId !== "string" || !sessionId) {
    // No session to link — nothing to do, ack so the backend doesn't retry.
    return NextResponse.json({ received: true });
  }

  try {
    if (status === TERMINAL_VERIFIED) {
      const result = await prisma.user.updateMany({
        where: { pendingVerificationSessionId: sessionId },
        data: {
          verifiedAt: new Date(),
          pendingVerificationSessionId: null,
          verificationFailedAt: null,
          verificationFailureReason: null,
        },
      });
      // If no user matched, the browser hasn't stored pendingVerificationSessionId yet
      // (race between webhook delivery and the dashboard redirect). Return 4xx so the
      // backend retries — by the next attempt the session ID will be in the DB.
      if (result.count === 0) {
        return NextResponse.json({ error: "session not registered yet" }, { status: 404 });
      }
    } else if (TERMINAL_FAILED.has(status)) {
      const result = await prisma.user.updateMany({
        where: { pendingVerificationSessionId: sessionId },
        data: {
          pendingVerificationSessionId: null,
          verificationFailedAt: new Date(),
          verificationFailureReason:
            FAILURE_REASONS[status] ?? FAILURE_REASONS.FAILED,
        },
      });
      if (result.count === 0) {
        return NextResponse.json({ error: "session not registered yet" }, { status: 404 });
      }
    }
    // Intermediate statuses (OCR_COMPLETED, FACE_MATCH_COMPLETED, PENDING) are ignored.
  } catch (err) {
    console.error("Webhook DB update failed:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

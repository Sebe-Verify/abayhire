import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_SEBEVERIFY_API_KEY || "";
  const projectId = process.env.NEXT_PUBLIC_SEBEVERIFY_PROJECT_ID || "";

  return NextResponse.json({
    apiKey,
    projectId,
  });
}

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    apiKey: process.env.NEXT_PUBLIC_SEBEVERIFY_API_KEY || "",
    projectId: process.env.NEXT_PUBLIC_SEBEVERIFY_PROJECT_ID || "",
    backendUrl: process.env.NEXT_PUBLIC_SEBEVERIFY_BACKEND_URL || "",
    webAppUrl: process.env.NEXT_PUBLIC_SEBEVERIFY_SDK_WEB_APP_URL || "",
  });
}

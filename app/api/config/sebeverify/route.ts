import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_SEBEVERIFY_API_KEY || "";
  const projectId = process.env.NEXT_PUBLIC_SEBEVERIFY_PROJECT_ID || "";
  const backendUrl = process.env.NEXT_PUBLIC_SEBEVERIFY_BACKEND_URL || "";
  const webAppUrl = process.env.NEXT_PUBLIC_SEBEVERIFY_SDK_WEB_APP_URL || "";

  return NextResponse.json({
    apiKey,
    projectId,
    backendUrl,
    webAppUrl,
    diagnostics: {
      apiKeyPrefix: apiKey.slice(0, 4),
      apiKeyLength: apiKey.length,
      projectIdLength: projectId.length,
      backendUrl,
      webAppUrl,
    },
  });
}

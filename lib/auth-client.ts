"use client";

import { createAuthClient } from "better-auth/react";
import { useState, useEffect } from "react";

const appUrl =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");

export const authClient = createAuthClient({
  baseURL: appUrl,
});

export function useSession() {
  const [session, setSession] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authClient.getSession().then((data) => {
      const response = data as { session?: unknown; data?: { session?: unknown } };
      setSession(response.data?.session ?? response.session ?? null);
      setLoading(false);
    });
  }, []);

  return { session, loading };
}

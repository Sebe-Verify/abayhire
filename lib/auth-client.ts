"use client";

import { createAuthClient } from "better-auth/react";
import { useState, useEffect } from "react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

export function useSession() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authClient.getSession().then((data: any) => {
      setSession(data?.session ?? null);
      setLoading(false);
    });
  }, []);

  return { session, loading };
}
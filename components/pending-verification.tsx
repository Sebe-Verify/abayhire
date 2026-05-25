"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PendingVerificationProps {
  pendingSessionId: string | null;
}

export function PendingVerification({ pendingSessionId }: PendingVerificationProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Poll every 5 seconds — when the webhook fires and verifiedAt is set,
  // the server re-render will redirect the user to the full dashboard.
  useEffect(() => {
    const id = setInterval(() => router.refresh(), 5000);
    return () => clearInterval(id);
  }, [router]);

  const handleContinue = async () => {
    if (!pendingSessionId) return;
    setLoading(true);
    setError(null);

    try {
      const configRes = await fetch("/api/config/sebeverify", {
        method: "GET",
        cache: "no-store",
      });

      if (!configRes.ok) {
        throw new Error("Unable to load SebeVerify runtime config");
      }

      const config = (await configRes.json()) as {
        apiKey?: string;
        projectId?: string;
      };

      const { apiKey, projectId } = config;

      if (!apiKey || !projectId) {
        throw new Error("Missing SebeVerify configuration");
      }

      const qs = new URLSearchParams({
        returnUrl: `${window.location.origin}/dashboard`,
        projectId,
        apiKey,
      });
      window.location.href = `https://sebe-verify-sdk.vercel.app/verify/${pendingSessionId}?${qs.toString()}`;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to resume verification");
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 py-12 lg:py-20 gradient-mesh">
      <div className="container mx-auto px-6">
        <div className="max-w-lg mx-auto">
          <div className="card-elevated p-8 text-center animate-fade-in-up">
            <div className="w-20 h-20 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-amber-600 animate-spin"
                style={{ animationDuration: "2s" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83"
                />
              </svg>
            </div>

            <h1 className="font-[family-name:var(--font-display)] text-2xl text-[var(--charcoal)] mb-3">
              Verification Under Review
            </h1>

            <p className="text-[var(--warm-gray)] mb-6">
              Your documents have been submitted and are being reviewed. This
              usually takes under a minute. This page will update automatically.
            </p>

            <div className="flex items-center justify-center gap-2 text-sm text-[var(--warm-gray)] mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              Checking for updates…
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}

            {pendingSessionId && (
              <>
                <button
                  onClick={handleContinue}
                  disabled={loading}
                  className="btn-secondary w-full text-sm"
                >
                  {loading ? "Resuming…" : "Continue to Verification"}
                </button>

                <p className="mt-3 text-xs text-[var(--warm-gray)]">
                  Taking too long? Resume where you left off.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function PendingVerification() {
  const router = useRouter();

  // Poll every 5 seconds — when the webhook fires and verifiedAt is set,
  // the server re-render will redirect the user to the full dashboard.
  useEffect(() => {
    const id = setInterval(() => router.refresh(), 5000);
    return () => clearInterval(id);
  }, [router]);

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

            <div className="flex items-center justify-center gap-2 text-sm text-[var(--warm-gray)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              Checking for updates…
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

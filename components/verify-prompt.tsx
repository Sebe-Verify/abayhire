"use client";

import { useState } from "react";
import SebeVerify from "sebeverify-sdk";

interface User {
  id: string;
  name: string;
  email: string;
}

export function VerifyPrompt({ user: _user }: { user: User }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
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

      const apiKey = config.apiKey;
      const projectId = config.projectId;

      if (!apiKey || !projectId) {
        throw new Error(
          "Missing SebeVerify env vars: NEXT_PUBLIC_SEBEVERIFY_API_KEY, NEXT_PUBLIC_SEBEVERIFY_PROJECT_ID",
        );
      }

      const apiKeyPattern = /^svk_[0-9a-fA-F-]+\.[-_A-Za-z0-9]+$/;
      if (!apiKeyPattern.test(apiKey)) {
        throw new Error(
          "Invalid NEXT_PUBLIC_SEBEVERIFY_API_KEY format. Use the raw_key value (svk_<key_id>.<secret>) returned by POST /projects/{project_id}/api-keys or regenerate endpoint.",
        );
      }

      const verifier = SebeVerify({
        apiKey,
        projectId,
        redirectUrl: `${window.location.origin}/dashboard`,
        
      });

      await verifier.start();
      // start() resolves immediately after showing the modal (desktop) or navigating (mobile).
      // Re-enable the button so the user can retry if they cancel the modal.
      setLoading(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to start verification");
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
                className="w-10 h-10 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>

            <h1 className="font-[family-name:var(--font-display)] text-2xl text-[var(--charcoal)] mb-3">
              Verification Required
            </h1>

            <p className="text-[var(--warm-gray)] mb-6">
              To protect our community, we need to verify your identity before
              you can access the dashboard.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={handleVerify}
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? "Starting..." : "Verify Profile"}
            </button>

            <p className="mt-4 text-xs text-[var(--warm-gray)]">
              This will open the SebeVerify SDK flow to complete identity
              verification.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

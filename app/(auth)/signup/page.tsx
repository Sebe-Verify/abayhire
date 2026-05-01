"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { AuthLayout } from "@/components/ui/auth-form";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"JOB_SEEKER" | "EMPLOYER">("JOB_SEEKER");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      setError(error.message || "Failed to sign up");
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join Ethiopia's growing professional community."
      footerText="Already have an account?"
      footerLink="Sign in"
      footerHref="/signin"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded text-sm text-red-600 animate-fade-in">
            {error}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-semibold text-[var(--charcoal)] mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            placeholder="John Doe"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-[var(--charcoal)] mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--charcoal)] mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            placeholder="••••••••"
            required
            minLength={8}
          />
          <p className="text-xs text-[var(--warm-gray)] mt-1">Minimum 8 characters</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--charcoal)] mb-2">
            I want to
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("JOB_SEEKER")}
              className={`p-4 rounded border-2 transition-all text-left ${
                role === "JOB_SEEKER"
                  ? "border-[var(--terracotta)] bg-[var(--cream)]"
                  : "border-[var(--cream-dark)] hover:border-[var(--warm-gray)]"
              }`}
            >
              <div className="font-semibold text-[var(--charcoal)]">Find a Job</div>
              <div className="text-xs text-[var(--warm-gray)]">Browse & apply</div>
            </button>
            <button
              type="button"
              onClick={() => setRole("EMPLOYER")}
              className={`p-4 rounded border-2 transition-all text-left ${
                role === "EMPLOYER"
                  ? "border-[var(--terracotta)] bg-[var(--cream)]"
                  : "border-[var(--cream-dark)] hover:border-[var(--warm-gray)]"
              }`}
            >
              <div className="font-semibold text-[var(--charcoal)]">Hire Talent</div>
              <div className="text-xs text-[var(--warm-gray)]">Post & manage jobs</div>
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Creating account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
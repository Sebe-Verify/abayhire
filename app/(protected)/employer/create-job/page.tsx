"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createJob } from "@/actions";
import { ThemeToggle } from "@/components/theme-toggle";

export default function CreateJobPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("FULL_TIME");
  const [salary, setSalary] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createJob({
        title,
        description,
        location,
        type,
        salary: salary ? parseFloat(salary) : undefined,
      });
      router.push("/employer");
    } catch (err: any) {
      setError(err.message || "Failed to create job");
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen gradient-mesh">
      <header className="bg-[var(--surface)] border-b border-[var(--border)] py-5">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="font-[family-name:var(--font-display)] text-2xl text-[var(--foreground)]">
            Abay<span className="text-[var(--terracotta)]">Hire</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--terracotta)] transition-colors">
              Dashboard
            </Link>
            <Link href="/employer" className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--terracotta)] transition-colors">
              Manage Jobs
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-1 py-12 lg:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <Link
              href="/employer"
              className="inline-flex items-center gap-2 text-[var(--warm-gray)] hover:text-[var(--terracotta)] transition-colors mb-8 animate-fade-in-up"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Manage Jobs
            </Link>

            <div className="card-elevated p-8 animate-fade-in-up stagger-1">
              <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--foreground)] mb-2">
                Post a New Job
              </h1>
              <p className="text-[var(--warm-gray)] mb-8">
                Fill in the details to attract top talent.
              </p>

              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-600 dark:text-red-400 animate-fade-in">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-field"
                    placeholder="e.g. Senior Software Engineer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    className="input-field resize-none"
                    placeholder="Describe the role, responsibilities, and requirements..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input-field"
                    placeholder="e.g. Addis Ababa, Ethiopia"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                    Job Type
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setType(t)}
                        className={`p-3 rounded border-2 text-sm transition-all ${
                          type === t
                            ? "border-[var(--terracotta)] bg-[var(--cream)] text-[var(--foreground)]"
                            : "border-[var(--border)] text-[var(--warm-gray)] hover:border-[var(--warm-gray)]"
                        }`}
                      >
                        {t.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                    Annual Salary (optional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--warm-gray)]">$</span>
                    <input
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      className="input-field pl-8"
                      placeholder="50000"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full text-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Posting Job...
                    </span>
                  ) : (
                    "Post Job"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
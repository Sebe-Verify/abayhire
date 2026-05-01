import Link from "next/link";
import { getJobs } from "@/actions";
import { Header } from "@/components/ui/header";
import { JobCard } from "@/components/ui/job-card";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-12 lg:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <h1 className="font-[family-name:var(--font-display)] text-4xl lg:text-5xl text-[var(--charcoal)] mb-4 animate-fade-in-up">
              Open Positions
            </h1>
            <p className="text-lg text-[var(--warm-gray)] animate-fade-in-up stagger-1">
              Discover your next opportunity from Ethiopia&apos;s top employers.
            </p>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <div className="w-24 h-24 mx-auto mb-6 bg-[var(--cream)] rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-[var(--warm-gray)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--charcoal)] mb-2">
                No Positions Available
              </h2>
              <p className="text-[var(--warm-gray)] mb-6">
                Check back soon for new opportunities.
              </p>
              <Link href="/" className="btn-primary inline-block">
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {jobs.map((job, index) => (
                <div
                  key={job.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-[var(--charcoal)] text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="font-[family-name:var(--font-display)] text-xl">
              Abay<span className="text-[var(--terracotta)]">Hire</span>
            </Link>
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} AbayHire. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
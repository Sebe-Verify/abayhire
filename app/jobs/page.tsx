import Link from "next/link";
import { getJobs, getCurrentUserSummary } from "@/actions";
import { signOut } from "@/actions/signout";
import { getNotifications } from "@/actions/notifications";
import { Header } from "@/components/ui/header";
import { JobCard } from "@/components/ui/job-card";
import { JobSearchFilters } from "@/components/ui/job-search-filters";
import { SiteFooter } from "@/components/ui/site-footer";

export const dynamic = "force-dynamic";

type JobsPageProps = {
  searchParams: Promise<{
    query?: string;
    location?: string;
    type?: string;
  }>;
};

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams;
  const [jobs, currentUser] = await Promise.all([
    getJobs({
      query:    params.query,
      location: params.location,
      type:     params.type,
    }),
    getCurrentUserSummary(),
  ]);
  const notifications = currentUser ? await getNotifications() : [];

  const hasFilters = Boolean(params.query || params.location || params.type);

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        user={currentUser ? { name: currentUser.name, email: currentUser.email } : null}
        onSignOut={currentUser ? signOut : undefined}
        notifications={notifications}
      />

      <main className="flex-1">

        {/* ── Search hero ────────────────────────── */}
        <section className="gradient-mesh py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="mb-10 max-w-2xl animate-fade-in-up">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                Job discovery
              </span>
              <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-text">
                Search open roles with more signal and less friction.
              </h1>
              <p className="mt-4 text-text-muted text-[1.0625rem] leading-relaxed animate-fade-in-up stagger-1">
                Keyword search, location-aware filtering, and cleaner job cards designed for serious candidates.
              </p>
            </div>

            <div className="animate-fade-in-up stagger-2">
              <JobSearchFilters />
            </div>
          </div>
        </section>

        {/* ── Results ───────────────────────────── */}
        <section className="bg-surface py-12 md:py-16">
          <div className="container mx-auto px-6">

            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-display text-3xl text-text">
                  <span className="text-primary">{jobs.length}</span>{" "}
                  open role{jobs.length === 1 ? "" : "s"}
                </h2>
                <p className="mt-1.5 text-sm text-text-muted">
                  {hasFilters
                    ? "Filtered results based on your current search."
                    : "Browse active opportunities from employers hiring now."}
                </p>
              </div>
              {hasFilters && (
                <Link
                  href="/jobs"
                  className="text-sm font-semibold text-primary transition-opacity hover:opacity-70"
                >
                  Clear filters
                </Link>
              )}
            </div>

            {jobs.length === 0 ? (
              <div className="card-elevated p-12 text-center">
                <h3 className="font-display text-2xl text-text">
                  No jobs match this search yet
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-muted">
                  Try broadening the title, city, or job type filter. As the
                  platform grows, these search surfaces will also expand into
                  categories, salary insights, and recommendations.
                </p>
                <Link href="/jobs" className="btn-primary mt-6 inline-block">
                  Reset search
                </Link>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}

          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}

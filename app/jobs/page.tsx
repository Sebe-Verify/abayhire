import Link from "next/link";
import { getJobs } from "@/actions";
import { Header } from "@/components/ui/header";
import { JobCard } from "@/components/ui/job-card";
import { JobSearchFilters } from "@/components/ui/job-search-filters";
import { SectionHeading } from "@/components/ui/section-heading";
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
  const jobs = await getJobs({
    query: params.query,
    location: params.location,
    type: params.type,
  });

  const hasFilters = Boolean(params.query || params.location || params.type);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="gradient-mesh py-16 md:py-24">
          <div className="container mx-auto px-6">
            <SectionHeading
              eyebrow="Job discovery"
              title="Search open roles with more signal and less friction."
              description="Keyword search, location-aware filtering, and cleaner job cards are the foundation of a better candidate acquisition funnel."
            />

            <div className="mt-10">
              <JobSearchFilters />
            </div>
          </div>
        </section>

        <section className="bg-[var(--surface)] py-12 md:py-16">
          <div className="container mx-auto px-6">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--text)]">
                  {jobs.length} open role{jobs.length === 1 ? "" : "s"}
                </h2>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  {hasFilters
                    ? "Filtered results based on your current search."
                    : "Browse active opportunities from employers hiring now."}
                </p>
              </div>
              {hasFilters ? (
                <Link href="/jobs" className="text-sm font-semibold text-[var(--primary)]">
                  Clear filters
                </Link>
              ) : null}
            </div>

            {jobs.length === 0 ? (
              <div className="card-elevated p-12 text-center">
                <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--text)]">
                  No jobs match this search yet
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                  Try broadening the title, city, or job type filter. As the
                  platform grows, these search surfaces will also expand into
                  categories, salary insights, and recommendations.
                </p>
                <Link href="/jobs" className="btn-primary mt-6 inline-block">
                  Reset search
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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

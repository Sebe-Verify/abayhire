import Link from "next/link";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { applyToJob, getCurrentUserSummary, getJob } from "@/actions";
import { Header } from "@/components/ui/header";
import { SiteFooter } from "@/components/ui/site-footer";

type JobPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: JobPageProps): Promise<Metadata> {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) {
    return {
      title: "Job not found | AbayHire",
    };
  }

  return {
    title: `${job.title} | AbayHire Jobs`,
    description: `${job.title} at ${job.company.name || "an employer"} in ${job.location}. Explore the role, requirements, and application steps on AbayHire.`,
  };
}

export default async function JobDetailPage({ params }: JobPageProps) {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) notFound();

  const currentUser = await getCurrentUserSummary();
  const isLoggedIn = Boolean(currentUser);
  const isJobSeeker = currentUser?.role === "JOB_SEEKER";

  const handleSignOut = async () => {
    "use server";
    const { auth } = await import("@/lib/auth");
    await auth.api.signOut({
      headers: await headers(),
    });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.createdAt.toISOString(),
    employmentType: job.type,
    hiringOrganization: {
      "@type": "Organization",
      name: job.company.name || "AbayHire Employer",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "ET",
      },
    },
    salaryCurrency: "ETB",
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        user={currentUser ? { name: currentUser.name } : null}
        onSignOut={currentUser ? handleSignOut : undefined}
      />

      <main className="flex-1 bg-[var(--surface)]">
        <section className="gradient-mesh py-14 md:py-20">
          <div className="container mx-auto px-6">
            <Link
              href="/jobs"
              className="text-sm font-semibold text-[var(--primary)]"
            >
              Back to job search
            </Link>

            <div className="mt-6 grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
              <article className="card-elevated p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="badge badge-primary">
                    {job.type.replace("_", " ")}
                  </span>
                  <span className="badge badge-outline">{job.location}</span>
                  <span className="badge badge-outline">
                    {job.isActive ? "Open" : "Closed"}
                  </span>
                </div>

                <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl text-[var(--text)] md:text-5xl">
                  {job.title}
                </h1>
                <p className="mt-3 text-lg text-[var(--text-muted)]">
                  {job.company.name || "Verified employer"} • {job.location}
                </p>

                <div className="mt-8 grid gap-4 border-y border-[var(--border)] py-6 md:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                      Compensation
                    </p>
                    <p className="mt-2 text-sm text-[var(--text)]">
                      {job.salary
                        ? `${Number(job.salary).toLocaleString()} ETB`
                        : "Negotiable"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                      Applicants
                    </p>
                    <p className="mt-2 text-sm text-[var(--text)]">
                      {job.applications.length} in process
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                      Posted
                    </p>
                    <p className="mt-2 text-sm text-[var(--text)]">
                      {new Date(job.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <section className="mt-8">
                  <h2 className="text-xl font-semibold text-[var(--text)]">
                    Role overview
                  </h2>
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-8 text-[var(--text-muted)]">
                    {job.description}
                  </p>
                </section>

                <section className="mt-10 grid gap-6 md:grid-cols-2">
                  <div className="rounded-md border border-[var(--border)] bg-[var(--bg)] p-5">
                    <h2 className="text-lg font-semibold text-[var(--text)]">
                      Candidate experience promises
                    </h2>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--text-muted)]">
                      <li>Clear application flow with mobile-friendly inputs.</li>
                      <li>Status visibility is part of the product direction.</li>
                      <li>Employer credibility and trust signals are emphasized.</li>
                    </ul>
                  </div>
                  <div className="rounded-md border border-[var(--border)] bg-[var(--bg)] p-5">
                    <h2 className="text-lg font-semibold text-[var(--text)]">
                      Trust and compliance
                    </h2>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--text-muted)]">
                      <li>Equal opportunity hiring standards are expected.</li>
                      <li>Application data must be handled per privacy policy.</li>
                      <li>Suspicious listings can be escalated for review.</li>
                    </ul>
                  </div>
                </section>
              </article>

              <aside className="space-y-6">
                <div className="card-elevated p-6">
                  <h2 className="text-xl font-semibold text-[var(--text)]">
                    Apply for this role
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                    Applications should feel quick, clear, and trustworthy.
                    This first release keeps the form lightweight while the
                    broader candidate profile and resume system is being planned.
                  </p>

                  {isLoggedIn && isJobSeeker ? (
                    <form
                      action={async (formData) => {
                        "use server";
                        const coverLetter = formData.get("coverLetter");
                        await applyToJob({
                          jobId: job.id,
                          coverLetter:
                            typeof coverLetter === "string"
                              ? coverLetter
                              : undefined,
                        });
                      }}
                      className="mt-6 space-y-4"
                    >
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-[var(--text)]">
                          Short introduction
                        </span>
                        <textarea
                          name="coverLetter"
                          rows={6}
                          className="input-field resize-none"
                          placeholder="Share why you are a strong fit for this role."
                        />
                      </label>
                      <button type="submit" className="btn-primary w-full">
                        Submit application
                      </button>
                    </form>
                  ) : null}

                  {isLoggedIn && !isJobSeeker ? (
                    <p className="mt-6 rounded-md border border-[var(--border)] bg-[var(--bg)] p-4 text-sm text-[var(--text-muted)]">
                      Employer accounts cannot apply to jobs.
                    </p>
                  ) : null}

                  {!isLoggedIn ? (
                    <Link
                      href="/signin"
                      className="btn-primary mt-6 block text-center"
                    >
                      Sign in to apply
                    </Link>
                  ) : null}
                </div>

                <div className="card-elevated p-6">
                  <h2 className="text-lg font-semibold text-[var(--text)]">
                    Employer snapshot
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                    {job.company.name || "This employer"} is hiring through
                    AbayHire. The redesigned platform architecture introduces
                    company branding, verification state, and richer trust
                    detail to help candidates evaluate opportunities quickly.
                  </p>
                  <div className="mt-4 rounded-md border border-[var(--border)] bg-[var(--bg)] p-4 text-sm text-[var(--text-muted)]">
                    Equal opportunity and privacy expectations should be visible
                    on public role pages and throughout the application flow.
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link href="/trust-safety" className="text-sm font-semibold text-[var(--primary)]">
                      Trust & Safety
                    </Link>
                    <Link href="/privacy" className="text-sm font-semibold text-[var(--primary)]">
                      Privacy
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}

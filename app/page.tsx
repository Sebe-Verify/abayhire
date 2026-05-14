import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Header } from "@/components/ui/header";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteFooter } from "@/components/ui/site-footer";
import {
  featuredMetrics,
  featureHighlights,
} from "@/lib/site-content";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const handleSignOut = async () => {
    "use server";
    await auth.api.signOut({
      headers: await headers(),
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={session?.user} onSignOut={handleSignOut} />

      <main className="flex-1">
        <section className="gradient-mesh py-20 md:py-28">
          <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
                Premium hiring platform for Ethiopia and Africa
              </p>
              <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl leading-tight text-[var(--text)] md:text-7xl">
                Upgrade hiring from job board chaos to structured recruiting.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
                AbayHire is evolving into a world-class hiring ecosystem with
                verified employers, candidate-first applications, searchable job
                discovery, and ATS-style recruiter workflows designed for local
                realities.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/jobs" className="btn-primary text-center text-base">
                  Explore roles
                </Link>
                <Link
                  href={session ? "/dashboard" : "/signup"}
                  className="btn-secondary text-center text-base"
                >
                  {session ? "Open dashboard" : "Create employer account"}
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {featuredMetrics.map((metric) => (
                  <div key={metric.label} className="card-elevated p-5">
                    <p className="font-[family-name:var(--font-display)] text-3xl text-[var(--text)]">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-elevated overflow-hidden p-6">
              <div className="rounded-md border border-[var(--border)] bg-[var(--bg)] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[var(--text)]">
                      Recruiter pipeline
                    </p>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      Product Designer, Addis Ababa
                    </p>
                  </div>
                  <span className="badge badge-primary">Urgent</span>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {[
                    {
                      title: "Applied",
                      count: "42",
                      items: ["Selam T.", "Hana T."],
                    },
                    {
                      title: "Interview",
                      count: "8",
                      items: ["Meron A.", "Yonas K."],
                    },
                    {
                      title: "Offer",
                      count: "2",
                      items: ["Lulit G.", "Abel S."],
                    },
                  ].map((column) => (
                    <div
                      key={column.title}
                      className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-4"
                    >
                      <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-[var(--text)]">
                          {column.title}
                        </h2>
                        <span className="text-xs text-[var(--text-muted)]">
                          {column.count}
                        </span>
                      </div>
                      <div className="mt-4 space-y-3">
                        {column.items.map((item) => (
                          <div
                            key={item}
                            className="rounded border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text)]"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-md border border-[var(--border)] bg-[var(--surface)] p-4">
                  <p className="text-sm font-semibold text-[var(--text)]">
                    Candidate experience snapshot
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      "Mobile-friendly application flow",
                      "Verified employer trust signal",
                      "Status updates and interview reminders",
                      "SEO-ready public role pages",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded border border-[var(--border)] px-3 py-2 text-sm text-[var(--text-muted)]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--surface)] py-16 md:py-24">
          <div className="container mx-auto px-6">
            <SectionHeading
              eyebrow="What the platform is becoming"
              title="Built for the whole hiring journey, not just the posting."
              description="The redesign aligns public discovery, candidate experience, recruiter execution, and platform governance so the product can grow into a credible regional hiring system."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {featureHighlights.map((feature) => (
                <article key={feature.title} className="card-elevated p-8">
                  <h3 className="text-xl font-semibold text-[var(--text)]">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="card-elevated p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
                  For recruiters
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--text)]">
                  Run a disciplined hiring process.
                </h2>
                <p className="mt-4 text-base leading-7 text-[var(--text-muted)]">
                  Post faster, shortlist with confidence, and manage interviews
                  and offers from a dashboard built for productivity.
                </p>
                <Link href="/employers" className="mt-6 inline-block btn-primary">
                  See employer workflows
                </Link>
              </div>

              <div className="card-elevated p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
                  For candidates
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--text)]">
                  Apply with clarity, not guesswork.
                </h2>
                <p className="mt-4 text-base leading-7 text-[var(--text-muted)]">
                  Understand roles quickly, trust the employer behind them, and
                  track what happens after you hit apply.
                </p>
                <Link href="/candidates" className="mt-6 inline-block btn-primary">
                  See candidate experience
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

import Link from "next/link";
import { Header } from "@/components/ui/header";
import { SiteFooter } from "@/components/ui/site-footer";
import { SectionHeading } from "@/components/ui/section-heading";

const principles = [
  {
    title: "Trust should be visible",
    body: "Candidates need to know who is hiring them, what kind of role it is, and whether the employer has been checked. Trust cannot hide behind support tickets.",
  },
  {
    title: "Hiring should feel operational",
    body: "Recruiters need structure, not just listings. Stages, follow-ups, and shared context should make the product feel like hiring software, not a classifieds board.",
  },
  {
    title: "Local context matters",
    body: "The platform should work for Ethiopian and African hiring realities: mobile-first usage, regional trust concerns, mixed-formality employers, and diverse candidate pathways.",
  },
];

const milestones = [
  "Marketplace-quality public job discovery",
  "Verified employer workflow and safer application flows",
  "ATS-grade recruiter operations and analytics",
  "Candidate growth tools, messaging, and interview tracking",
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-mesh py-20 md:py-28">
          <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <SectionHeading
              eyebrow="About AbayHire"
              title="We are building the hiring platform we wish already existed."
              description="AbayHire is growing from a simple job destination into a trusted hiring system with clearer employer identity, stronger workflows, and a better experience for both candidates and recruiters."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Marketplace focus", "High-signal job discovery and employer trust"],
                ["Operational depth", "Recruiter workflow, stage tracking, and analytics"],
                ["Regional relevance", "Designed for Ethiopian and African hiring dynamics"],
                ["Mobile first", "Built for the way candidates actually apply"],
              ].map(([label, value]) => (
                <div key={label} className="card-elevated p-5">
                  <p className="text-sm text-[var(--text-muted)]">{label}</p>
                  <p className="mt-2 font-semibold text-[var(--text)]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--surface)] py-16 md:py-24">
          <div className="container mx-auto grid gap-8 px-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
                Why now
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--text)]">
                Too many hiring experiences still feel improvised.
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
                Candidates waste time on vague listings and silent employers.
                Recruiters juggle spreadsheets, messaging gaps, and untrusted
                inbound volume. AbayHire exists to make those workflows more
                credible, more structured, and much easier to manage.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {principles.map((principle) => (
                <article key={principle.title} className="card-elevated p-6">
                  <h3 className="text-lg font-semibold text-[var(--text)]">
                    {principle.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                    {principle.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
              <div className="card-elevated p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
                  Product path
                </p>
                <ol className="mt-6 space-y-4">
                  {milestones.map((milestone, index) => (
                    <li key={milestone} className="flex gap-4">
                      <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--cream)] text-sm font-semibold text-[var(--primary)]">
                        {index + 1}
                      </span>
                      <span className="text-sm leading-7 text-[var(--text-muted)]">
                        {milestone}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-8">
                <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--text)]">
                  The short version
                </h2>
                <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
                  We want job discovery to feel trustworthy, recruiter tools to
                  feel fast, and the whole platform to be mature enough for real
                  hiring teams. That means better public pages, better product
                  flows, and much deeper operational systems underneath.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/jobs" className="btn-primary">
                    Browse jobs
                  </Link>
                  <Link href="/features" className="btn-secondary">
                    See product scope
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

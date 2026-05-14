import Link from "next/link";
import { Header } from "@/components/ui/header";
import { SiteFooter } from "@/components/ui/site-footer";
import { SectionHeading } from "@/components/ui/section-heading";

const workflow = [
  ["1. Set up company", "Create your employer presence, verification status, and hiring identity."],
  ["2. Publish roles", "Launch structured postings with clearer role metadata and candidate-facing detail."],
  ["3. Review applicants", "Move from inbox chaos into an organized funnel with ownership and stage visibility."],
  ["4. Coordinate decisions", "Use messaging, scheduling, and offer systems as the platform deepens."],
];

const employerWins = [
  "Faster role publishing",
  "Higher trust with candidates",
  "Cleaner screening workflow",
  "Better recruiter and hiring-manager alignment",
];

export default function EmployersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-mesh py-20 md:py-28">
          <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <SectionHeading
              eyebrow="For Employers"
              title="Run hiring like a real operating system, not a stack of workarounds."
              description="AbayHire is being shaped for employers who need both better top-of-funnel reach and much stronger execution once applications begin."
            />
            <div className="card-elevated p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
                Why teams choose platforms like this
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--text-muted)]">
                {employerWins.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href="/signup" className="btn-primary mt-8 inline-block">
                Create employer account
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[var(--surface)] py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid gap-6 md:grid-cols-2">
              {workflow.map(([title, body]) => (
                <article key={title} className="card-elevated p-7">
                  <h2 className="text-xl font-semibold text-[var(--text)]">
                    {title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                    {body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto grid gap-8 px-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
                What is different
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--text)]">
                Not just posting. Workflow.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Structured job posting wizard",
                "Candidate pipeline and statusing",
                "Recruiter productivity dashboards",
                "Company branding and trust surfaces",
              ].map((item) => (
                <div key={item} className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-5 py-4 text-sm text-[var(--text-muted)]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

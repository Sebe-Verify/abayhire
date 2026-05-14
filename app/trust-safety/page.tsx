import { Header } from "@/components/ui/header";
import { SiteFooter } from "@/components/ui/site-footer";
import { SectionHeading } from "@/components/ui/section-heading";

const pillars = [
  {
    title: "Employer verification",
    body: "Access to key marketplace features should be shaped by business identity checks, review states, and visible trust signals.",
  },
  {
    title: "Fraud prevention",
    body: "Suspicious listings, fake recruiters, and misuse of candidate data need reporting paths, moderation queues, and enforcement rules.",
  },
  {
    title: "Data protection",
    body: "Candidate information should be collected with purpose, stored with care, and exposed only through role-appropriate access control.",
  },
];

const controls = [
  ["Prevent", "Verification, feature gating, secure auth, and rate limiting"],
  ["Detect", "Reporting flows, moderation review, abnormal activity checks, and audit traces"],
  ["Respond", "Account restriction, content removal, support escalation, and incident communication"],
];

export default function TrustSafetyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-mesh py-20 md:py-28">
          <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-[1fr_1fr] lg:items-center">
            <SectionHeading
              eyebrow="Trust & Safety"
              title="A hiring marketplace only works when people believe it is safe to use."
              description="Trust needs product, policy, and operations. This page explains the operating principles behind employer verification, fraud handling, and candidate data protection."
            />
            <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
                Core commitment
              </p>
              <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
                We want candidates to feel that listings are real, employers to
                feel that the inbound funnel is worth trusting, and operators to
                have the tools to intervene when something goes wrong.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[var(--surface)] py-16 md:py-24">
          <div className="container mx-auto grid gap-6 px-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="card-elevated p-7">
                <h2 className="text-xl font-semibold text-[var(--text)]">
                  {pillar.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)]">
              <div className="grid grid-cols-[0.7fr_1.3fr] border-b border-[var(--border)] bg-[var(--cream)] px-6 py-4 text-sm font-semibold text-[var(--text)]">
                <div>Safety layer</div>
                <div>How it works</div>
              </div>
              {controls.map(([label, detail]) => (
                <div
                  key={label}
                  className="grid grid-cols-[0.7fr_1.3fr] border-b border-[var(--border)] px-6 py-4 text-sm text-[var(--text-muted)] last:border-b-0"
                >
                  <div className="font-semibold text-[var(--text)]">{label}</div>
                  <div>{detail}</div>
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

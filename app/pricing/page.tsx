import Link from "next/link";
import { getCurrentUserSummary } from "@/actions";
import { signOut } from "@/actions/signout";
import { Header } from "@/components/ui/header";
import { SiteFooter } from "@/components/ui/site-footer";
import { SectionHeading } from "@/components/ui/section-heading";

const plans = [
  {
    name: "Starter",
    price: "Custom intro",
    audience: "Smaller teams testing digital hiring",
    features: ["Employer profile", "Job posting essentials", "Basic applicant capture", "Verification path", "Email support"],
  },
  {
    name: "Growth",
    price: "Usage-based",
    audience: "Active hiring teams with multiple open roles",
    features: ["Everything in Starter", "Pipeline workflow", "Team access", "Messaging templates", "Hiring analytics"],
  },
  {
    name: "Enterprise",
    price: "Talk to us",
    audience: "Multi-team organizations with governance needs",
    features: ["Custom workflow design", "Approvals and audit controls", "Premium support", "Reporting exports", "Integration roadmap"],
  },
];

const comparison = [
  ["Public job pages", "Yes", "Yes", "Yes"],
  ["Verified employer setup", "Yes", "Yes", "Yes"],
  ["Candidate pipeline", "Limited", "Advanced", "Advanced"],
  ["Team collaboration", "No", "Yes", "Yes"],
  ["Analytics", "Basic", "Advanced", "Advanced"],
  ["Billing and invoicing", "Basic", "Standard", "Custom"],
];

export default async function PricingPage() {
  const currentUser = await getCurrentUserSummary();
  return (
    <div className="flex min-h-screen flex-col">
      <Header
        user={currentUser ? { name: currentUser.name, email: currentUser.email } : null}
        onSignOut={currentUser ? signOut : undefined}
      />
      <main className="flex-1">
        <section className="gradient-mesh py-20 md:py-28">
          <div className="container mx-auto px-6">
            <SectionHeading
              eyebrow="Pricing"
              title="Pricing should match hiring maturity, not punish growth."
              description="The platform roadmap supports a tiered commercial model: start with trusted job posting, then expand into workflow, analytics, and governance as hiring gets more serious."
              align="center"
            />
          </div>
        </section>

        <section className="bg-[var(--surface)] py-16 md:py-24">
          <div className="container mx-auto grid gap-6 px-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.name} className="card-elevated p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
                  {plan.name}
                </p>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-[var(--text)]">
                  {plan.price}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                  {plan.audience}
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-7 text-[var(--text-muted)]">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-primary mt-8 inline-block">
                  Talk to sales
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)]">
              <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--cream)] px-6 py-4 text-sm font-semibold text-[var(--text)]">
                <div>Capability</div>
                <div>Starter</div>
                <div>Growth</div>
                <div>Enterprise</div>
              </div>
              {comparison.map((row) => (
                <div
                  key={row[0]}
                  className="grid grid-cols-4 border-b border-[var(--border)] px-6 py-4 text-sm text-[var(--text-muted)] last:border-b-0"
                >
                  {row.map((cell, index) => (
                    <div
                      key={`${row[0]}-${cell}`}
                      className={index === 0 ? "font-semibold text-[var(--text)]" : ""}
                    >
                      {cell}
                    </div>
                  ))}
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

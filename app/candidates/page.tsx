import Link from "next/link";
import { getCurrentUserSummary } from "@/actions";
import { signOut } from "@/actions/signout";
import { Header } from "@/components/ui/header";
import { SiteFooter } from "@/components/ui/site-footer";
import { SectionHeading } from "@/components/ui/section-heading";

const candidateJourney = [
  {
    title: "Discover better roles",
    body: "Find roles through clearer search, cleaner detail pages, and more credible employer context.",
  },
  {
    title: "Apply with less friction",
    body: "Move through a lighter application flow that works on mobile and respects your time.",
  },
  {
    title: "Track what happens next",
    body: "See status, next steps, and interview progress instead of sending applications into a void.",
  },
];

export default async function CandidatesPage() {
  const currentUser = await getCurrentUserSummary();
  return (
    <div className="flex min-h-screen flex-col">
      <Header
        user={currentUser ? { name: currentUser.name, email: currentUser.email } : null}
        onSignOut={currentUser ? signOut : undefined}
      />
      <main className="flex-1">
        <section className="gradient-mesh py-20 md:py-28">
          <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <SectionHeading
              eyebrow="For Candidates"
              title="Job search should feel clear, credible, and worth your effort."
              description="AbayHire is designed to reduce the usual friction: vague listings, weak employer trust, and no visibility after application."
            />
            <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
                Candidate priorities
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  "Mobile-friendly application flow",
                  "Cleaner role information",
                  "Verified employer signals",
                  "Application tracking and alerts",
                ].map((item) => (
                  <div key={item} className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text-muted)]">
                    {item}
                  </div>
                ))}
              </div>
              <Link href="/jobs" className="btn-primary mt-8 inline-block">
                Explore open roles
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[var(--surface)] py-16 md:py-24">
          <div className="container mx-auto grid gap-6 px-6 md:grid-cols-3">
            {candidateJourney.map((step) => (
              <article key={step.title} className="card-elevated p-7">
                <h2 className="text-xl font-semibold text-[var(--text)]">
                  {step.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto grid gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
                Looking ahead
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--text)]">
                The candidate portal should grow with you.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Profile builder and skills management",
                "Resume parsing and stronger recommendations",
                "Interview tracking and reminders",
                "Career insights and growth signals",
              ].map((item) => (
                <div key={item} className="card-elevated p-5 text-sm leading-7 text-[var(--text-muted)]">
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

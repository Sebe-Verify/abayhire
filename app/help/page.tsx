import { Header } from "@/components/ui/header";
import { SiteFooter } from "@/components/ui/site-footer";
import { SectionHeading } from "@/components/ui/section-heading";

const helpTracks = [
  {
    title: "Candidate support",
    items: ["Account access", "Application troubleshooting", "Profile quality guidance", "Interview readiness help"],
  },
  {
    title: "Employer support",
    items: ["Company setup", "Verification questions", "Posting roles", "Managing applicants"],
  },
  {
    title: "Platform operations",
    items: ["Trust and safety reports", "Content moderation issues", "Billing questions", "General product feedback"],
  },
];

const supportStates = [
  ["Self-serve help", "FAQ, workflow guidance, and role-specific product education"],
  ["Operational support", "Resolution paths for candidate, recruiter, and trust issues"],
  ["Escalations", "Fraud reports, verification problems, and policy-sensitive cases"],
];

export default function HelpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-mesh py-20 md:py-28">
          <div className="container mx-auto px-6">
            <SectionHeading
              eyebrow="Help Center"
              title="Support should feel organized, not improvised."
              description="The help surface needs to serve three audiences at once: candidates trying to move forward, employers trying to hire, and platform operators trying to keep the system healthy."
            />
          </div>
        </section>

        <section className="bg-[var(--surface)] py-16 md:py-24">
          <div className="container mx-auto grid gap-6 px-6 md:grid-cols-3">
            {helpTracks.map((track) => (
              <article key={track.title} className="card-elevated p-7">
                <h2 className="text-xl font-semibold text-[var(--text)]">
                  {track.title}
                </h2>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--text-muted)]">
                  {track.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid gap-4">
              {supportStates.map(([title, body]) => (
                <div
                  key={title}
                  className="grid gap-4 rounded-md border border-[var(--border)] bg-[var(--surface)] px-6 py-5 md:grid-cols-[0.7fr_1.3fr]"
                >
                  <div className="font-semibold text-[var(--text)]">{title}</div>
                  <div className="text-sm leading-7 text-[var(--text-muted)]">{body}</div>
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

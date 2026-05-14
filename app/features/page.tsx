import { Header } from "@/components/ui/header";
import { SiteFooter } from "@/components/ui/site-footer";
import { SectionHeading } from "@/components/ui/section-heading";

const featureColumns = [
  {
    title: "Discovery",
    items: ["SEO-ready job pages", "Keyword and location search", "Role-type filtering", "Employer landing pages", "Featured and urgent hiring surfaces"],
  },
  {
    title: "Candidate experience",
    items: ["Profile builder", "Resume upload and parsing roadmap", "Application tracking", "Interview visibility", "Recommendations and alerts"],
  },
  {
    title: "Recruiter operations",
    items: ["Job posting wizard", "Candidate pipeline", "Messaging and reminders", "Interview scheduling", "Offer management roadmap"],
  },
  {
    title: "Trust and governance",
    items: ["Employer verification", "Fraud review", "Privacy-aware flows", "Auditability planning", "Admin moderation architecture"],
  },
];

const roadmapRows = [
  ["Public marketplace", "Job discovery, employer storytelling, structured detail pages"],
  ["Candidate portal", "Profile quality, saved jobs, application state, career insights"],
  ["ATS workflow", "Stages, collaboration, interviews, offers, templates, analytics"],
  ["Platform ops", "Billing, moderation, support, audit logs, AI oversight"],
];

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-mesh py-20 md:py-28">
          <div className="container mx-auto px-6">
            <SectionHeading
              eyebrow="Platform Features"
              title="AbayHire is being designed as a hiring system, not just a listing site."
              description="This page maps the platform by operating surface so employers, candidates, and internal teams can understand how the product is supposed to work."
            />
          </div>
        </section>

        <section className="bg-[var(--surface)] py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid gap-6 xl:grid-cols-4 md:grid-cols-2">
              {featureColumns.map((column) => (
                <article key={column.title} className="card-elevated p-6">
                  <h2 className="text-xl font-semibold text-[var(--text)]">
                    {column.title}
                  </h2>
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--text-muted)]">
                    {column.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto grid gap-8 px-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
                Product map
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--text)]">
                The feature set has to grow in layers.
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
                Strong hiring platforms usually win because the surfaces connect:
                search drives applications, applications feed pipelines, and
                trust/compliance supports the whole system.
              </p>
            </div>
            <div className="overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)]">
              <div className="grid grid-cols-[0.8fr_1.2fr] border-b border-[var(--border)] bg-[var(--cream)] px-6 py-4 text-sm font-semibold text-[var(--text)]">
                <div>Layer</div>
                <div>What it unlocks</div>
              </div>
              {roadmapRows.map(([label, detail]) => (
                <div
                  key={label}
                  className="grid grid-cols-[0.8fr_1.2fr] border-b border-[var(--border)] px-6 py-4 text-sm text-[var(--text-muted)] last:border-b-0"
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

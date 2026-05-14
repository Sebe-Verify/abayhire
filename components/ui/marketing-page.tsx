import { SectionHeading } from "@/components/ui/section-heading";
import { SiteFooter } from "@/components/ui/site-footer";
import { Header } from "@/components/ui/header";

interface MarketingSection {
  title: string;
  body: string;
}

interface MarketingPageProps {
  eyebrow: string;
  title: string;
  description: string;
  sections: readonly MarketingSection[];
}

export function MarketingPage({
  eyebrow,
  title,
  description,
  sections,
}: MarketingPageProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-mesh py-20 md:py-28">
          <div className="container mx-auto px-6">
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              description={description}
            />
          </div>
        </section>

        <section className="bg-[var(--surface)] py-16 md:py-24">
          <div className="container mx-auto grid gap-6 px-6 md:grid-cols-3">
            {sections.map((section) => (
              <article key={section.title} className="card-elevated p-8">
                <h2 className="text-xl font-semibold text-[var(--text)]">
                  {section.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                  {section.body}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

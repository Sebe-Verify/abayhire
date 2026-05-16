import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Header } from "@/components/ui/header";
import { SiteFooter } from "@/components/ui/site-footer";
import { featuredMetrics, featureHighlights } from "@/lib/site-content";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const handleSignOut = async () => {
    "use server";
    await auth.api.signOut({ headers: await headers() });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={session?.user} onSignOut={handleSignOut} />

      <main className="flex-1">

        {/* ── Hero ──────────────────────────────────── */}
        <section className="gradient-mesh ethiopian-pattern overflow-hidden py-20 md:py-28 lg:py-32">
          <div className="container mx-auto px-6">
            <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

              {/* Copy */}
              <div className="max-w-2xl animate-fade-in-up">
                <div className="mb-6 inline-flex items-center gap-3">
                  <span className="h-px w-8 bg-primary" />
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                    Premium hiring for Ethiopia &amp; Africa
                  </span>
                </div>

                <h1 className="font-display text-[clamp(2.75rem,6.5vw,5.25rem)] leading-[1.04] tracking-tight text-text">
                  From job&#8209;board{" "}
                  <em className="not-italic text-primary">chaos</em>{" "}
                  to structured{" "}
                  <span className="relative whitespace-nowrap">
                    recruiting.
                    <svg
                      className="absolute -bottom-1 left-0 w-full overflow-visible"
                      viewBox="0 0 300 10"
                      fill="none"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 7C75 3 150 3 298 7"
                        stroke="var(--accent)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>

                <p className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-text-muted animate-fade-in-up stagger-1">
                  AbayHire is becoming a world-class hiring ecosystem — verified employers,
                  ATS&#8209;style recruiter workflows, and candidate&#8209;first job discovery
                  built for local realities.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row animate-fade-in-up stagger-2">
                  <Link href="/jobs" className="btn-primary text-center">
                    Explore open roles
                  </Link>
                  <Link
                    href={session ? "/dashboard" : "/signup"}
                    className="btn-secondary text-center"
                  >
                    {session ? "Go to dashboard" : "Start as employer"}
                  </Link>
                </div>
              </div>

              {/* Dashboard preview */}
              <div className="card-elevated overflow-hidden animate-fade-in-up stagger-3">
                <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  </div>
                  <span className="font-mono text-[0.7rem] tracking-wide text-text-muted">
                    recruiter&#8209;pipeline
                  </span>
                  <span className="badge badge-primary text-[0.6rem]">Live</span>
                </div>

                <div className="bg-background p-5">
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-text">Product Designer</p>
                      <p className="mt-0.5 text-xs text-text-muted">Addis Ababa · Full&#8209;time</p>
                    </div>
                    <span className="badge badge-primary">Urgent</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { stage: "Applied",   count: "42", names: ["Selam T.", "Hana T.", "Abel M."], bar: "var(--border)" },
                      { stage: "Interview", count: "8",  names: ["Meron A.", "Yonas K."],           bar: "var(--accent)" },
                      { stage: "Offer",     count: "2",  names: ["Lulit G."],                       bar: "var(--primary)" },
                    ].map((col) => (
                      <div
                        key={col.stage}
                        className="rounded border border-border bg-surface p-3"
                      >
                        <div className="mb-2.5 flex items-center justify-between">
                          <span className="text-xs font-semibold text-text">{col.stage}</span>
                          <span className="font-mono text-xs text-text-muted">{col.count}</span>
                        </div>
                        <div className="mb-3 h-0.5 rounded-full" style={{ background: col.bar }} />
                        <div className="space-y-1.5">
                          {col.names.map((name) => (
                            <div
                              key={name}
                              className="rounded border border-border bg-background px-2 py-1.5 text-xs text-text"
                            >
                              {name}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded border border-border bg-surface p-3.5">
                    <p className="mb-2.5 text-xs font-semibold text-text">
                      Candidate experience
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Mobile-ready flow",
                        "Verified employers",
                        "Status updates",
                        "SEO job pages",
                      ].map((f) => (
                        <div key={f} className="flex items-center gap-1.5 text-xs text-text-muted">
                          <svg
                            className="h-3 w-3 shrink-0 text-primary"
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M2 6.5l2.5 2.5 5.5-5.5" />
                          </svg>
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats strip ───────────────────────────── */}
        <section className="section-ink py-14 md:py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {featuredMetrics.map((metric, i) => (
                <div key={metric.label} className={`animate-fade-in-up stagger-${i + 1}`}>
                  <p className="font-display text-5xl font-bold text-primary md:text-6xl">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm text-neutral-400">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ──────────────────────────────── */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="mb-16 max-w-2xl animate-fade-in-up">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                Platform vision
              </span>
              <h2 className="mt-4 font-display text-[clamp(1.875rem,3.5vw,2.875rem)] leading-tight text-text">
                Built for the whole hiring journey, not just the posting.
              </h2>
            </div>

            <div className="grid gap-10 md:grid-cols-3">
              {featureHighlights.map((feature, i) => (
                <article
                  key={feature.title}
                  className="group relative border-t-2 border-border pt-7 transition-colors duration-300 hover:border-primary animate-fade-in-up"
                  style={{ animationDelay: `${0.08 * (i + 1)}s` }}
                >
                  <span
                    className="select-none font-display text-[5rem] font-bold leading-none text-muted opacity-60 transition-colors duration-300 group-hover:text-primary group-hover:opacity-20"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-text">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-text-muted">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Audience CTA ──────────────────────────── */}
        <section className="section-terracotta relative overflow-hidden py-20 md:py-28">
          <div className="ethiopian-pattern absolute inset-0 opacity-[0.12]" aria-hidden="true" />
          <div className="container relative z-10 mx-auto px-6">
            <div className="grid gap-8 lg:grid-cols-2">
              {[
                {
                  label: "For recruiters",
                  title: "Run a disciplined hiring process.",
                  body: "Post faster, shortlist with confidence, and manage interviews and offers from a dashboard built for productivity.",
                  href: "/employers",
                  cta: "See employer workflows",
                },
                {
                  label: "For candidates",
                  title: "Apply with clarity, not guesswork.",
                  body: "Understand roles quickly, trust the employer behind them, and track what happens after you hit apply.",
                  href: "/candidates",
                  cta: "See candidate experience",
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded border border-white/20 bg-white/[0.07] p-8 backdrop-blur-sm transition-colors hover:bg-white/[0.11]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
                    {card.label}
                  </p>
                  <h2 className="mt-4 font-display text-[1.75rem] leading-tight text-white">
                    {card.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-white/70">{card.body}</p>
                  <Link
                    href={card.href}
                    className="mt-8 inline-flex items-center gap-2 rounded-sm bg-white px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
                  >
                    {card.cta}
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
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

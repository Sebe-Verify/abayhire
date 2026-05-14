import Link from "next/link";
import { footerGroups } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="container mx-auto px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div className="max-w-sm">
            <Link
              href="/"
              className="font-[family-name:var(--font-display)] text-3xl text-[var(--text)]"
            >
              Abay<span className="text-[var(--primary)]">Hire</span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">
              A modern hiring platform for Ethiopia and the wider African talent
              market, built around trust, speed, and better hiring outcomes.
            </p>
            <p className="mt-6 text-xs leading-5 text-[var(--text-muted)]">
              Equal opportunity hiring matters. Employers on the platform are
              expected to follow fair hiring and data privacy practices.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--text)]">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--primary)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-sm text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} AbayHire. All rights reserved.</p>
          <p>Designed for trustworthy hiring workflows, mobile-first access, and long-term marketplace scale.</p>
        </div>
      </div>
    </footer>
  );
}

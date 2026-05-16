import Link from "next/link";
import { footerGroups } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container mx-auto px-6 py-14 md:py-16">

        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-display text-2xl tracking-tight text-text"
            >
              Abay<span className="text-primary">Hire</span>
            </Link>
            <p className="mt-4 max-w-64 text-sm leading-7 text-text-muted">
              A modern hiring platform for Ethiopia and the wider African talent
              market — trust, speed, better outcomes.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <p className="text-xs text-text-muted">
                Fair hiring · Data privacy · Equal opportunity
              </p>
            </div>
          </div>

          {/* Link groups */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-text">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-text-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} AbayHire. All rights reserved.</p>
          <p className="hidden md:block">Built for Africa&rsquo;s hiring future.</p>
        </div>

      </div>
    </footer>
  );
}

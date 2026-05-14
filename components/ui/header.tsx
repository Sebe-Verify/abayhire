"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { primaryNav } from "@/lib/site-content";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors duration-200 link-hover ${
        isActive ? "text-[var(--primary)]" : "text-[var(--text)]"
      }`}
    >
      {children}
    </Link>
  );
}

interface HeaderProps {
  user?: {
    name?: string | null;
  } | null;
  onSignOut?: () => void;
}

export function Header({ user, onSignOut }: HeaderProps) {
  return (
    <header className="relative border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[linear-gradient(90deg,var(--primary)_0%,var(--accent)_50%,var(--primary)_100%)] opacity-20" />
      <div className="container mx-auto px-6 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-3xl text-[var(--text)] tracking-tight"
          >
            Abay<span className="text-[var(--primary)]">Hire</span>
          </Link>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {primaryNav.map((item) => (
                <NavLink key={item.href} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex flex-wrap items-center gap-4">
              {user ? (
                <>
                  <NavLink href="/dashboard">Dashboard</NavLink>
                  <form action={onSignOut}>
                    <button
                      type="submit"
                      className="text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--primary)]"
                    >
                      Sign Out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="text-sm font-medium text-[var(--text)] transition-colors hover:text-[var(--primary)]"
                  >
                    Sign In
                  </Link>
                  <Link href="/signup" className="btn-primary text-sm">
                    Get Started
                  </Link>
                </>
              )}

              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

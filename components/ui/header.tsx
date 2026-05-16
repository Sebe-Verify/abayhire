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
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <Link
      href={href}
      className={`text-sm transition-colors duration-200 ${
        isActive
          ? "font-semibold text-primary"
          : "font-medium text-text-muted hover:text-text"
      }`}
    >
      {children}
    </Link>
  );
}

interface HeaderProps {
  user?: { name?: string | null } | null;
  onSignOut?: () => void;
}

export function Header({ user, onSignOut }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between gap-8 px-6">

        <Link
          href="/"
          className="shrink-0 font-display text-xl font-semibold tracking-tight text-text"
        >
          Abay<span className="text-primary">Hire</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {primaryNav.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text"
              >
                Dashboard
              </Link>
              <form action={onSignOut}>
                <button
                  type="submit"
                  className="text-sm font-medium text-text-muted transition-colors hover:text-primary"
                >
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="hidden text-sm font-medium text-text-muted transition-colors hover:text-text sm:inline-block"
              >
                Sign In
              </Link>
              <Link href="/signup" className="btn-primary px-4 py-2 text-sm">
                Get Started
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>

      </div>
    </header>
  );
}

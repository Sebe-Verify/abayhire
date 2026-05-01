"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerLink: string;
  footerHref: string;
}

export function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerHref,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex gradient-mesh">
      <div className="divider-pattern absolute top-0 left-0 right-0" />
      
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>
      
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="animate-fade-in-up">
            <Link
              href="/"
              className="font-[family-name:var(--font-display)] text-4xl text-[var(--text)] tracking-tight inline-block mb-2"
            >
              Abay<span className="text-[var(--primary)]">Hire</span>
            </Link>
            <p className="text-[var(--text-muted)] mb-8 text-lg">
              Ethiopia&apos;s premier hiring platform
            </p>
          </div>

          <div className="card-elevated p-8 animate-fade-in-up stagger-1 relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[linear-gradient(90deg,var(--primary),var(--accent))]" />
            
            <h1 className="font-[family-name:var(--font-display)] text-2xl text-[var(--text)] mb-2">
              {title}
            </h1>
            <p className="text-[var(--text-muted)] mb-6">{subtitle}</p>

            {children}

            <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
              {footerText}{" "}
              <Link href={footerHref} className="text-[var(--primary)] font-medium hover:underline">
                {footerLink}
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 ethiopian-pattern opacity-50" />
        <div className="relative z-10 text-center max-w-md">
          <div className="w-32 h-32 mx-auto mb-8 relative">
            <div className="absolute inset-0 border-4 border-[var(--primary)] rotate-45 opacity-20" />
            <div className="absolute inset-4 border-2 border-[var(--accent)] rotate-45 opacity-30" />
            <div className="absolute inset-8 bg-[var(--primary)] opacity-10 rotate-45" />
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--text)] mb-4">
            Find Your Path
          </h2>
          <p className="text-[var(--text-muted)]">
            Connect with Ethiopia&apos;s leading employers and discover opportunities that match your ambitions.
          </p>
        </div>
      </div>
    </div>
  );
}
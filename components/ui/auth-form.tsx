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
    <div className="relative flex min-h-screen gradient-mesh">
      <div className="divider-pattern absolute left-0 right-0 top-0" />

      <div className="absolute right-6 top-6 z-10">
        <ThemeToggle />
      </div>

      {/* Form side */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="animate-fade-in-up">
            <Link
              href="/"
              className="mb-2 inline-block font-display text-4xl tracking-tight text-text"
            >
              Abay<span className="text-primary">Hire</span>
            </Link>
            <p className="mb-8 text-lg text-text-muted">
              Ethiopia&apos;s premier hiring platform
            </p>
          </div>

          <div className="card-elevated relative animate-fade-in-up p-8 stagger-1">
            <div className="absolute left-0 right-0 top-0 h-1 rounded-t bg-linear-to-r from-primary to-accent" />

            <h1 className="mb-2 font-display text-2xl text-text">{title}</h1>
            <p className="mb-6 text-text-muted">{subtitle}</p>

            {children}

            <p className="mt-6 text-center text-sm text-text-muted">
              {footerText}{" "}
              <Link href={footerHref} className="font-medium text-primary hover:underline">
                {footerLink}
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Decorative side */}
      <div className="relative hidden flex-1 items-center justify-center overflow-hidden p-12 lg:flex">
        <div className="ethiopian-pattern absolute inset-0 opacity-50" />
        <div className="relative z-10 max-w-md text-center">
          <div className="relative mx-auto mb-8 h-32 w-32">
            <div className="absolute inset-0 rotate-45 border-4 border-primary opacity-20" />
            <div className="absolute inset-4 rotate-45 border-2 border-accent opacity-30" />
            <div className="absolute inset-8 rotate-45 bg-primary opacity-10" />
          </div>
          <h2 className="mb-4 font-display text-3xl text-text">Find Your Path</h2>
          <p className="text-text-muted">
            Connect with Ethiopia&apos;s leading employers and discover opportunities that match your ambitions.
          </p>
        </div>
      </div>
    </div>
  );
}

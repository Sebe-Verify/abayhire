"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { primaryNav } from "@/lib/site-content";
import { markAllNotificationsRead, type NotificationItem } from "@/actions/notifications";

function getInitials(name?: string | null): string {
  if (!name?.trim()) return "?";
  const parts = name.trim().split(/\s+/);
  return parts.length === 1
    ? parts[0][0].toUpperCase()
    : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

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
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  verified?: boolean;
  onSignOut?: () => void | Promise<void>;
  notifications?: NotificationItem[];
}

export function Header({
  user,
  verified = false,
  onSignOut,
  notifications: initial = [],
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(initial);
  const ref = useRef<HTMLDivElement>(null);
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleToggle() {
    if (!open && unread > 0) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      markAllNotificationsRead().catch(() => {});
    }
    setOpen((o) => !o);
  }

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
            <div ref={ref} className="relative">
              {/* Avatar button */}
              <button
                onClick={handleToggle}
                aria-label="Open user menu"
                className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white ring-2 ring-transparent transition-all hover:ring-primary/40 focus:outline-none focus:ring-primary/40"
              >
                {user.image ? (
                  <img src={user.image} alt="" className="h-full w-full rounded-full object-cover" />
                ) : (
                  <span>{getInitials(user.name)}</span>
                )}
                {/* Verified badge on avatar */}
                {verified && (
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-surface">
                    <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
                {/* Notification dot (only when no verified badge) */}
                {!verified && unread > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {unread > 9 ? "9+" : unread}
                  </span>
                )}
                {/* Notification dot alongside verified badge */}
                {verified && unread > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-surface">
                    {unread > 9 ? "9+" : unread}
                  </span>
                )}
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-black/10">

                  {/* User info */}
                  <div className="px-4 pt-4 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                          {user.image ? (
                            <img src={user.image} alt="" className="h-full w-full rounded-full object-cover" />
                          ) : (
                            <span>{getInitials(user.name)}</span>
                          )}
                        </div>
                        {verified && (
                          <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-surface">
                            <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-semibold text-text">
                            {user.name || "User"}
                          </p>
                          {verified && (
                            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
                              <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              Verified
                            </span>
                          )}
                        </div>
                        {user.email && (
                          <p className="truncate text-xs text-text-muted">{user.email}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quick links */}
                  <div className="border-t border-border px-2 py-1.5">
                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-primary/5 hover:text-text"
                    >
                      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Dashboard
                    </Link>
                    <Link
                      href="/jobs"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-primary/5 hover:text-text"
                    >
                      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Browse Jobs
                    </Link>
                  </div>

                  {/* Notifications */}
                  <div className="border-t border-border">
                    <div className="flex items-center justify-between px-4 py-2.5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                        Notifications
                      </span>
                      {unread > 0 && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                          {unread} new
                        </span>
                      )}
                      {unread === 0 && notifications.length > 0 && (
                        <span className="text-[11px] text-text-muted">All read</span>
                      )}
                    </div>

                    <div className="max-h-48 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="flex flex-col items-center gap-1 px-4 pb-5 pt-2 text-center">
                          <svg className="h-7 w-7 text-text-muted/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                          <p className="text-xs text-text-muted">No notifications yet</p>
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            className={`border-b border-border/50 px-4 py-2.5 last:border-0 ${!n.read ? "bg-primary/5" : ""}`}
                          >
                            <div className="flex items-start gap-2.5">
                              <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${!n.read ? "bg-primary" : "bg-transparent"}`} />
                              <div>
                                <p className="text-sm font-medium leading-snug text-text">{n.title}</p>
                                <p className="mt-0.5 text-xs leading-relaxed text-text-muted">{n.message}</p>
                                <p className="mt-1 text-[11px] text-text-muted/60">{timeAgo(n.createdAt)}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Sign out */}
                  <div className="border-t border-border px-2 py-1.5">
                    <form action={onSignOut}>
                      <button
                        type="submit"
                        className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign out
                      </button>
                    </form>
                  </div>

                </div>
              )}
            </div>
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

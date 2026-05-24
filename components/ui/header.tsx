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
  onSignOut?: () => void | Promise<void>;
  notifications?: NotificationItem[];
}

export function Header({
  user,
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
                  <img
                    src={user.image}
                    alt=""
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <span>{getInitials(user.name)}</span>
                )}
                {unread > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {unread > 9 ? "9+" : unread}
                  </span>
                )}
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-xl border border-border bg-surface shadow-lg">

                  {/* User info */}
                  <div className="flex items-center gap-3 px-4 py-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt=""
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <span>{getInitials(user.name)}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-text">
                        {user.name || "User"}
                      </p>
                      {user.email && (
                        <p className="truncate text-xs text-text-muted">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quick links */}
                  <div className="border-t border-border px-4 py-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className="block py-1.5 text-sm font-medium text-text-muted transition-colors hover:text-text"
                    >
                      Dashboard
                    </Link>
                  </div>

                  {/* Notifications */}
                  <div className="border-t border-border">
                    <div className="flex items-center justify-between px-4 py-2.5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                        Notifications
                      </span>
                      {notifications.length > 0 && (
                        <span className="text-xs text-text-muted">
                          {notifications.filter((n) => !n.read).length === 0
                            ? "All read"
                            : `${notifications.filter((n) => !n.read).length} unread`}
                        </span>
                      )}
                    </div>

                    <div className="max-h-52 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="px-4 pb-4 text-center text-sm text-text-muted">
                          No notifications yet
                        </p>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            className={`px-4 py-2.5 ${!n.read ? "bg-primary/5" : ""}`}
                          >
                            <div className="flex items-start gap-2">
                              {!n.read && (
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              )}
                              <div className={!n.read ? "" : "pl-3.5"}>
                                <p className="text-sm font-medium text-text">
                                  {n.title}
                                </p>
                                <p className="mt-0.5 text-xs text-text-muted">
                                  {n.message}
                                </p>
                                <p className="mt-1 text-[11px] text-text-muted/70">
                                  {timeAgo(n.createdAt)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Sign out */}
                  <div className="border-t border-border px-4 py-2.5">
                    <form action={onSignOut}>
                      <button
                        type="submit"
                        className="w-full rounded py-1 text-left text-sm font-medium text-red-500 transition-colors hover:text-red-600"
                      >
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

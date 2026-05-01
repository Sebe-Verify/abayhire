import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Header } from "@/components/ui/header";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const handleSignOut = async () => {
    "use server";
    await auth.api.signOut({
      headers: await headers(),
    });
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Header user={session?.user} onSignOut={handleSignOut} />

      <main className="flex-1">
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 gradient-mesh" />
          <div className="absolute inset-0 ethiopian-pattern opacity-30" />
          
          <div className="absolute top-20 left-10 w-32 h-32 border border-[var(--terracotta)] opacity-10 rotate-12" />
          <div className="absolute bottom-20 right-10 w-24 h-24 border border-[var(--ochre)] opacity-15 -rotate-12" />
          
          <div className="container mx-auto px-6 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="animate-fade-in-up">
                <span className="badge badge-primary mb-6">Ethiopia&apos;s Leading Job Platform</span>
              </div>
              
              <h1 className="font-[family-name:var(--font-display)] text-5xl lg:text-7xl text-[var(--charcoal)] leading-tight mb-6 animate-fade-in-up stagger-1">
                Find Your
                <span className="block text-[var(--terracotta)]">Dream Career</span>
              </h1>
              
              <p className="text-xl text-[var(--warm-gray)] max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2">
                Connect with top employers and discover opportunities that match your skills and aspirations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3">
                <Link href="/jobs" className="btn-primary text-lg">
                  Explore Opportunities
                </Link>
                <Link href={session ? "/dashboard" : "/signup"} className="btn-secondary text-lg">
                  {session ? "Go to Dashboard" : "Post a Job"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="divider-pattern" />

        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              <div className="text-center animate-fade-in-up stagger-1">
                <div className="w-16 h-16 mx-auto mb-6 bg-[var(--cream)] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-[var(--terracotta)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--charcoal)] mb-3">
                  Search Jobs
                </h3>
                <p className="text-[var(--warm-gray)]">
                  Browse thousands of opportunities from verified employers across Ethiopia.
                </p>
              </div>

              <div className="text-center animate-fade-in-up stagger-2">
                <div className="w-16 h-16 mx-auto mb-6 bg-[var(--cream)] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-[var(--terracotta)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--charcoal)] mb-3">
                  Apply with Ease
                </h3>
                <p className="text-[var(--warm-gray)]">
                  One-click applications to multiple positions. Track your progress effortlessly.
                </p>
              </div>

              <div className="text-center animate-fade-in-up stagger-3">
                <div className="w-16 h-16 mx-auto mb-6 bg-[var(--cream)] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-[var(--terracotta)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--charcoal)] mb-3">
                  Build Your Career
                </h3>
                <p className="text-[var(--warm-gray)]">
                  Connect with industry leaders and take the next step in your professional journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28 gradient-mesh">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-[family-name:var(--font-display)] text-4xl text-[var(--charcoal)] mb-6 animate-fade-in-up">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-[var(--warm-gray)] mb-8 animate-fade-in-up stagger-1">
                Join thousands of job seekers and employers who have found their perfect match on AbayHire.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-2">
                <Link href="/signup" className="btn-primary">
                  Create Account
                </Link>
                <Link href="/jobs" className="btn-secondary">
                  Browse Jobs
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[var(--charcoal)] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <Link href="/" className="font-[family-name:var(--font-display)] text-2xl">
                Abay<span className="text-[var(--terracotta)]">Hire</span>
              </Link>
              <p className="text-gray-400 mt-2 text-sm">Ethiopia&apos;s premier hiring platform</p>
            </div>
            <div className="flex gap-8 text-sm text-gray-400">
              <Link href="/jobs" className="hover:text-white transition-colors">Jobs</Link>
              <Link href="/signin" className="hover:text-white transition-colors">Sign In</Link>
              <Link href="/signup" className="hover:text-white transition-colors">Sign Up</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} AbayHire. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
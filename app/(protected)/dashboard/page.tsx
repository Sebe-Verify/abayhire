import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getMyApplications, getUserRole } from "@/actions";
import { Header } from "@/components/ui/header";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/signin");

  const role = await getUserRole();
  const applications = await getMyApplications();

  const handleSignOut = async () => {
    "use server";
    await auth.api.signOut({
      headers: await headers(),
    });
  };

  const statusColors: Record<string, { bg: string; text: string }> = {
    PENDING: { bg: "bg-amber-100", text: "text-amber-800" },
    ACCEPTED: { bg: "bg-green-100", text: "text-green-800" },
    REJECTED: { bg: "bg-red-100", text: "text-red-800" },
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Header user={session.user} onSignOut={handleSignOut} />

      <main className="flex-1 py-12 lg:py-20 gradient-mesh">
        <div className="container mx-auto px-6">
          <div className="mb-10 animate-fade-in-up">
            <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--charcoal)] mb-2">
              {role === "EMPLOYER" ? "Employer Dashboard" : "Welcome Back"}
            </h1>
            <p className="text-lg text-[var(--warm-gray)]">
              {session.user.name}
            </p>
          </div>

          {role === "EMPLOYER" ? (
            <div className="grid md:grid-cols-2 gap-8 animate-fade-in-up stagger-1">
              <Link href="/employer/create-job" className="card-elevated p-8 group">
                <div className="w-14 h-14 bg-[var(--terracotta)] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--charcoal)] mb-2 group-hover:text-[var(--terracotta)] transition-colors">
                  Post New Job
                </h2>
                <p className="text-[var(--warm-gray)]">
                  Create a new job listing to attract top talent.
                </p>
              </Link>

              <Link href="/employer" className="card-elevated p-8 group">
                <div className="w-14 h-14 bg-[var(--ethiopian-blue)] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--charcoal)] mb-2 group-hover:text-[var(--terracotta)] transition-colors">
                  Manage Jobs
                </h2>
                <p className="text-[var(--warm-gray)]">
                  View and manage your posted job listings.
                </p>
              </Link>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-8 animate-fade-in-up stagger-1">
                <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--charcoal)]">
                  My Applications
                </h2>
                <Link href="/jobs" className="btn-secondary text-sm">
                  Browse More Jobs
                </Link>
              </div>

              {applications.length === 0 ? (
                <div className="card-elevated p-12 text-center animate-fade-in-up stagger-2">
                  <div className="w-20 h-20 mx-auto mb-6 bg-[var(--cream)] rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-[var(--warm-gray)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--charcoal)] mb-2">
                    No Applications Yet
                  </h3>
                  <p className="text-[var(--warm-gray)] mb-6">
                    Start your journey by applying to jobs that match your skills.
                  </p>
                  <Link href="/jobs" className="btn-primary inline-block">
                    Explore Opportunities
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  {applications.map((app, index) => (
                    <div
                      key={app.id}
                      className="card-elevated p-6 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--charcoal)]">
                            {app.job.title}
                          </h3>
                          <p className="text-[var(--warm-gray)] text-sm">
                            {app.job.company?.name}
                          </p>
                        </div>
                        <span className={`badge ${statusColors[app.status]?.bg} ${statusColors[app.status]?.text}`}>
                          {app.status}
                        </span>
                      </div>
                      {app.coverLetter && (
                        <p className="mt-3 text-sm text-[var(--warm-gray)] line-clamp-2">
                          {app.coverLetter}
                        </p>
                      )}
                      <div className="mt-4 pt-4 border-t border-[var(--cream-dark)] text-xs text-[var(--warm-gray)]">
                        Applied on {new Date(app.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-[var(--charcoal)] text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="font-[family-name:var(--font-display)] text-xl">
              Abay<span className="text-[var(--terracotta)]">Hire</span>
            </Link>
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} AbayHire. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
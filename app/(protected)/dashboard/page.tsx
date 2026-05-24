import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getEmployerJobs, getJobs, getMyApplications, getUserRole } from "@/actions";
import {
  checkVerificationStatus,
  completeVerification,
} from "@/actions/verification";
import { signOut } from "@/actions/signout";
import { getNotifications } from "@/actions/notifications";
import { Header } from "@/components/ui/header";
import { VerifyPrompt } from "@/components/verify-prompt";
import { PendingVerification } from "@/components/pending-verification";
import { SiteFooter } from "@/components/ui/site-footer";

type Props = {
  searchParams: Promise<{
    status?: string;
    session?: string;
  }>;
};

export default async function DashboardPage({ searchParams }: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/signin");

  const params = await searchParams;
  if (params.status === "success" && params.session) {
    await completeVerification(params.session);
    redirect("/dashboard");
  }

  const [{ verified, pending, failed, failureReason }, notifications] = await Promise.all([
    checkVerificationStatus(),
    getNotifications(),
  ]);
  const role = await getUserRole();
  const applications = role === "JOB_SEEKER" ? await getMyApplications() : [];
  const employerJobs = role === "EMPLOYER" ? await getEmployerJobs() : [];
  const recommendedJobs =
    role === "JOB_SEEKER" ? await getJobs() : [];

  if (!verified) {
    return (
      <div className="flex-1 flex flex-col min-h-screen">
        <Header user={session.user} onSignOut={signOut} notifications={notifications} />
        {pending ? (
          <PendingVerification />
        ) : (
          <VerifyPrompt
            user={session.user}
            failed={failed}
            failureReason={failureReason}
          />
        )}
      </div>
    );
  }

  const statusColors: Record<string, { bg: string; text: string }> = {
    PENDING: { bg: "bg-amber-100", text: "text-amber-800" },
    ACCEPTED: { bg: "bg-green-100", text: "text-green-800" },
    REJECTED: { bg: "bg-red-100", text: "text-red-800" },
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Header user={session.user} onSignOut={signOut} notifications={notifications} />

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
            <div className="space-y-8 animate-fade-in-up stagger-1">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="card-elevated p-6">
                  <p className="text-sm text-[var(--warm-gray)]">Open jobs</p>
                  <p className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--charcoal)]">
                    {employerJobs.filter((job) => job.isActive).length}
                  </p>
                </div>
                <div className="card-elevated p-6">
                  <p className="text-sm text-[var(--warm-gray)]">Applicants</p>
                  <p className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--charcoal)]">
                    {employerJobs.reduce((sum, job) => sum + job.applications.length, 0)}
                  </p>
                </div>
                <div className="card-elevated p-6">
                  <p className="text-sm text-[var(--warm-gray)]">Interviewing</p>
                  <p className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--charcoal)]">
                    {employerJobs.reduce(
                      (sum, job) =>
                        sum +
                        job.applications.filter((application) => application.status === "ACCEPTED").length,
                      0,
                    )}
                  </p>
                </div>
                <div className="card-elevated p-6">
                  <p className="text-sm text-[var(--warm-gray)]">Verified employer</p>
                  <p className="mt-3 text-lg font-semibold text-[var(--charcoal)]">
                    Active
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Link
                  href="/employer/create-job"
                  className="card-elevated p-8 group"
                >
                  <div className="w-14 h-14 bg-[var(--terracotta)] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
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
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
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

              <div className="card-elevated p-8">
                <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--charcoal)]">
                  Hiring pipeline snapshot
                </h2>
                <div className="mt-6 grid gap-6 lg:grid-cols-3">
                  {[
                    {
                      title: "Applied",
                      count: employerJobs.reduce(
                        (sum, job) =>
                          sum +
                          job.applications.filter((application) => application.status === "PENDING").length,
                        0,
                      ),
                    },
                    {
                      title: "Interviewing",
                      count: employerJobs.reduce(
                        (sum, job) =>
                          sum +
                          job.applications.filter((application) => application.status === "ACCEPTED").length,
                        0,
                      ),
                    },
                    {
                      title: "Declined",
                      count: employerJobs.reduce(
                        (sum, job) =>
                          sum +
                          job.applications.filter((application) => application.status === "REJECTED").length,
                        0,
                      ),
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded border border-[var(--cream-dark)] bg-[var(--cream)] p-5">
                      <p className="text-sm font-semibold text-[var(--charcoal)]">
                        {item.title}
                      </p>
                      <p className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--charcoal)]">
                        {item.count}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid gap-4 md:grid-cols-4 animate-fade-in-up stagger-1">
                <div className="card-elevated p-6">
                  <p className="text-sm text-[var(--warm-gray)]">Applications</p>
                  <p className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--charcoal)]">
                    {applications.length}
                  </p>
                </div>
                <div className="card-elevated p-6">
                  <p className="text-sm text-[var(--warm-gray)]">Interviewing</p>
                  <p className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--charcoal)]">
                    {applications.filter((application) => application.status === "ACCEPTED").length}
                  </p>
                </div>
                <div className="card-elevated p-6">
                  <p className="text-sm text-[var(--warm-gray)]">In review</p>
                  <p className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--charcoal)]">
                    {applications.filter((application) => application.status === "PENDING").length}
                  </p>
                </div>
                <div className="card-elevated p-6">
                  <p className="text-sm text-[var(--warm-gray)]">Recommended roles</p>
                  <p className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--charcoal)]">
                    {recommendedJobs.slice(0, 3).length}
                  </p>
                </div>
              </div>

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
                    <svg
                      className="w-10 h-10 text-[var(--warm-gray)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--charcoal)] mb-2">
                    No Applications Yet
                  </h3>
                  <p className="text-[var(--warm-gray)] mb-6">
                    Start your journey by applying to jobs that match your
                    skills.
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
                        <span
                          className={`badge ${statusColors[app.status]?.bg} ${statusColors[app.status]?.text}`}
                        >
                          {app.status}
                        </span>
                      </div>
                      {app.coverLetter && (
                        <p className="mt-3 text-sm text-[var(--warm-gray)] line-clamp-2">
                          {app.coverLetter}
                        </p>
                      )}
                      <div className="mt-4 pt-4 border-t border-[var(--cream-dark)] text-xs text-[var(--warm-gray)]">
                        Applied on{" "}
                        {new Date(app.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              </div>

              <div className="card-elevated p-8 animate-fade-in-up stagger-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--charcoal)]">
                      Recommended next roles
                    </h2>
                    <p className="mt-2 text-sm text-[var(--warm-gray)]">
                      A richer recommendation engine is planned into the new architecture. For now, these are the newest open roles.
                    </p>
                  </div>
                  <Link href="/jobs" className="btn-secondary text-sm">
                    View all jobs
                  </Link>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {recommendedJobs.slice(0, 3).map((job) => (
                    <div key={job.id} className="rounded border border-[var(--cream-dark)] bg-[var(--cream)] p-5">
                      <p className="font-semibold text-[var(--charcoal)]">{job.title}</p>
                      <p className="mt-1 text-sm text-[var(--warm-gray)]">
                        {job.company.name} • {job.location}
                      </p>
                      <Link href={`/jobs/${job.id}`} className="mt-4 inline-block text-sm font-semibold text-[var(--terracotta)]">
                        View role
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

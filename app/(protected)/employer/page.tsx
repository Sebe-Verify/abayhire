import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getEmployerJobs } from "@/actions";
import { checkVerificationStatus } from "@/actions/verification";
import { signOut } from "@/actions/signout";
import { getNotifications } from "@/actions/notifications";
import { Header } from "@/components/ui/header";
import { SiteFooter } from "@/components/ui/site-footer";
import { VerifyPrompt } from "@/components/verify-prompt";

export default async function EmployerPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/signin");

  const [{ verified }, jobs, notifications] = await Promise.all([
    checkVerificationStatus(),
    getEmployerJobs(),
    getNotifications(),
  ]);

  if (!verified) {
    return (
      <div className="flex-1 flex flex-col min-h-screen">
        <Header user={session.user} onSignOut={signOut} notifications={notifications} />
        <VerifyPrompt user={session.user} />
      </div>
    );
  }

  const statusColors: Record<string, { bg: string; text: string }> = {
    PENDING: { bg: "bg-amber-100", text: "text-amber-800" },
    ACCEPTED: { bg: "bg-green-100", text: "text-green-800" },
    REJECTED: { bg: "bg-red-100", text: "text-red-800" },
  };

  const jobStatusColors = {
    true: { bg: "bg-green-100", text: "text-green-800" },
    false: { bg: "bg-gray-100", text: "text-gray-800" },
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Header user={session.user} onSignOut={signOut} />

      <main className="flex-1 py-12 lg:py-20 gradient-mesh">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-10 animate-fade-in-up">
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--charcoal)] mb-2">
                Manage Jobs
              </h1>
              <p className="text-lg text-[var(--warm-gray)]">
                View and manage your posted positions
              </p>
            </div>
            <Link href="/employer/create-job" className="btn-primary">
              Post New Job
            </Link>
          </div>

          {jobs.length === 0 ? (
            <div className="card-elevated p-12 text-center animate-fade-in">
              <div className="w-20 h-20 mx-auto mb-6 bg-[var(--cream)] rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-[var(--warm-gray)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--charcoal)] mb-2">
                No Jobs Posted Yet
              </h3>
              <p className="text-[var(--warm-gray)] mb-6">
                Start attracting talent by posting your first job.
              </p>
              <Link href="/employer/create-job" className="btn-primary inline-block">
                Create Your First Job
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.map((job, index) => (
                <div
                  key={job.id}
                  className="card-elevated p-6 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--charcoal)]">
                        {job.title}
                      </h2>
                      <p className="text-[var(--warm-gray)]">
                        {job.location} • {job.type.replace("_", " ")} •{" "}
                        {job.salary
                          ? `$${Number(job.salary).toLocaleString()}`
                          : "Salary not specified"}
                      </p>
                    </div>
                    <span className={`badge ${job.isActive ? jobStatusColors.true.bg : jobStatusColors.false.bg} ${job.isActive ? jobStatusColors.true.text : jobStatusColors.false.text}`}>
                      {job.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="py-4 border-y border-[var(--cream-dark)]">
                    <span className="text-sm font-semibold text-[var(--charcoal)]">
                      {job.applications.length} application{job.applications.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {job.applications.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h3 className="text-sm font-semibold text-[var(--charcoal)]">Applicants</h3>
                      {job.applications.map((app) => (
                        <div
                          key={app.id}
                          className="flex items-center justify-between py-3 px-4 bg-[var(--cream)] rounded"
                        >
                          <div>
                            <p className="font-medium text-[var(--charcoal)]">{app.user.name}</p>
                            <p className="text-sm text-[var(--warm-gray)]">{app.user.email}</p>
                          </div>
                          <span className={`badge ${statusColors[app.status]?.bg} ${statusColors[app.status]?.text}`}>
                            {app.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

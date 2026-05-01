import Link from "next/link";
import { notFound } from "next/navigation";
import { getJob, applyToJob } from "@/actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) notFound();

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isLoggedIn = !!session;
  const isJobSeeker = isLoggedIn;

  return (
    <div className="flex-1">
      <header className="border-b bg-white py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Abay Hire
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/jobs" className="text-gray-600 hover:text-gray-900">
              Jobs
            </Link>
            <Link
              href="/signin"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-8">
        <Link
          href="/jobs"
          className="mb-4 inline-block text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back to Jobs
        </Link>

        <div className="rounded border border-gray-200 p-6">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-gray-600">{job.companyId}</p>
          </div>

          <div className="mb-6 flex gap-4 text-sm text-gray-500">
            <span>{job.location}</span>
            <span>•</span>
            <span>{job.type}</span>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {job.description}
            </p>
          </div>

          {isLoggedIn && isJobSeeker && (
            <form
              action={async () => {
                "use server";
                try {
                  await applyToJob({ jobId: job.id });
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              <button
                type="submit"
                className="w-full rounded bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
              >
                Apply Now
              </button>
            </form>
          )}

          {isLoggedIn && !isJobSeeker && (
            <p className="rounded bg-gray-100 p-4 text-center text-gray-600">
              Employers cannot apply to jobs
            </p>
          )}

          {!isLoggedIn && (
            <Link
              href="/signin"
              className="block w-full rounded bg-blue-600 px-4 py-3 text-center text-white hover:bg-blue-700"
            >
              Sign In to Apply
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
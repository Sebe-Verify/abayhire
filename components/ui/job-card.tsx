import Link from "next/link";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    type: string;
    location: string;
    description?: string;
    salary?: number | null;
    applications?: { id: string }[];
    company: {
      name: string | null;
      image?: string | null;
    };
  };
}

const TYPE_META: Record<string, { badge: string; label: string }> = {
  FULL_TIME:  { badge: "badge-secondary",                         label: "Full-time"  },
  PART_TIME:  { badge: "bg-accent text-text",                     label: "Part-time"  },
  CONTRACT:   { badge: "badge-primary",                           label: "Contract"   },
  INTERNSHIP: { badge: "bg-muted text-text",                      label: "Internship" },
};

export function JobCard({ job }: JobCardProps) {
  const meta = TYPE_META[job.type] ?? { badge: "badge-secondary", label: job.type.replace("_", " ") };

  return (
    <Link href={`/jobs/${job.id}`} className="group block">
      <article className="card-elevated relative flex h-full flex-col overflow-hidden p-6">

        {/* Left accent bar — scales in from bottom on hover */}
        <div className="absolute bottom-0 left-0 top-0 w-0.75 origin-bottom scale-y-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-y-100" />

        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-[1.175rem] leading-snug text-text transition-colors duration-200 group-hover:text-primary">
              {job.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-text-muted">
              {job.company.name || "Company"}
            </p>
          </div>
          <span className={`badge ${meta.badge} shrink-0`}>{meta.label}</span>
        </div>

        {/* Description */}
        {job.description ? (
          <p className="line-clamp-2 flex-1 text-sm leading-6 text-text-muted">
            {job.description}
          </p>
        ) : (
          <div className="flex-1" />
        )}

        {/* Footer */}
        <div className="mt-5 border-t border-border pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-text-muted">
              <svg
                className="h-3.5 w-3.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {job.location}
            </span>
            <span className="font-display font-semibold text-text">
              {job.salary ? `$${Number(job.salary).toLocaleString()}` : "Negotiable"}
            </span>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-xs text-text-muted">
            <span className="flex items-center gap-1.5">
              <svg
                className="h-3 w-3 text-primary"
                viewBox="0 0 8 8"
                fill="currentColor"
                aria-hidden="true"
              >
                <circle cx="4" cy="4" r="3" />
              </svg>
              Verified employer
            </span>
            <span className="font-mono">
              {job.applications?.length ?? 0} applicants
            </span>
          </div>
        </div>

      </article>
    </Link>
  );
}

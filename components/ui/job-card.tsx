import Link from "next/link";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    type: string;
    location: string;
    salary?: number | null;
    company: {
      name: string | null;
      image?: string | null;
    };
  };
}

export function JobCard({ job }: JobCardProps) {
  const typeColors: Record<string, string> = {
    FULL_TIME: "bg-[var(--secondary)]",
    PART_TIME: "bg-[var(--accent)]",
    CONTRACT: "bg-[var(--primary)]",
    INTERNSHIP: "bg-[var(--text-muted)]",
  };

  return (
    <Link href={`/jobs/${job.id}`} className="block group">
      <article className="card-elevated p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--text)] group-hover:text-[var(--primary)] transition-colors truncate">
              {job.title}
            </h3>
            <p className="text-[var(--text-muted)] mt-1">{job.company.name || "Company"}</p>
          </div>
          
          <span className={`badge ${typeColors[job.type] || "badge-secondary"} shrink-0`}>
            {job.type.replace("_", " ")}
          </span>
        </div>

        <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between text-sm">
          <span className="text-[var(--text-muted)] flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {job.location}
          </span>
          <span className="font-semibold text-[var(--text)]">
            {job.salary ? `$${Number(job.salary).toLocaleString()}` : "Salary negotiable"}
          </span>
        </div>
      </article>
    </Link>
  );
}
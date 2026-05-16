"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { jobTypes } from "@/lib/site-content";

export function JobSearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const values = useMemo(
    () => ({
      query:    searchParams.get("query")    ?? "",
      location: searchParams.get("location") ?? "",
      type:     searchParams.get("type")     ?? "ALL",
    }),
    [searchParams],
  );

  const updateParams = (next: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (!value || value === "ALL") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="overflow-hidden rounded border border-border bg-surface shadow-sm">
      <div className="grid lg:grid-cols-[2fr_1.3fr_1fr_auto]">

        {/* Role */}
        <label className="flex flex-col gap-1 border-b border-border p-4 lg:border-b-0 lg:border-r">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-text-muted">
            Role or keyword
          </span>
          <input
            type="search"
            defaultValue={values.query}
            placeholder="Designer, Engineer, Manager…"
            className="bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter")
                updateParams({ query: (e.target as HTMLInputElement).value });
            }}
            onBlur={(e) => updateParams({ query: e.target.value })}
          />
        </label>

        {/* Location */}
        <label className="flex flex-col gap-1 border-b border-border p-4 lg:border-b-0 lg:border-r">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-text-muted">
            Location
          </span>
          <input
            type="text"
            defaultValue={values.location}
            placeholder="Addis Ababa, Remote…"
            className="bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter")
                updateParams({ location: (e.target as HTMLInputElement).value });
            }}
            onBlur={(e) => updateParams({ location: e.target.value })}
          />
        </label>

        {/* Type */}
        <label className="flex flex-col gap-1 border-b border-border p-4 lg:border-b-0 lg:border-r">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-text-muted">
            Job type
          </span>
          <select
            value={values.type}
            className="cursor-pointer bg-transparent text-sm text-text focus:outline-none"
            onChange={(e) => updateParams({ type: e.target.value })}
          >
            {jobTypes.map((jt) => (
              <option key={jt.value} value={jt.value}>
                {jt.label}
              </option>
            ))}
          </select>
        </label>

        {/* Submit */}
        <div className="flex items-stretch p-3">
          <button
            type="button"
            className="btn-primary w-full text-sm lg:w-auto"
            onClick={() => updateParams({})}
          >
            Search
          </button>
        </div>

      </div>
    </div>
  );
}

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
      query: searchParams.get("query") ?? "",
      location: searchParams.get("location") ?? "",
      type: searchParams.get("type") ?? "ALL",
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
    <div className="card-elevated grid gap-4 p-5 lg:grid-cols-[2fr_1.3fr_1fr]">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-[var(--text)]">
          Search jobs
        </span>
        <input
          type="search"
          defaultValue={values.query}
          placeholder="Role, company, or keyword"
          className="input-field"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              updateParams({
                query: (event.target as HTMLInputElement).value,
              });
            }
          }}
          onBlur={(event) =>
            updateParams({ query: event.target.value })
          }
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-[var(--text)]">
          Location
        </span>
        <input
          type="text"
          defaultValue={values.location}
          placeholder="Addis Ababa, Remote"
          className="input-field"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              updateParams({
                location: (event.target as HTMLInputElement).value,
              });
            }
          }}
          onBlur={(event) =>
            updateParams({ location: event.target.value })
          }
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-[var(--text)]">
          Type
        </span>
        <select
          value={values.type}
          className="input-field"
          onChange={(event) => updateParams({ type: event.target.value })}
        >
          {jobTypes.map((jobType) => (
            <option key={jobType.value} value={jobType.value}>
              {jobType.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

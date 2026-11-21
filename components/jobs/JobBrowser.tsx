"use client";

import { useMemo, useState } from "react";
import type { JobSummary } from "@/lib/data";
import { FilterSidebar } from "../FilterSidebar";
import { JobCard } from "./JobCard";

const unique = (values: string[]) => [...new Set(values.filter(Boolean))].sort();

export function JobBrowser({ jobs, showCompany = true }: { jobs: JobSummary[]; showCompany?: boolean }) {
  const [query, setQuery] = useState("");
  const [sectors, setSectors] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const sectorOptions = useMemo(() => unique(jobs.flatMap((j) => j.sectors)), [jobs]);
  const cityOptions = useMemo(() => unique(jobs.map((j) => j.city)), [jobs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter(
      (j) =>
        (!q || [j.title, j.company ?? "", j.city].some((v) => v.toLowerCase().includes(q))) &&
        (sectors.length === 0 || j.sectors.some((s) => sectors.includes(s))) &&
        (cities.length === 0 || cities.includes(j.city))
    );
  }, [jobs, query, sectors, cities]);

  const groups = [
    sectorOptions.length > 1 && { label: "Sector", options: sectorOptions, selected: sectors, onChange: setSectors },
    cityOptions.length > 1 && { label: "City", options: cityOptions, selected: cities, onChange: setCities },
  ].filter((g) => g !== false);

  return (
    <div className="browser">
      <FilterSidebar
        search={query}
        onSearch={setQuery}
        searchLabel="Search for a position"
        groups={groups}
        onReset={() => {
          setQuery("");
          setSectors([]);
          setCities([]);
        }}
      />

      <div>
        <h2 className="sr-only">Open positions</h2>
        <p className="results__count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "position" : "positions"}
        </p>
        {filtered.length > 0 ? (
          <div className="job-list">
            {filtered.map((job) => (
              <JobCard key={job.slug} job={job} showCompany={showCompany} />
            ))}
          </div>
        ) : (
          <p className="results__empty">No positions match these filters.</p>
        )}
      </div>
    </div>
  );
}

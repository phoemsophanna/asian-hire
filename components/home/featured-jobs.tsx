"use client";

import { useState } from "react";
import type { Job } from "@/components/home/job-data";
import JobCard from "../job/job-card";
import { ArrowRight } from "lucide-react";

const tabs = ["Featured", "Urgent", "Latest"] as const;
type JobTab = (typeof tabs)[number];

export default function FeaturedJobs({ jobs }: { jobs: Job[] }) {
  const [activeTab, setActiveTab] = useState<JobTab>("Featured");
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const filteredJobs = jobs.filter(
    (job) => activeTab === "Featured" || job.category === activeTab,
  );

  function toggleSaved(title: string) {
    setSavedJobs((current) =>
      current.includes(title)
        ? current.filter((savedTitle) => savedTitle !== title)
        : [...current, title],
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center items-center gap-4">
        <div
          aria-label="Filter jobs"
          className="inline-flex max-w-full flex-wrap items-center gap-1 rounded-full border border-slate-200/70 bg-white p-1.5 shadow-sm"
          role="tablist"
        >
          {tabs.map((tab) => (
            <button
              aria-selected={activeTab === tab}
              className={`relative rounded-full px-5 py-1.5 text-sm font-semibold
                whitespace-nowrap transition-all duration-300 ease-out
                focus-visible:outline-none focus-visible:ring-2 border
                focus-visible:ring-[#485ea8]/50 focus-visible:ring-offset-2
                active:scale-95 ${
                  activeTab === tab
                    ? "bg-white text-[#485ea8] shadow-[0_2px_8px_rgba(23,43,77,0.10)] border-[#485ea8]/30"
                    : "bg-transparent text-slate-500 hover:bg-white/60 border-black/5 hover:text-[#172b4d]"
                }`}
              key={tab}
              onClick={() => setActiveTab(tab)}
              role="tab"
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-500" role="status">
          No jobs match your search. Try adjusting your keywords or filters.
        </p>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2" role="tabpanel">
          {filteredJobs.map((job, index) => {
            return (
              <JobCard job={job} key={index} />
            );
          })}
        </div>
      )}

      <div className="mt-8 text-center">
        <a
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-[#172b4d] transition hover:border-blue-200 hover:text-[#485ea8]"
          href="#featured-jobs"
        >
          View all Job <ArrowRight aria-hidden="true" className="size-4" />
        </a>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
// import type { Job } from "@/components/home/job-data";
import JobCard from "../job/job-card";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "@/util/animations";
import { HomepageJob } from "@/services/homepage-service";

type JobTab = {
  key: string;
  label: string;
  matches: (job: HomepageJob) => boolean;
};

export default function FeaturedJobs({
  jobs,
  types,
  t = (text: string) => text,
}: {
  jobs: HomepageJob[];
  types: { id: number; title: string }[];
  t?: (text: string) => string;
}) {
  const tabs: JobTab[] = [
    { key: "featured", label: t("Featured"), matches: (job) => job.is_featured === true },
    ...types.map((type) => ({
      key: `type-${type.id}`,
      label: type.title,
      matches: (job: HomepageJob) =>
        (job.type_ids?.includes(type.id) ?? false) ||
        (job.types?.some((jobType) => jobType.id === type.id) ?? false),
    })),
  ];
  const [activeKey, setActiveKey] = useState("featured");
  const activeTab = tabs.find((tab) => tab.key === activeKey) ?? tabs[0];
  const filteredJobs = jobs.filter(activeTab.matches);

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center items-center gap-4">
        <Reveal direction="zoom">
          <div
            aria-label="Filter jobs"
            className="inline-flex max-w-full flex-wrap items-center gap-1 rounded-full border border-slate-200/70 bg-white p-1.5 shadow-sm"
            role="tablist"
          >
            {tabs.map((tab) => (
              <button
                aria-selected={activeKey === tab.key}
                className={`relative rounded-full px-6 py-3 text-sm font-semibold
                  whitespace-nowrap transition-all duration-300 ease-out
                  focus-visible:outline-none focus-visible:ring-2 border
                  focus-visible:ring-[#485ea8]/50 focus-visible:ring-offset-2
                  active:scale-95 ${
                    activeKey === tab.key
                      ? "bg-white text-[#485ea8] shadow-[0_2px_8px_rgba(23,43,77,0.10)] border-[#485ea8]/30"
                      : "bg-transparent text-slate-500 hover:bg-white/60 border-black/5 hover:text-[#172b4d]"
                  }`}
                key={tab.key}
                onClick={() => setActiveKey(tab.key)}
                role="tab"
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {filteredJobs.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-500" role="status">
          {t("No jobs match your search.")}
        </p>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2" key={activeKey}>
          {filteredJobs.map((job, index) => (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              key={index}
              transition={{ duration: 0.5, delay: Math.min(index, 8) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <JobCard job={job} />
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Reveal direction="zoom">
          <a
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-[#172b4d] transition hover:border-blue-200 hover:text-[#485ea8]"
            href={`/jobs`}
          >
            {t("View all Jobs")} <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </Reveal>
      </div>
    </div>
  );
}

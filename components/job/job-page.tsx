"use client";

import { useMemo, useState } from "react";
import {
  Search,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

import JobCard from "./job-card";
import HeroSearch from "@/components/home/hero-search";
import type {
  Job,
  JobSearchFilters,
} from "@/components/home/job-data";

// Replace this import with your actual jobs data source.
import { jobs } from "@/components/home/job-data";

const PAGE_SIZE = 6;

type SortOption = "newest" | "oldest" | "title";

export default function JobPage({
  initialFilters,
}: {
  initialFilters: JobSearchFilters;
}) {
  const [filters, setFilters] = useState<JobSearchFilters>(initialFilters);

  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const industries = useMemo(
    () =>
      Array.from(
        new Set(
          (jobs as Job[])
            .map((job: any) => job.industry)
            .filter(Boolean),
        ),
      ).sort(),
    [],
  );

  const filteredJobs = useMemo(() => {
    const keyword = filters.keyword?.trim().toLowerCase() || "";
    const industry = filters.industry || "";

    const result = (jobs as Job[]).filter((job: any) => {
      const matchesKeyword =
        !keyword ||
        [job.title, job.company, job.location, job.description]
          .some((value) =>
            String(value || "").toLowerCase().includes(keyword),
          );

      const matchesIndustry =
        !industry || job.industry === industry;

      return matchesKeyword && matchesIndustry;
    });

    return result.sort((a: any, b: any) => {
      if (sortBy === "title") {
        return String(a.title || "").localeCompare(
          String(b.title || ""),
        );
      }

      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();

      return sortBy === "newest"
        ? dateB - dateA
        : dateA - dateB;
    });
  }, [filters, sortBy]);

  const totalPages = Math.ceil(filteredJobs.length / PAGE_SIZE);
  const safePage = Math.min(currentPage, Math.max(totalPages, 1));

  const paginatedJobs = filteredJobs.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  function updateFilter(
    key: keyof JobSearchFilters,
    value: string,
  ) {
    setFilters((previous) => ({
      ...previous,
      [key]: value,
    }));

    setCurrentPage(1);
  }

  function resetFilters() {
    setFilters({
      keyword: "",
      industry: "",
      location: ""
    });
    setSortBy("newest");
    setCurrentPage(1);
  }

  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* Hero */}
      <section className="relative bg-[#10264b]">
        <div className="absolute -right-20 -top-28 size-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 size-72 rounded-full bg-indigo-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100">
            <BriefcaseBusiness size={14} />
            Find your next opportunity
          </span>

          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Find a job that moves your career forward.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100/80 sm:text-base">
            Explore opportunities from companies, discover new career
            paths, and find the right position for your skills.
          </p>

          <HeroSearch
            className="mt-8 max-w-4xl"
            filters={filters}
            resultCount={filteredJobs.length}
            hasSearched={Boolean(filters.keyword || filters.industry || filters.location)}
            industries={industries}
            onKeywordChange={(keyword) => updateFilter("keyword", keyword)}
            onIndustryChange={(industry) => updateFilter("industry", industry)}
          />
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-10 sm:py-16">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Browse Jobs
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredJobs.length === 0
                  ? 0
                  : (safePage - 1) * PAGE_SIZE + 1}
                {"–"}
                {Math.min(safePage * PAGE_SIZE, filteredJobs.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800">
                {filteredJobs.length}
              </span>{" "}
              jobs
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:text-[#485ea8]"
            >
              <RotateCcw size={15} />
              Reset
            </button>

            <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm">
              <span className="whitespace-nowrap text-slate-500">
                Sort by
              </span>

              <select
                value={sortBy}
                onChange={(event) => {
                  setSortBy(event.target.value as SortOption);
                  setCurrentPage(1);
                }}
                className="max-w-36 bg-transparent font-semibold text-slate-800 outline-none"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="title">Job title</option>
              </select>
            </label>
          </div>
        </div>

        {/* Job cards */}
        {paginatedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedJobs.map((job: any, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Search size={24} />
            </span>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              No jobs found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try another keyword or choose a different industry.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-xl bg-[#485ea8] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            aria-label="Job listing pagination"
            className="mt-9 flex flex-wrap items-center justify-center gap-2"
          >
            <button
              type="button"
              disabled={safePage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-[#485ea8] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - safePage) <= 1,
              )
              .reduce<(number | "...")[]>((pages, page, index, all) => {
                if (index > 0 && page - all[index - 1] > 1) {
                  pages.push("...");
                }

                pages.push(page);
                return pages;
              }, [])
              .map((page, index) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-1 text-slate-400"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    type="button"
                    aria-current={safePage === page ? "page" : undefined}
                    onClick={() => setCurrentPage(page)}
                    className={`size-10 rounded-xl text-sm font-bold transition ${
                      safePage === page
                        ? "bg-[#485ea8] text-white shadow-md shadow-[#485ea8]/20"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-[#485ea8]"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

            <button
              type="button"
              disabled={safePage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-[#485ea8] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </nav>
        )}
      </section>
    </main>
  );
}
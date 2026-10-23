"use client";

import { Search } from "lucide-react";
import type { JobSearchFilters } from "@/components/home/job-data";
import IndustryDropdown from "../ui/IndustryDropdown";
import { useRouter } from "next/navigation";

export default function HeroSearch({
  filters,
  resultCount,
  hasSearched,
  industries,
  onKeywordChange,
  onIndustryChange,
  className = "",
}: {
  filters: JobSearchFilters;
  resultCount: number;
  hasSearched: boolean;
  industries?: string[];
  onKeywordChange?: (keyword: string) => void;
  onIndustryChange?: (industry: string) => void;
  className?: string;
}) {
  const router = useRouter();

  const handleFilterForm = () => {
    const params = new URLSearchParams();

    if (filters.keyword.trim()) {
      params.set("keyword", filters.keyword.trim());
    }

    if (filters.industry) {
      params.set("industry", filters.industry);
    }

    if (filters.location.trim()) {
      params.set("location", filters.location.trim());
    }

    const query = params.toString();

    router.push(query ? `/jobs?${query}` : "/jobs");
  };

  return (
    <div className={className}>
      <form
        className="grid gap-2 rounded-2xl border border-white/10 bg-white/15 p-2 shadow-[0_20px_55px_rgba(12,36,75,0.2)] md:grid-cols-[1.35fr_1fr_1fr]"
        method="get"
        onSubmit={(e) => {
          e.preventDefault();
          handleFilterForm();
        }}
      >
        <label className="flex border border-white/10 bg-white/10 rounded-xl backdrop-blur-[5px] p-2 px-3 min-h-14 items-center gap-3 pr-10">
          <Search aria-hidden="true" className="size-5 shrink-0 absolute right-3 text-[#485ea8]" />
          <span className="sr-only">Job title or keyword</span>
          <input
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-300"
            defaultValue={onKeywordChange ? undefined : filters.keyword}
            value={onKeywordChange ? filters.keyword : undefined}
            onChange={(event) => onKeywordChange?.(event.target.value)}
            name="keyword"
            placeholder="Job title or keyword"
          />
        </label>
        <IndustryDropdown
          filters={filters.industry}
          value={onIndustryChange ? filters.industry : undefined}
          industries={industries}
          onChange={onIndustryChange}
        />
        <button
          className="inline-flex cursor-pointer min-h-14 items-center justify-center gap-2 rounded-xl bg-[#485ea8] px-8 text-sm font-semibold text-white transition hover:bg-[#3c4f8d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          type="submit"
        >
          <Search aria-hidden="true" className="size-4" />
          Search jobs
        </button>
      </form>
      <p aria-live="polite" className="mt-3 min-h-5 text-sm text-white/90">
        {hasSearched
          ? `${resultCount} matching ${resultCount === 1 ? "opportunity" : "opportunities"} found.`
          : null}
      </p>
    </div>
  );
}

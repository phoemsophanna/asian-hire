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
  variant = "hero",
}: {
  filters: JobSearchFilters;
  resultCount: number;
  hasSearched: boolean;
  industries?: string[];
  onKeywordChange?: (keyword: string) => void;
  onIndustryChange?: (industry: string) => void;
  className?: string;
  variant?: "hero" | "light";
}) {
  const router = useRouter();
  const isLight = variant === "light";

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
        className={`grid gap-2 rounded-2xl p-2.5 md:grid-cols-[1.35fr_1fr_1fr] ${
          isLight
            ? "border border-slate-200 bg-slate-50 shadow-sm"
            : "border border-white/10 bg-white/15 shadow-[0_20px_55px_rgba(12,36,75,0.2)]"
        }`}
        method="get"
        onSubmit={(e) => {
          e.preventDefault();
          handleFilterForm();
        }}
      >
        <label
          className={`flex min-h-14 items-center relative gap-3 rounded-xl border p-2 px-3 ${
            isLight
              ? "border-slate-200 bg-white focus-within:border-[#485ea8] focus-within:ring-2 focus-within:ring-[#485ea8]/10"
              : "border-white/10 bg-white/80 pr-10"
          }`}
        >
          <Search
            aria-hidden="true"
            className={`size-5 shrink-0 ${
              isLight ? "text-slate-400" : "absolute right-3 text-[#485ea8]"
            }`}
          />
          <span className="sr-only">Job title or keyword</span>
          <input
            className={`min-w-0 flex-1 bg-transparent text-sm outline-none ${
              isLight
                ? "text-[#485ea8] placeholder:text-[#485ea8]"
                : "text-[#485ea8] placeholder:text-[#485ea8]"
            }`}
            defaultValue={onKeywordChange ? undefined : filters.keyword}
            value={onKeywordChange ? filters.keyword : undefined}
            onChange={(event) => onKeywordChange?.(event.target.value)}
            name="keyword"
            placeholder="Job title here"
          />
        </label>
        <IndustryDropdown
          filters={filters.industry}
          value={onIndustryChange ? filters.industry : undefined}
          industries={industries}
          onChange={onIndustryChange}
          variant={variant}
        />
        <button
          className={`inline-flex min-h-14 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#485ea8] px-8 text-sm font-semibold text-white transition hover:bg-[#3c4f8d] focus-visible:outline-2 focus-visible:outline-offset-2 ${
            isLight
              ? "focus-visible:outline-[#485ea8]"
              : "focus-visible:outline-white"
          }`}
          type="submit"
        >
          <Search aria-hidden="true" className="size-4" />
          Search Jobs
        </button>
      </form>
      {/* <p aria-live="polite" className="mt-3 min-h-5 text-sm text-white/90">
        {hasSearched
          ? `${resultCount} matching ${resultCount === 1 ? "opportunity" : "opportunities"} found.`
          : null}
      </p> */}
    </div>
  );
}

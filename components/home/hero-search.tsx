"use client";

import { Search } from "lucide-react";
import type { JobSearchFilters } from "@/components/home/job-data";
import IndustryDropdown from "../ui/IndustryDropdown";
import { useRouter } from "next/navigation";
import { useLanguage } from "../LanguageProvider";

export default function HeroSearch({
  filters,
  resultCount,
  hasSearched,
  industries,
  onKeywordChange,
  onIndustryChange,
  onSearch,
  className = "",
  variant = "hero",
  t = (text: string) => text,
  industryIds,
}: {
  filters: JobSearchFilters;
  resultCount?: number;
  hasSearched?: boolean;
  industries?: string[];
  industryIds?: Record<string, number>;
  onKeywordChange?: (keyword: string) => void;
  onIndustryChange?: (industry: string) => void;
  onSearch?: (values: { keyword: string; industry: string }) => void;
  className?: string;
  variant?: "hero" | "light";
  t?: (text: string) => string;
}) {
  const router = useRouter();
  const { localizeHref } = useLanguage();
  const isLight = variant === "light";

  const handleFilterForm = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const keyword = String(formData.get("keyword") ?? "").trim();
    const industry = String(formData.get("industry") ?? "").trim();

    // Controlled mode (jobs page): hand the values to the page instead of navigating.
    if (onSearch) {
      onSearch({ keyword, industry });
      return;
    }

    const params = new URLSearchParams();

    if (keyword) {
      params.set("keyword", keyword);
    }

    if (industry) {
      params.set("industry", String(industryIds?.[industry] ?? industry));
    }

    if (filters.location.trim()) {
      params.set("location", filters.location.trim());
    }

    const query = params.toString();

    router.push(localizeHref(query ? `/jobs?${query}` : "/jobs"));
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
          handleFilterForm(e.currentTarget);
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
          <span className="sr-only">{t("Job title or keyword")}</span>
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
            placeholder={t("Job title here")}
          />
        </label>
        <IndustryDropdown
          filters={filters.industry}
          value={onIndustryChange ? filters.industry : undefined}
          industries={industries}
          onChange={onIndustryChange}
          variant={variant}
          t={t}
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
          {t("Search Jobs")}
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

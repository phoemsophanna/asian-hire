"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Info,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

import JobCard from "./job-card";
import HeroSearch from "@/components/home/hero-search";
import type { JobSearchFilters } from "@/components/home/job-data";
import PageBanner from "../PageBanner";
import { Reveal, Stagger, StaggerItem } from "@/util/animations";
import { fetchIndustryPage } from "@/services/industry-service";
import { fetchPublicJobs, fetchJobPageContent, type JobPageContent, type JobSort, type PublicJob } from "@/services/job-service";
import { createTranslator, fetchTranslations } from "@/services/translation-service";
import { useLanguage } from "../LanguageProvider";

const PAGE_SIZE = 40;

type SortOption = JobSort;

export default function JobPage({
  initialFilters,
}: {
  initialFilters: JobSearchFilters;
}) {
  const [filters, setFilters] = useState<JobSearchFilters>(initialFilters);
  // Filters used for requests; only updated when the user clicks Search Job.
  const [appliedFilters, setAppliedFilters] = useState<JobSearchFilters>(initialFilters);
  const { locale, localizeHref } = useLanguage();
  const router = useRouter();
  const [industryOptions, setIndustryOptions] = useState<{ id: number; title: string }[]>([]);

  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState<PublicJob[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const [resultVersion, setResultVersion] = useState(0);
  const [pageContent, setPageContent] = useState<JobPageContent | null>(null);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const t = createTranslator(translations);

  useEffect(() => {
    let active = true;

    fetchTranslations(locale).then((result) => {
      if (active) setTranslations(result);
    });

    return () => {
      active = false;
    };
  }, [locale]);

  useEffect(() => {
    let active = true;

    fetchJobPageContent(locale).then((result) => {
      if (active) setPageContent(result);
    });

    return () => {
      active = false;
    };
  }, [locale]);

  useEffect(() => {
    let active = true;

    fetchIndustryPage(locale).then((result) => {
      if (active && result) {
        setIndustryOptions(
          result.items.map((industry) => ({ id: industry.id, title: industry.title })),
        );
      }
    });

    return () => {
      active = false;
    };
  }, [locale]);

  const industryIds = useMemo(
    () => Object.fromEntries(industryOptions.map((industry) => [industry.title, industry.id])),
    [industryOptions],
  );

  const industryTitlesById = useMemo(
    () => new Map(industryOptions.map((industry) => [String(industry.id), industry.title])),
    [industryOptions],
  );

  const industries = industryOptions.map((industry) => industry.title);

  // Re-sync when the URL changes (client navigation keeps this component mounted).
  // The URL industry is an id; resolve it to the title the dropdown uses.
  const { keyword: urlKeyword, industry: urlIndustry, location: urlLocation } = initialFilters;
  useEffect(() => {
    const synced = {
      keyword: urlKeyword,
      location: urlLocation,
      industry: industryTitlesById.get(urlIndustry) ?? urlIndustry,
    };
    setFilters(synced);
    setAppliedFilters(synced);
    setCurrentPage(1);
  }, [urlKeyword, urlIndustry, urlLocation, industryTitlesById]);

  const selectedIndustryId = appliedFilters.industry ? industryIds[appliedFilters.industry] : undefined;

  useEffect(() => {
    const controller = new AbortController();

    fetchPublicJobs(
      {
        lang: locale,
        page: currentPage,
        perPage: PAGE_SIZE,
        keyword: appliedFilters.keyword,
        location: appliedFilters.location,
        industryId: selectedIndustryId,
        sort: sortBy,
      },
      controller.signal,
    )
      .then((result) => {
        if (!result) {
          setJobs([]);
          setTotalJobs(0);
          setLastPage(1);
          setResultVersion((version) => version + 1);
          return;
        }

        setJobs(result.data);
        setTotalJobs(result.total);
        setLastPage(Math.max(result.last_page, 1));
        setResultVersion((version) => version + 1);

        if (currentPage > result.last_page && result.last_page > 0) {
          setCurrentPage(result.last_page);
        }
      })
      .catch((error) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.error(error);
        }
      });

    return () => controller.abort();
  }, [locale, currentPage, appliedFilters.keyword, appliedFilters.location, selectedIndustryId, sortBy]);

  const totalPages = lastPage;
  const safePage = currentPage;
  const rangeStart = totalJobs === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(safePage * PAGE_SIZE, totalJobs);

  function updateFilter(
    key: keyof JobSearchFilters,
    value: string,
  ) {
    setFilters((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  function applySearch(values: { keyword: string; industry: string }) {
    const next = { ...filters, ...values };
    setFilters(next);
    setAppliedFilters(next);
    setCurrentPage(1);

    const params = new URLSearchParams();
    if (next.keyword.trim()) params.set("keyword", next.keyword.trim());
    if (next.industry && industryIds[next.industry]) {
      params.set("industry", String(industryIds[next.industry]));
    }
    if (next.location.trim()) params.set("location", next.location.trim());

    const query = params.toString();
    router.push(localizeHref(query ? `/jobs?${query}` : "/jobs"), { scroll: false });
  }

  const searchRef = useRef<HTMLDivElement>(null);

  function goToPage(page: number) {
    setCurrentPage(page);
    searchRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function resetFilters() {
    const cleared = {
      keyword: "",
      industry: "",
      location: ""
    };
    setFilters(cleared);
    setAppliedFilters(cleared);
    setSortBy("newest");
    setCurrentPage(1);
    router.push(localizeHref("/jobs"), { scroll: false });
  }

  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* Hero */}
      <PageBanner title="Job Search" image={pageContent?.thumbnail} />

      {/* Results */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-10 sm:py-16">
        {pageContent?.notice && (
          <Reveal direction="zoom">
            <div className="mb-8 flex items-start md:items-center gap-3 rounded-2xl border border-[#485ea8]/15 bg-[#485ea8]/[0.04] p-4 sm:gap-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#485ea8]/10 text-[#485ea8]">
                <Info aria-hidden="true" size={18} />
              </span>
              <div
                className="job-notice text-sm md:text-base leading-7 text-slate-600 [&_a]:font-semibold [&_a]:text-[#485ea8] [&_a]:underline [&_a]:decoration-[#485ea8]/30 [&_a]:underline-offset-4                 [&_a]:transition"                dangerouslySetInnerHTML={{ __html: pageContent.notice }}
              />
            </div>
          </Reveal>
        )}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <Reveal direction="left">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                {t("Browse Jobs")}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {t("Showing")}{" "}
                <span className="font-semibold text-slate-800">
                  {rangeStart}
                  {"–"}
                  {rangeEnd}
                </span>{" "}
                {t("of")}{" "}
                <span className="font-semibold text-slate-800">
                  {totalJobs}
                </span>{" "}
                {t("jobs")}
              </p>
            </div>
          </Reveal>
          
          <Reveal direction="right">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:text-[#485ea8]"
              >
                <RotateCcw size={15} />
                {t("Reset")}
              </button>

              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm">
                <span className="whitespace-nowrap text-slate-500">
                  {t("Sort by")}
                </span>

                <select
                  value={sortBy}
                  onChange={(event) => {
                    setSortBy(event.target.value as SortOption);
                    setCurrentPage(1);
                  }}
                  className="max-w-36 bg-transparent font-semibold text-slate-800 outline-none"
                >
                  <option value="newest">{t("Newest")}</option>
                  <option value="oldest">{t("Oldest")}</option>
                  <option value="title">{t("Job title")}</option>
                </select>
              </label>
            </div>
          </Reveal>
        </div>

        <div ref={searchRef} className="mb-8 scroll-mt-24">
          <Reveal direction="up">
            <HeroSearch
              variant="light"
              filters={filters}
              resultCount={totalJobs}
              hasSearched={Boolean(filters.keyword || filters.industry || filters.location)}
              industries={industries}
              industryIds={industryIds}
              onKeywordChange={(keyword) => updateFilter("keyword", keyword)}
              onIndustryChange={(industry) => updateFilter("industry", industry)}
              onSearch={applySearch}
            />
          </Reveal>
        </div>

        {/* Job cards */}
        {jobs.length > 0 ? (
          <Stagger
            key={resultVersion}
            delay={0.2}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {jobs.map((job) => (
              <StaggerItem key={job.id} direction="up">
                <JobCard job={job} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Search size={24} />
            </span>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              {t("No jobs found")}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {t("Try another keyword or choose a different industry.")}
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-xl bg-[#485ea8] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {t("Clear filters")}
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
              onClick={() => goToPage(safePage - 1)}
              className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-[#485ea8] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
              {t("Previous")}
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
                    onClick={() => goToPage(page)}
                    className={`size-10 cursor-pointer rounded-xl text-sm font-bold transition ${
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
              onClick={() => goToPage(safePage + 1)}
              className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-[#485ea8] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t("Next")}
              <ChevronRight size={16} />
            </button>
          </nav>
        )}
      </section>
    </main>
  );
}
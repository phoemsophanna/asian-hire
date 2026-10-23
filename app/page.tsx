import { Suspense } from "react";
import HomePage from "@/components/home/home-page";
import { jobs, type JobSearchFilters } from "@/components/home/job-data";

function getFilterValue(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

async function SearchableHomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const filters: JobSearchFilters = {
    keyword: getFilterValue(params.keyword),
    industry: getFilterValue(params.industry),
    location: getFilterValue(params.location),
  };
  const normalizedKeyword = filters.keyword.toLowerCase();
  const normalizedIndustry = filters.industry.toLowerCase();
  const normalizedLocation = filters.location.toLowerCase();
  const filteredJobs = jobs.filter((job) => {
    const matchesKeyword =
      !normalizedKeyword ||
      `${job.title} ${job.company} ${job.industry}`.toLowerCase().includes(normalizedKeyword);
    const matchesIndustry =
      !normalizedIndustry || job.industry.toLowerCase() === normalizedIndustry;
    const matchesLocation =
      !normalizedLocation || job.location.toLowerCase().includes(normalizedLocation);

    return matchesKeyword && matchesIndustry && matchesLocation;
  });
  const hasSearched = Boolean(filters.keyword || filters.industry || filters.location);

  return <HomePage filters={filters} hasSearched={hasSearched} jobs={filteredJobs} />;
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <Suspense
      fallback={
        <HomePage
          filters={{ keyword: "", industry: "", location: "" }}
          hasSearched={false}
          jobs={jobs}
        />
      }
    >
      <SearchableHomePage searchParams={searchParams} />
    </Suspense>
  );
}

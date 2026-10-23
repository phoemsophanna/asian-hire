import { Suspense } from "react";
import JobPage from "@/components/job/job-page";
import type { JobSearchFilters } from "@/components/home/job-data";

function getFilterValue(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

async function SearchableJobPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const initialFilters: JobSearchFilters = {
    keyword: getFilterValue(params.keyword),
    industry: getFilterValue(params.industry),
    location: getFilterValue(params.location),
  };

  return <JobPage initialFilters={initialFilters} />;
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <Suspense
      fallback={
        <JobPage
          initialFilters={{ keyword: "", industry: "", location: "" }}
        />
      }
    >
      <SearchableJobPage searchParams={searchParams} />
    </Suspense>
  );
}

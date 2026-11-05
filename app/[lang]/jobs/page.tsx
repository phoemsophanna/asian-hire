import { Suspense, cache } from "react";
import type { Metadata } from "next";
import { SITE_NAME, buildPageMetadata } from "@/util/seo-metadata";
import JobPage from "@/components/job/job-page";
import type { JobSearchFilters } from "@/components/home/job-data";
import { fetchSeo, type ApiLang } from "@/services/homepage-service";
import { isUrlLocale, DEFAULT_URL_LOCALE, type UrlLocale } from "@/util/i18n";

const getSeo = cache(fetchSeo);

function resolveLang(lang: string): UrlLocale {
  return isUrlLocale(lang) ? lang : DEFAULT_URL_LOCALE;
}

function toApiLang(urlLocale: UrlLocale): ApiLang {
  return urlLocale === "km" ? "km" : "eng";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const urlLocale = resolveLang((await params).lang);
  const seo = await getSeo(toApiLang(urlLocale), "job");
  if (!seo) return {};

  return buildPageMetadata({
    title: seo.title || SITE_NAME,
    description: seo.description,
    keywords: seo.keywords,
  });
}

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

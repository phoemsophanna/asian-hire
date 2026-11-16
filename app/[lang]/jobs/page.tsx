import { Suspense, cache } from "react";
import type { Metadata } from "next";
import { SITE_NAME, buildPageMetadata } from "@/util/seo-metadata";
import JobPage from "@/components/job/job-page";
import type { JobSearchFilters } from "@/components/home/job-data";
import { fetchSeo, type ApiLang } from "@/services/homepage-service";
import { fetchTranslations } from "@/services/translation-service";
import { isUrlLocale, DEFAULT_URL_LOCALE, type UrlLocale } from "@/util/i18n";

const getSeo = cache(fetchSeo);
const getTranslations = cache(fetchTranslations);

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
  lang,
  searchParams,
}: {
  lang: string;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const urlLocale = resolveLang(lang);
  const initialFilters: JobSearchFilters = {
    keyword: getFilterValue(params.keyword),
    industry: getFilterValue(params.industry),
    location: getFilterValue(params.location),
  };
  const initialTranslations = await getTranslations(toApiLang(urlLocale));

  return <JobPage initialFilters={initialFilters} initialTranslations={initialTranslations} />;
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { lang } = await params;
  return (
    <Suspense
      fallback={
        <JobPage
          initialFilters={{ keyword: "", industry: "", location: "" }}
        />
      }
    >
      <SearchableJobPage lang={lang} searchParams={searchParams} />
    </Suspense>
  );
}

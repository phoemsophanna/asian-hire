import JobDetail from "@/components/job/job-detail";
import JsonLd from "@/components/seo/json-ld";
import { Suspense, cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/util/seo-metadata";
import { absoluteUrl } from "@/util/site-url";
import { jobPostingJsonLd } from "@/util/structured-data";
import { fetchPublicJob } from "@/services/job-service";
import { isUrlLocale, DEFAULT_URL_LOCALE, localizePath, type UrlLocale } from "@/util/i18n";
import type { ApiLang } from "@/services/homepage-service";

const getJob = cache(fetchPublicJob);

function resolveLang(lang: string): UrlLocale {
  return isUrlLocale(lang) ? lang : DEFAULT_URL_LOCALE;
}

function toApiLang(urlLocale: UrlLocale): ApiLang {
  return urlLocale === "km" ? "km" : "eng";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const urlLocale = resolveLang(lang);
  const job = await getJob(slug, toApiLang(urlLocale));
  if (!job) return { robots: { index: false, follow: false } };

  return buildPageMetadata({
    title: job.seo.title,
    description: job.seo.description,
    keywords: job.seo.keywords,
    og_image: job.seo.og_image,
    canonical_url: job.seo.canonical_url,
    robots_index: job.seo.robots_index,
    robots_follow: job.seo.robots_follow,
    path: localizePath(`/jobs/${slug}`, urlLocale),
    lang: urlLocale,
  });
}

export default function Page({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="h-16" />}>
      <SlugJobDetail params={params} />
    </Suspense>
  );
}

async function SlugJobDetail({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const urlLocale = resolveLang(lang);
  const job = await getJob(slug, toApiLang(urlLocale));
  if (!job) notFound();

  const pageUrl = absoluteUrl(localizePath(`/jobs/${slug}`, urlLocale));

  return (
    <>
      <JsonLd data={jobPostingJsonLd(job, pageUrl)} />
      <JobDetail jobId={slug} shareUrl={pageUrl} />
    </>
  );
}



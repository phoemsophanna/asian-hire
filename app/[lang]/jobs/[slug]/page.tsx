import JobDetail from "@/components/job/job-detail";
import { Suspense, cache } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/util/seo-metadata";
import { fetchPublicJob } from "@/services/job-service";
import { isUrlLocale, DEFAULT_URL_LOCALE, type UrlLocale } from "@/util/i18n";
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
  const job = await getJob(slug, toApiLang(resolveLang(lang)));
  if (!job) return {};

  return buildPageMetadata({
    title: job.seo.title,
    description: job.seo.description,
    keywords: job.seo.keywords,
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
  const { slug } = await params;

  return <JobDetail jobId={slug} />;
}


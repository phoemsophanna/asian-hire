import ServiceDetail from "@/components/service/ServiceDetail";
import { Suspense, cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/util/seo-metadata";
import { fetchServiceDetail } from "@/services/service-detail-service";
import { isUrlLocale, DEFAULT_URL_LOCALE, type UrlLocale } from "@/util/i18n";
import type { ApiLang } from "@/services/homepage-service";

const getContent = cache(fetchServiceDetail);

function resolveLang(lang: string): UrlLocale {
  return isUrlLocale(lang) ? lang : DEFAULT_URL_LOCALE;
}

function toApiLang(urlLocale: UrlLocale): ApiLang {
  return urlLocale === "km" ? "km" : "eng";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  const content = await getContent(id, toApiLang(resolveLang(lang)));
  if (!content) return {};

  return buildPageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    image: content.thumbnail,
  });
}

export default function Page({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  return (
    <Suspense fallback={<div className="h-16" />}>
      <ServicePage params={params} />
    </Suspense>
  );
}

async function ServicePage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  const service = await getContent(id, toApiLang(resolveLang(lang)));

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} lang={toApiLang(resolveLang(lang))} />;
}

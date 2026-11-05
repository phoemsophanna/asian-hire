import ServicePage from "@/components/service/service-page";
import { Suspense, cache } from "react";
import { notFound } from "next/navigation";
import { fetchServiceList } from "@/services/service-list-service";
import { isUrlLocale, DEFAULT_URL_LOCALE, type UrlLocale } from "@/util/i18n";
import type { ApiLang } from "@/services/homepage-service";

const getContent = cache(fetchServiceList);

function resolveLang(lang: string): UrlLocale {
  return isUrlLocale(lang) ? lang : DEFAULT_URL_LOCALE;
}

function toApiLang(urlLocale: UrlLocale): ApiLang {
  return urlLocale === "km" ? "km" : "eng";
}

export default function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return (
    <Suspense fallback={<div className="h-16" />}>
      <ServiceListContent params={params} />
    </Suspense>
  );
}

async function ServiceListContent({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = await getContent(toApiLang(resolveLang(lang)));

  if (!content) {
    notFound();
  }

  return <ServicePage content={content} />;
}
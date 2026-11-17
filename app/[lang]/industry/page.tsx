import Industry from "@/components/industry/industry";
import { Suspense, cache } from "react";
import { notFound } from "next/navigation";
import { getIndustryPage } from "@/services/server-content";
import { isUrlLocale, DEFAULT_URL_LOCALE, type UrlLocale } from "@/util/i18n";
import type { ApiLang } from "@/services/homepage-service";

const getContent = cache(getIndustryPage);

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
    <Suspense fallback={<div className="min-h-screen" />}>
      <IndustryContent params={params} />
    </Suspense>
  );
}

async function IndustryContent({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = await getContent(toApiLang(resolveLang(lang)));

  if (!content) {
    notFound();
  }

  return <Industry content={content} />;
}
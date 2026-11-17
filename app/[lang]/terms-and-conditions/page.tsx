import TermsConditionsPage from "@/components/others/terms-and-conditions";
import { Suspense, cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/util/seo-metadata";
import { getTermsConditionsPage } from "@/services/server-content";
import { isUrlLocale, DEFAULT_URL_LOCALE, type UrlLocale } from "@/util/i18n";
import type { ApiLang } from "@/services/homepage-service";

const getContent = cache(getTermsConditionsPage);

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
  const { lang } = await params;
  const content = await getContent(toApiLang(resolveLang(lang)));
  if (!content) return {};

  return buildPageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
  });
}

export default function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <TermsContent params={params} />
    </Suspense>
  );
}

async function TermsContent({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = await getContent(toApiLang(resolveLang(lang)));

  if (!content) {
    notFound();
  }

  return <TermsConditionsPage content={content} />;
}

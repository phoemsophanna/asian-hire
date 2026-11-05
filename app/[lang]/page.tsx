import { Suspense, cache } from "react";
import type { Metadata } from "next";
import { SITE_NAME, buildPageMetadata } from "@/util/seo-metadata";
import { fetchHomepage, fetchSeo, type ApiLang } from "@/services/homepage-service";
import { fetchIndustryPage } from "@/services/industry-service";
import { fetchTranslations } from "@/services/translation-service";
import { isUrlLocale, DEFAULT_URL_LOCALE, type UrlLocale } from "@/util/i18n";
import HomePage from "@/components/home/home-page";

const getSeo = cache(fetchSeo);

const getHomeContent = cache(async (lang: ApiLang) => {
  const [data, industries, translations] = await Promise.all([
    fetchHomepage(lang),
    fetchIndustryPage(lang),
    fetchTranslations(lang),
  ]);

  return { data, industries, translations };
});

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
  const seo = await getSeo(toApiLang(urlLocale), "homepage");
  if (!seo) return {};

  return buildPageMetadata({
    title: seo.title || SITE_NAME,
    description: seo.description,
    keywords: seo.keywords,
    image: seo.image,
  });
}

export default function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return (
    <Suspense fallback={<div className="h-16" />}>
      <HomeContent params={params} />
    </Suspense>
  );
}

async function HomeContent({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = toApiLang(resolveLang((await params).lang));
  const initial = await getHomeContent(lang);

  return <HomePage lang={lang} initialContent={initial} />;
}

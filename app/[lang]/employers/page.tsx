import EmployersPage from "@/components/employer/employer";
import { Suspense, cache } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/util/seo-metadata";
import { fetchEmployerPage } from "@/services/employer-service";
import { isUrlLocale, DEFAULT_URL_LOCALE, type UrlLocale } from "@/util/i18n";
import type { ApiLang } from "@/services/homepage-service";

const getContent = cache(fetchEmployerPage);

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
    <Suspense>
      <EmployersPageContent params={params} />
    </Suspense>
  );
}

async function EmployersPageContent({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = await getContent(toApiLang(resolveLang(lang)));

  return <EmployersPage content={content} lang={toApiLang(resolveLang(lang))} />;
}

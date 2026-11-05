"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import FeaturedJobs from "@/components/home/featured-jobs";
import HeroSearch from "@/components/home/hero-search";
import type { Job, JobSearchFilters } from "@/components/home/job-data";
import { createTranslator, fetchTranslations } from "@/services/translation-service";
import { fetchHomepage, type ApiLang, type HomepageData, type HomepageJob } from "@/services/homepage-service";
import { fetchIndustryPage } from "@/services/industry-service";
import SectionHeading from "../ui/SectionHeader";
import WhyChooseUs from "../ui/WhyChoose";
import Link from "@/components/LocaleLink";
import { Reveal, Stagger, StaggerItem } from "@/util/animations";
import { useEffect, useRef, useState } from "react";

function Hero({
  data,
  industries,
  resultCount = 0,
  t = (text: string) => text,
}: {
  data: HomepageData;
  industries: { id: number; title: string }[];
  resultCount?: number;
  t?: (text: string) => string;
}) {
  const filters: JobSearchFilters = { keyword: "", industry: "", location: "" };
  const hasSearched = false;
  const subtitle = data.hero.subtitle;
  const titleText = data.hero.title;
  const commaIndex = titleText.indexOf(",");
  const titleLead = commaIndex >= 0 ? titleText.slice(0, commaIndex + 1) : "";
  const titleAccent = commaIndex >= 0 ? titleText.slice(commaIndex + 1).trim() : titleText;
  const trendingKeywords = data.find_job.trending_keywords;
  const industryNames = industries.map((industry) => industry.title);
  const industryIds = Object.fromEntries(industries.map((industry) => [industry.title, industry.id]));
  const heroImage = data.hero.image ?? "/images/slider/slider.jpg";

  return (
    <section className="relative isolate bg-[#112b57]">
      {/* Background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: `url('${heroImage}')`,
        }}
      />

      {/* Background overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(12,35,76,0.30)_0%,rgba(17,47,96,0.30)_55%,rgba(18,50,101,0.72)_100%)]" />

      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-72 w-full md:w-[600px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">

          {/* Intro text */}
          <Reveal direction="zoom">
            <p className="mx-auto max-w-4xl text-sm font-semibold uppercase leading-relaxed tracking-[0.10em] tracking-0 text-white sm:text-xl sm:tracking-[1px] lg:text-2xl">
              {subtitle}
            </p>
          </Reveal>

          {/* Main message */}
          <Reveal direction="zoom">
            <p className="mx-auto mt-3 max-w-3xl text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
              {titleLead && <>{titleLead}{" "}</>}
              <span className="">
                {titleAccent}
              </span>
            </p>
          </Reveal>

          {/* Search form */}
          <div className="relative z-10 mx-auto mt-8 max-w-4xl sm:mt-10 md:mt-12">
            <Reveal direction="up">
              <HeroSearch
                filters={filters}
                hasSearched={hasSearched}
                resultCount={resultCount}
                industries={industryNames}
                industryIds={industryIds}
                t={t}
              />
            </Reveal>
          </div>

          {/* Trending keywords */}
          <Reveal direction="zoom">
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:mt-6 sm:gap-2.5">
              <span className="mr-1 text-xs font-semibold text-white sm:text-sm">
                {t("Trending Keywords")}:
              </span>

              {trendingKeywords.map((keyword) => (
                <Link
                  key={keyword}
                  href={`/jobs?${new URLSearchParams({ keyword }).toString()}`}
                  className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300/70 hover:bg-white/15 hover:text-white sm:px-4 sm:py-2 sm:text-sm"
                >
                  {keyword}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PopularIndustries({ data, t = (key: string) => key }: { data: HomepageData["industries"], t?: (key: string) => string }) {
  const items = data.items.slice(0, 9);

  return (
    <section className="bg-white py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal direction="up">
          <SectionHeading
            description={data.description}
            title={data.title}
          />
        </Reveal>
        <Stagger
          staggerDelay={0.2}
          className="grid gap-3 min-[480px]:grid-cols-2 sm:gap-4 lg:grid-cols-3"
        >
          {items.map((industry) => {
            const params = new URLSearchParams({ industry: String(industry.id) });

            return <StaggerItem key={industry.id} direction="up">
                  <Link
                    className="group flex min-w-0 items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_5px_22px_rgba(22,47,89,0.035)] transition hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-[0_12px_30px_rgba(22,47,89,0.08)] sm:gap-4"
                    href={`/jobs?${params.toString()}`}
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#eef4ff] sm:size-14">
                      {industry.icon && (
                        <i aria-hidden="true" className={`${industry.icon} text-2xl text-[#485ea8] sm:text-3xl`} />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold leading-5 text-[#172b4d] sm:text-base">{industry.title}</span>
                      <span className="mt-1 block text-xs text-slate-500">{industry.active_jobs_count} {t("jobs available")}</span>
                    </span>
                    <ChevronRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#485ea8]"
                    />
                  </Link></StaggerItem>;
          })}
        </Stagger>
        <div className="mt-8 text-center">
          <Reveal direction="zoom">
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-[#172b4d] transition hover:border-blue-200 hover:text-[#485ea8]"
              href="/industry"
            >
              {t("Browse all industries")} <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function JobsSection({
  data,
  types,
  t = (text: string) => text,
}: {
  data: HomepageData["jobs"];
  types: HomepageData["types"];
  t?: (text: string) => string;
}) {
  return (
    <section className="bg-[#f7f9fc] py-10 sm:py-16" id="featured-jobs">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal direction="up">
          <SectionHeading
            description={data.description}
            title={data.title}
          />
        </Reveal>
        <FeaturedJobs
          jobs={data.items.map((job) => job)}
          types={types.map((type) => ({ id: type.id, title: type.title }))}
          t={t}
        />
      </div>
    </section>
  );
}

function HowItWorks({ data }: { data: HomepageData["find_job"] }) {
  console.log(data);
  return (
    <section className="bg-white py-10 sm:py-16" id="how-it-works">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal direction="up">
          <SectionHeading
            description={data.description}
            title={data.title}
          />
        </Reveal>
        <div className="grid gap-8 min-[560px]:grid-cols-3 lg:gap-6">
          {data.items.map((step, index) => (
            <Reveal direction="zoom" key={`${step.title}-${index}`}>
              <div className="relative flex flex-col items-center text-center">
                {index < data.items.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[calc(50%+70px)] right-[calc(-50%+50px)] top-10 hidden border-t border-dashed border-blue-200 lg:block"
                  />
                )}
                <span className="relative flex size-20 items-center justify-center rounded-full border border-blue-100 bg-[#f0f5ff] text-[#485ea8]">
                  {step.icon && (
                    <i aria-hidden="true" className={`${step.icon} text-3xl`} />
                  )}
                  <span className="absolute -right-2 -top-1 flex size-6 items-center justify-center rounded-full bg-[#485ea8] text-[10px] font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>
                <h3 className="mt-5 font-semibold text-[#172b4d]">{step.title}</h3>
                <p className="mt-2 max-w-[240px] text-sm leading-6 text-slate-500">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const KHMER_MONTHS = [
  "មករា",
  "កុម្ភៈ",
  "មីនា",
  "មេសា",
  "ឧសភា",
  "មិថុនា",
  "កក្កដា",
  "សីហា",
  "កញ្ញា",
  "តុលា",
  "វិច្ឆិកា",
  "ធ្នូ",
];
const KHMER_DIGITS = "០១២៣៤៥៦៧៨៩";

function toKhmerDigits(value: number) {
  return String(value).replace(/\d/g, (digit) => KHMER_DIGITS[Number(digit)]);
}

function formatNewsDate(value: string | null, lang: ApiLang) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  if (lang === "km") {
    return `ថ្ងៃទី ${toKhmerDigits(date.getUTCDate())} ខែ${KHMER_MONTHS[date.getUTCMonth()]} ឆ្នាំ ${toKhmerDigits(date.getUTCFullYear())}`;
  }
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

function NewsSection({ data, lang, t = (key: string) => key }: { data: HomepageData["news"]; lang: ApiLang; t?: (key: string) => string }) {
  const [spotlight, ...smallerArticles] = data.items;
  if (!spotlight) return null;

  return (
    <section className="bg-white overflow-hidden py-10 sm:py-16" id="news">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal direction="up">
          <SectionHeading
            description={data.description}
            title={data.title}
          />
        </Reveal>
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-[1.1fr_1fr]">
          <Reveal direction="left">
            <Link className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_28px_rgba(22,47,89,0.045)] transition hover:shadow-[0_16px_38px_rgba(22,47,89,0.1)]" href={`/blogs/${spotlight.id}`}>
              <div
                aria-label={spotlight.title}
                className="min-h-[190px] flex-1 bg-cover bg-center transition duration-500 group-hover:scale-[1.02] sm:min-h-[330px]"
                role="img"
                style={{ backgroundImage: `url('${spotlight.thumbnail ?? ""}')` }}
              />
              <div className="relative bg-white p-6 sm:p-7">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  {(() => {
                    const tag = lang === "km" ? spotlight.tag_km || spotlight.tag_eng : spotlight.tag_eng;
                    return tag ? (
                      <span className="rounded-full bg-blue-50 px-3 py-1.5 font-semibold text-[#485ea8]">{tag}</span>
                    ) : null;
                  })()}
                  <span>{formatNewsDate(spotlight.date, lang)}</span>
                </div>
                <h3 className="max-w-xl text-lg font-bold leading-snug tracking-[-0.03em] text-[#172b4d] group-hover:text-[#485ea8] sm:text-2xl">
                  {spotlight.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#485ea8]">
                   {t("Read article")} <ArrowRight aria-hidden="true" className="size-4" />
                </span>
              </div>
            </Link>
          </Reveal>
          <Reveal direction="right">
            <div className="grid gap-4 min-[480px]:grid-cols-2 sm:gap-5">
              {smallerArticles.map((article) => (
                <Link
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_28px_rgba(22,47,89,0.045)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(22,47,89,0.1)]"
                  href={`/blogs/${article.id}`}
                  key={article.id}
                >
                  <div
                    aria-label={article.title}
                    className="h-50 md:h-36 bg-cover bg-center transition duration-500 group-hover:scale-[1.02] sm:h-40"
                    role="img"
                    style={{ backgroundImage: `url('${article.thumbnail ?? ""}')` }}
                  />
                  <div className="p-4">
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                      <span>{article.date}</span>
                    </div>
                    <h3 className="text-sm font-semibold leading-6 text-[#172b4d] group-hover:text-[#485ea8]">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="mt-8 text-center">
          <Reveal direction="zoom">
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-[#172b4d] transition hover:border-blue-200 hover:text-[#485ea8]"
              href={`/blogs`}
            >
              {t("View More")} <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function HomePage({
  lang,
  initialContent,
}: {
  lang: ApiLang;
  initialContent?: {
    data: HomepageData | null;
    industries: { items: { id: number; title: string }[] } | null;
    translations: Record<string, string>;
  };
}) {
  const initialLang = useRef(lang);
  const [data, setData] = useState<HomepageData | null>(initialContent?.data ?? null);
  const [allIndustries, setAllIndustries] = useState<{ id: number; title: string }[]>(
    initialContent?.industries?.items.map((industry) => ({ id: industry.id, title: industry.title })) ?? [],
  );
  const [translations, setTranslations] = useState<Record<string, string>>(initialContent?.translations ?? {});

  useEffect(() => {
    // Server-rendered content already matches this language, so skip the first client fetch.
    if (initialContent && lang === initialLang.current && initialContent.data) return;

    let active = true;

    fetchHomepage(lang).then((result) => {
      if (active) setData(result);
    });
    fetchIndustryPage(lang).then((result) => {
      if (active && result) {
        setAllIndustries(result.items.map((industry) => ({ id: industry.id, title: industry.title })));
      }
    });
    fetchTranslations(lang).then((result) => {
      if (active) setTranslations(result);
    });

    return () => {
      active = false;
    };
  }, [lang, initialContent]);

  if (!data) return null;

  const whyChooseItems = data.why_choose.items.map((item) => ({
    title: item.title,
    text: item.text,
    iconUrl: item.icon,
  }));

  return (
    <>
      <main>
        <Hero
          data={data}
          industries={allIndustries.length > 0 ? allIndustries : data.industries.items}
          resultCount={data.jobs.items.length}
          t={createTranslator(translations)}
        />
        <PopularIndustries data={data.industries} t={createTranslator(translations)} />
        <JobsSection data={data.jobs} types={data.types} t={createTranslator(translations)} />
        <HowItWorks data={data.find_job} />
        <WhyChooseUs
          benefits={whyChooseItems}
          title={data.why_choose.title}
          description={data.why_choose.description}
          thumbnail={data.why_choose.thumbnail}
          t={createTranslator(translations)}
        />
        <NewsSection data={data.news} lang={lang} t={createTranslator(translations)} />
      </main>
    </>
  );
}

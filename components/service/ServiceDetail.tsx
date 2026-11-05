"use client";

import Link from "@/components/LocaleLink";
import { useEffect, useState } from "react";
import PageBanner from "../PageBanner";
import { Reveal } from "@/util/animations";
import {
  createTranslator,
  fetchTranslations,
  type TranslationApiLang,
} from "@/services/translation-service";

import type { ServiceDetailContent } from "@/services/service-detail-service";

export default function ServiceDetail({
  service,
  lang = "eng",
}: {
  service: ServiceDetailContent;
  lang?: TranslationApiLang;
}) {
  const hasRelated = service.related.length > 0;
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    let active = true;

    fetchTranslations(lang).then((result) => {
      if (active) setTranslations(result);
    });

    return () => {
      active = false;
    };
  }, [lang]);

  const t = createTranslator(translations);

  return (
    <main className="overflow-hidden bg-white text-slate-900">
      <PageBanner title={service.title} image={service.banner} />

      <div
        className={`mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-5 py-8 sm:px-8 md:py-16 lg:gap-10 ${
          hasRelated ? "lg:grid-cols-[minmax(0,1fr)_340px]" : ""
        }`}
      >
        <Reveal direction="left">
          <article className="min-w-0 overflow-hidden">
            {service.thumbnail && (
              <div className="relative mb-7 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.thumbnail}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            )}

            <h1 className="mt-4 max-w-4xl text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              {service.title}
            </h1>

            {service.description && (
              <div
                className="service-description mt-8 space-y-4 text-[15px] leading-8 text-slate-600 sm:text-base"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
            )}
          </article>
        </Reveal>

        {hasRelated && (
          <Reveal direction="right">
            <aside className="space-y-6 lg:sticky lg:top-6">
              <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-slate-900">
                    {t("Recent Services")}
                  </h2>
                </div>

                <div className="space-y-5">
                  {service.related.map((relatedService) => (
                    <Link
                        key={relatedService.id}
                        href={`/services/${relatedService.id}`}
                        className="group flex items-center gap-3.5"
                    >
                    <div className="relative size-[76px] shrink-0 overflow-hidden rounded-xl bg-slate-100">
                        {relatedService.thumbnail && (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                              src={relatedService.thumbnail}
                              alt={relatedService.title}
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                          />
                        )}
                    </div>

                    <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-slate-800 transition-colors duration-300 group-hover:text-[#485ea8]">
                            {relatedService.title}
                        </h3>

                        <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-slate-400 transition-colors duration-300 group-hover:text-[#485ea8]">
                            {t("Learn More")}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.8}
                                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                            >
                                <path
                                    d="M4 10h12m-5-5 5 5-5 5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </div>
                    </Link>
                  ))}
                </div>
              </section>
            </aside>
          </Reveal>
        )}
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "@/components/LocaleLink";
import { createTranslator, fetchTranslations } from "@/services/translation-service";

type BlogSpotlight = {
  id: number;
  tag: string;
  date: string;
  title: string;
  summary: string;
  image: string | null;
};

export default function BlogCard({
  spotlight,
  lang,
}: {
  spotlight: BlogSpotlight;
  lang: "en" | "km";
}) {
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const t = createTranslator(translations);

  useEffect(() => {
    let active = true;
    fetchTranslations(lang === "km" ? "km" : "eng").then((data) => {
      if (active) setTranslations(data);
    });
    return () => {
      active = false;
    };
  }, [lang]);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-slate-900/[0.06]">
      {/* Blog image */}
      <Link
        href={`/blogs/${spotlight.id}`}
        aria-label={`Read article: ${spotlight.title}`}
        className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
      >
        {spotlight.image && (
          <img
            src={spotlight.image}
            alt={spotlight.title}
            loading="lazy"
            className="absolute inset-0 size-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />

        {spotlight.tag && (
          <span className="absolute left-5 top-5 rounded-full border border-white/50 bg-white/95 px-3.5 py-1.5 text-xs font-bold text-[#485ea8] shadow-sm backdrop-blur-md">
            {spotlight.tag}
          </span>
        )}
      </Link>

      {/* Blog content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span>{spotlight.date}</span>
        </div>

        <h2 className="mt-4 text-xl font-bold leading-snug tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-[#485ea8] sm:text-2xl">
          <Link href={`/blogs/${spotlight.id}`}>
            {spotlight.title}
          </Link>
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
          {spotlight.summary}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5 mt-6">
          <Link
            href={`/blogs/${spotlight.id}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#485ea8]"
          >
            {t("Read article")}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}


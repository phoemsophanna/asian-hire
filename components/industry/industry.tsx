"use client";

import { Reveal, Stagger, StaggerItem } from "@/util/animations";
import PageBanner from "../PageBanner";
import SectionHeading from "../ui/SectionHeader";
import Link from "@/components/LocaleLink";
import { ChevronRight } from "lucide-react";
import type { IndustryPageContent } from "@/services/industry-service";

export default function Industry({ content }: { content: IndustryPageContent }) {
  const { banner, items } = content;

  return (
    <main className="overflow-hidden bg-white text-slate-800">
      <PageBanner title="Job Industry" image={banner} />

      <section className="bg-white py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
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
                      <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#eef4ff] transition group-hover:bg-[#485ea8] sm:size-14">
                        {industry.icon && (
                          <i aria-hidden="true" className={`${industry.icon} text-2xl text-[#485ea8] transition group-hover:text-white sm:text-3xl`} />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold leading-5 text-[#172b4d] sm:text-base">{industry.title}</span>
                        <span className="mt-1 block text-xs text-slate-500">{industry.active_jobs_count} jobs available</span>
                      </span>
                      <ChevronRight
                        aria-hidden="true"
                        className="size-4 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#485ea8]"
                      />
                    </Link></StaggerItem>;
            })}
          </Stagger>
        </div>
      </section>
    </main>
  );
}
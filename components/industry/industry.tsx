"use client";

import { Reveal, Stagger, StaggerItem } from "@/util/animations";
import PageBanner from "../PageBanner";
import SectionHeading from "../ui/SectionHeader";
import Link from "next/link";
import { ChartNoAxesCombined, ChevronRight, Code2, FileUser, HeartHandshake, Megaphone, PenTool, UsersRound, Wallet, Wrench } from "lucide-react";

const industries = [
  { name: "Accounting & Finance", count: "120 jobs available", icon: Wallet },
  { name: "Marketing & Sales", count: "86 jobs available", icon: Megaphone },
  { name: "Information Technology", count: "204 jobs available", icon: Code2 },
  { name: "Human Resources", count: "56 jobs available", icon: UsersRound },
  { name: "Engineering", count: "93 jobs available", icon: Wrench },
  { name: "Design & Creative", count: "48 jobs available", icon: PenTool },
  { name: "Education & Training", count: "72 jobs available", icon: FileUser },
  { name: "Business & Management", count: "111 jobs available", icon: ChartNoAxesCombined },
  { name: "Customer Service", count: "65 jobs available", icon: HeartHandshake },
];

export default function Industry() {

  return (
    <main className="overflow-hidden bg-white text-slate-800">
      <PageBanner title="Job Industry" />

      <section className="bg-white py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <Stagger
            staggerDelay={0.2}
            className="grid gap-3 min-[480px]:grid-cols-2 sm:gap-4 lg:grid-cols-3"
          >
            {industries.map(({ name, count, icon: Icon }) => {
              const params = new URLSearchParams();

              if (name) {
                params.set("industry", name);
              }

              const query = params.toString();

              return <StaggerItem key={name} direction="up">
                    <Link
                      className="group flex min-w-0 items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_5px_22px_rgba(22,47,89,0.035)] transition hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-[0_12px_30px_rgba(22,47,89,0.08)] sm:gap-4"
                      href={`/jobs?${query}`}
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#485ea8] transition group-hover:bg-[#485ea8] group-hover:text-white sm:size-14">
                        <Icon aria-hidden="true" className="size-5 sm:size-6" strokeWidth={1.8} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold leading-5 text-[#172b4d] sm:text-base">{name}</span>
                        <span className="mt-1 block text-xs text-slate-500">{count}</span>
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
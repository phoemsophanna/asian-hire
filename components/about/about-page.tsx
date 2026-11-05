
"use client";

import { useEffect, useState } from "react";
import {
  createTranslator,
  fetchTranslations,
  type TranslationApiLang,
} from "@/services/translation-service";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Globe2,
  HeartHandshake,
  Lightbulb,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import PageBanner from "../PageBanner";
import Image from "next/image";
import WhyChooseUs from "../ui/WhyChoose";
import { Reveal, Stagger, StaggerItem } from "@/util/animations";
import type { AboutPageContent } from "@/services/about-service";

const BLUE = "#485ea8";

const workIcons = ["ri-briefcase-line", "ri-group-line", "ri-graduation-cap-line"];
const statIcons = ["ri-briefcase-line", "ri-checkbox-circle-line", "ri-building-line", "ri-group-line"];

const principleIcons: Record<string, string> = {
  philosophy: "ri-lightbulb-line",
  vision: "ri-eye-line",
  mission: "ri-focus-3-line",
};

const principleLabels: Record<string, string> = {
  philosophy: "Philosophy",
  vision: "Vision",
  mission: "Mission",
};

const advantages = [
  {
    icon: Globe2,
    title: "International Opportunities",
    description:
      "Discover career opportunities that connect Cambodian professionals with employers and possibilities in Australia.",
  },
  {
    icon: ShieldCheck,
    title: "A Trusted Recruitment Experience",
    description:
      "Find clear job information and make more informed career decisions with a professional, transparent approach.",
  },
  {
    icon: HeartHandshake,
    title: "People-Focused Support",
    description:
      "We believe recruitment should be about more than filling positions. It should help people build their futures.",
  },
  {
    icon: Sparkles,
    title: "Opportunities for Growth",
    description:
      "Explore roles that match your skills, interests, and ambitions while taking the next step in your career.",
  },
];

export default function AboutPage({
  content,
  lang = "eng",
}: {
  content: AboutPageContent;
  lang?: TranslationApiLang;
}) {
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

  const workItems = content.what_we_do.items.map((item, index) => ({
    icon: item.icon || workIcons[index % workIcons.length],
    number: String(index + 1).padStart(2, "0"),
    title: item.title,
    summary: item.summary,
  }));

  const stats = content.statistics.items.map((item, index) => ({
    icon: statIcons[index % statIcons.length],
    value: item.value,
    label: item.label,
  }));

  const principles = content.principles.map((item) => ({
    id: item.id,
    label: principleLabels[item.id] ?? item.id,
    icon: item.icon || principleIcons[item.id],
    heading: item.title,
    description: item.description,
    image: item.image || "/images/mission.webp",
  }));

  const [activeTab, setActiveTab] = useState("philosophy");
  const activePrinciple =
    principles.find((item) => item.id === activeTab) ?? principles[0];

  return (
    <main className="overflow-hidden bg-white text-slate-900">
        {/* Page Banner */}
        <PageBanner title={"About Us"} />

        <section className="relative isolate overflow-hidden bg-slate-50 py-10 sm:py-16">
            {/* Subtle map background */}
            <div
                className="absolute inset-0 -z-20 bg-cover bg-center opacity-[0.12]"
                style={{
                    backgroundImage:
                    "url('https://www.asianhire.com.kh/assets/client/images/google-map.png')",
                }}
            />

                {/* Soft gradient overlay */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/90 via-white/80 to-blue-50/90" />

                {/* Decorative shapes */}
                <div className="absolute -left-24 top-20 -z-10 size-64 rounded-full bg-blue-100/50 blur-3xl" />
                <div className="absolute -right-24 bottom-10 -z-10 size-72 rounded-full bg-indigo-100/60 blur-3xl" />

                <div className="mx-auto max-w-7xl px-5 sm:px-8">
                {/* Heading */}
                <Reveal direction="up">
                  <div className="mx-auto max-w-4xl text-center">
                      <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-semibold text-[#485ea8] shadow-sm backdrop-blur-sm">
                      <span className="size-2 rounded-full bg-[#485ea8]" />
                        {t("About Asian Hire")}
                      </span>

                      <h1 className="mt-3 md:mt-6 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                        {content.hero.title}
                      </h1>

                      <div
                        className="about-description mx-auto mt-3 md:mt-6 max-w-3xl space-y-4 text-base leading-6 text-slate-600 md:leading-8 sm:text-lg"
                        dangerouslySetInnerHTML={{ __html: content.hero.description }}
                      />
                  </div>
                </Reveal>

                {/* Main image */}
                <Reveal direction="zoom">
                  <div className="relative mx-auto mt-10 max-w-5xl sm:mt-14">
                      {/* Decorative frame */}
                      <div className="absolute -inset-3 -z-10 rounded-[32px] border border-blue-100/80 bg-white/50 sm:-inset-5" />

                      <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-blue-950/10 sm:rounded-3xl">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                              src={content.hero.image || "https://www.asianhire.com.kh/assets/client/images/about/about-img1.png"}
                              alt={content.hero.title}
                              className="block h-auto max-h-[580px] w-full object-cover object-center"
                          />

                          {/* Subtle image overlay */}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101b46]/10 via-transparent to-white/5" />
                      </div>

                      {/* Bottom accent */}
                      <div className="mx-auto mt-3 md:mt-5 h-1 w-20 rounded-full bg-[#485ea8]" />
                  </div>
                </Reveal>
            </div>
        </section>

      {/* 2. WHO WE ARE / INTRODUCTION */}
      <section
        id="who-we-are"
        className="py-10 sm:py-16"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 ">
          <Reveal direction="left">
            <div className="relative">
              <div className="overflow-hidden rounded-[28px] bg-slate-100">
                <img
                  src={content.who_we_are.image || "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=90"}
                  alt={content.who_we_are.title}
                  className="h-[320px] w-full object-cover sm:h-[460px]"
                />
              </div>
            </div>
          </Reveal>
          
          <Reveal direction="right">
            <div className="pt-1 lg:pt-0">
              <p className="mb-3 md:mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#485ea8]">
                {t("Who we are")}
              </p>

              <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[42px]">
                {content.who_we_are.title}
              </h2>

              <div
                className="who-we-are-description mt-3 md:mt-6 space-y-3 leading-7 text-slate-600"
                dangerouslySetInnerHTML={{ __html: content.who_we_are.description }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. WHAT WE DO */}
      <section className="bg-slate-50 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 ">
          <Reveal direction="up">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#485ea8]">
                {t("What we do")}
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">
                {content.what_we_do.title}
              </h2>
              <div
                className="mt-4 leading-7 text-slate-600"
                dangerouslySetInnerHTML={{ __html: content.what_we_do.description }}
              />
            </div>
          </Reveal>

          <Stagger
            delay={0.2}
            className="mt-6 md:mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {workItems.map((item) => {
              return (
                <StaggerItem key={item.title} direction="up">
                  <article
                    className="group rounded-2xl border border-slate-200/80 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 sm:p-8"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-[#485ea8] transition group-hover:bg-[#485ea8] group-hover:text-white">
                        <i aria-hidden="true" className={`${item.icon} text-[23px]`} />
                      </div>
                      <span className="text-sm font-semibold text-slate-300">
                        {item.number}
                      </span>
                    </div>
                    <h3 className="mt-4 md:mt-6 text-xl font-bold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.summary}
                    </p>
                    <div className="mt-3 md:mt-6 h-1 w-10 rounded-full bg-[#485ea8] transition-all group-hover:w-16" />
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* 4. PHILOSOPHY / VISION / MISSION TABS */}
      <section className="py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 ">
          <Reveal direction="up">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#485ea8]">
                {t("What guides us")}
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">
                {content.what_guides_us.title}
              </h2>
              <div
                className="mt-3 md:mt-4 leading-7 text-slate-600"
                dangerouslySetInnerHTML={{ __html: content.what_guides_us.description }}
              />
            </div>
          </Reveal>
          
          <Reveal direction="zoom">
            <div className="mt-6 md:mt-10 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-900/[0.04]">
              <div
                role="tablist"
                aria-label="Our principles"
                className="flex flex-nowrap gap-2 overflow-x-auto border-b border-slate-100 bg-slate-50/80 p-3 sm:p-4 md:grid md:grid-cols-3"
              >
                {principles.map((item) => {
                  const selected = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      id={`${item.id}-tab`}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls="principle-panel"
                      onClick={() => setActiveTab(item.id)}
                      className={`flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-xl px-4 py-4 text-sm font-semibold transition md:shrink ${
                        selected
                          ? "bg-[#485ea8] text-white shadow-lg shadow-blue-900/20"
                          : "text-slate-600 hover:bg-white hover:text-[#485ea8]"
                      }`}
                    >
                      <i aria-hidden="true" className={`${item.icon} text-[19px]`} />
                      {t(item.label)}
                    </button>
                  );
                })}
              </div>

              <div
                id="principle-panel"
                role="tabpanel"
                aria-labelledby={`${activePrinciple.id}-tab`}
                className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-14 lg:p-14"
              >
                <div>
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-[#485ea8]">
                    <i aria-hidden="true" className={`${activePrinciple.icon} text-[28px]`} />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold leading-tight sm:text-3xl">
                    {activePrinciple.heading}
                  </h3>

                  <p className="mt-4 leading-8 text-slate-600">
                    {activePrinciple.description}
                  </p>
                </div>

                <div className="relative min-h-[250px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#485ea8] to-[#132b9c] shadow-[0_25px_70px_rgba(23,43,77,0.17)] text-white sm:min-h-[300px]">
                  <img src={activePrinciple.image} alt={activePrinciple.label} className="absolute inset-0 h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. WHY CHOOSE ASIAN HIRE */}
      <WhyChooseUs
        benefits={content.why_choose.items.map((item) => ({
          title: item.title,
          text: item.text,
          iconUrl: item.icon,
        }))}
        title={content.why_choose.title}
        description={content.why_choose.description}
        thumbnail={content.why_choose.thumbnail}
        t={t}
      />


      {/* 6. STATISTICS */}
      <section className="relative isolate overflow-hidden py-10 sm:py-16">
        {/* Full-width background image */}
        <div
            className="absolute inset-0 -z-20 bg-cover bg-center"
            style={{
            backgroundImage:
                "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=90')",
            }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 -z-10 bg-[#101b46]/85" />

        {/* Decorative brand glow */}
        <div className="absolute -right-20 top-0 -z-10 size-80 rounded-full bg-[#485ea8]/30 blur-3xl" />

        {/* Statistics only */}
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Stagger
            delay={0.2}
            className="grid grid-cols-2 gap-y-10 sm:gap-y-12 lg:grid-cols-4 lg:gap-8"
          >
            {stats.map((item) => {
                return (
                  <StaggerItem key={item.label} direction="up">
                    <div
                        className="group flex flex-col items-center text-center"
                    >
                        <div className="flex size-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-blue-200 backdrop-blur-sm transition duration-300 group-hover:border-white/40 group-hover:bg-[#485ea8] group-hover:text-white">
                        <i aria-hidden="true" className={`${item.icon} text-[26px]`} />
                        </div>

                        <p className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                        {item.value}
                        </p>

                        <p className="mt-2 text-sm font-medium text-blue-100 sm:text-base">
                        {item.label}
                        </p>

                        <div className="mt-4 h-1 w-8 rounded-full bg-[#485ea8] transition-all duration-300 group-hover:w-14" />
                    </div>
                  </StaggerItem>
                );
            })}
          </Stagger>
        </div>
        </section>

        {/* 7. MEET OUR TEAM */}
      
        {content.team.members.length > 0 && (
        <section id="our-team" className="bg-slate-50 py-10 sm:py-16">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                {/* Heading */}
                <Reveal direction="up">
                  <div className="mb-6 md:mb-10 flex flex-col text-center justify-center gap-4 sm:mb-14 sm:flex-row sm:items-end">
                      <div className="max-w-2xl">
                          <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#485ea8]">
                              {t("People behind Asian Hire")}
                          </span>
                          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                              {content.team.title}
                          </h2>
                      </div>
                  </div>
                </Reveal>

                {/* Full-image profiles */}
                <Stagger
                  delay={0.2}
                  className="flex flex-wrap justify-center gap-5 lg:gap-7"
                >
                  {content.team.members.map((member) => (
                    <StaggerItem key={member.id} direction="up" className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-1.17rem)]">
                      <article
                        className="group relative isolate aspect-[4/5] overflow-hidden rounded-2xl bg-slate-200 shadow-sm"
                      >
                        {/* Full-card image */}
                        {member.image && (
                          <img
                              src={member.image}
                              alt={member.name}
                              loading="lazy"
                              className="absolute inset-0 size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        )}

                        {/* Always-visible bottom gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

                        {/* Name visible before hover */}
                        <div className="absolute inset-x-0 bottom-0 p-6 transition-opacity duration-300 sm:p-7">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
                              {member.role}
                            </p>
                            <h3 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                              {member.name}
                            </h3>
                            <div className="mt-3 h-1 w-9 rounded-full bg-[#6684ff]" />
                        </div>
                        </article>
                    </StaggerItem>
                  ))}
                </Stagger>
            </div>
        </section>
        )}

    </main>
  );
}

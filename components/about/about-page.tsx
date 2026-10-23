
"use client";

import { useState } from "react";
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
  Users,
  Eye,
  GraduationCap,
  MessagesSquare,
  UserSearch,
  Earth,
} from "lucide-react";
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import PageBanner from "../PageBanner";
import Image from "next/image";
import WhyChooseUs from "../ui/WhyChoose";

const BLUE = "#485ea8";

const principles = [
  {
    id: "philosophy",
    label: "Our Philosophy",
    icon: Lightbulb,
    heading: "People first. Opportunities always.",
    description:
      "To build long-standing relationships based on a foundation of integrity, sincerity and trust. Asian Hire’s experienced and knowledgeable staff work as a team to provide unparalleled service and dedication to our clients and applicants.",
  },
  {
    id: "vision",
    label: "Our Vision",
    icon: Eye,
    heading: "A world without borders for talent.",
    description:
      "To be nationally and internationally recognized as an Australian Skilled Worker Recruiter and Migration Counsellor in Asia by connecting applicants to land of opportunities, Australia.",
  },
  {
    id: "mission",
    label: "Our Mission",
    icon: Target,
    heading: "Making every career move count.",
    description:
      "To help businesses grow by matching the right talent​ to their specialized staffing​ by consulting and build rewarding careers for the professionals we place.",
  },
];

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

const stats = [
  { value: "500+", label: "Career opportunities", icon: BriefcaseBusiness },
  { value: "200+", label: "Jobs filled", icon: CheckCircle2 },
  { value: "100+", label: "Partner companies", icon: Building2 },
  { value: "5K+", label: "Community members", icon: Users },
];

const team = [
  {
    name: "Luon Sotheary​​",
    role: "General Director/ Recruiting Director​",
    image:
      "/images/pf1.jfif",
    linkedin: "https://www.linkedin.com/",
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },
  {
    name: "Hing Raksmey",
    role: "Senior Recruiting Manager",
    image:
      "/images/pf2.jfif",
    linkedin: "https://www.linkedin.com/",
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },
  {
    name: "Taing Navy",
    role: "Recruiting Manager",
    image:
      "/images/pf3.jfif",
    linkedin: "https://www.linkedin.com/",
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },
];

const benefits = [
  {
    title: "Focus on Applicant Needs",
    text: "Our team is focused on the desired results. Focusing on the applicant's preferred result is an integral part of the strategic process for each case.",
    icon: Users,
  },
  {
    title: "Easy to communicate",
    text: "Regardless of whether you are onshore or offshore, we provide a full-service counselling for skilled jobs opportunies and safe migration's advise to Australia full of professionalism and integrity.",
    icon: MessagesSquare,
  },
  {
    title: "Clients First",
    text: "We recognise that all Asutralian employers want to cooperate with the best. As a team of exceptional individuals, we are committed in every way to make that happen.",
    icon: UserSearch,
  },
  {
    title: "Oversea Worker Recruitment",
    text: "We strive to give our Australian employers the best recruitment service we possibly can, from initial consultation to a successful resolution.",
    icon: Earth,
  },
];

export default function AboutPage() {
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
                <div className="mx-auto max-w-4xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-semibold text-[#485ea8] shadow-sm backdrop-blur-sm">
                    <span className="size-2 rounded-full bg-[#485ea8]" />
                      About Asian Hire
                    </span>

                    <h1 className="mt-3 md:mt-6 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                      Bridging Cambodian Talent and{" "} Australian Opportunity
                    </h1>

                    <p className="mx-auto mt-3 md:mt-6 max-w-3xl text-base leading-6 md:leading-8 text-slate-600 sm:text-lg">
                      Technology will create millions of jobs. The problem will be to find workers to fill them. Whom should you connect with the next time you’re looking for a job?
                    </p>
                </div>

                {/* Main image */}
                <div className="relative mx-auto mt-10 max-w-5xl sm:mt-14">
                    {/* Decorative frame */}
                    <div className="absolute -inset-3 -z-10 rounded-[32px] border border-blue-100/80 bg-white/50 sm:-inset-5" />

                    <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-blue-950/10 sm:rounded-3xl">
                    <img
                        src="https://www.asianhire.com.kh/assets/client/images/about/about-img1.png"
                        alt="Asian Hire connecting Cambodian professionals with career opportunities"
                        className="block h-auto max-h-[580px] w-full object-cover object-center"
                    />

                    {/* Subtle image overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101b46]/10 via-transparent to-white/5" />
                    </div>

                    {/* Bottom accent */}
                    <div className="mx-auto mt-3 md:mt-5 h-1 w-20 rounded-full bg-[#485ea8]" />
                </div>
            </div>
        </section>

      {/* 2. WHO WE ARE / INTRODUCTION */}
      <section
        id="who-we-are"
        className="py-10 sm:py-16"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 ">
          <div className="relative">
            <div className="overflow-hidden rounded-[28px] bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=90"
                alt="Professionals collaborating in a modern workplace"
                className="h-[320px] w-full object-cover sm:h-[460px]"
              />
            </div>

            <div className="absolute -bottom-5 right-3 max-w-[260px] rounded-2xl border border-slate-100 bg-white p-3 shadow-xl sm:-right-5 sm:p-3">
              <div className="flex items-center gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#485ea8]">
                  <HeartHandshake size={25} />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">
                    People before positions
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Building meaningful connections
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-1 lg:pt-0">
            <p className="mb-3 md:mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#485ea8]">
              Who we are
            </p>

            <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[42px]">
              Bridging Cambodian Talent and Australian Opportunity
            </h2>

            <p className="mt-3 md:mt-6 leading-7 text-slate-600">
              Asian Hire was founded in early 2015 by <strong>Mrs. LUON SOTHEARY</strong>, a Cambodian and a family business operating in Cambodia. Asian Hire is an international recruiter and migration counsellor to Australia for skilled workers, technicians and senior professionals in all industries.
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              We are specialize in agriculture,​​ diary, fishing, environment, horticulture, breedery etc.
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              Since its inception, Asian Hire has been committed to helping clients across Cambodia increase their interests and value based on the principles of "integrity, professionalism, stability, innovation".
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              We strongly believe that  Asian Hire will create more miracles because we can dream and especially have the ability to make our customers' dreams come true with the spirit of​ dream "we make it closer to you".
            </p>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE DO */}
      <section className="bg-slate-50 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 ">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#485ea8]">
              What we do
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">
              Helping talent find its next chapter
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              We bring candidates and employers together through a
              straightforward, people-focused recruitment experience.
            </p>
          </div>

          <div className="mt-6 md:mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: BriefcaseBusiness,
                title: "Job Opportunities",
                description:
                  "Explore roles across industries and discover opportunities aligned with your experience and goals.",
                number: "01",
              },
              {
                icon: Users,
                title: "Talent Connection",
                description:
                  "Help employers connect with candidates whose skills and ambitions fit their hiring needs.",
                number: "02",
              },
              {
                icon: GraduationCap,
                title: "Career Development",
                description:
                  "Encourage candidates to grow their skills, build confidence, and take meaningful career steps.",
                number: "03",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-[#485ea8] transition group-hover:bg-[#485ea8] group-hover:text-white">
                      <Icon size={23} />
                    </div>
                    <span className="text-sm font-semibold text-slate-300">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="mt-4 md:mt-6 text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                  <div className="mt-3 md:mt-6 h-1 w-10 rounded-full bg-[#485ea8] transition-all group-hover:w-16" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PHILOSOPHY / VISION / MISSION TABS */}
      <section className="py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 ">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#485ea8]">
              What guides us
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">
              Purpose behind every connection
            </h2>
            <p className="mt-3 md:mt-4 leading-7 text-slate-600">
              Our values shape how we connect people, approach recruitment,
              and build for the future.
            </p>
          </div>

          <div className="mt-6 md:mt-10 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-900/[0.04]">
            <div
              role="tablist"
              aria-label="Our principles"
              className="flex flex-nowrap gap-2 overflow-x-auto border-b border-slate-100 bg-slate-50/80 p-3 sm:p-4 md:grid md:grid-cols-3"
            >
              {principles.map((item) => {
                const Icon = item.icon;
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
                    <Icon size={19} />
                    {item.label}
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
                  <activePrinciple.icon size={28} />
                </div>

                <h3 className="mt-6 text-2xl font-bold leading-tight sm:text-3xl">
                  {activePrinciple.heading}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  {activePrinciple.description}
                </p>
              </div>

              <div className="relative min-h-[250px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#485ea8] to-[#132b9c] shadow-[0_25px_70px_rgba(23,43,77,0.17)] text-white sm:min-h-[300px]">
                <Image src={"/images/mission.webp"} alt="" width={500} height={500} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE ASIAN HIRE */}
      <WhyChooseUs benefits={benefits} />

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
            <div className="grid grid-cols-2 gap-y-10 sm:gap-y-12 lg:grid-cols-4 lg:gap-8">
            {stats.map((item) => {
                const Icon = item.icon;

                return (
                <div
                    key={item.label}
                    className="group flex flex-col items-center text-center"
                >
                    <div className="flex size-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-blue-200 backdrop-blur-sm transition duration-300 group-hover:border-white/40 group-hover:bg-[#485ea8] group-hover:text-white">
                    <Icon size={26} strokeWidth={1.7} />
                    </div>

                    <p className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {item.value}
                    </p>

                    <p className="mt-2 text-sm font-medium text-blue-100 sm:text-base">
                    {item.label}
                    </p>

                    <div className="mt-4 h-1 w-8 rounded-full bg-[#485ea8] transition-all duration-300 group-hover:w-14" />
                </div>
                );
            })}
            </div>
        </div>
        </section>

        {/* 7. MEET OUR TEAM */}
      
        <section id="our-team" className="bg-slate-50 py-10 sm:py-16">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                {/* Heading */}
                <div className="mb-6 md:mb-10 flex flex-col text-center justify-center gap-4 sm:mb-14 sm:flex-row sm:items-end">
                    <div className="max-w-2xl">
                        <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#485ea8]">
                            People behind Asian Hire
                        </span>
                        <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Meet the people behind our mission.
                        </h2>
                    </div>
                </div>

                {/* Full-image profiles */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                {team.map((member, index) => (
                    <article
                    key={member.name}
                    className="group relative isolate aspect-[4/5] overflow-hidden rounded-2xl bg-slate-200 shadow-sm"
                    >
                    {/* Full-card image */}
                    <img
                        src={member.image}
                        alt={member.name}
                        loading="lazy"
                        className="absolute inset-0 size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Always-visible bottom gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#485ea8]/95 via-[#485ea8]/75 to-[#485ea8]/10 p-6 opacity-0 transition-all duration-500 group-hover:opacity-100 sm:p-7">
                        <div className="translate-y-5 transition-transform duration-500 group-hover:translate-y-0">
                        <span className="mb-3 inline-block h-1 w-10 rounded-full bg-white" />

                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
                            Our team · {String(index + 1).padStart(2, "0")}
                        </p>

                        <h3 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            {member.name}
                        </h3>

                        <p className="mt-2 text-sm font-medium text-blue-100">
                            {member.role}
                        </p>

                        {/* Social links */}
                        <div className="mt-6 flex items-center gap-3 border-t border-white/25 pt-5">
                            {[
                                { href: member.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
                                { href: member.facebook, label: "Facebook", Icon: FaFacebookF },
                                { href: member.instagram, label: "Instagram", Icon: FaInstagram },
                            ].map(({ href, label, Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${member.name} on ${label}`}
                                className="flex size-10 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur-md transition duration-300 hover:border-white hover:bg-white hover:text-[#485ea8]"
                            >
                                <Icon size={18} />
                            </a>
                            ))}

                            <span className="ml-auto flex size-10 items-center justify-center rounded-full bg-white text-[#485ea8]">
                            <ArrowUpRight size={19} />
                            </span>
                        </div>
                        </div>
                    </div>

                    {/* Name visible before hover */}
                    <div className="absolute inset-x-0 bottom-0 p-6 transition-opacity duration-300 group-hover:opacity-0 sm:p-7">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
                        {member.role}
                        </p>
                        <h3 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        {member.name}
                        </h3>
                        <div className="mt-3 h-1 w-9 rounded-full bg-[#6684ff]" />
                    </div>
                    </article>
                ))}
                </div>
            </div>
        </section>

    </main>
  );
}

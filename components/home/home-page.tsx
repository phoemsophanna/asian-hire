import {
  ArrowRight,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  ChevronRight,
  Code2,
  Earth,
  FileUser,
  HeartHandshake,
  Megaphone,
  MessagesSquare,
  PenTool,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserRound,
  UserRoundCheck,
  Users,
  UserSearch,
  UsersRound,
  Wallet,
  Wrench,
} from "lucide-react";
import FeaturedJobs from "@/components/home/featured-jobs";
import HeroSearch from "@/components/home/hero-search";
import type { Job, JobSearchFilters } from "@/components/home/job-data";
import SectionHeading from "../ui/SectionHeader";
import Image from "next/image";
import WhyChooseUs from "../ui/WhyChoose";
import Link from "next/link";

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

const steps = [
  {
    number: "01",
    title: "Browse Jobs You Want",
    text: "Don't just find. Be found. Your next career move starts here.",
    icon: BriefcaseBusiness,
  },
  {
    number: "02",
    title: "Organize Your Resume",
    text: "Prepare your resume and degree for skill assessment.",
    icon: Search,
  },
  {
    number: "03",
    title: "Consult with us",
    text: "Consult with us to find the best way and make a safe migration plan to Australia.",
    icon: FileUser,
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

const articles = [
  {
    category: "Career advice",
    date: "May 16, 2025",
    title: "How to make your next career move with confidence",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=85",
  },
  {
    category: "Job search",
    date: "May 12, 2025",
    title: "Five ways to make your resume stand out",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=85",
  },
  {
    category: "Workplace",
    date: "May 08, 2025",
    title: "What to ask at your next job interview",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=85",
  },
  {
    category: "Career growth",
    date: "May 02, 2025",
    title: "Building skills for a changing workplace",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=85",
  },
  {
    category: "Career growth",
    date: "May 02, 2025",
    title: "Building skills for a changing workplaces",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=85",
  },
];

function Hero({
  filters,
  resultCount,
  hasSearched,
}: {
  filters: JobSearchFilters;
  resultCount: number;
  hasSearched: boolean;
}) {
  return (
    <section className="relative isolate bg-[#112b57]">
      {/* Background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/slider/slider.jpg')",
        }}
      />

      {/* Background overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(12,35,76,0.30)_0%,rgba(17,47,96,0.30)_55%,rgba(18,50,101,0.72)_100%)]" />

      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-72 w-[600px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">

          {/* Intro text */}
          <p className="mx-auto max-w-4xl text-lg font-bold uppercase leading-relaxed tracking-[1px] text-white sm:text-xl lg:text-2xl">
            AUSTRALIA JOBS SEARCH WEBSITE IN CAMBODIA
          </p>

          {/* Main message */}
          <p className="mx-auto mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
            Millions of jobs,{" "}
            <span className="bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">
              find the one that&apos;s right for you
            </span>
          </p>

          {/* Search form */}
          <div className="mx-auto mt-12 relative z-10 max-w-4xl">
            <HeroSearch
              filters={filters}
              hasSearched={hasSearched}
              resultCount={resultCount}
            />
          </div>

          {/* Trending keywords */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <span className="mr-1 text-xs font-semibold text-white sm:text-sm">
              Trending Keywords:
            </span>

            {[
              "Automotive", "Education", "Health",
              "Health and Engineering",
            ].map((keyword) => (
              <a
                key={keyword}
                href="#featured-jobs"
                className="rounded-full border border-white/20 bg-white/[0.08] px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300/70 hover:bg-white/15 hover:text-white sm:text-sm"
              >
                {keyword}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PopularIndustries() {
  return (
    <section className="bg-white py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          description="Today jobs live 450"
          eyebrow="Explore opportunities"
          title="Popular job by industries"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map(({ name, count, icon: Icon }) => {
            const params = new URLSearchParams();

            if (name) {
              params.set("industry", name);
            }

            const query = params.toString();

            return <Link
                    className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_5px_22px_rgba(22,47,89,0.035)] transition hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-[0_12px_30px_rgba(22,47,89,0.08)]"
                    href={`/jobs?${query}`}
                    key={name}
                  >
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#485ea8] transition group-hover:bg-[#485ea8] group-hover:text-white">
                      <Icon aria-hidden="true" className="size-6" strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-[#172b4d]">{name}</span>
                      <span className="mt-1 block text-xs text-slate-500">{count}</span>
                    </span>
                    <ChevronRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#485ea8]"
                    />
                  </Link>;
          })}
        </div>
        <div className="mt-8 text-center">
          <a
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-[#172b4d] transition hover:border-blue-200 hover:text-[#485ea8]"
            href="#featured-jobs"
          >
            Browse all industries <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function JobsSection({ jobs }: { jobs: Job[] }) {
  return (
    <section className="bg-[#f7f9fc] py-10 sm:py-16" id="featured-jobs">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          description="Find your next opportunity from hand-picked roles at companies that are going places."
          eyebrow="Hand-picked for you"
          title="Featured jobs"
        />
        <FeaturedJobs jobs={jobs} />
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="bg-white py-10 sm:py-16" id="how-it-works">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          description="Find your next opportunity from hand-picked roles at companies that are going places."
          eyebrow="Hand-picked for you"
          title="How It Works"
        />
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {steps.map(({ number, title, text, icon: Icon }, index) => (
            <div className="relative flex flex-col items-center text-center" key={number}>
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[calc(50%+70px)] right-[calc(-50%+50px)] top-10 hidden border-t border-dashed border-blue-200 lg:block"
                />
              )}
              <span className="relative flex size-20 items-center justify-center rounded-full border border-blue-100 bg-[#f0f5ff] text-[#485ea8]">
                <Icon aria-hidden="true" className="size-8" strokeWidth={1.8} />
                <span className="absolute -right-2 -top-1 flex size-6 items-center justify-center rounded-full bg-[#485ea8] text-[10px] font-bold text-white">
                  {number.slice(1)}
                </span>
              </span>
              <h3 className="mt-5 font-semibold text-[#172b4d]">{title}</h3>
              <p className="mt-2 max-w-[240px] text-sm leading-6 text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsSection() {
  const spotlight = articles[0];
  const smallerArticles = articles.slice(1);
  return (
    <section className="bg-white py-10 sm:py-16" id="news">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          description="Fresh perspectives and helpful advice to keep your career moving forward."
          eyebrow="Ideas for your next step"
          title="The latest from Asian Hire"
        />
        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <a className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_8px_28px_rgba(22,47,89,0.045)] transition hover:shadow-[0_16px_38px_rgba(22,47,89,0.1)]" href="#news">
            <div
              aria-label="Colleagues collaborating in a meeting"
              className="min-h-[260px] flex-1 bg-cover bg-center transition duration-500 group-hover:scale-[1.02] sm:min-h-[330px]"
              role="img"
              style={{ backgroundImage: `url('${spotlight.image}')` }}
            />
            <div className="relative bg-white p-6 sm:p-7">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="rounded-full bg-blue-50 px-3 py-1.5 font-semibold text-[#485ea8]">
                  {spotlight.category}
                </span>
                <span>{spotlight.date}</span>
              </div>
              <h3 className="max-w-xl text-xl font-bold leading-snug tracking-[-0.03em] text-[#172b4d] group-hover:text-[#485ea8] sm:text-2xl">
                {spotlight.title}
              </h3>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#485ea8]">
                Read article <ArrowRight aria-hidden="true" className="size-4" />
              </span>
            </div>
          </a>
          <div className="grid gap-5 sm:grid-cols-2">
            {smallerArticles.map((article) => (
              <a
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_8px_28px_rgba(22,47,89,0.045)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(22,47,89,0.1)]"
                href="#news"
                key={article.title}
              >
                <div
                  aria-label={article.title}
                  className="h-40 bg-cover bg-center transition duration-500 group-hover:scale-[1.02]"
                  role="img"
                  style={{ backgroundImage: `url('${article.image}')` }}
                />
                <div className="p-4">
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                    <span className="font-semibold text-[#485ea8]">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-sx font-semibold leading-6 text-[#172b4d] group-hover:text-[#485ea8]">
                    {article.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center">
          <a
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-[#172b4d] transition hover:border-blue-200 hover:text-[#485ea8]"
            href="#featured-jobs"
          >
            Explore career advice <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function HomePage({
  jobs,
  filters,
  hasSearched,
}: {
  jobs: Job[];
  filters: JobSearchFilters;
  hasSearched: boolean;
}) {
  return (
    <>
      <main>
        <Hero filters={filters} hasSearched={hasSearched} resultCount={jobs.length} />
        <PopularIndustries />
        <JobsSection jobs={jobs} />
        <HowItWorks />
        <WhyChooseUs benefits={benefits} />
        <NewsSection />
      </main>
    </>
  );
}

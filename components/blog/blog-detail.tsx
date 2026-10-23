"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Share2,
  Tag,
  UserRound,
  ChevronRight,
  Mail,
  TrendingUp,
} from "lucide-react";
import { FaLinkedinIn, FaFacebookF, FaTelegram } from "react-icons/fa";
import PageBanner from "../PageBanner";

type Blog = {
  id: number;
  title: string;
  thumbnail: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  excerpt: string;
  tags: string[];
};

const currentBlog: Blog = {
  id: 1,
  title:
    "How Digital Transformation Is Shaping the Future of Modern Businesses",
  thumbnail:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
  category: "Technology",
  date: "October 20, 2026",
  author: "Asian Hire Team",
  readTime: "6 min read",
  excerpt:
    "Discover how modern technology, digital innovation, and smarter business strategies are helping organizations grow, adapt, and build better experiences.",
  tags: ["Digital Transformation", "Technology", "Business"],
};

const recentBlogs: Blog[] = [
  {
    id: 2,
    title: "Top Skills Employers Are Looking for in 2026",
    thumbnail:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=500&q=80",
    category: "Career Advice",
    date: "October 18, 2026",
    author: "Asian Hire Team",
    readTime: "4 min read",
    excerpt: "Explore the skills that can help you stand out in today's job market.",
    tags: ["Career", "Skills"],
  },
  {
    id: 3,
    title: "Building a Strong Professional Profile",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80",
    category: "Professional Development",
    date: "October 15, 2026",
    author: "Asian Hire Team",
    readTime: "5 min read",
    excerpt: "Learn how to present your experience and strengths to potential employers.",
    tags: ["Profile", "Career"],
  },
  {
    id: 4,
    title: "The Future of Recruitment and Hiring",
    thumbnail:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=500&q=80",
    category: "Recruitment",
    date: "October 12, 2026",
    author: "Asian Hire Team",
    readTime: "7 min read",
    excerpt: "See how new approaches are changing the recruitment process.",
    tags: ["Recruitment", "Hiring"],
  },
];

const articleSections = [
  {
    heading: "Why Digital Transformation Matters",
    paragraphs: [
      "The way businesses operate is changing rapidly. Customers expect faster services, more convenient digital experiences, and solutions that respond to their needs. Organizations that embrace technology can improve productivity, communicate more effectively, and make better-informed decisions.",
      "Digital transformation is not simply about adopting new software. It is about rethinking how people work, how services are delivered, and how businesses create value for their customers.",
    ],
  },
  {
    heading: "The Key Benefits for Modern Businesses",
    paragraphs: [
      "Technology can simplify repetitive tasks, reduce unnecessary manual work, and help teams focus on activities that create meaningful results. Digital platforms also make it easier to organize information, track performance, and collaborate across departments.",
      "With the right tools and strategy, businesses can respond to changing market conditions more effectively while delivering a consistent experience to their customers.",
    ],
  },
  {
    heading: "Preparing for the Future",
    paragraphs: [
      "Successful transformation starts with a clear goal. Businesses should identify their biggest challenges, choose tools that support their objectives, and help employees develop the skills they need to use those tools confidently.",
      "Continuous learning, thoughtful planning, and a willingness to improve are essential. Rather than changing everything at once, organizations can begin with practical improvements and build on their progress over time.",
    ],
  },
];

export default function BlogDetail() {
  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(currentBlog.title);

  const shareLinks = [
    {
      name: "Facebook",
      icon: FaFacebookF,
      color: "hover:bg-blue-50 hover:text-blue-600",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "Telegram",
      icon: FaTelegram,
      color: "hover:bg-sky-50 hover:text-sky-600",
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      color: "hover:bg-blue-50 hover:text-blue-700",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* Page header */}
      <PageBanner title={"Blog Details"} />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10 md:py-16">
        {/* Main article */}
        <article className="min-w-0 overflow-hidden">
          <div>
            {/* Thumbnail */}
            <div className="relative mb-7 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
              <Image
                src={currentBlog.thumbnail}
                alt={currentBlog.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            {/* Title */}
            <h1 className="max-w-4xl text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              {currentBlog.title}
            </h1>

            {/* Metadata */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-slate-100 pb-7 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={16} className="text-[#485ea8]" />
                {currentBlog.date}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-[#485ea8]">
                <Tag size={13} />
                {currentBlog.category}
              </span>
            </div>

            {/* Article introduction */}
            <div className="mt-8">
              <p className="border-l-[3px] border-[#485ea8] pl-5 text-lg font-medium leading-8 text-slate-600">
                {currentBlog.excerpt}
              </p>
            </div>

            {/* Article body */}
            <div className="mt-8 space-y-8">
              {articleSections.map((section, index) => (
                <section key={section.heading}>
                  <h2 className="mb-4 text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
                    {section.heading}
                  </h2>

                  <div className="space-y-4 text-[15px] leading-8 text-slate-600 sm:text-base">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {index === 1 && (
                    <blockquote className="my-7 rounded-r-xl border-l-4 border-[#485ea8] bg-blue-50/70 px-5 py-5 sm:px-7">
                      <p className="text-lg font-semibold leading-8 text-slate-800">
                        “The key to progress is not simply adopting new
                        technology, but using it to create better experiences
                        and meaningful results.”
                      </p>
                    </blockquote>
                  )}
                </section>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-9 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-6">
            </div>

            {/* Share section */}
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Share2 size={18} className="text-[#485ea8]" />
                    Share this article
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    Help others discover something useful.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {shareLinks.map((social) => {
                    const Icon = social.icon;

                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Share on ${social.name}`}
                        title={`Share on ${social.name}`}
                        className={`inline-flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition ${social.color}`}
                      >
                        <Icon size={19} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Right sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-6">
          {/* Recent posts */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Articles
                </h2>
              </div>
              <span className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-[#485ea8]">
                <TrendingUp size={19} />
              </span>
            </div>

            <div className="space-y-5">
              {recentBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blogs/${blog.id}`}
                  className="group flex gap-3.5"
                >
                  <div className="relative size-[88px] shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                      src={blog.thumbnail}
                      alt={blog.title}
                      fill
                      sizes="88px"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-[#485ea8]">
                      {blog.category}
                    </span>
                    <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-5 text-slate-800 transition group-hover:text-[#485ea8]">
                      {blog.title}
                    </h3>
                    <span className="mt-2 block text-xs text-slate-400">
                      {blog.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
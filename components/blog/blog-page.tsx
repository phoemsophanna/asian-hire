import PageBanner from "../PageBanner";
import BlogCard from "./blog-card";



const blogs = [
  {
    slug: "build-a-strong-cv",
    category: "Career Advice",
    date: "October 20, 2026",
    title: "How to Build a Strong CV That Gets Noticed",
    summary:
      "Learn how to highlight your skills, showcase your achievements, and create a professional CV that helps you stand out to recruiters and potential employers.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Professionals collaborating in a modern office",
  },
  {
    slug: "prepare-for-a-job-interview",
    category: "Interview Tips",
    date: "October 15, 2026",
    title: "How to Prepare for Your Next Job Interview",
    summary:
      "Discover practical ways to research employers, answer interview questions confidently, and make a strong first impression.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Colleagues discussing ideas in a meeting",
  },
  {
    slug: "grow-your-career",
    category: "Career Growth",
    date: "October 10, 2026",
    title: "Practical Steps to Grow Your Career",
    summary:
      "Explore ways to develop valuable skills, build professional relationships, and discover new opportunities for long-term career growth.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Team working together in an office",
  },
  {
    slug: "build-a-strong-cv",
    category: "Career Advice",
    date: "October 20, 2026",
    title: "How to Build a Strong CV That Gets Noticed",
    summary:
      "Learn how to highlight your skills, showcase your achievements, and create a professional CV that helps you stand out to recruiters and potential employers.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Professionals collaborating in a modern office",
  },
  {
    slug: "prepare-for-a-job-interview",
    category: "Interview Tips",
    date: "October 15, 2026",
    title: "How to Prepare for Your Next Job Interview",
    summary:
      "Discover practical ways to research employers, answer interview questions confidently, and make a strong first impression.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Colleagues discussing ideas in a meeting",
  },
  {
    slug: "grow-your-career",
    category: "Career Growth",
    date: "October 10, 2026",
    title: "Practical Steps to Grow Your Career",
    summary:
      "Explore ways to develop valuable skills, build professional relationships, and discover new opportunities for long-term career growth.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Team working together in an office",
  },
];

export default function BlogPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
        <PageBanner title={"News & Blogs"} />

      {/* Blog listing */}
      <section className="py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Latest articles
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Ideas, guidance, and updates for your professional journey.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {["All", "Career Advice", "Job Search", "Workplace", "Company News"].map(
                (category) => (
                  <button
                    key={category}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      category === "All"
                        ? "border-[#485ea8] bg-[#485ea8] text-white shadow-sm shadow-blue-200"
                        : "border-slate-200 bg-white text-slate-600 hover:border-[#485ea8]/30 hover:bg-blue-50 hover:text-[#485ea8]"
                    }`}
                  >
                    {category}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {blogs.map((blog,index) => (
              <BlogCard key={index} spotlight={blog} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

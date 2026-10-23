import PageBanner from "../PageBanner";
import SectionHeading from "../ui/SectionHeader";
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
          <SectionHeading title="Latest articles" description="Ideas, guidance, and updates for your professional journey." />

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

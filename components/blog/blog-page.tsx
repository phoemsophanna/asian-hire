import { Reveal, Stagger, StaggerItem } from "@/util/animations";
import PageBanner from "../PageBanner";
import SectionHeading from "../ui/SectionHeader";
import BlogCard from "./blog-card";
import type { NewsPageContent } from "@/services/news-service";

export default function BlogPage({
  content,
  lang,
}: {
  content: NewsPageContent;
  lang: string;
}) {
  const blogs = content.items.map((item) => ({
    id: item.id,
    tag: item.tag,
    date: item.date ? formatDate(item.date, lang) : "",
    title: item.title,
    summary: item.summary,
    image: item.thumbnail,
  }));

  return (
    <main className="overflow-hidden bg-white text-slate-900">
      <PageBanner title={"News & Blogs"} image={content.banner} />

      {/* Blog listing */}
      <section className="py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Stagger
            delay={0.2}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
          >
            {blogs.map((blog) => (
              <StaggerItem key={blog.id} direction="up">
                <BlogCard spotlight={blog} lang={lang === "km" ? "km" : "en"} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </main>
  );
}

const KHMER_MONTHS = [
  "មករា",
  "កុម្ភៈ",
  "មីនា",
  "មេសា",
  "ឧសភា",
  "មិថុនា",
  "កក្កដា",
  "សីហា",
  "កញ្ញា",
  "តុលា",
  "វិច្ឆិកា",
  "ធ្នូ",
];
const KHMER_DIGITS = "០១២៣៤៥៦៧៨៩";

function toKhmerDigits(value: number) {
  return String(value).replace(/\d/g, (digit) => KHMER_DIGITS[Number(digit)]);
}

function formatDate(value: string, lang: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  if (lang === "km") {
    return `ថ្ងៃទី ${toKhmerDigits(date.getUTCDate())} ខែ${KHMER_MONTHS[date.getUTCMonth()]} ឆ្នាំ ${toKhmerDigits(date.getUTCFullYear())}`;
  }
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

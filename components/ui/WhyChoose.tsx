import { Reveal } from "@/util/animations";
import { ArrowRight, TrendingUp, type LucideIcon } from "lucide-react";
import Image from "next/image";

export default function WhyChooseUs({
  benefits,
  title = "Whychoose us",
  description = "Finding the right job can change everything. We bring people and meaningful opportunities together, with the tools and support to help you move forward.",
  thumbnail,
  t = (key: string) => key,
}: {
  benefits: { title: string; text: string; icon?: LucideIcon; iconUrl?: string | null }[];
  title?: string;
  description?: string;
  thumbnail?: string | null;
  t?: (key: string) => string;
}) {
  return (
    <section className="overflow-hidden bg-[#f7f9fc] py-10 sm:py-16" id="why-asian-hire">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
        <Reveal direction="left">
          <div className="relative mx-auto w-full max-w-[540px]">
            <img src={thumbnail ?? "/images/whychoose.jpg"} alt="" className="rounded-[2rem] shadow-[0_25px_70px_rgba(23,43,77,0.17)]" />
          </div>
        </Reveal>
        <Reveal direction="right">
          <div className="pt-3 lg:pt-0">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#485ea8]">
              {t("Whychoose us")}
            </p>
            <h2 className="max-w-xl text-2xl font-bold leading-[1.4] tracking-[-0.045em] text-[#172b4d] sm:text-3xl">
              {title}
            </h2>
            <div
              className="mt-3 max-w-xl text-sm leading-5 text-slate-500 [&_p:not(:last-child)]:mb-2"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <div className="mt-6 space-y-5">
              {benefits.map(({ title, text, icon: Icon, iconUrl }) => (
                <div className="flex gap-4" key={title}>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#485ea8] shadow-sm">
                    {Icon ? (
                      <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
                    ) : (
                      <i aria-hidden="true" className={`${iconUrl || "ri-checkbox-circle-line"} text-xl`} />
                    )}
                  </span>
                  <div className="flex gap-3">
                    <span>
                      <span className="block text-sm font-semibold text-[#172b4d]">{title}</span>
                      <span className="mt-1 block max-w-md text-sm leading-5 text-slate-500">{text}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
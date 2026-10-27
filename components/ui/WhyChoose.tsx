import { Reveal } from "@/util/animations";
import { ArrowRight, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function WhyChooseUs({benefits}:any) {
  return (
    <section className="overflow-hidden bg-[#f7f9fc] py-10 sm:py-16" id="why-asian-hire">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
        <Reveal direction="left">
          <div className="relative mx-auto w-full max-w-[540px]">
            <Image src={"/images/whychoose.jpg"} alt="" className="rounded-[2rem] shadow-[0_25px_70px_rgba(23,43,77,0.17)]" width={900} height={900} />
            {/* <div className="absolute -right-1 top-7 rounded-2xl bg-white px-4 py-3 shadow-[0_12px_40px_rgba(23,43,77,0.14)] sm:-right-5">
              <div className="flex -space-x-2">
                {["#485ea8", "#f19a75", "#7b70d6", "#43b7a8"].map((color, index) => (
                  <span
                    aria-hidden="true"
                    className="flex size-9 items-center justify-center rounded-full border-2 border-white text-[10px] font-semibold text-white"
                    key={color}
                    style={{ backgroundColor: color }}
                  >
                    {["S", "J", "M", "A"][index]}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-xs font-medium text-[#172b4d]">Join 12k+ job seekers</p>
            </div> */}
          </div>
        </Reveal>
        <Reveal direction="right">
          <div className="pt-3 lg:pt-0">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#485ea8]">
              Whychoose us
            </p>
            <h2 className="max-w-xl text-2xl font-bold leading-[1.4] tracking-[-0.045em] text-[#172b4d] sm:text-3xl">
              Why You Do Not Choose Job Among Other Job Site?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-5 text-slate-500">
              Finding the right job can change everything. We bring people and meaningful opportunities together, with the tools and support to help you move forward.
            </p>
            <div className="mt-6 space-y-5">
              {benefits.map(({ title, text, icon: Icon }:any, index:any) => (
                <div className="flex gap-4" key={title}>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#485ea8] shadow-sm">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
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
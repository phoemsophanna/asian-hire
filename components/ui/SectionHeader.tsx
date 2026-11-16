"use client";
import { usePathname } from "next/navigation";

export default function SectionHeading({
  eyebrow = "",
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  const isKm = usePathname().startsWith("/km");
  return (
    <div className="mb-8 md:mb-12 gap-4 mx-auto max-w-xl text-center">
      {eyebrow ? <p className={`mb-3 ${isKm ? "text-base" : "text-sm"} font-bold uppercase ${isKm ? "" : "tracking-[0.2em]"} text-[#485ea8]`}>
        {eyebrow}
      </p> : ""}
      <h2 className="text-2xl uppercase mb-3 font-semibold tracking-[-0.04em] text-[#172b4d] sm:text-[1.5rem]">
        {title}
      </h2>
      {description && (
        <div className="text-sx leading-6 text-slate-500" dangerouslySetInnerHTML={{ __html: description }} />
      )}
    </div>
  );
}
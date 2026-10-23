"use client";

import { useState, useEffect, useRef } from "react";
import { SlidersHorizontal, ChevronDown, Check } from "lucide-react";

const defaultIndustries = [
  "Accounting & Finance",
  "Information Technology",
  "Marketing & Sales",
  "Human Resources",
  "Engineering",
  "Design & Creative",
  "Education & Training",
  "Business & Management",
  "Customer Service",
];

export default function IndustryDropdown({
  filters,
  value,
  industries = defaultIndustries,
  onChange,
  variant = "hero",
}: {
  filters: string;
  value?: string;
  industries?: string[];
  onChange?: (industry: string) => void;
  variant?: "hero" | "light";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [localSelectedIndustry, setLocalSelectedIndustry] = useState(filters || "");
  const selectedIndustry = value ?? localSelectedIndustry;
  const isLight = variant === "light";

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <input type="hidden" name="industry" value={selectedIndustry} />
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
          if (e.key === "Escape") setIsOpen(false);
        }}
        className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 transition-all duration-300 ${
          isLight
            ? "border-slate-200 bg-white hover:border-[#485ea8]/50 hover:bg-slate-50"
            : "border-white/15 bg-white/80"
        }`}
      >
        <SlidersHorizontal
          className={`size-5 shrink-0 ${
            isLight ? "text-slate-400" : "text-[#485ea8]"
          }`}
        />

        <span
          className={`flex-1 truncate text-left text-sm ${
            isLight
              ? selectedIndustry
                ? "text-[#485ea8]"
                : "text-[#485ea8]"
              : selectedIndustry
                ? "text-[#485ea8]"
                : "text-[#485ea8]"
          }`}
        >
          {selectedIndustry || "Choose industry"}
        </span>

        <ChevronDown
          className={`size-4 shrink-0 transition-transform ${
            isLight ? "text-[#485ea8]" : "text-[#485ea8]"
          } ${
            isOpen ? "rotate-180" : ""
          }`}
        />
        </div>

        <div
            className={`industry-dropdown absolute left-0 right-0 top-full z-[100] mt-3
                rounded-2xl border p-2 shadow-2xl shadow-slate-900/10
                transition-all duration-200 ${
                isLight
                    ? "border-slate-200 bg-white"
                    : "border-slate-200 bg-white"
                } ${
                isOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                }`}
        >
            <div className="industry-dropdown-list relative max-h-64 space-y-1 overflow-y-auto">
                {industries.map((industry) => (
                    <div
                        key={industry}
                        onClick={() => {
                        if (value === undefined) {
                          setLocalSelectedIndustry(industry);
                        }
                        onChange?.(industry);
                        setIsOpen(false);
                        }}
                        className={`flex cursor-pointer items-center justify-between
                        rounded-xl px-3 py-3 text-sm transition-all duration-200
                        ${
                            selectedIndustry === industry
                            ? isLight
                              ? "text-slate-700 hover:bg-[#485ea8]/10"
                              : "text-slate-700 hover:bg-[#485ea8]/10"
                            : isLight
                              ? "text-slate-700 hover:bg-[#485ea8]/10"
                              : "text-slate-700 hover:bg-[#485ea8]/10"
                        }`}
                    >
                        <span>{industry}</span>

                        {selectedIndustry === industry && (
                        <Check
                          className={`size-4 shrink-0 ${
                            isLight ? "text-[#485ea8]" : "text-blue-600"
                          }`}
                        />
                        )}
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  ChevronRight,
  Info,
  Mail,
  Newspaper,
  Search,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavigationItem = {
  label: string;
  href: string;
  icon?: LucideIcon;
};

const navItems = [
  { label: "JOB SEARCH", href: "/jobs" },
  { label: "JOB SEEKERS", href: "/job-seeker" },
  { label: "EMPLOYERS", href: "/employers" },
];

const mobileNavItems = [
  { label: "Job Search", href: "/jobs", icon: Search },
  { label: "Job Seeker", href: "/job-seeker", icon: UserRound },
  { label: "Employers", href: "/employers", icon: Building2 },
  { label: "About Us", href: "/about-us", icon: Info },
  { label: "News & Blogs", href: "/blogs", icon: Newspaper },
  { label: "Contact Us", href: "/contact-us", icon: Mail },
];

export default function MainNavigation({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const items: NavigationItem[] = mobile ? mobileNavItems : navItems;

  return (
    <nav
      aria-label="Main navigation"
      className={
        mobile
          ? "flex flex-col gap-3"
          : "flex items-center gap-9"
      }
    >
      {items.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
            onClick={onNavigate}
            className={`group relative transition-colors duration-300 ${
              mobile
                ? "flex min-h-[68px] items-center justify-between gap-4 rounded-2xl border px-4 text-base font-semibold tracking-wide shadow-sm transition-all duration-200 active:scale-[0.99]"
                : "py-2 text-[13px] font-normal tracking-wide"
            }
              ${
                isActive
                  ? mobile
                    ? "border-white/40 bg-white text-[#344780] shadow-white/10"
                    : "text-[#485ea8]"
                  : mobile
                    ? "border-white/20 bg-white/[0.07] text-white hover:border-white/40 hover:bg-white/[0.14]"
                    : "text-[#647084] hover:text-[#485ea8]"
              }`}
          >
            {mobile ? (
              <>
                <span className="flex min-w-0 items-center gap-4">
                  {item.icon && (
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                        isActive
                          ? "bg-[#485ea8]/10 text-[#485ea8]"
                          : "bg-white/15 text-white"
                      }`}
                    >
                      <item.icon aria-hidden="true" className="size-5" />
                    </span>
                  )}
                  <span>{item.label}</span>
                </span>
                <ChevronRight
                  aria-hidden="true"
                  className={`size-5 shrink-0 transition-transform group-hover:translate-x-1 ${
                    isActive ? "text-[#485ea8]" : "text-white/70"
                  }`}
                />
              </>
            ) : (
              item.label
            )}

            {/* Animated underline */}
            <span
              className={`${mobile ? "hidden" : "absolute bottom-0 left-0 h-[2px]"}
                rounded-full bg-[#485ea8]
                transition-all duration-300 ease-out
                ${
                  isActive
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
            />

            {/* Subtle hover glow */}
            <span
              className={`pointer-events-none ${
                mobile ? "hidden" : "absolute inset-x-0 -bottom-1 h-3"
              } rounded-full bg-[#485ea8]/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
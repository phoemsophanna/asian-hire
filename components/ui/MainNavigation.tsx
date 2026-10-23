"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "JOB SEARCH", href: "/jobs" },
  { label: "JOB SEEKERS", href: "/job-seeker" },
  { label: "EMPLOYERS", href: "/employers" },
];

export default function MainNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="flex items-center gap-9"
    >
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
            className={`group relative py-2 text-[13px] font-normal
              tracking-wide transition-colors duration-300
              ${
                isActive
                  ? "text-[#485ea8]"
                  : "text-[#647084] hover:text-[#485ea8]"
              }`}
          >
            {item.label}

            {/* Animated underline */}
            <span
              className={`absolute bottom-0 left-0 h-[2px]
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
              className="pointer-events-none absolute inset-x-0
                -bottom-1 h-3 rounded-full bg-[#485ea8]/10
                opacity-0 blur-md transition-opacity duration-300
                group-hover:opacity-100"
            />
          </Link>
        );
      })}
    </nav>
  );
}
"use client";
import Image from "next/image";
import MainNavigation from "./ui/MainNavigation";
import { useEffect, useState } from "react";
import Link from "next/link";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b
        transition-all duration-300 ease-in-out ${
          isScrolled
            ? "border-slate-200 bg-white/95 shadow-xs backdrop-blur-lg"
            : "border-slate-100 bg-white shadow-none"
        }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between
          gap-5 px-5 transition-all duration-300 sm:px-8 ${
            isScrolled ? "min-h-[60px]" : "min-h-[70px]"
          }`}
      >
        <Link aria-label="Asian Hire home" className="flex shrink-0 items-center gap-2.5" href="/">
          <Image src={`/images/logo_en.png`} alt="" width={230} height={100} />
        </Link>
        {/* Menu */}
        <MainNavigation />
        {/* End Menu */}
        <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1">
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full bg-[#485ea8] px-4 py-2 text-xs font-semibold tracking-wide text-white transition-all duration-300 hover:bg-[#3c4f8d] active:scale-95"
          >
            ENGLISH
          </a>

          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold tracking-wide text-slate-500 transition-all duration-300 hover:text-white hover:bg-[#485ea8] active:scale-95"
          >
            KHMER
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
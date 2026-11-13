"use client";
import MainNavigation from "./ui/MainNavigation";
import { useEffect, useRef, useState } from "react";
import Link from "@/components/LocaleLink";
import { Menu, X } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { createTranslator, fetchTranslations } from "@/services/translation-service";
import type { ApiLang } from "@/services/homepage-service";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
const STATIC_LOGO = "/images/logo_en.png";

function Header() {
  const { locale, setLocale } = useLanguage();
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerLogo, setHeaderLogo] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const t = createTranslator(translations);

  useEffect(() => {
    let active = true;

    fetchTranslations(locale).then((result) => {
      if (active) setTranslations(result);
    });

    return () => {
      active = false;
    };
  }, [locale]);

  useEffect(() => {
    let active = true;
    const apiLang: ApiLang = locale === "km" ? "km" : "eng";

    fetch(`${API_URL}/public/general?lang=${apiLang}`, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { data?: { header_logo?: string | null } } | null) => {
        if (active) setHeaderLogo(payload?.data?.header_logo ?? null);
      })
      .catch(() => {
        if (active) setHeaderLogo(null);
      });

    return () => {
      active = false;
    };
  }, [locale]);
  const logoSrc = headerLogo ?? STATIC_LOGO;

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

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b
        transition-all duration-300 ease-in-out ${
          isScrolled
            ? "border-slate-200 bg-white/95 shadow-xs backdrop-blur-lg"
            : "border-slate-100 bg-white shadow-none"
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
      <div
        className={`flex items-center justify-between gap-4 transition-all duration-300 sm:gap-5 ${
            isScrolled ? "min-h-[60px]" : "min-h-[70px]"
          }`}
      >
        <Link
          aria-label="Asian Hire home"
          className="flex min-w-0 shrink items-center"
          href="/"
        >
          <img
            src={logoSrc}
            alt=""
            className="h-auto w-[170px] object-contain sm:w-[200px] md:w-[230px]"
          />
        </Link>

        {translations.title && (
          <span className="hidden text-sm font-semibold text-slate-700 xl:inline">
            {translations.title}
          </span>
        )}

        <div className="hidden items-center gap-5 md:flex">
          <MainNavigation />
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              aria-pressed={locale === "eng"}
              onClick={() => setLocale("eng")}
              className={`cursor-pointer inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-300 active:scale-95 ${
                locale === "eng"
                  ? "bg-[#485ea8] text-white hover:bg-[#3c4f8d]"
                  : "text-slate-500 hover:bg-[#485ea8] hover:text-white"
              }`}
            >
              {t("ENGLISH")}
            </button>
            <button
              type="button"
              aria-pressed={locale === "km"}
              onClick={() => setLocale("km")}
              className={`cursor-pointer inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-300 active:scale-95 ${
                locale === "km"
                  ? "bg-[#485ea8] text-white hover:bg-[#3c4f8d]"
                  : "text-slate-500 hover:bg-[#485ea8] hover:text-white"
              }`}
            >
              {t("KHMER")}
            </button>
          </div>
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-[#485ea8]/30 hover:bg-[#485ea8]/[0.05] hover:text-[#485ea8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#485ea8] md:hidden"
        >
          {isMobileMenuOpen ? (
            <X aria-hidden="true" size={21} />
          ) : (
            <Menu aria-hidden="true" size={21} />
          )}
        </button>
      </div>

      <div
        aria-hidden={!isMobileMenuOpen}
        className={`fixed inset-0 z-[60] md:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto visible"
            : "pointer-events-none invisible"
        }`}
      >
        <button
          aria-label="Close navigation menu"
          tabIndex={isMobileMenuOpen ? 0 : -1}
          onClick={closeMobileMenu}
          className={`absolute inset-0 size-full bg-slate-950/45 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`absolute inset-0 flex h-[100dvh] w-full flex-col overflow-y-auto bg-[#485ea8] px-6 pb-6 pt-5 shadow-2xl shadow-slate-950/20 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/20 pb-5">
            <Link
              aria-label="Asian Hire home"
              href="/"
              onClick={closeMobileMenu}
              className="inline-flex items-center rounded-xl bg-white px-3 py-1.5"
            >
              <img
                src={logoSrc}
                alt=""
                className="h-auto w-[170px] object-contain"
              />
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMobileMenu}
              className="inline-flex size-11 items-center justify-center rounded-xl border border-white/25 text-white transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X aria-hidden="true" size={22} />
            </button>
          </div>

          <div className="flex-1 py-6">
            <MainNavigation mobile onNavigate={closeMobileMenu} />
          </div>

          <div className="mt-auto border-t border-white/20 pt-5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                {t("Language")}
              </span>
              <div className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/10 p-1">
                <button
                  type="button"
                  aria-pressed={locale === "eng"}
                  onClick={() => {
                    setLocale("eng");
                    closeMobileMenu();
                  }}
                  className={`cursor-pointer inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition active:scale-95 ${
                    locale === "eng"
                      ? "bg-white text-[#485ea8] hover:bg-white/90"
                      : "text-white hover:bg-white/15"
                  }`}
                >
                  {t("ENGLISH")}
                </button>
                <button
                  type="button"
                  aria-pressed={locale === "km"}
                  onClick={() => {
                    setLocale("km");
                    closeMobileMenu();
                  }}
                  className={`cursor-pointer inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition active:scale-95 ${
                    locale === "km"
                      ? "bg-white text-[#485ea8] hover:bg-white/90"
                      : "text-white hover:bg-white/15"
                  }`}
                >
                  {t("KHMER")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </header>
  );
}

export default Header;
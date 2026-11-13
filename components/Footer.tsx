"use client";
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import Link from "@/components/LocaleLink";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
} from "react-icons/fa";

import { Reveal } from "@/util/animations";
import { useLanguage } from "./LanguageProvider";
import { fetchContactPage, type ContactPageContent } from "@/services/contact-service";
import type { ApiLang } from "@/services/homepage-service";
import { createTranslator, fetchTranslations } from "@/services/translation-service";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
const STATIC_LOGO = "/images/logo_en.png";

type GeneralSettings = {
  footer_logo: string | null;
  description: string;
};

type MenuRow = {
  href: string;
  is_active: boolean;
};

const footerLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "News & Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const socialLinks = [
  {
    key: "facebook",
    label: "Facebook",
    icon: FaFacebookF,
    color: "hover:bg-blue-600",
  },
  {
    key: "telegram",
    label: "Telegram",
    icon: FaTelegramPlane,
    color: "hover:bg-sky-500",
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: FaInstagram,
    color: "hover:bg-pink-600",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: FaLinkedinIn,
    color: "hover:bg-sky-600",
  },
] as const;

export default function SiteFooter() {
  const { locale } = useLanguage();
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [contact, setContact] = useState<ContactPageContent | null>(null);
  const [general, setGeneral] = useState<GeneralSettings | null>(null);
  const [menuRows, setMenuRows] = useState<MenuRow[] | null>(null);
  const t = createTranslator(translations);

  useEffect(() => {
    let active = true;
    const apiLang: ApiLang = locale === "km" ? "km" : "eng";

    fetchTranslations(locale).then((result) => {
      if (active) setTranslations(result);
    });

    fetchContactPage(apiLang).then((result) => {
      if (active) setContact(result);
    });

    fetch(`${API_URL}/public/general?lang=${apiLang}`, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { data?: GeneralSettings } | null) => {
        if (active) setGeneral(payload?.data ?? null);
      })
      .catch(() => {
        if (active) setGeneral(null);
      });

    fetch(`${API_URL}/menus/active`, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { data?: MenuRow[] } | null) => {
        if (active) setMenuRows(payload?.data ?? null);
      })
      .catch(() => {
        if (active) setMenuRows(null);
      });

    return () => {
      active = false;
    };
  }, [locale]);

  // Hide a footer link only when its matching menu row is inactive. Links with no menu row (legal pages) stay visible.
  const visibleFooterLinks = footerLinks.filter((link) => {
    if (!menuRows) return true;
    const row = menuRows.find((menuRow) => menuRow.href === link.href);
    return row ? row.is_active : true;
  });

  const logoSrc = general?.footer_logo ?? STATIC_LOGO;
  const visibleSocialLinks = socialLinks.filter(
    (social) => contact?.social[social.key],
  );
  const phones = contact?.contact.phones ?? [];
  const emails = contact?.contact.emails ?? [];
  const address = contact?.contact.address ?? "";

  return (
    <>
      {contact?.disclaimer && (
      <section className="relative overflow-hidden border-t border-slate-100 bg-gradient-to-br from-[#f8faff] via-white to-[#edf4ff] py-10 sm:py-12">

        <Reveal direction="zoom">
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="mb-5 flex items-center justify-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#485ea8] to-[#344780] text-white shadow-lg shadow-blue-500/20">
                  <ShieldCheck size={27} strokeWidth={2.2} />
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-[#102448] sm:text-3xl">
                  {t("Disclaimer")}
                </h2>
              </div>

              <p className="mx-auto max-w-3xl whitespace-pre-line text-center leading-7 text-slate-600 sm:text-lg sm:leading-8">
                {contact.disclaimer}
              </p>
            </div>
          </div>
        </Reveal>
      </section>
      )}

      {/* Main Footer */}
      <footer className="relative overflow-hidden bg-[#0d1b38] text-slate-300">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -left-32 top-10 size-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-0 size-96 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          {/* Footer columns */}
          <div className="grid grid-cols-1 gap-[10px] pb-0 py-7 md:grid-cols-2 md:gap-12 md:pb-10 md:py-10 lg:grid-cols-[1fr_1fr_1fr] lg:pb-12 lg:py-12">
            {/* Brand and Social Media */}
            <Reveal direction="left">
              <div className="text-center mb-6 md:mb-0 md:text-left">
                <Link href="/" className="group inline-flex items-center gap-3">
                  <img
                    src={logoSrc}
                    alt=""
                    className="w-56"
                  />
                </Link>

                {general?.description && (
                  <p className="mx-auto mt-3 max-w-sm whitespace-pre-line text-sm leading-6 text-slate-400 sm:text-base sm:leading-7 md:mx-0">
                    {general.description}
                  </p>
                )}

                {/* Social icons */}
                {visibleSocialLinks.length > 0 && (
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:mt-7 md:justify-start">
                    {visibleSocialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.key}
                          href={contact?.social[social.key] ?? undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className={`flex size-11 items-center justify-center rounded-full
                              border border-white/10 bg-white/[0.07] text-white
                              transition-all duration-300 hover:-translate-y-1
                              hover:border-transparent ${social.color}`}
                        >
                          <Icon size={19} />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </Reveal>

            {/* Quick Links */}
            <Reveal direction="zoom">
              <div className="border-y border-white/10 py-3 md:border-y-0 md:py-0 lg:border-white/10 lg:pl-10">
                  <h3
                      id="footer-quick-links-heading"
                      className="
                          mb-6 hidden w-fit text-lg font-bold text-white
                          after:mt-1 after:block after:h-[3px]
                          after:w-12 after:rounded-full
                          after:bg-gradient-to-r
                          after:from-[#485ea8] after:to-[#344780]
                          after:content-['']
                          sm:text-xl md:block
                      "
                  >
                      {t("Quick Links")}
                  </h3>
                  <button
                    type="button"
                    aria-expanded={isQuickLinksOpen}
                    aria-controls="footer-quick-links"
                    onClick={() => setIsQuickLinksOpen((open) => !open)}
                    className="flex w-full items-center justify-between py-2 text-left text-base font-bold text-white md:hidden"
                  >
                    {t("Quick Links")}
                    {isQuickLinksOpen ? (
                      <Minus aria-hidden="true" className="size-5 text-white/80" />
                    ) : (
                      <Plus aria-hidden="true" className="size-5 text-white/80" />
                    )}
                  </button>

                <div
                  id="footer-quick-links"
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out md:grid-rows-[1fr] ${
                    isQuickLinksOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <nav
                    aria-label="Quick links"
                    className="overflow-hidden"
                  >
                    <ul className="space-y-2 pb-2 pt-2 md:space-y-4 md:pb-0 md:pt-0">
                      {visibleFooterLinks.map((link) => (
                        <li key={link.label}>
                            <Link
                                href={link.href}
                                className="group flex items-center justify-between gap-3 py-1 text-sm transition-colors duration-200 hover:text-[#485ea8] sm:text-base"
                            >
                                <span>{t(link.label)}</span>
                                <ChevronRight
                                size={18}
                                className="shrink-0 text-slate-500 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#485ea8]"
                                />
                            </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </Reveal>

            {/* Contact Us */}
            <Reveal direction="right">
              <div className="py-0 text-center md:col-span-2 md:grid md:grid-cols-2 md:gap-8 md:py-0 md:text-left lg:col-span-1 lg:block lg:pl-10">
                <div>
                  <h3
                      className="
                          mx-auto mb-4 hidden w-fit text-lg font-bold text-white
                          after:mt-1 after:block after:h-[3px]
                          after:w-12 after:rounded-full
                          after:bg-gradient-to-r
                          after:from-[#485ea8] after:to-[#344780]
                          after:content-['']
                          sm:text-xl md:mx-0 md:mb-6 md:block
                      "
                  >
                      {t("Contact Us")}
                  </h3>

                  <button
                    type="button"
                    aria-expanded={isContactOpen}
                    aria-controls="footer-contact-details"
                    onClick={() => setIsContactOpen((open) => !open)}
                    className="flex w-full items-center justify-between py-3 text-left text-base font-bold text-white md:hidden"
                  >
                    {t("Contact Us")}
                    {isContactOpen ? (
                      <Minus aria-hidden="true" className="size-5 text-white/80" />
                    ) : (
                      <Plus aria-hidden="true" className="size-5 text-white/80" />
                    )}
                  </button>

                  <div
                    id="footer-contact-details"
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out md:grid-rows-[1fr] ${
                      isContactOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                  <div className={`space-y-4 overflow-hidden pt-2 ${isContactOpen ? "pb-6" : ""} md:space-y-6 md:pt-0`}>
                    {/* Phone (first two numbers only) */}
                    {phones.length > 0 && (
                      <div className="flex items-start justify-start gap-3 text-left md:gap-4">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#485ea8] to-[#344780] text-white shadow-lg shadow-blue-900/20 transition-transform duration-300 md:size-12 md:rounded-2xl">
                          <Phone className="size-[18px] md:size-5" />
                        </span>

                        <div className="min-w-0 pt-0.5">
                          <p className="text-sm text-slate-400">{t("Phone")}</p>
                          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                            {phones.slice(0, 2).map((phone, index) => (
                              <Fragment key={phone}>
                                {index > 0 && (
                                  <span aria-hidden="true" className="text-sm text-slate-500 sm:text-base">
                                    |
                                  </span>
                                )}
                                <a
                                  href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                                  className="text-sm text-white transition-colors hover:text-blue-300 sm:text-base"
                                >
                                  {phone}
                                </a>
                              </Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {emails.map((email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="group flex items-start justify-start gap-3 text-left md:gap-4"
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#485ea8] to-[#344780] text-white shadow-lg shadow-blue-900/20 transition-transform duration-300 md:size-12 md:rounded-2xl">
                          <Mail className="size-[18px] md:size-5" />
                        </span>

                        <span className="min-w-0 pt-0.5">
                          <span className="block text-sm text-slate-400">
                            {t("Email")}
                          </span>
                          <span className="mt-1 block break-words text-sm text-white transition-colors group-hover:text-blue-300 sm:text-base">
                            {email}
                          </span>
                        </span>
                      </a>
                    ))}

                    {/* Address */}
                    {address && (
                      <div className="flex items-start justify-start gap-3 text-left md:gap-4">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#485ea8] to-[#344780] text-white shadow-lg shadow-blue-900/20 md:size-12 md:rounded-2xl">
                          <MapPin className="size-[18px] md:size-5" />
                        </span>

                        <div className="min-w-0 pt-0.5">
                          <p className="text-sm text-slate-400">{t("Address")}</p>
                          <p className="mt-1 whitespace-pre-line text-sm leading-6 text-white sm:text-base">
                            {address}
                          </p>
                        </div>
                      </div>
                    )}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center gap-2 border-t border-white/10 py-5 text-center text-sm sm:text-base leading-6 text-slate-400 sm:gap-3 sm:py-6 md:flex-row md:justify-between md:text-left">
            <p>
              {t("Copyright")}{" "}
              <a
                href="https://www.asianhire.com.kh/job-postings"
                className="font-semibold hover:text-[#485ea8] transition-colors"
              >
                Asian Hire
              </a>{" "}
              {t("All Rights Reserved")}
            </p>

            <p>
              {t("Designed By")}:{" "}
              <a
                href="https://www.camgotech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-[#485ea8] transition-colors"
              >
                www.camgotech.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

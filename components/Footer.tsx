
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Send,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaTelegramPlane,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const footerLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "News & Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: FaFacebookF,
    color: "hover:bg-blue-600",
  },
  {
    label: "Twitter / X",
    href: "https://x.com/",
    icon: FaXTwitter,
    color: "hover:bg-slate-700",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: FaLinkedinIn,
    color: "hover:bg-sky-600",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    icon: FaYoutube,
    color: "hover:bg-red-600",
  },
  {
    label: "Telegram",
    href: "https://telegram.org/",
    icon: FaTelegramPlane,
    color: "hover:bg-sky-500",
  },
];

export default function SiteFooter() {
  return (
    <>
      {/* Disclaimer */}
      <section className="relative overflow-hidden border-t border-slate-100 bg-gradient-to-br from-[#f8faff] via-white to-[#edf4ff] py-10 sm:py-12">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-5 flex items-center justify-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#485ea8] to-[#344780] text-white shadow-lg shadow-blue-500/20">
                <ShieldCheck size={27} strokeWidth={2.2} />
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-[#102448] sm:text-3xl">
                Disclaimer
              </h2>
            </div>

            <p className="mx-auto max-w-3xl text-center leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Asian Hire is a platform designed to connect job seekers
              with potential employers. While we work to keep listings
              accurate and up to date, job seekers should verify all
              details directly with employers. Asian Hire does not
              guarantee employment or endorse any specific employer or
              opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="relative overflow-hidden bg-[#0d1b38] text-slate-300">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -left-32 top-10 size-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-0 size-96 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          {/* Footer columns */}
          <div className="grid grid-cols-1 gap-10 py-10 md:grid-cols-2 md:gap-12 lg:grid-cols-[1fr_1fr_1fr] lg:py-12">
            {/* Brand and Social Media */}
            <div>
              <a href="/" className="group inline-flex items-center gap-3">
                <Image src={`/images/logo_en.png`} alt="" width={500} height={500} />
              </a>

              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400 sm:text-base">
                Your trusted platform to find the right opportunities
                and build a better tomorrow. Connecting talented people
                with great companies across Asia.
              </p>

              {/* Social icons */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                        <a
                        key={social.label}
                        href={social.href}
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
            </div>

            {/* Quick Links */}
            <div className="pt-8 md:border-t-0 md:pt-0 lg:border-white/10 lg:pl-10">
                <h3
                    className="
                        mb-6 w-fit text-lg font-bold text-white
                        after:mt-1 after:block after:h-[3px]
                        after:w-12 after:rounded-full
                        after:bg-gradient-to-r
                        after:from-[#485ea8] after:to-[#344780]
                        after:content-['']
                        sm:text-xl
                    "
                >
                    Quick Links
                </h3>

              <nav aria-label="Footer navigation">
                <ul className="space-y-4">
                  {footerLinks.map((link) => (
                    <li key={link.label}>
                        <Link 
                            href={link.href} 
                            className="group flex items-center justify-between gap-3 text-sm transition-colors duration-200 hover:text-[#485ea8] sm:text-base"
                        >
                            <span>{link.label}</span>
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

            {/* Contact Us */}
            <div className="pt-8 md:col-span-2 md:grid md:grid-cols-2 md:gap-8 lg:col-span-1 lg:block lg:pt-0 lg:pl-10">
              <div>
                <h3
                    className="
                        mb-6 w-fit text-lg font-bold text-white
                        after:mt-1 after:block after:h-[3px]
                        after:w-12 after:rounded-full
                        after:bg-gradient-to-r
                        after:from-[#485ea8] after:to-[#344780]
                        after:content-['']
                        sm:text-xl
                    "
                >
                    Contact Us
                </h3>

                <div className="space-y-6">
                  {/* Phone */}
                  <a
                    href="tel:+85517824919"
                    className="group flex items-start gap-4"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#485ea8] to-[#344780] text-white shadow-lg shadow-blue-900/20 transition-transform duration-300 group-hover:-translate-y-1">
                      <Phone size={20} />
                    </span>

                    <span className="min-w-0 pt-0.5">
                      <span className="block text-sm text-slate-400">
                        Phone
                      </span>
                      <span className="mt-1 block break-words text-sm font-medium text-white transition-colors group-hover:text-blue-300 sm:text-base">
                        +855 17 824 919
                      </span>
                    </span>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info@asianhire.com.kh"
                    className="group flex items-start gap-4"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#485ea8] to-[#344780] text-white shadow-lg shadow-blue-900/20 transition-transform duration-300 group-hover:-translate-y-1">
                      <Mail size={20} />
                    </span>

                    <span className="min-w-0 pt-0.5">
                      <span className="block text-sm text-slate-400">
                        Email
                      </span>
                      <span className="mt-1 block break-words text-sm font-medium text-white transition-colors group-hover:text-blue-300 sm:text-base">
                        info@asianhire.com.kh
                      </span>
                    </span>
                  </a>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#485ea8] to-[#344780] text-white shadow-lg shadow-blue-900/20">
                      <MapPin size={20} />
                    </span>

                    <div className="min-w-0 pt-0.5">
                      <p className="text-sm text-slate-400">Address</p>
                      <p className="mt-1 text-sm font-medium leading-6 text-white sm:text-base">
                        Phnom Penh, Cambodia
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs leading-6 text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
            <p>
              © Copyright 2026{" "}
              <a
                href="https://www.asianhire.com.kh/job-postings"
                className="font-semibold text-[#485ea8] transition-colors hover:text-blue-300"
              >
                Asian Hire
              </a>{" "}
              All Rights Reserved.
            </p>

            <p>
              Designed By:{" "}
              <a
                href="https://www.camgotech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#485ea8] transition-colors hover:text-blue-300"
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

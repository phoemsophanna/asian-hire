"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { rememberScrollForLocaleSwitch } from "@/components/ScrollPositionRestoration";
import {
  LOCALE_COOKIE,
  localizePath,
  stripUrlLocale,
  toLocaleCode,
  toUrlLocale,
  type LocaleCode,
  type UrlLocale,
} from "@/util/i18n";

type Messages = Record<string, string>;

type LanguageContextValue = {
  locale: LocaleCode;
  urlLocale: UrlLocale;
  setLocale: (locale: LocaleCode) => void;
  localizeHref: (href: string) => string;
  t: (key: string) => string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  urlLocale,
}: {
  children: ReactNode;
  urlLocale: UrlLocale;
}) {
  const locale = toLocaleCode(urlLocale);
  const router = useRouter();
  const [messages, setMessages] = useState<Partial<Record<LocaleCode, Messages>>>({});

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_URL}/translations/${locale}`, {
      cache: "no-store",
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : {}))
      .then((data: Messages) => {
        setMessages((current) => ({ ...current, [locale]: data }));
      })
      .catch(() => {});

    return () => controller.abort();
  }, [locale]);

  const setLocale = useCallback(
    (next: LocaleCode) => {
      const nextUrlLocale = toUrlLocale(next);
      document.cookie = `${LOCALE_COOKIE}=${nextUrlLocale}; path=/; max-age=31536000; samesite=lax`;
      rememberScrollForLocaleSwitch();
      const pathname = window.location.pathname;
      const target = localizePath(stripUrlLocale(pathname), nextUrlLocale);
      router.push(`${target}${window.location.search}${window.location.hash}`);
    },
    [router],
  );

  const localizeHref = useCallback(
    (href: string) => localizePath(href, urlLocale),
    [urlLocale],
  );

  const t = useCallback(
    (key: string) => messages[locale]?.[key] ?? "",
    [messages, locale],
  );

  const value = useMemo(
    () => ({ locale, urlLocale, setLocale, localizeHref, t }),
    [locale, urlLocale, setLocale, localizeHref, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}

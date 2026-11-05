export const URL_LOCALES = ["en", "km"] as const;
export type UrlLocale = (typeof URL_LOCALES)[number];

export type LocaleCode = "eng" | "km";

export const DEFAULT_URL_LOCALE: UrlLocale = "en";
export const LOCALE_COOKIE = "asianhire-locale";

const URL_TO_LOCALE: Record<UrlLocale, LocaleCode> = { en: "eng", km: "km" };
const LOCALE_TO_URL: Record<LocaleCode, UrlLocale> = { eng: "en", km: "km" };

export function isUrlLocale(value: string | undefined): value is UrlLocale {
  return value !== undefined && (URL_LOCALES as readonly string[]).includes(value);
}

export function toLocaleCode(urlLocale: UrlLocale): LocaleCode {
  return URL_TO_LOCALE[urlLocale];
}

export function toUrlLocale(locale: LocaleCode): UrlLocale {
  return LOCALE_TO_URL[locale];
}

export function stripUrlLocale(path: string): string {
  const match = path.match(/^\/(en|km)(?=\/|\?|#|$)/);
  if (!match) return path;
  return path.slice(match[0].length) || "/";
}

export function localizePath(path: string, urlLocale: UrlLocale): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const rest = stripUrlLocale(path);
  return rest === "/" ? `/${urlLocale}` : `/${urlLocale}${rest}`;
}

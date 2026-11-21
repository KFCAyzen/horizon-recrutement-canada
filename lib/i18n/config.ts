export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** Language names shown in the switcher, each in its own language. */
export const localeNames: Record<Locale, string> = { en: "English", fr: "Français" };

/** "/jobs" -> "/fr/jobs". External, hash and already-prefixed hrefs pass through. */
export function localizePath(lang: Locale, href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const [first] = href.slice(1).split(/[/?#]/);
  if (hasLocale(first)) return href;
  return href === "/" ? `/${lang}` : `/${lang}${href}`;
}

/** "/fr/jobs" -> { lang: "fr", path: "/jobs" } */
export function splitLocale(pathname: string): { lang: Locale | null; path: string } {
  const [, first = "", ...rest] = pathname.split("/");
  if (hasLocale(first)) return { lang: first, path: "/" + rest.join("/") };
  return { lang: null, path: pathname };
}

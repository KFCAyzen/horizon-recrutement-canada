import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { hasLocale, type Locale } from "./config";
import { en, type Messages } from "./messages/en";
import { fr } from "./messages/fr";

const catalogues: Record<Locale, Messages> = { en, fr };

/** Current locale from the /[lang] route segment (Server Components only). */
export async function getLang(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

export const getMessagesFor = (locale: Locale) => catalogues[locale];

export async function getMessages(): Promise<Messages> {
  return catalogues[await getLang()];
}

"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "./config";
import type { Messages } from "./messages/en";

/** Only the slices interactive components need; keeps the client bundle small. */
export type ClientMessages = Pick<Messages, "nav" | "form" | "filters" | "jobsUi" | "resourcesUi" | "home" | "common">;

type Value = { lang: Locale; m: ClientMessages };
const I18nContext = createContext<Value | null>(null);

export function I18nProvider({ lang, m, children }: Value & { children: ReactNode }) {
  return <I18nContext.Provider value={{ lang, m }}>{children}</I18nContext.Provider>;
}

export function useI18n(): Value {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside <I18nProvider>");
  return value;
}

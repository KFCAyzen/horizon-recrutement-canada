"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localizePath } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/client";

type Props = Omit<ComponentProps<typeof NextLink>, "href"> & { href: string };

/** next/link that prefixes internal hrefs with the current locale. */
export default function Link({ href, ...rest }: Props) {
  const { lang } = useI18n();
  return <NextLink href={localizePath(lang, href)} {...rest} />;
}

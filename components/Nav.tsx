"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { routes } from "@/lib/site";
import { LOCALE_COOKIE, localeNames, locales, localizePath, splitLocale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/client";
import { Arrow } from "./Arrow";
import Link from "./Link";

/** `pathname` here is locale-free (e.g. "/jobs"). */
const isActive = (pathname: string | null, href: string) =>
  pathname !== null && (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

/** Nav that highlights the current route. Render inside <Suspense> (see layout). */
export function ActiveNav() {
  return <Nav pathname={usePathname()} />;
}

/** Pure nav markup; `pathname: null` renders without an active link (Suspense fallback). */
export function Nav({ pathname: fullPathname }: { pathname: string | null }) {
  const { lang, m } = useI18n();
  const t = m.nav;
  const pathname = fullPathname === null ? null : splitLocale(fullPathname).path;
  const serviceLinks = [
    { label: t.recruitment, href: routes.recruitment },
    { label: t.immigrationFull, href: routes.immigration },
  ];
  const navLinks = [
    { label: t.home, href: routes.home },
    { label: t.services, href: routes.services, children: serviceLinks },
    { label: t.about, href: routes.about },
    { label: t.resources, href: routes.resources },
    { label: t.contact, href: routes.contact },
  ];
  const other = locales.find((l) => l !== lang) ?? lang;
  const switchHref = localizePath(other, pathname ?? "/");
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const close = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  return (
    <nav className="nav" aria-label={t.main}>
      <div className="container nav__inner">
        <Link href="/" className="logo" onClick={close} aria-label="Horizon Recrutement Canada">
          <Image src="/images/logo-mark.png" alt="" width={52} height={48} className="logo__mark" priority />
          <span className="logo__text">
            <span className="logo__name">HORIZON</span>
            <span className="logo__sub">Recrutement <b>Canada</b></span>
          </span>
        </Link>

        <button
          className="nav__toggle"
          aria-label={open ? t.closeMenu : t.openMenu}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav__links${open ? " is-open" : ""}`}>
          {navLinks.map((link) =>
            link.children ? (
              <div className={`nav__item${servicesOpen ? " is-open" : ""}`} key={link.href}>
                <Link
                  href={link.href}
                  className={`nav__link${isActive(pathname, link.href) ? " is-active" : ""}`}
                  onClick={close}
                >
                  {link.label}
                </Link>
                <button
                  type="button"
                  className="nav__caret"
                  aria-label={t.showServices}
                  aria-expanded={servicesOpen}
                  onClick={() => setServicesOpen((o) => !o)}
                >
                  <svg viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </button>
                <div className="nav__dropdown">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={pathname === child.href ? "is-active" : undefined}
                      onClick={close}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`nav__link${isActive(pathname, link.href) ? " is-active" : ""}`}
                onClick={close}
              >
                {link.label}
              </Link>
            )
          )}
          <a
            className="nav__link nav__lang"
            href={switchHref}
            hrefLang={other}
            lang={other}
            aria-label={`${m.common.language}: ${localeNames[other]}`}
            onClick={() => {
              try {
                document.cookie = `${LOCALE_COOKIE}=${other}; path=/; max-age=31536000; samesite=lax`;
              } catch {}
            }}
          >
            {other.toUpperCase()}
          </a>
          <Link
            href={routes.jobs}
            className={`nav__link nav__cta${isActive(pathname, routes.jobs) ? " is-active" : ""}`}
            onClick={close}
          >
            {m.common.findJob} <Arrow />
          </Link>
        </div>
      </div>
    </nav>
  );
}

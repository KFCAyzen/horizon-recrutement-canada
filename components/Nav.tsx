"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, routes } from "@/lib/site";
import { Arrow } from "./Arrow";

const isActive = (pathname: string | null, href: string) =>
  pathname !== null && (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

/** Nav that highlights the current route. Render inside <Suspense> (see layout). */
export function ActiveNav() {
  return <Nav pathname={usePathname()} />;
}

/** Pure nav markup; `pathname: null` renders without an active link (Suspense fallback). */
export function Nav({ pathname }: { pathname: string | null }) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const close = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  return (
    <nav className="nav" aria-label="Main">
      <div className="container nav__inner">
        <Link href="/" className="logo" onClick={close}>
          Horizon<span className="logo__dot" aria-hidden="true">.</span>
        </Link>

        <button
          className="nav__toggle"
          aria-label={open ? "Close menu" : "Open menu"}
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
                  aria-label="Show services"
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
          <span className="nav__link" aria-label="Language: English">
            En
          </span>
          <Link
            href={routes.jobs}
            className={`nav__link nav__cta${isActive(pathname, routes.jobs) ? " is-active" : ""}`}
            onClick={close}
          >
            Find a job <Arrow />
          </Link>
        </div>
      </div>
    </nav>
  );
}

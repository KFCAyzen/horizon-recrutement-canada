"use client";

import { useState } from "react";
import { navLinks } from "@/lib/content";
import { Arrow } from "./Arrow";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="container nav__inner">
        <a href="#" className="logo">TalenTech</a>

        <button
          className="nav__toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>

        <div className={`nav__links${open ? " is-open" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`nav__link${link.active ? " is-active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
              {link.dropdown && (
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              )}
            </a>
          ))}
          <a href="#" className="nav__link nav__cta">
            Find a job <Arrow />
          </a>
        </div>
      </div>
    </nav>
  );
}

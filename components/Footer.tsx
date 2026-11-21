import Link from "next/link";
import { Fragment } from "react";
import { contact, footerColumns, routes } from "@/lib/site";
import { ButtonLink } from "./ButtonLink";

export function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer__grid">
            <div>
              <p className="footer__tagline">
                The future belongs
                <br />
                to those who dare.
              </p>
              <p className="footer__sub">Let&apos;s begin the next stage of your life!</p>
              <div className="footer__contact">
                <p>
                  <a href={contact.phoneHref}>{contact.phone}</a>
                </p>
                <p>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
                <hr />
                <p className="footer__address">
                  {contact.address.map((line, i) => (
                    <Fragment key={line}>
                      {i > 0 && <br />}
                      {line}
                    </Fragment>
                  ))}
                </p>
              </div>
            </div>

            {footerColumns.map((col) => (
              <div key={col.heading}>
                <h4>{col.heading}</h4>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="footer__find">
            <ButtonLink href={routes.jobs} variant="text">
              Find a job
            </ButtonLink>
          </div>
        </div>
      </footer>

      <div className="legal">
        <div className="container legal__inner">
          <div>
            Talentech © 2022 - All rights reserved
            <br />
            Designed by <u>Saint-Laurent Agency</u>
          </div>
          <div>
            Employment Agency Permit No. AP-2000408
            <br />
            Temporary Foreign Worker Recruitment Agency Permit No. AR-2000409
          </div>
          <div className="socials">
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-1.6 19.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 12 2z" /></svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg viewBox="0 0 24 24"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15V9l5.8 3-5.8 3z" /></svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24"><path d="M20.4 2H3.6A1.6 1.6 0 0 0 2 3.6v16.8A1.6 1.6 0 0 0 3.6 22h16.8a1.6 1.6 0 0 0 1.6-1.6V3.6A1.6 1.6 0 0 0 20.4 2zM8 19H5V9.5h3V19zM6.5 8.2a1.7 1.7 0 1 1 0-3.5 1.7 1.7 0 0 1 0 3.5zM19 19h-3v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V19h-3V9.5h2.9v1.3a3.1 3.1 0 0 1 2.8-1.5c3 0 3.6 2 3.6 4.6V19z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

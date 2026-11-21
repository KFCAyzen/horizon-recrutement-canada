"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Client } from "@/lib/data";
import { useI18n } from "@/lib/i18n/client";
import Link from "./Link";

export function Partners({ clients }: { clients: Pick<Client, "slug" | "name" | "logo">[] }) {
  const t = useI18n().m.home.partners;
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * 384 });

  return (
    <section className="partners">
      <div className="container">
        <p className="partners__label">{t.label}</p>
        <div className="partners__row">
          <button className="partners__arrow" aria-label={t.previous} onClick={() => scroll(-1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 4l-8 8 8 8" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          <div className="partners__track" ref={track}>
            {clients.map((c) => (
              <Link key={c.slug} href={`/clients/${c.slug}`} className="partner" title={c.name}>
                {c.logo && <Image src={c.logo} alt={c.name} fill sizes="96px" />}
              </Link>
            ))}
          </div>

          <button className="partners__arrow" aria-label={t.next} onClick={() => scroll(1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 4l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

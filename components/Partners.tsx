"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Client } from "@/lib/data";

export function Partners({ clients }: { clients: Pick<Client, "slug" | "name" | "logo">[] }) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * 384 });

  return (
    <section className="partners">
      <div className="container">
        <p className="partners__label">Work for a Canadian employer:</p>
        <div className="partners__row">
          <button className="partners__arrow" aria-label="Previous employers" onClick={() => scroll(-1)}>
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

          <button className="partners__arrow" aria-label="Next employers" onClick={() => scroll(1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 4l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

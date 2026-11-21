"use client";

import { useRef, type CSSProperties } from "react";
import { partners } from "@/lib/content";

export function Partners() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * 384 });

  return (
    <section className="partners">
      <div className="container">
        <p className="partners__label">Work for a Canadian employer:</p>
        <div className="partners__row">
          <button className="partners__arrow" aria-label="Previous" onClick={() => scroll(-1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 4l-8 8 8 8" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          <div className="partners__track" ref={track}>
            {partners.map((p) => (
              <div
                key={p.name}
                className={`partner${p.bare ? " partner--bare" : ""}`}
                style={{ "--partner": p.color } as CSSProperties}
              >
                {p.name}
              </div>
            ))}
          </div>

          <button className="partners__arrow" aria-label="Next" onClick={() => scroll(1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 4l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";
import { ButtonLink } from "../ButtonLink";

export type Tone = "white" | "tint" | "soft";

export function Section({
  tone = "white",
  id,
  children,
}: {
  tone?: Tone;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`section tone-${tone}`}>
      <div className="container">{children}</div>
    </section>
  );
}

/** Eyebrow + heading + lead (+ optional button) that opens most sections. */
export function SectionIntro({
  eyebrow,
  title,
  lead,
  cta,
  wide = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  cta?: { label: string; href: string };
  wide?: boolean;
}) {
  return (
    <div className={`section-intro${wide ? " section-intro--wide" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="h2">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
      {cta && <ButtonLink href={cta.href}>{cta.label}</ButtonLink>}
    </div>
  );
}

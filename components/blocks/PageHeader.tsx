import Image from "next/image";
import type { ImageSrc } from "@/lib/content";
import { Arrow } from "../Arrow";
import Link from "../Link";
import { ButtonLink } from "../ButtonLink";
import type { Tone } from "./Section";

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  cta?: { label: string; href: string };
  tone?: Tone;
  /** Right column: a photo… */
  image?: { src: ImageSrc; alt: string };
  /** …or a list of links (Services overview). */
  links?: { heading: string; items: { label: string; href: string }[] };
};

export function PageHeader({ eyebrow, title, lead, cta, tone = "tint", image, links }: Props) {
  const hasAside = Boolean(image || links);

  return (
    <header className={`page-header tone-${tone}`}>
      <div className="container">
        <div className={`page-header__grid${hasAside ? "" : " page-header__grid--single"}`}>
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            {lead && <p className="lead">{lead}</p>}
            {cta && <ButtonLink href={cta.href}>{cta.label}</ButtonLink>}
          </div>

          {image && (
            <div className="page-header__media">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="eager"
                fetchPriority="high"
                placeholder={typeof image.src === "string" ? "empty" : "blur"}
                sizes="(max-width: 991px) calc(100vw - 64px), 520px"
              />
            </div>
          )}

          {links && (
            <nav className="page-header__links" aria-label={links.heading}>
              <p className="eyebrow">{links.heading}</p>
              <ul>
                {links.items.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>
                      {l.label} <Arrow />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

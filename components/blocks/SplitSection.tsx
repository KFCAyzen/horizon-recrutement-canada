import Image from "next/image";
import type { ImageSrc } from "@/lib/content";
import { ButtonLink } from "../ButtonLink";
import { Section, type Tone } from "./Section";

type Props = {
  kicker: string;
  /** "eyebrow" renders the kicker in small caps; "label" as a larger title. */
  kickerStyle?: "eyebrow" | "label";
  title: string;
  body: string;
  cta?: { label: string; href: string };
  image: ImageSrc;
  alt: string;
  reverse?: boolean;
  tone?: Tone;
};

export function SplitSection({
  kicker,
  kickerStyle = "label",
  title,
  body,
  cta,
  image,
  alt,
  reverse = false,
  tone = "white",
}: Props) {
  return (
    <Section tone={tone}>
      <div className={`split${reverse ? " split--reverse" : ""}`}>
        <div>
          <p className={kickerStyle === "eyebrow" ? "eyebrow" : "split__kicker"}>{kicker}</p>
          <h2 className="h3">{title}</h2>
          <p>{body}</p>
          {cta && <ButtonLink href={cta.href}>{cta.label}</ButtonLink>}
        </div>
        <div className="split__media">
          <Image
            src={image}
            alt={alt}
            fill
            placeholder={typeof image === "string" ? "empty" : "blur"}
            sizes="(max-width: 991px) calc(100vw - 64px), 600px"
          />
        </div>
      </div>
    </Section>
  );
}

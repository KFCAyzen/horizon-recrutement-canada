import { routes } from "@/lib/site";
import { ButtonLink } from "../ButtonLink";
import { Section } from "./Section";

export function CtaBanner({
  title,
  cta = { label: "Start now", href: routes.contact },
}: {
  title: string;
  cta?: { label: string; href: string };
}) {
  return (
    <Section>
      <div className="cta-banner">
        <h2>{title}</h2>
        <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
      </div>
    </Section>
  );
}

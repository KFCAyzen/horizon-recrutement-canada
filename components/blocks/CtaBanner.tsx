import { routes } from "@/lib/site";
import { getMessages } from "@/lib/i18n/server";
import { ButtonLink } from "../ButtonLink";
import { Section } from "./Section";

export async function CtaBanner({
  title,
  cta,
}: {
  title: string;
  cta?: { label: string; href: string };
}) {
  const button = cta ?? { label: (await getMessages()).common.startNow, href: routes.contact };
  return (
    <Section>
      <div className="cta-banner">
        <h2>{title}</h2>
        <ButtonLink href={button.href}>{button.label}</ButtonLink>
      </div>
    </Section>
  );
}

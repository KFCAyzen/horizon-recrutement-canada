import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section, SectionIntro } from "@/components/blocks/Section";
import { NumberedCards } from "@/components/blocks/NumberedCards";
import { SplitSection } from "@/components/blocks/SplitSection";
import { ValueCards } from "@/components/blocks/ValueCards";
import { aboutPage as page } from "@/lib/content";
import { routes } from "@/lib/site";

export const metadata: Metadata = { title: "About us" };

export default function AboutPage() {
  const cta = { label: page.ctaLabel, href: routes.contact };
  const { advantage, approach, commitment } = page;

  return (
    <>
      <PageHeader {...page.header} tone="white" />

      <Section>
        <SectionIntro eyebrow={advantage.eyebrow} title={advantage.title} lead={advantage.lead} cta={cta} />
        <NumberedCards steps={advantage.steps} columns={4} />
      </Section>

      <SplitSection {...approach} kickerStyle="eyebrow" cta={cta} />

      <Section>
        <SectionIntro wide eyebrow={commitment.eyebrow} title={commitment.title} lead={commitment.lead} cta={cta} />
        <ValueCards items={commitment.items} />
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section, SectionIntro } from "@/components/blocks/Section";
import { NumberedCards } from "@/components/blocks/NumberedCards";
import { SplitSection } from "@/components/blocks/SplitSection";
import { ValueCards } from "@/components/blocks/ValueCards";
import { buildContent } from "@/lib/content";
import { getMessages } from "@/lib/i18n/server";
import { routes } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages()).meta.about };
}

export default async function AboutPage() {
  const page = buildContent(await getMessages()).aboutPage;
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

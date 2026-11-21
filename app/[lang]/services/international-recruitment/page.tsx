import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section, SectionIntro } from "@/components/blocks/Section";
import { NumberedCards } from "@/components/blocks/NumberedCards";
import { ValueCards } from "@/components/blocks/ValueCards";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { buildContent } from "@/lib/content";
import { getMessages } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages()).meta.recruitment };
}

export default async function InternationalRecruitmentPage() {
  const page = buildContent(await getMessages()).recruitmentPage;
  const { header, process, advantages } = page;
  return (
    <>
      <PageHeader {...header} image={{ src: header.image, alt: header.alt }} />

      <Section tone="soft">
        <SectionIntro eyebrow={process.eyebrow} title={process.title} lead={process.lead} />
        <NumberedCards steps={process.steps} ctaCard={process.ctaCard} />
      </Section>

      <Section>
        <SectionIntro wide eyebrow={advantages.eyebrow} title={advantages.title} lead={advantages.lead} cta={advantages.cta} />
        <ValueCards items={advantages.items} />
      </Section>

      <CtaBanner title={page.cta} />
    </>
  );
}

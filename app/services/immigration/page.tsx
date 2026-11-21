import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section, SectionIntro } from "@/components/blocks/Section";
import { NumberedCards } from "@/components/blocks/NumberedCards";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { immigrationPage as page } from "@/lib/content";

export const metadata: Metadata = { title: "Canadian Immigration Consultants" };

export default function ImmigrationPage() {
  const { header, services } = page;
  return (
    <>
      <PageHeader {...header} image={{ src: header.image, alt: header.alt }} />

      <Section tone="soft">
        <SectionIntro eyebrow={services.eyebrow} title={services.title} lead={services.lead} />
        <NumberedCards steps={services.steps} ctaCard={services.ctaCard} />
      </Section>

      <CtaBanner title={page.cta} />
    </>
  );
}

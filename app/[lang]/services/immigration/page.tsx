import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section, SectionIntro } from "@/components/blocks/Section";
import { NumberedCards } from "@/components/blocks/NumberedCards";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { buildContent } from "@/lib/content";
import { getMessages } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages()).meta.immigration };
}

export default async function ImmigrationPage() {
  const page = buildContent(await getMessages()).immigrationPage;
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

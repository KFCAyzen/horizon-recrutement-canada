import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { ResourceBrowser } from "@/components/ResourceBrowser";
import { getData, toArticleSummary } from "@/lib/data";
import { getMessages } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages()).meta.resources };
}

export default async function ResourcesPage() {
  const [{ articles, articleCategories }, m] = await Promise.all([getData(), getMessages()]);
  const { eyebrow, title, lead } = m.resourcesPage;
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} lead={lead} tone="white" />
      <Section tone="tint">
        <ResourceBrowser articles={articles.map(toArticleSummary)} categories={articleCategories} />
      </Section>
    </>
  );
}

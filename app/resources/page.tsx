import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { ResourceBrowser } from "@/components/ResourceBrowser";
import { articleCategories, articles, toArticleSummary } from "@/lib/data";
import { resourcesPage } from "@/lib/content";

export const metadata: Metadata = { title: "International Recruitment Resources" };

export default function ResourcesPage() {
  return (
    <>
      <PageHeader {...resourcesPage} tone="white" />
      <Section tone="tint">
        <ResourceBrowser articles={articles.map(toArticleSummary)} categories={articleCategories} />
      </Section>
    </>
  );
}

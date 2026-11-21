import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { SplitSection } from "@/components/blocks/SplitSection";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { buildContent } from "@/lib/content";
import { getMessages } from "@/lib/i18n/server";
import { routes } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages()).meta.services };
}

export default async function ServicesPage() {
  const m = await getMessages();
  const page = buildContent(m).servicesPage;
  return (
    <>
      <PageHeader
        {...page.header}
        links={{
          heading: m.servicesPage.linksHeading,
          items: [
            { label: m.nav.recruitment, href: routes.recruitment },
            { label: m.nav.immigrationShort, href: routes.immigration },
          ],
        }}
      />
      {page.sections.map((s, i) => (
        <SplitSection key={s.kicker} {...s} reverse={i % 2 === 1} tone={i % 2 === 0 ? "tint" : "white"} />
      ))}
      <CtaBanner title={page.cta} />
    </>
  );
}

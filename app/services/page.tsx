import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { SplitSection } from "@/components/blocks/SplitSection";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { servicesPage as page } from "@/lib/content";
import { serviceLinks } from "@/lib/site";

export const metadata: Metadata = { title: "Immigration and International Recruitment" };

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        {...page.header}
        links={{
          heading: "Our services",
          items: serviceLinks.map((l, i) => (i === 1 ? { ...l, label: "Immigration" } : l)),
        }}
      />
      {page.sections.map((s, i) => (
        <SplitSection key={s.kicker} {...s} reverse={i % 2 === 1} tone={i % 2 === 0 ? "tint" : "white"} />
      ))}
      <CtaBanner title={page.cta} />
    </>
  );
}

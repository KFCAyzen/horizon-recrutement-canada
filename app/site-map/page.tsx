import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { articles, clients, jobs } from "@/lib/data";
import { routes, serviceLinks } from "@/lib/site";

export const metadata: Metadata = { title: "Site map" };

const groups = [
  {
    heading: "Navigation",
    links: [
      { label: "Home", href: routes.home },
      { label: "About Us", href: routes.about },
      { label: "Services", href: routes.services },
      ...serviceLinks,
      { label: "Find a job", href: routes.jobs },
      { label: "Resources", href: routes.resources },
      { label: "Contact", href: routes.contact },
      { label: "Policies", href: routes.policies },
    ],
  },
  { heading: "Customers", links: clients.map((c) => ({ label: c.name, href: `/clients/${c.slug}` })) },
  { heading: "Jobs", links: jobs.map((j) => ({ label: j.title, href: `${routes.jobs}/${j.slug}` })) },
  { heading: "Resources", links: articles.map((a) => ({ label: a.title, href: `${routes.resources}/${a.slug}` })) },
];

export default function SiteMapPage() {
  return (
    <>
      <PageHeader eyebrow="Horizon Recrutement Canada" title="Site map" tone="white" />
      <Section tone="soft">
        <div className="sitemap">
          {groups.map((g) => (
            <section key={g.heading}>
              <h2>{g.heading}</h2>
              <ul>
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}

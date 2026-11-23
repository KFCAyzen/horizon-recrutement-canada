import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import Link from "@/components/Link";
import { getData } from "@/lib/data";
import { getMessages } from "@/lib/i18n/server";
import { brand, routes } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages()).meta.siteMap };
}

export default async function SiteMapPage() {
  const [{ articles, clients, jobs }, m] = await Promise.all([getData(), getMessages()]);
  const t = m.siteMapPage;
  const groups = [
    {
      heading: t.navigation,
      links: [
        { label: m.nav.home, href: routes.home },
        { label: m.nav.about, href: routes.about },
        { label: m.nav.services, href: routes.services },
        { label: m.nav.recruitment, href: routes.recruitment },
        { label: m.nav.immigrationFull, href: routes.immigration },
        { label: m.footer.becomeClient, href: routes.becomeClient },
        { label: m.footer.becomePartner, href: routes.becomePartner },
        { label: m.common.findJob, href: routes.jobs },
        { label: m.nav.resources, href: routes.resources },
        { label: m.nav.contact, href: routes.contact },
        { label: m.footer.policies, href: routes.policies },
      ],
    },
    { heading: t.customers, links: clients.map((c) => ({ label: c.name, href: `/clients/${c.slug}` })) },
    { heading: t.jobs, links: jobs.map((j) => ({ label: j.title, href: `${routes.jobs}/${j.slug}` })) },
    { heading: t.resources, links: articles.map((a) => ({ label: a.title, href: `${routes.resources}/${a.slug}` })) },
  ];

  return (
    <>
      <PageHeader eyebrow={brand.name} title={t.title} tone="white" />
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

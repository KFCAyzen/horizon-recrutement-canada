import type { Metadata } from "next";
import { Section } from "@/components/blocks/Section";
import { Prose } from "@/components/blocks/Prose";
import { getData } from "@/lib/data";
import { getMessages } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages()).meta.policies };
}

export default async function PoliciesPage() {
  const [{ policies }, m] = await Promise.all([getData(), getMessages()]);
  const t = m.policiesPage;
  return (
    <Section>
      <div className="article">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p className="muted" style={{ marginTop: -24, marginBottom: 48 }}>
          {t.lastUpdate} {policies.updated}
        </p>
        <Prose html={policies.html} />
      </div>
    </Section>
  );
}

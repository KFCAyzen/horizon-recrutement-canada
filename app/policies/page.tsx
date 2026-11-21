import type { Metadata } from "next";
import { Section } from "@/components/blocks/Section";
import { Prose } from "@/components/blocks/Prose";
import { policies } from "@/lib/data";

export const metadata: Metadata = { title: "Policies" };

export default function PoliciesPage() {
  return (
    <Section>
      <div className="article">
        <p className="eyebrow">Legal</p>
        <h1>Policies</h1>
        <p className="muted" style={{ marginTop: -24, marginBottom: 48 }}>
          Last update: {policies.updated}
        </p>
        <Prose html={policies.html} />
      </div>
    </Section>
  );
}

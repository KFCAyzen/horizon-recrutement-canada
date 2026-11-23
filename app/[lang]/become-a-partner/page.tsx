import type { Metadata } from "next";
import { Section } from "@/components/blocks/Section";
import { RegistrationForm } from "@/components/RegistrationForm";
import { getMessages } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages()).meta.becomePartner };
}

export default async function BecomePartnerPage() {
  const page = (await getMessages()).partnerRequest;
  return (
    <Section>
      <div className="contact contact--single">
        <div>
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="lead">{page.lead}</p>
          <RegistrationForm kind="partner" />
        </div>
      </div>
    </Section>
  );
}

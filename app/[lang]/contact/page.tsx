import type { Metadata } from "next";
import { Section } from "@/components/blocks/Section";
import { ContactForm } from "@/components/ContactForm";
import { Address, PhoneEmail, hasContactDetails } from "@/components/ContactDetails";
import { getMessages } from "@/lib/i18n/server";
import { contact } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages()).meta.contact };
}

export default async function ContactPage() {
  const page = (await getMessages()).contactPage;
  return (
    <Section>
      <div className="contact">
        <div>
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="lead">{page.lead}</p>
          <ContactForm />
        </div>

        {/* Shown once real details are filled in lib/site.ts */}
        {hasContactDetails && (
          <aside className="contact-info">
            {contact.address?.length ? (
              <div>
                <h2>{page.headOffice}</h2>
                <Address />
              </div>
            ) : null}
            {contact.hours && (
              <div>
                <h2>{page.hours}</h2>
                <p>
                  {contact.hours.days}
                  <br />
                  {contact.hours.time}
                </p>
              </div>
            )}
            {(contact.phone || contact.email) && (
              <div>
                <h2>{page.contact}</h2>
                <PhoneEmail inline />
              </div>
            )}
          </aside>
        )}
      </div>
    </Section>
  );
}

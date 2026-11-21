import type { Metadata } from "next";
import { Section } from "@/components/blocks/Section";
import { ContactForm } from "@/components/ContactForm";
import { Address, PhoneEmail, hasContactDetails } from "@/components/ContactDetails";
import { contactPage as page } from "@/lib/content";
import { contact } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
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
                <h2>Head office</h2>
                <Address />
              </div>
            ) : null}
            {contact.hours && (
              <div>
                <h2>Hours of operation</h2>
                <p>
                  {contact.hours.days}
                  <br />
                  {contact.hours.time}
                </p>
              </div>
            )}
            {(contact.phone || contact.email) && (
              <div>
                <h2>Contact</h2>
                <PhoneEmail inline />
              </div>
            )}
          </aside>
        )}
      </div>
    </Section>
  );
}

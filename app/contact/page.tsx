import type { Metadata } from "next";
import { Fragment } from "react";
import { Section } from "@/components/blocks/Section";
import { ContactForm } from "@/components/ContactForm";
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

        <aside className="contact-info">
          <div>
            <h2>Head office</h2>
            <p>
              {contact.address.map((line, i) => (
                <Fragment key={line}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </p>
          </div>
          <div>
            <h2>Hours of operation</h2>
            <p>
              {contact.hours.days}
              <br />
              {contact.hours.time}
            </p>
          </div>
          <div>
            <h2>Contact</h2>
            <p>
              <a href={contact.phoneHref}>{contact.phone}</a>
              <br />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          </div>
        </aside>
      </div>
    </Section>
  );
}

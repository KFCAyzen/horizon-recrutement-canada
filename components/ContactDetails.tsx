import { Fragment } from "react";
import { contact } from "@/lib/site";

/** Address lines joined with <br />; renders nothing until an address is set. */
export function Address({ className }: { className?: string }) {
  if (!contact.address?.length) return null;
  return (
    <p className={className}>
      {contact.address.map((line, i) => (
        <Fragment key={line}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </p>
  );
}

/** Phone and email links; each renders only once it has a value. */
export function PhoneEmail({ inline = false }: { inline?: boolean }) {
  const items = [
    contact.phone && contact.phoneHref ? <a href={contact.phoneHref}>{contact.phone}</a> : null,
    contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : null,
  ].filter(Boolean);
  if (!items.length) return null;

  if (inline) {
    return (
      <p>
        {items.map((item, i) => (
          <Fragment key={i}>
            {i > 0 && <br />}
            {item}
          </Fragment>
        ))}
      </p>
    );
  }
  return (
    <>
      {items.map((item, i) => (
        <p key={i}>{item}</p>
      ))}
    </>
  );
}

export const hasContactDetails = Boolean(
  contact.address?.length || contact.phone || contact.email || contact.hours
);

"use client";

import { useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { useI18n } from "@/lib/i18n/client";
import { brand, routes } from "@/lib/site";
import { Arrow } from "./Arrow";
import Link from "./Link";

/** ISO 3166 codes offered in the country fields; names come from Intl in the visitor's language. */
const COUNTRY_CODES = [
  "CA", "FR", "BE", "CH", "LU", "US", "GB", "DE", "ES", "IT", "PT",
  "MA", "DZ", "TN", "EG", "SN", "CI", "CM", "CD", "CG", "GA", "BJ", "TG", "ML", "BF", "NE", "GN", "MG", "MU", "RW", "BI", "NG", "GH", "KE", "ZA",
  "HT", "MX", "CO", "BR", "LB", "AE", "SA", "TR", "IN", "PK", "PH", "VN", "CN", "RO", "UA",
] as const;

function Fieldset({ legend, children }: { legend?: string; children: ReactNode }) {
  return (
    <fieldset className="fieldset">
      {legend && <legend>{legend}</legend>}
      {children}
    </fieldset>
  );
}

type Option = { value: string; label: string };

function Choices({
  name,
  type,
  options,
  required,
  scroll,
}: {
  name: string;
  type: "radio" | "checkbox";
  options: Option[];
  required?: boolean;
  scroll?: boolean;
}) {
  return (
    <div className={`choices${scroll ? " choices--scroll" : ""}`}>
      {options.map((o, i) => (
        <label className="check" key={o.value}>
          <input type={type} name={name} value={o.value} required={required && type === "radio" && i === 0} />
          {o.label}
        </label>
      ))}
    </div>
  );
}

function Field({ id, label, ...props }: { id: string; label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} {...props} />
    </div>
  );
}

/**
 * UI-only registration form: employers asking to become a client, or organisations
 * proposing a partnership. Validates in the browser and shows a success state;
 * nothing is sent yet. Wire a server action + email provider here later.
 */
export function RegistrationForm({ kind }: { kind: "client" | "partner" }) {
  const { lang, m } = useI18n();
  const [sent, setSent] = useState(false);
  const isClient = kind === "client";
  const t = isClient ? m.clientForm : m.partnerForm;
  const names = new Intl.DisplayNames([lang], { type: "region" });
  const countries: Option[] = COUNTRY_CODES.map((c) => ({ value: c, label: names.of(c) ?? c })).sort((a, b) =>
    a.label.localeCompare(b.label, lang)
  );
  const list = (items: string[]): Option[] => items.map((label) => ({ value: label, label }));
  const withBrand = (s: string) => s.replace("{brand}", brand.name);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  }

  if (sent) {
    return (
      <div className="form-success" role="status">
        <h2>{t.thanksTitle}</h2>
        <p>{t.thanksBody}</p>
        <button type="button" onClick={() => setSent(false)}>
          {t.another}
        </button>
      </div>
    );
  }

  return (
    <form className="form form--registration" onSubmit={handleSubmit}>
      <h2 className="form__title">{t.title}</h2>

      <Fieldset legend={t.s1}>
        <div className="form__stack">
          <Field
            id="name"
            label={isClient ? m.clientForm.company : m.partnerForm.name}
            required
            autoComplete="organization"
          />
          <div className="field">
            <label htmlFor="country">{t.country}</label>
            <select id="country" name="country" required defaultValue="">
              <option value="" disabled>
                {t.selectCountry}
              </option>
              {countries.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <Field id="address" label={t.address} required autoComplete="street-address" />
          {isClient && <Field id="regNumber" label={m.clientForm.regNumber} required />}
          <Field id="website" label={t.website} type="url" placeholder="https://" />
          <div className="form__row">
            <Field id="email" label={t.email} type="email" required autoComplete="email" />
            <Field id="phone" label={t.phone} type="tel" required autoComplete="tel" />
          </div>
        </div>
      </Fieldset>

      <Fieldset legend={t.s2}>
        {isClient ? (
          <>
            <p className="fieldset__label">{m.clientForm.field}</p>
            <Choices name="field" type="radio" required options={list(m.clientForm.fields)} />
          </>
        ) : (
          <>
            <p className="fieldset__label">{m.partnerForm.orgType}</p>
            <Choices name="orgType" type="radio" required options={list(m.partnerForm.orgTypes)} />
          </>
        )}
        <p className="fieldset__label">
          {t.operating} <span className="fieldset__hint-inline">({t.operatingHint})</span>
        </p>
        <Choices name="operating" type="checkbox" scroll options={countries} />
      </Fieldset>

      <Fieldset legend={t.s3}>
        {isClient ? (
          <>
            <p className="fieldset__label">{withBrand(m.clientForm.servicesQ)}</p>
            <Choices name="services" type="checkbox" options={list(m.clientForm.services)} />
            <p className="fieldset__label">{m.clientForm.volume}</p>
            <Choices name="volume" type="radio" required options={list(m.clientForm.volumes)} />
          </>
        ) : (
          <>
            <p className="fieldset__label">{withBrand(m.partnerForm.partnershipQ)}</p>
            <Choices name="partnerships" type="checkbox" options={list(m.partnerForm.partnerships)} />
            <div className="field">
              <label htmlFor="proposal">{m.partnerForm.proposal}</label>
              <textarea id="proposal" name="proposal" required />
            </div>
          </>
        )}
      </Fieldset>

      <Fieldset legend={isClient ? m.clientForm.s4 : undefined}>
        <div className="choices">
          <label className="check">
            <input type="checkbox" name="certify" required />
            {t.certify}
          </label>
          <label className="check">
            <input type="checkbox" name="privacy" required />
            <Link href={routes.policies} className="check__link">
              {withBrand(t.privacy)}
            </Link>
          </label>
          <label className="check">
            <input type="checkbox" name="terms" required />
            <Link href={routes.policies} className="check__link">
              {t.terms}
            </Link>
          </label>
        </div>
      </Fieldset>

      <button type="submit" className="btn btn--primary">
        {t.send} <Arrow />
      </button>
    </form>
  );
}

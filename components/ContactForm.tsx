"use client";

import { useState, type FormEvent } from "react";
import { useI18n } from "@/lib/i18n/client";
import { Arrow } from "./Arrow";

/**
 * UI-only contact form: validates in the browser and shows a success state.
 * Nothing is sent anywhere yet; wire a server action + email provider here later.
 */
export function ContactForm() {
  const t = useI18n().m.form;
  const [sent, setSent] = useState(false);
  const [fileName, setFileName] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    setFileName("");
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
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__row">
        <div className="field">
          <label htmlFor="name">{t.name}</label>
          <input id="name" name="name" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="email">{t.email}</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="subject">{t.subject}</label>
        <input id="subject" name="subject" required />
      </div>
      <div className="field">
        <label htmlFor="message">{t.message}</label>
        <textarea id="message" name="message" required />
      </div>
      <div className="file-input">
        <input
          id="document"
          name="document"
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.png"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
        />
        <label htmlFor="document">{t.upload}</label>
        <span>{fileName || t.fileHint}</span>
      </div>
      <button type="submit" className="btn btn--primary">
        {t.send} <Arrow />
      </button>
    </form>
  );
}

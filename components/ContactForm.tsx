"use client";

import { useState, type FormEvent } from "react";
import { Arrow } from "./Arrow";

/**
 * UI-only contact form: validates in the browser and shows a success state.
 * Nothing is sent anywhere yet; wire a server action + email provider here later.
 */
export function ContactForm() {
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
        <h2>Thank you for contacting us!</h2>
        <p>A member of our team will contact you shortly.</p>
        <button type="button" onClick={() => setSent(false)}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="subject">Subject</label>
        <input id="subject" name="subject" required />
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
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
        <label htmlFor="document">Upload a document</label>
        <span>{fileName || "PDF, Word or image · max 10 MB"}</span>
      </div>
      <button type="submit" className="btn btn--primary">
        Send <Arrow />
      </button>
    </form>
  );
}

import type { Metadata } from "next";
import { Section } from "@/components/blocks/Section";
import { photoCredits } from "@/lib/credits";

export const metadata: Metadata = { title: "Photo credits" };

export default function CreditsPage() {
  return (
    <Section>
      <div className="article">
        <p className="eyebrow">Legal</p>
        <h1>Photo credits</h1>
        <div className="prose">
          <p>Photography on this site comes from Magnific (formerly Freepik) and is used under its free licence.</p>
          <ul>
            {photoCredits.map((c) => (
              <li key={c.use}>
                <strong>{c.use}:</strong> image by{" "}
                <a href={c.href} rel="noopener noreferrer" target="_blank">
                  {c.author}
                </a>{" "}
                on Magnific
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

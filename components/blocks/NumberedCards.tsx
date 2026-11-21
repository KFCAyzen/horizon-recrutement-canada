import type { Step } from "@/lib/content";
import { ButtonLink } from "../ButtonLink";

type CtaCard = {
  title: string;
  body?: string;
  link: { label: string; href: string };
};

/** Numbered step cards joined by dashed connectors, with an optional outlined CTA card at the end. */
export function NumberedCards({
  steps,
  columns = 3,
  ctaCard,
}: {
  steps: Step[];
  columns?: 3 | 4;
  ctaCard?: CtaCard;
}) {
  return (
    <div className={`steps steps--${columns}`}>
      {steps.map((step, i) => (
        <article className="step" key={step.title}>
          <div className="step__num">{String(i + 1).padStart(2, "0")}</div>
          <h3>{step.title}</h3>
          {Array.isArray(step.body) ? (
            <ul>
              {step.body.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : (
            <p>{step.body}</p>
          )}
        </article>
      ))}

      {ctaCard && (
        <article className="step step--cta">
          <h3>{ctaCard.title}</h3>
          {ctaCard.body && <p>{ctaCard.body}</p>}
          <ButtonLink href={ctaCard.link.href} variant="text">
            {ctaCard.link.label}
          </ButtonLink>
        </article>
      )}
    </div>
  );
}

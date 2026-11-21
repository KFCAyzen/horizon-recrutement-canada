import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ButtonLink";
import { routes } from "@/lib/site";

export default function NotFound() {
  return (
    <Section>
      <div style={{ maxWidth: 640, padding: "48px 0" }}>
        <p className="eyebrow">Error 404</p>
        <h1 className="h2" style={{ marginBottom: 20 }}>
          This page can&apos;t be found
        </h1>
        <p className="lead muted" style={{ marginBottom: 40 }}>
          The page may have moved, or the position may already be filled.
        </p>
        <ButtonLink href={routes.home}>Back to home</ButtonLink>{" "}
        <ButtonLink href={routes.jobs} variant="text" className="not-found__jobs">
          Browse open positions
        </ButtonLink>
      </div>
    </Section>
  );
}

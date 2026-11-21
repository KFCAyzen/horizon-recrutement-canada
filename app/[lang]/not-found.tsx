import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ButtonLink";
import { getMessages } from "@/lib/i18n/server";
import { routes } from "@/lib/site";

export default async function NotFound() {
  const t = (await getMessages()).notFound;
  return (
    <Section>
      <div style={{ maxWidth: 640, padding: "48px 0" }}>
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="h2" style={{ marginBottom: 20 }}>
          {t.title}
        </h1>
        <p className="lead muted" style={{ marginBottom: 40 }}>
          {t.body}
        </p>
        <ButtonLink href={routes.home}>{t.home}</ButtonLink>{" "}
        <ButtonLink href={routes.jobs} variant="text" className="not-found__jobs">
          {t.jobs}
        </ButtonLink>
      </div>
    </Section>
  );
}

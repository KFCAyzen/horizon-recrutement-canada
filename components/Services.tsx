import { buildContent } from "@/lib/content";
import { getMessages } from "@/lib/i18n/server";
import { routes } from "@/lib/site";
import { ButtonLink } from "./ButtonLink";

export async function Services() {
  const m = await getMessages();
  const t = m.home.services;
  const { home } = buildContent(m);
  return (
    <section className="services">
      <div className="container">
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 className="h2">{t.title}</h2>
        <p className="lead">{t.lead}</p>
        <ButtonLink href={routes.contact}>{t.cta}</ButtonLink>

        <div className="services__cards">
          {home.services.map((s) => (
            <article className="service-card" key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <ButtonLink href={s.href} variant="text">
                {m.common.learnMore}<span className="sr-only"> {m.common.about} {s.title}</span>
              </ButtonLink>
            </article>
          ))}
        </div>

        <div className="client-cta">
          <div>
            <h3>{t.clientCta.title}</h3>
            <p>{t.clientCta.body}</p>
          </div>
          <div className="client-cta__actions">
            <ButtonLink href={routes.becomeClient}>{t.clientCta.cta}</ButtonLink>
            <ButtonLink href={routes.becomePartner} className="btn--outline">{m.footer.becomePartner}</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

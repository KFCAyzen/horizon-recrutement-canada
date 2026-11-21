import { buildContent } from "@/lib/content";
import { getMessages } from "@/lib/i18n/server";
import { routes } from "@/lib/site";
import { ButtonLink } from "./ButtonLink";

export async function About({ openPositions }: { openPositions: number }) {
  const m = await getMessages();
  const t = m.home.about;
  const stats = buildContent(m).home.stats.map((s) => (s.key === "positions" ? { ...s, value: String(openPositions) } : s));

  return (
    <section className="about">
      <div className="container">
        <div className="about__grid">
          <div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h2 className="h2">{t.title}</h2>
          </div>
          <div className="about__right">
            <h3 className="h3">{t.subtitle}</h3>
            <p className="muted">{t.body}</p>
          </div>
        </div>

        <div className="about__bottom">
          <div className="stats">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <ButtonLink href={routes.about} variant="text">
            {t.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

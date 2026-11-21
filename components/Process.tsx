import { buildContent } from "@/lib/content";
import { getMessages } from "@/lib/i18n/server";
import { routes } from "@/lib/site";
import { NumberedCards } from "./blocks/NumberedCards";

export async function Process() {
  const m = await getMessages();
  const t = m.home.process;
  const { home } = buildContent(m);
  return (
    <section className="process">
      <div className="container">
        <div className="process__intro">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="h2">
            {t.titleLine1}
            <br />
            {t.titleLine2}
          </h2>
          <p className="lead">{t.lead}</p>
        </div>

        <NumberedCards
          steps={home.steps}
          ctaCard={{
            title: t.cta.title,
            body: t.cta.body,
            link: { label: t.cta.link, href: routes.contact },
          }}
        />
      </div>
    </section>
  );
}

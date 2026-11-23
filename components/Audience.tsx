import { getMessages } from "@/lib/i18n/server";
import { routes } from "@/lib/site";
import Link from "./Link";
import { Arrow } from "./Arrow";

/** "Choose your path" cards that overlap the bottom of the hero. */
export async function Audience() {
  const t = (await getMessages()).landing.audience;
  const hrefs = [routes.jobs, routes.becomeClient, routes.becomePartner];
  return (
    <section className="audience" aria-labelledby="audience-title">
      <div className="container">
        <h2 id="audience-title" className="sr-only">
          {t.title}
        </h2>
        <div className="audience__grid">
          {t.cards.map((c, i) => (
            <Link href={hrefs[i]} className="audience__card" key={c.title}>
              <span className="audience__tag">{c.tag}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <span className="audience__cta">
                {c.cta} <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import { getMessages } from "@/lib/i18n/server";

/** "Why Horizon": four pillars on a charcoal band. */
export async function Pillars() {
  const t = (await getMessages()).landing.pillars;
  return (
    <section className="pillars">
      <div className="container">
        <div className="pillars__head">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="h2">{t.title}</h2>
        </div>
        <div className="pillars__grid">
          {t.items.map((p, i) => (
            <article className="pillar" key={p.title}>
              <span className="pillar__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

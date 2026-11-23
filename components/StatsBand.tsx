import { buildContent } from "@/lib/content";
import { getMessages } from "@/lib/i18n/server";

/** Big-number band between About and Process. */
export async function StatsBand({ openPositions }: { openPositions: number }) {
  const m = await getMessages();
  const stats = buildContent(m).home.stats.map((s) => (s.key === "positions" ? { ...s, value: String(openPositions) } : s));
  return (
    <section className="stats-band" aria-label={m.home.about.eyebrow}>
      <div className="container stats-band__grid">
        {stats.map((s) => (
          <div className="stats-band__item" key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

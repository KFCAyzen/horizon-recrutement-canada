import { stats } from "@/lib/content";
import { Arrow } from "./Arrow";

export function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__grid">
          <div>
            <p className="eyebrow">Who is Talentech?</p>
            <h2 className="h2">We help international talent settle in Canada</h2>
          </div>
          <div className="about__right">
            <h3 className="h3">Find a job with one of our Canadian customers</h3>
            <p className="muted">
              Are you looking for a stimulating job that matches your skills? Let our team introduce
              you to our network of partner companies in various sectors across Canada.
            </p>
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
          <a href="#" className="text-link">
            Learn more about us <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

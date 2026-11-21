import { services } from "@/lib/content";
import { Arrow } from "./Arrow";

export function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <p className="eyebrow">Business services</p>
        <h2 className="h2">Employers: Recruit and Support Your International Talent</h2>
        <p className="lead">
          Talentech supports you every step of the way, from sourcing talent internationally to
          handling the immigration procedures required for their hiring.
        </p>
        <a href="#contact" className="btn btn--primary">
          Talk to an expert <Arrow />
        </a>

        <div className="services__cards">
          {services.map((s) => (
            <article className="service-card" key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <a href="#" className="text-link">
                Learn more <Arrow />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

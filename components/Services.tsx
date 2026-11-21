import { home } from "@/lib/content";
import { routes } from "@/lib/site";
import { ButtonLink } from "./ButtonLink";

export function Services() {
  return (
    <section className="services">
      <div className="container">
        <p className="eyebrow">Business services</p>
        <h2 className="h2">Employers: Recruit and Support Your International Talent</h2>
        <p className="lead">
          Talentech supports you every step of the way, from sourcing talent internationally to
          handling the immigration procedures required for their hiring.
        </p>
        <ButtonLink href={routes.contact}>Talk to an expert</ButtonLink>

        <div className="services__cards">
          {home.services.map((s) => (
            <article className="service-card" key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <ButtonLink href={s.href} variant="text">
                Learn more
              </ButtonLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

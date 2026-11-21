import { steps } from "@/lib/content";
import { Arrow } from "./Arrow";

export function Process() {
  return (
    <section className="process">
      <div className="container">
        <div className="process__intro">
          <p className="eyebrow">Our international recruitment process</p>
          <h2 className="h2">
            Full support,
            <br />
            from interviews to your arrival.
          </h2>
          <p className="lead">
            More than just recruitment, we support international talents like you, with a free,
            turnkey recruitment and relocation solution!
          </p>
        </div>

        <div className="process__grid">
          {steps.map((step, i) => (
            <article className="step" key={step.title}>
              <div className="step__num">{String(i + 1).padStart(2, "0")}</div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}

          <article className="step step--cta">
            <h3>So, are you ready to settle in Canada?</h3>
            <p>
              Get in touch with our team to discover job opportunities and benefit from our support
              program.
            </p>
            <a href="#contact" className="text-link">
              Get started <Arrow />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

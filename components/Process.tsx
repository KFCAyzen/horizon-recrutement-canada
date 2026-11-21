import { home } from "@/lib/content";
import { routes } from "@/lib/site";
import { NumberedCards } from "./blocks/NumberedCards";

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

        <NumberedCards
          steps={home.steps}
          ctaCard={{
            title: "So, are you ready to settle in Canada?",
            body: "Get in touch with our team to discover job opportunities and benefit from our support program.",
            link: { label: "Get started", href: routes.contact },
          }}
        />
      </div>
    </section>
  );
}

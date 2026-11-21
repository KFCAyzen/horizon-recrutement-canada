import Image from "next/image";
import { images } from "@/lib/content";
import { getMessages } from "@/lib/i18n/server";
import { routes } from "@/lib/site";
import { ButtonLink } from "./ButtonLink";

export async function Hero() {
  const { hero } = await getMessages();
  return (
    <header className="hero">
      {/* The LCP element: fetched eagerly at high priority, responsive AVIF/WebP, blur placeholder.
          Quality 60 is invisible under the dark scrim and saves ~25% on mobile. */}
      <Image
        src={images.hero}
        alt=""
        fill
        loading="eager"
        fetchPriority="high"
        quality={60}
        placeholder="blur"
        // Phones get a ~828px file (≈29KB AVIF): sharp enough under the scrim, 40% lighter.
        sizes="(max-width: 640px) 75vw, 100vw"
        className="hero__img"
      />
      <div className="container hero__content">
        <h1>{hero.title}</h1>
        <p>{hero.body}</p>
        <div className="hero__actions">
          <ButtonLink href={routes.jobs}>{hero.seeker}</ButtonLink>
          <ButtonLink href={routes.services} variant="ghost">
            {hero.employers}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

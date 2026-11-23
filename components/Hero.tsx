import Image from "next/image";
import { images } from "@/lib/content";
import { getMessages } from "@/lib/i18n/server";
import { routes } from "@/lib/site";
import { ButtonLink } from "./ButtonLink";

/** Full-bleed hero: photo background under a charcoal/red scrim. */
export async function Hero() {
  const { hero, landing } = await getMessages();
  return (
    <header className="hero">
      {/* The LCP element: fetched eagerly at high priority, responsive AVIF/WebP, blur placeholder. */}
      <Image
        src={images.hero}
        alt=""
        fill
        loading="eager"
        fetchPriority="high"
        quality={60}
        placeholder="blur"
        sizes="(max-width: 640px) 75vw, 100vw"
        className="hero__img"
      />
      <div className="container hero__content">
        <p className="hero__tagline">{landing.tagline}</p>
        <h1>{hero.title}</h1>
        <p className="hero__body">{hero.body}</p>
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

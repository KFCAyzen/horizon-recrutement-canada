import Image from "next/image";
import { images } from "@/lib/content";
import { routes } from "@/lib/site";
import { ButtonLink } from "./ButtonLink";

export function Hero() {
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
        <h1>Your Partner in Immigration and International Recruitment</h1>
        <p>
          Horizon Recrutement Canada guides international talent through every step of immigrating,
          and helps Canadian employers hire qualified people from abroad.
        </p>
        <div className="hero__actions">
          <ButtonLink href={routes.jobs}>Job Seeker | Find a Job</ButtonLink>
          <ButtonLink href={routes.services} variant="ghost">
            Employers | Learn About Our Services
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

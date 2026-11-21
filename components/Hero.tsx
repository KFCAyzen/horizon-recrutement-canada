import { routes } from "@/lib/site";
import { ButtonLink } from "./ButtonLink";

export function Hero() {
  return (
    <header className="hero">
      <div className="container">
        <h1>Your Partner in Immigration and International Recruitment</h1>
        <p>
          Talentech, an immigration and recruitment firm, assists international talent with their
          immigration process and helps Canadian companies hire qualified candidates from abroad.
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

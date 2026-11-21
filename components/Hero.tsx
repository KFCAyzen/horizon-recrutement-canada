import { Arrow } from "./Arrow";

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
          <a href="#" className="btn btn--primary">
            Job Seeker | Find a Job <Arrow />
          </a>
          <a href="#services" className="btn btn--ghost">
            Employers | Learn About Our Services <Arrow />
          </a>
        </div>
      </div>
    </header>
  );
}

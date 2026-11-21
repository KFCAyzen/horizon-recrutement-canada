import Image from "next/image";
import Link from "next/link";
import type { JobSummary } from "@/lib/data";
import { routes } from "@/lib/site";
import { ButtonLink } from "../ButtonLink";

export function JobLogo({ src, size = 72 }: { src: string | null; size?: number }) {
  if (!src) return <div className="job-card__logo job-card__logo--empty" aria-hidden="true" />;
  return (
    <div className="job-card__logo" style={{ width: size, height: size }}>
      <Image src={src} alt="" fill sizes={`${size}px`} />
    </div>
  );
}

export function JobMeta({ job }: { job: JobSummary }) {
  const parts = [job.city, job.sectors.join(", "), job.type, job.salary].filter(Boolean);
  return (
    <p className="job-meta">
      {parts.map((p) => (
        <span key={p}>{p}</span>
      ))}
    </p>
  );
}

export function JobCard({ job, showCompany = true }: { job: JobSummary; showCompany?: boolean }) {
  const href = `${routes.jobs}/${job.slug}`;
  return (
    <article className="job-card">
      <JobLogo src={job.logo} />
      <div>
        <h3 className="job-card__title">
          <Link href={href}>{job.title}</Link>
        </h3>
        {showCompany && job.company && (
          <p className="job-card__company">
            {job.clientSlug ? <Link href={`/clients/${job.clientSlug}`}>{job.company}</Link> : job.company}
          </p>
        )}
        <JobMeta job={job} />
        <ButtonLink href={href} variant="text">
          Consult the position
        </ButtonLink>
      </div>
    </article>
  );
}

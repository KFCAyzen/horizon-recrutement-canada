import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Section } from "@/components/blocks/Section";
import { Prose } from "@/components/blocks/Prose";
import { DetailSkeleton } from "@/components/blocks/Skeleton";
import { Arrow } from "@/components/Arrow";
import { ButtonLink } from "@/components/ButtonLink";
import { JobLogo } from "@/components/jobs/JobCard";
import { getJob, jobs } from "@/lib/data";
import { routes } from "@/lib/site";

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: PageProps<"/jobs/[slug]">): Promise<Metadata> {
  const job = getJob((await params).slug);
  return { title: job ? `${job.title} | Apply now` : "Job not found" };
}

// The shell (back link) is shared by every job; only the URL-dependent body sits behind Suspense.
export default function JobPage({ params }: PageProps<"/jobs/[slug]">) {
  return (
    <Section>
      <Link href={routes.jobs} className="back-link">
        <Arrow /> All positions
      </Link>
      <Suspense fallback={<DetailSkeleton />}>
        <JobDetail params={params} />
      </Suspense>
    </Section>
  );
}

async function JobDetail({ params }: Pick<PageProps<"/jobs/[slug]">, "params">) {
  const job = getJob((await params).slug);
  if (!job) notFound();

  const summary = [
    { label: "Location", value: job.city },
    { label: "Job type", value: job.type },
    { label: "Employment sector", value: job.sectors.join(", ") },
    { label: "Annual salary", value: job.salary },
  ].filter((r) => r.value);

  return (
    <div className="job-detail">
      <article>
        {job.company && (
          <div className="job-detail__company">
            <JobLogo src={job.logo} size={64} />
            {job.company}
          </div>
        )}
        <h1>{job.title}</h1>
        {job.intro && <Prose html={job.intro} size="sm" />}

        {job.sections.map((s) => (
          <section className="job-detail__section" key={s.heading}>
            <h2>{s.heading}</h2>
            <Prose html={s.html} size="sm" />
          </section>
        ))}

        {job.companyFacts.length > 0 && (
          <section className="company-box">
            <div className="company-box__head">
              <JobLogo src={job.logo} size={56} />
              <h2>{job.company ?? "About the employer"}</h2>
            </div>
            <dl>
              {job.companyFacts.map((f) => (
                <div key={f.label + f.value.slice(0, 20)}>
                  {f.label && <dt>{f.label}</dt>}
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            {job.clientSlug && (
              <ButtonLink href={`/clients/${job.clientSlug}`} variant="text">
                All positions at {job.company}
              </ButtonLink>
            )}
          </section>
        )}
      </article>

      <aside className="job-summary">
        <h2>{job.title}</h2>
        <dl>
          {summary.map((r) => (
            <div key={r.label}>
              <dt>{r.label}</dt>
              <dd>{r.value}</dd>
            </div>
          ))}
        </dl>
        <ButtonLink href={routes.contact}>Apply</ButtonLink>
      </aside>
    </div>
  );
}

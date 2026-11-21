import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Section } from "@/components/blocks/Section";
import { Prose } from "@/components/blocks/Prose";
import { DetailSkeleton } from "@/components/blocks/Skeleton";
import { Arrow } from "@/components/Arrow";
import { ButtonLink } from "@/components/ButtonLink";
import { JobLogo } from "@/components/jobs/JobCard";
import Link from "@/components/Link";
import { getData, jobSlugs } from "@/lib/data";
import { getMessages } from "@/lib/i18n/server";
import { routes } from "@/lib/site";

export function generateStaticParams() {
  return jobSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/jobs/[slug]">): Promise<Metadata> {
  const [{ getJob }, { meta }] = await Promise.all([getData(), getMessages()]);
  const job = getJob((await params).slug);
  return { title: job ? `${job.title} | ${meta.jobSuffix}` : meta.jobNotFound };
}

// The shell (back link) is shared by every job; only the URL-dependent body sits behind Suspense.
export default async function JobPage({ params }: PageProps<"/[lang]/jobs/[slug]">) {
  const t = (await getMessages()).jobDetail;
  return (
    <Section>
      <Link href={routes.jobs} className="back-link">
        <Arrow /> {t.back}
      </Link>
      <Suspense fallback={<DetailSkeleton />}>
        <JobDetail params={params} />
      </Suspense>
    </Section>
  );
}

async function JobDetail({ params }: Pick<PageProps<"/[lang]/jobs/[slug]">, "params">) {
  const [{ getJob }, m] = await Promise.all([getData(), getMessages()]);
  const job = getJob((await params).slug);
  if (!job) notFound();
  const t = m.jobDetail;

  const summary = [
    { label: t.location, value: job.city },
    { label: t.jobType, value: job.type },
    { label: t.sector, value: job.sectors.join(", ") },
    { label: t.salary, value: job.salary },
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
              <h2>{job.company ?? t.aboutEmployer}</h2>
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
                {t.allPositionsAt} {job.company}
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
        <ButtonLink href={routes.contact}>{t.apply}</ButtonLink>
      </aside>
    </div>
  );
}

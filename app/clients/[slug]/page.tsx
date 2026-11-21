import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Section } from "@/components/blocks/Section";
import { DetailSkeleton } from "@/components/blocks/Skeleton";
import { JobBrowser } from "@/components/jobs/JobBrowser";
import { ButtonLink } from "@/components/ButtonLink";
import { clients, getClient, getClientJobs, toJobSummary } from "@/lib/data";
import { routes } from "@/lib/site";

export function generateStaticParams() {
  return clients.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/clients/[slug]">): Promise<Metadata> {
  const client = getClient((await params).slug);
  return { title: client ? `${client.name} | Find a job` : "Employer not found" };
}

export default function ClientPage({ params }: PageProps<"/clients/[slug]">) {
  return (
    <Suspense
      fallback={
        <Section>
          <DetailSkeleton />
        </Section>
      }
    >
      <ClientBody params={params} />
    </Suspense>
  );
}

async function ClientBody({ params }: Pick<PageProps<"/clients/[slug]">, "params">) {
  const { slug } = await params;
  const client = getClient(slug);
  if (!client) notFound();
  const clientJobs = getClientJobs(slug).map(toJobSummary);

  return (
    <>
      <Section>
        <div className="client-header">
          <div className="client-header__logo">
            {client.logo && <Image src={client.logo} alt={client.name} fill loading="eager" sizes="160px" />}
          </div>
          <div>
            <p className="eyebrow">Canadian employer</p>
            <h1>{client.name}</h1>
            {client.description.split("\n\n").map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="tint">
        {clientJobs.length > 0 ? (
          <JobBrowser jobs={clientJobs} showCompany={false} />
        ) : (
          <div className="results__empty">
            <p style={{ marginBottom: 24 }}>{client.name} has no open positions right now.</p>
            <ButtonLink href={routes.jobs} variant="text">
              Browse all positions
            </ButtonLink>
          </div>
        )}
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Section } from "@/components/blocks/Section";
import { DetailSkeleton } from "@/components/blocks/Skeleton";
import { JobBrowser } from "@/components/jobs/JobBrowser";
import { ButtonLink } from "@/components/ButtonLink";
import { clientSlugs, getData, toJobSummary } from "@/lib/data";
import { getMessages } from "@/lib/i18n/server";
import { routes } from "@/lib/site";

export function generateStaticParams() {
  return clientSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/clients/[slug]">): Promise<Metadata> {
  const [{ getClient }, { meta }] = await Promise.all([getData(), getMessages()]);
  const client = getClient((await params).slug);
  return { title: client ? `${client.name} | ${meta.clientSuffix}` : meta.clientNotFound };
}

export default function ClientPage({ params }: PageProps<"/[lang]/clients/[slug]">) {
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

async function ClientBody({ params }: Pick<PageProps<"/[lang]/clients/[slug]">, "params">) {
  const { slug } = await params;
  const [{ getClient, getClientJobs }, m] = await Promise.all([getData(), getMessages()]);
  const client = getClient(slug);
  if (!client) notFound();
  const clientJobs = getClientJobs(slug).map(toJobSummary);
  const t = m.clientPage;

  return (
    <>
      <Section>
        <div className="client-header">
          <div className="client-header__logo">
            {client.logo && <Image src={client.logo} alt={client.name} fill loading="eager" sizes="160px" />}
          </div>
          <div>
            <p className="eyebrow">{t.eyebrow}</p>
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
            <p style={{ marginBottom: 24 }}>
              {client.name} {t.noJobsSuffix}
            </p>
            <ButtonLink href={routes.jobs} variant="text">
              {t.browseAll}
            </ButtonLink>
          </div>
        )}
      </Section>
    </>
  );
}

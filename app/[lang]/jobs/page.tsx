import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { JobBrowser } from "@/components/jobs/JobBrowser";
import { getData, toJobSummary } from "@/lib/data";
import { getMessages } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages()).meta.jobs };
}

export default async function JobsPage() {
  const [{ jobs }, m] = await Promise.all([getData(), getMessages()]);
  return (
    <>
      <PageHeader {...m.jobsPage} tone="white" />
      <Section tone="tint">
        <JobBrowser jobs={jobs.map(toJobSummary)} />
      </Section>
    </>
  );
}

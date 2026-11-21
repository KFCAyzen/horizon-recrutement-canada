import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { JobBrowser } from "@/components/jobs/JobBrowser";
import { jobs, toJobSummary } from "@/lib/data";
import { jobsPage } from "@/lib/content";

export const metadata: Metadata = { title: "Find a job in Canada" };

export default function JobsPage() {
  return (
    <>
      <PageHeader {...jobsPage} tone="white" />
      <Section tone="tint">
        <JobBrowser jobs={jobs.map(toJobSummary)} />
      </Section>
    </>
  );
}

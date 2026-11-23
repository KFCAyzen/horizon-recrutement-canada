import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Blog } from "@/components/Blog";
import { getData, toArticleSummary } from "@/lib/data";

export default async function Home() {
  const { articles, jobs } = await getData();
  return (
    <>
      <Hero />
      <About openPositions={jobs.length} />
      <Process />
      <Services />
      <Blog posts={articles.slice(0, 3).map(toArticleSummary)} />
    </>
  );
}

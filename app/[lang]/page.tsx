import { Hero } from "@/components/Hero";
import { Audience } from "@/components/Audience";
import { StatsBand } from "@/components/StatsBand";
import { Pillars } from "@/components/Pillars";
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
      <Audience />
      <About />
      <StatsBand openPositions={jobs.length} />
      <Process />
      <Pillars />
      <Services />
      <Blog posts={articles.slice(0, 3).map(toArticleSummary)} />
    </>
  );
}

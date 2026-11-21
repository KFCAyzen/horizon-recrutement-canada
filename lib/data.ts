// Typed access to the content scraped from the live site (see /data/*.json).
import jobsData from "@/data/jobs.json";
import clientsData from "@/data/clients.json";
import articlesData from "@/data/articles.json";
import policiesData from "@/data/policies.json";

export type Job = {
  slug: string;
  title: string;
  company: string | null;
  clientSlug: string | null;
  logo: string | null;
  city: string;
  sectors: string[];
  type: string;
  salary: string | null;
  intro: string;
  sections: { heading: string; html: string }[];
  companyFacts: { label: string; value: string }[];
};

export type Client = {
  slug: string;
  name: string;
  logo: string | null;
  description: string;
};

export type Article = {
  slug: string;
  title: string;
  category: string;
  image: string | null;
  excerpt: string;
  html: string;
};

// The live site truncates one category label; normalise it here.
const CATEGORY_FIX: Record<string, string> = { New: "News" };

export const jobs = jobsData as Job[];
export const clients = clientsData as Client[];
export const articles = (articlesData as Article[]).map((a) => ({
  ...a,
  category: CATEGORY_FIX[a.category] ?? a.category,
}));
export const policies = policiesData as { updated: string; html: string };

export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);
export const getClient = (slug: string) => clients.find((c) => c.slug === slug);
export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const getClientJobs = (slug: string) => jobs.filter((j) => j.clientSlug === slug);

/** Slim shapes passed to client components (no rich-text bodies). */
export type JobSummary = Omit<Job, "intro" | "sections" | "companyFacts">;
export type ArticleSummary = Omit<Article, "html" | "excerpt">;

export const toJobSummary = ({ intro, sections, companyFacts, ...rest }: Job): JobSummary => {
  void intro; void sections; void companyFacts;
  return rest;
};
export const toArticleSummary = ({ html, excerpt, ...rest }: Article): ArticleSummary => {
  void html; void excerpt;
  return rest;
};

/** Unique, sorted values for filter sidebars. */
export const jobCities = [...new Set(jobs.map((j) => j.city).filter(Boolean))].sort();
export const jobSectors = [...new Set(jobs.flatMap((j) => j.sectors))].sort();
export const articleCategories = [...new Set(articles.map((a) => a.category))];

/** Other articles, preferring the same category. */
export function relatedArticles(slug: string, count = 3) {
  const current = getArticle(slug);
  const others = articles.filter((a) => a.slug !== slug);
  const same = others.filter((a) => a.category === current?.category);
  const rest = others.filter((a) => a.category !== current?.category);
  return [...same, ...rest].slice(0, count);
}

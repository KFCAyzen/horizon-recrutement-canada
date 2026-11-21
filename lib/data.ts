// Typed access to the content scraped from the live site (see /data/*.json).
import jobsData from "@/data/jobs.json";
import clientsData from "@/data/clients.json";
import articlesData from "@/data/articles.json";
import policiesData from "@/data/policies.json";
import jobsFr from "@/data/fr/jobs.json";
import clientsFr from "@/data/fr/clients.json";
import articlesFr from "@/data/fr/articles.json";
import policiesFr from "@/data/fr/policies.json";
import type { Locale } from "@/lib/i18n/config";
import { getLang } from "@/lib/i18n/server";

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

/** Category labels, translated independently so the filter list is fully French even while some articles still fall back to English. */
const CATEGORY_FR: Record<string, string> = {
  "Immigrating to Canada": "Immigrer au Canada",
  "Recruiting internationally": "Recruter à l'international",
  "Find a job": "Trouver un emploi",
  "Real life facts": "Faits vécus",
  News: "Nouvelles",
  Resources: "Ressources",
};

type Policies = { updated: string; html: string };

/** French records are partial overlays keyed by slug; anything not translated yet falls back to English. */
function overlay<T extends { slug: string }>(base: T[], translated: unknown): T[] {
  const bySlug = new Map((translated as Partial<T>[] as (Partial<T> & { slug: string })[]).map((t) => [t.slug, t]));
  return base.map((item) => ({ ...item, ...bySlug.get(item.slug) }));
}

const baseJobs = jobsData as Job[];
const baseClients = clientsData as Client[];
const baseArticles = (articlesData as Article[]).map((a) => ({ ...a, category: CATEGORY_FIX[a.category] ?? a.category }));

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

function build(locale: Locale) {
  const fr = locale === "fr";
  const clients = fr ? overlay(baseClients, clientsFr) : baseClients;
  const clientNames = new Map(clients.map((c) => [c.slug, c.name]));
  // Job records carry a denormalised company name; keep it in step with the (translated) client record.
  const jobs = (fr ? overlay(baseJobs, jobsFr) : baseJobs).map((j) =>
    j.clientSlug && clientNames.has(j.clientSlug) ? { ...j, company: clientNames.get(j.clientSlug)! } : j
  );
  const articles = fr
    ? overlay(baseArticles, articlesFr).map((a) => ({ ...a, category: CATEGORY_FR[a.category] ?? a.category }))
    : baseArticles;
  const policies: Policies = fr ? { ...(policiesData as Policies), ...(policiesFr as Partial<Policies>) } : (policiesData as Policies);

  const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
  return {
    jobs,
    clients,
    articles,
    policies,
    articleCategories: [...new Set(articles.map((a) => a.category))],
    getJob: (slug: string) => jobs.find((j) => j.slug === slug),
    getClient: (slug: string) => clients.find((c) => c.slug === slug),
    getClientJobs: (slug: string) => jobs.filter((j) => j.clientSlug === slug),
    getArticle,
    /** Other articles, preferring the same category. */
    relatedArticles(slug: string, count = 3) {
      const current = getArticle(slug);
      const others = articles.filter((a) => a.slug !== slug);
      const same = others.filter((a) => a.category === current?.category);
      const rest = others.filter((a) => a.category !== current?.category);
      return [...same, ...rest].slice(0, count);
    },
  };
}

const cache = new Map<Locale, ReturnType<typeof build>>();

export function getDataFor(locale: Locale) {
  let data = cache.get(locale);
  if (!data) cache.set(locale, (data = build(locale)));
  return data;
}

/** Content for the current /[lang] route (Server Components only). */
export async function getData() {
  return getDataFor(await getLang());
}

/** Slugs are identical in every language, so static params come from the English set. */
export const jobSlugs = baseJobs.map((j) => j.slug);
export const clientSlugs = baseClients.map((c) => c.slug);
export const articleSlugs = baseArticles.map((a) => a.slug);

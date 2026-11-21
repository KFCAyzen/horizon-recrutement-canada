import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Section, SectionIntro } from "@/components/blocks/Section";
import { Prose } from "@/components/blocks/Prose";
import { PostGrid } from "@/components/blocks/PostGrid";
import { DetailSkeleton } from "@/components/blocks/Skeleton";
import { Arrow } from "@/components/Arrow";
import Link from "@/components/Link";
import { articleSlugs, getData, toArticleSummary } from "@/lib/data";
import { getMessages } from "@/lib/i18n/server";
import { routes } from "@/lib/site";

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/resources/[slug]">): Promise<Metadata> {
  const [{ getArticle }, { meta }] = await Promise.all([getData(), getMessages()]);
  const article = getArticle((await params).slug);
  return article ? { title: article.title, description: article.excerpt } : { title: meta.articleNotFound };
}

export default function ArticlePage({ params }: PageProps<"/[lang]/resources/[slug]">) {
  return (
    <Suspense
      fallback={
        <Section>
          <div className="article">
            <DetailSkeleton />
          </div>
        </Section>
      }
    >
      <ArticleBody params={params} />
    </Suspense>
  );
}

async function ArticleBody({ params }: Pick<PageProps<"/[lang]/resources/[slug]">, "params">) {
  const { slug } = await params;
  const [{ getArticle, relatedArticles }, m] = await Promise.all([getData(), getMessages()]);
  const article = getArticle(slug);
  if (!article) notFound();
  const t = m.resourcesPage;

  return (
    <>
      <Section>
        <article className="article">
          <Link href={routes.resources} className="back-link">
            <Arrow /> {t.back}
          </Link>
          <p className="article__cat">{article.category}</p>
          <h1>{article.title}</h1>
          {article.image && (
            <div className="article__cover">
              <Image src={article.image} alt="" fill loading="eager" fetchPriority="high" sizes="(max-width: 860px) 100vw, 800px" />
            </div>
          )}
          <Prose html={article.html} />
        </article>
      </Section>

      <Section tone="tint">
        <SectionIntro eyebrow={t.relatedEyebrow} title={t.relatedTitle} />
        <PostGrid posts={relatedArticles(slug).map(toArticleSummary)} />
      </Section>
    </>
  );
}

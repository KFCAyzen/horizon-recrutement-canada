import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Section, SectionIntro } from "@/components/blocks/Section";
import { Prose } from "@/components/blocks/Prose";
import { PostGrid } from "@/components/blocks/PostGrid";
import { DetailSkeleton } from "@/components/blocks/Skeleton";
import { Arrow } from "@/components/Arrow";
import { articles, getArticle, relatedArticles, toArticleSummary } from "@/lib/data";
import { routes } from "@/lib/site";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const article = getArticle((await params).slug);
  return article ? { title: article.title, description: article.excerpt } : { title: "Article not found" };
}

export default function ArticlePage({ params }: PageProps<"/resources/[slug]">) {
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

async function ArticleBody({ params }: Pick<PageProps<"/resources/[slug]">, "params">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <Section>
        <article className="article">
          <Link href={routes.resources} className="back-link">
            <Arrow /> All resources
          </Link>
          <p className="article__cat">{article.category}</p>
          <h1>{article.title}</h1>
          {article.image && (
            <div className="article__cover">
              <Image src={article.image} alt="" fill preload sizes="(max-width: 860px) 100vw, 800px" />
            </div>
          )}
          <Prose html={article.html} />
        </article>
      </Section>

      <Section tone="tint">
        <SectionIntro eyebrow="Blog and resources" title="A host of resources to help guide you" />
        <PostGrid posts={relatedArticles(slug).map(toArticleSummary)} />
      </Section>
    </>
  );
}

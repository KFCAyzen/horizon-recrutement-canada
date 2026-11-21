import Link from "next/link";
import type { ArticleSummary } from "@/lib/data";
import { routes } from "@/lib/site";

/** Homepage teaser: title-only cards, as on the original. */
export function Blog({ posts }: { posts: ArticleSummary[] }) {
  return (
    <section className="blog">
      <div className="container">
        <p className="eyebrow">Blog and resources</p>
        <h2 className="h2">
          A multitude of resources
          <br />
          to better guide you
        </h2>
        <div className="blog__grid">
          {posts.map((post) => (
            <Link href={`${routes.resources}/${post.slug}`} className="post" key={post.slug}>
              <span>{post.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

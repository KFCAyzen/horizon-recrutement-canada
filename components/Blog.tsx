import Image from "next/image";
import Link from "next/link";
import type { ArticleSummary } from "@/lib/data";
import { routes } from "@/lib/site";

/** Homepage teaser: photo + title cards. */
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
              <div className="post__media">
                {post.image && (
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 991px) 50vw, 360px"
                  />
                )}
              </div>
              <span className="post__title">{post.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

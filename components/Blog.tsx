import Image from "next/image";
import type { ArticleSummary } from "@/lib/data";
import { routes } from "@/lib/site";
import { getMessages } from "@/lib/i18n/server";
import Link from "./Link";

/** Homepage teaser: photo + title cards. */
export async function Blog({ posts }: { posts: ArticleSummary[] }) {
  const t = (await getMessages()).home.blog;
  return (
    <section className="blog">
      <div className="container">
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 className="h2">
          {t.titleLine1}
          <br />
          {t.titleLine2}
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

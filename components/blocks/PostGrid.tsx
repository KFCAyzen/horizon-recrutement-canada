import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/site";

export type PostSummary = {
  slug: string;
  title: string;
  category: string;
  image: string | null;
};

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link href={`${routes.resources}/${post.slug}`} className="post-card">
      <div className="post-card__media">
        {post.image && (
          <Image src={post.image} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 991px) 50vw, 360px" />
        )}
      </div>
      <div className="post-card__body">
        <p className="post-card__cat">{post.category}</p>
        <h3>{post.title}</h3>
      </div>
    </Link>
  );
}

export function PostGrid({ posts }: { posts: PostSummary[] }) {
  return (
    <div className="post-grid">
      {posts.map((p) => (
        <PostCard key={p.slug} post={p} />
      ))}
    </div>
  );
}

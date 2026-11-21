import { posts } from "@/lib/content";

export function Blog() {
  return (
    <section className="blog" id="blog">
      <div className="container">
        <p className="eyebrow">Blog and resources</p>
        <h2 className="h2">
          A multitude of resources
          <br />
          to better guide you
        </h2>
        <div className="blog__grid">
          {posts.map((title) => (
            <a href="#" className="post" key={title}>
              <span>{title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

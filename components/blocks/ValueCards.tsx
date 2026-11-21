import type { Value } from "@/lib/content";

export function ValueCards({ items }: { items: Value[] }) {
  return (
    <div className="values">
      {items.map((item) => (
        <article className="value" key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </article>
      ))}
    </div>
  );
}

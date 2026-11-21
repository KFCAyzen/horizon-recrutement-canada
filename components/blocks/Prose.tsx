/**
 * Renders CMS rich text. The HTML in /data was rebuilt from an allow-list of
 * tags (h2–h4, p, lists, strong/em, a[href], br, blockquote) when scraped,
 * so it carries no scripts, styles, event handlers or other attributes.
 */
export function Prose({ html, size = "md" }: { html: string; size?: "md" | "sm" }) {
  return (
    <div
      className={`prose${size === "sm" ? " prose--sm" : ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

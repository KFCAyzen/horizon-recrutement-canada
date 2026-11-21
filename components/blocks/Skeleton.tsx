/** Lightweight placeholder shown while URL-dependent content streams in. */
export function DetailSkeleton() {
  return (
    <div className="skeleton" aria-busy="true" aria-label="Loading">
      <div className="skeleton__line skeleton__line--sm" />
      <div className="skeleton__line skeleton__line--lg" />
      <div className="skeleton__line" />
      <div className="skeleton__line" />
      <div className="skeleton__line skeleton__line--md" />
    </div>
  );
}

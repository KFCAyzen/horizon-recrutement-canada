"use client";

import { useI18n } from "@/lib/i18n/client";

/** Lightweight placeholder shown while URL-dependent content streams in. */
export function DetailSkeleton() {
  const { m } = useI18n();
  return (
    <div className="skeleton" aria-busy="true" aria-label={m.common.loading}>
      <div className="skeleton__line skeleton__line--sm" />
      <div className="skeleton__line skeleton__line--lg" />
      <div className="skeleton__line" />
      <div className="skeleton__line" />
      <div className="skeleton__line skeleton__line--md" />
    </div>
  );
}

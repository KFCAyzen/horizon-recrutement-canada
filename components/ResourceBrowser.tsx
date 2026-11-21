"use client";

import { useMemo, useState } from "react";
import type { ArticleSummary } from "@/lib/data";
import { useI18n } from "@/lib/i18n/client";
import { FilterSidebar } from "./FilterSidebar";
import { PostGrid } from "./blocks/PostGrid";

export function ResourceBrowser({ articles, categories }: { articles: ArticleSummary[]; categories: string[] }) {
  const t = useI18n().m.resourcesUi;
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter(
      (a) =>
        (!q || a.title.toLowerCase().includes(q)) &&
        (selected.length === 0 || selected.includes(a.category))
    );
  }, [articles, query, selected]);

  return (
    <div className="browser">
      <FilterSidebar
        search={query}
        onSearch={setQuery}
        searchLabel={t.searchLabel}
        groups={[{ label: t.category, options: categories, selected, onChange: setSelected }]}
        onReset={() => {
          setQuery("");
          setSelected([]);
        }}
      />

      <div>
        <h2 className="sr-only">{t.heading}</h2>
        <p className="results__count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? t.one : t.many}
        </p>
        {filtered.length > 0 ? (
          <PostGrid posts={filtered} />
        ) : (
          <p className="results__empty">{t.empty}</p>
        )}
      </div>
    </div>
  );
}

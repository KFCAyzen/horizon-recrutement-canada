"use client";

import { useId } from "react";
import { useI18n } from "@/lib/i18n/client";

type Group = {
  label: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
};

/** Sticky filter panel: one search box plus any number of checkbox groups. */
export function FilterSidebar({
  search,
  onSearch,
  searchLabel,
  groups,
  onReset,
}: {
  search: string;
  onSearch: (v: string) => void;
  searchLabel: string;
  groups: Group[];
  onReset: () => void;
}) {
  const t = useI18n().m.filters;
  const id = useId();
  const active = search !== "" || groups.some((g) => g.selected.length > 0);

  return (
    <aside className="filters" aria-label={t.aria}>
      <p className="filters__title">{t.title}</p>

      <div className="filters__group">
        <label className="filters__label" htmlFor={`${id}-q`}>
          {searchLabel}
        </label>
        <input
          id={`${id}-q`}
          type="search"
          placeholder={t.searchPlaceholder}
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {groups.map((g) => (
        <fieldset className="filters__group" key={g.label}>
          <legend className="filters__label">{g.label}</legend>
          <div className="filters__checks">
            {g.options.map((opt) => (
              <label className="check" key={opt}>
                <input
                  type="checkbox"
                  checked={g.selected.includes(opt)}
                  onChange={(e) =>
                    g.onChange(e.target.checked ? [...g.selected, opt] : g.selected.filter((s) => s !== opt))
                  }
                />
                {opt}
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      {active && (
        <button type="button" className="filters__reset" onClick={onReset}>
          {t.clear}
        </button>
      )}
    </aside>
  );
}

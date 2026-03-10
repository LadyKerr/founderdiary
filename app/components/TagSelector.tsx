"use client";

import { Tag, TAGS } from "../lib/types";

interface TagSelectorProps {
  selected: Tag[];
  onToggle: (tag: Tag) => void;
}

export default function TagSelector({ selected, onToggle }: TagSelectorProps) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-[var(--text-3)]">
        Tags
      </label>
      <div className="flex flex-wrap gap-2">
        {TAGS.map((tag) => {
          const isSelected = selected.includes(tag.value);
          return (
            <button
              key={tag.value}
              type="button"
              onClick={() => onToggle(tag.value)}
              className="rounded-lg border px-3 py-1.5 text-sm transition-all"
              style={{
                borderColor: isSelected
                  ? `var(--color-${tag.value})`
                  : "var(--border-strong)",
                backgroundColor: isSelected
                  ? `color-mix(in srgb, var(--color-${tag.value}) 15%, transparent)`
                  : "transparent",
                color: isSelected
                  ? `var(--color-${tag.value})`
                  : "var(--text-3)",
              }}
            >
              {tag.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

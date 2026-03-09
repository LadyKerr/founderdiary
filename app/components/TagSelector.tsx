"use client";

import { Tag, TAGS } from "../lib/types";

interface TagSelectorProps {
  selected: Tag[];
  onToggle: (tag: Tag) => void;
}

export default function TagSelector({ selected, onToggle }: TagSelectorProps) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-neutral-500">
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
                borderColor: isSelected ? tag.color : "#404040",
                backgroundColor: isSelected ? `${tag.color}15` : "transparent",
                color: isSelected ? tag.color : "#a3a3a3",
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

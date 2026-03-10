"use client";

import { Mood, MOODS } from "../lib/types";

interface MoodSelectorProps {
  selected: Mood | null;
  onSelect: (mood: Mood) => void;
}

export default function MoodSelector({ selected, onSelect }: MoodSelectorProps) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-[var(--text-3)]">
        Mood
      </label>
      <div className="flex flex-wrap gap-2">
        {MOODS.map((mood) => (
          <button
            key={mood.value}
            type="button"
            onClick={() => onSelect(mood.value)}
            className="rounded-lg border px-3 py-1.5 text-sm transition-all"
            style={{
              borderColor:
                selected === mood.value ? "var(--mint)" : "var(--border-strong)",
              backgroundColor:
                selected === mood.value
                  ? "color-mix(in srgb, var(--mint) 10%, transparent)"
                  : "transparent",
              color:
                selected === mood.value ? "var(--mint)" : "var(--text-3)",
            }}
          >
            <span className="mr-1.5">{mood.emoji}</span>
            {mood.label}
          </button>
        ))}
      </div>
    </div>
  );
}

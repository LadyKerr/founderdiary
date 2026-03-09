"use client";

import { Mood, MOODS } from "../lib/types";

interface MoodSelectorProps {
  selected: Mood | null;
  onSelect: (mood: Mood) => void;
}

export default function MoodSelector({ selected, onSelect }: MoodSelectorProps) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-neutral-500">
        Mood
      </label>
      <div className="flex flex-wrap gap-2">
        {MOODS.map((mood) => (
          <button
            key={mood.value}
            type="button"
            onClick={() => onSelect(mood.value)}
            className={`rounded-lg border px-3 py-1.5 text-sm transition-all ${
              selected === mood.value
                ? "border-[#adf296] bg-[#adf296]/10 text-[#adf296]"
                : "border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-neutral-300"
            }`}
          >
            <span className="mr-1.5">{mood.emoji}</span>
            {mood.label}
          </button>
        ))}
      </div>
    </div>
  );
}

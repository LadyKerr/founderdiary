"use client";

import { DiaryEntry } from "../lib/types";
import { calculateStreak, getWeeklyCount, getTopMood } from "../lib/utils";

interface StatsBarProps {
  entries: DiaryEntry[];
}

export default function StatsBar({ entries }: StatsBarProps) {
  const streak = calculateStreak(entries);
  const weeklyCount = getWeeklyCount(entries);
  const topMood = getTopMood(entries);

  return (
    <div className="mb-8 grid grid-cols-3 gap-4">
      <div className="rounded-xl border border-neutral-800 bg-[#111111] p-4">
        <p className="text-xs uppercase tracking-widest text-neutral-500">
          Streak
        </p>
        <p className="mt-1 text-2xl font-bold text-[#adf296]">
          {streak}
          <span className="ml-1 text-sm font-normal text-neutral-500">
            {streak === 1 ? "day" : "days"}
          </span>
        </p>
      </div>
      <div className="rounded-xl border border-neutral-800 bg-[#111111] p-4">
        <p className="text-xs uppercase tracking-widest text-neutral-500">
          This Week
        </p>
        <p className="mt-1 text-2xl font-bold text-[#96c7f2]">
          {weeklyCount}
          <span className="ml-1 text-sm font-normal text-neutral-500">
            {weeklyCount === 1 ? "entry" : "entries"}
          </span>
        </p>
      </div>
      <div className="rounded-xl border border-neutral-800 bg-[#111111] p-4">
        <p className="text-xs uppercase tracking-widest text-neutral-500">
          Top Mood
        </p>
        <p className="mt-1 text-2xl font-bold">
          {topMood ? (
            <>
              <span>{topMood.emoji}</span>
              <span className="ml-2 text-sm font-normal text-neutral-400">
                {topMood.label}
              </span>
            </>
          ) : (
            <span className="text-sm font-normal text-neutral-600">
              No entries yet
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

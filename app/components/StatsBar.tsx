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
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
        <p className="text-xs uppercase tracking-widest text-[var(--text-3)]">
          Streak
        </p>
        <p className="mt-1 text-2xl font-bold text-[var(--mint)]">
          {streak}
          <span className="ml-1 text-sm font-normal text-[var(--text-3)]">
            {streak === 1 ? "day" : "days"}
          </span>
        </p>
      </div>
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
        <p className="text-xs uppercase tracking-widest text-[var(--text-3)]">
          This Week
        </p>
        <p className="mt-1 text-2xl font-bold text-[var(--blue)]">
          {weeklyCount}
          <span className="ml-1 text-sm font-normal text-[var(--text-3)]">
            {weeklyCount === 1 ? "entry" : "entries"}
          </span>
        </p>
      </div>
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
        <p className="text-xs uppercase tracking-widest text-[var(--text-3)]">
          Top Mood
        </p>
        <p className="mt-1 text-2xl font-bold">
          {topMood ? (
            <>
              <span>{topMood.emoji}</span>
              <span className="ml-2 text-sm font-normal text-[var(--text-2)]">
                {topMood.label}
              </span>
            </>
          ) : (
            <span className="text-sm font-normal text-[var(--text-4)]">
              No entries yet
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

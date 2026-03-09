import { DiaryEntry, Mood, MOODS } from "./types";

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

export function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function calculateStreak(entries: DiaryEntry[]): number {
  if (entries.length === 0) return 0;

  const dates = [...new Set(entries.map((e) => e.date))].sort().reverse();
  const today = getTodayDate();
  const yesterday = new Date(Date.now() - 86400000)
    .toISOString()
    .split("T")[0];

  if (dates[0] !== today && dates[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1] + "T00:00:00");
    const curr = new Date(dates[i] + "T00:00:00");
    const diffDays = Math.round(
      (prev.getTime() - curr.getTime()) / 86400000
    );
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

export function getWeeklyCount(entries: DiaryEntry[]): number {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 86400000);
  const weekAgoStr = weekAgo.toISOString().split("T")[0];
  return entries.filter((e) => e.date >= weekAgoStr).length;
}

export function getTopMood(
  entries: DiaryEntry[]
): { mood: Mood; label: string; emoji: string } | null {
  if (entries.length === 0) return null;

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 86400000);
  const weekAgoStr = weekAgo.toISOString().split("T")[0];
  const recentEntries = entries.filter((e) => e.date >= weekAgoStr);

  if (recentEntries.length === 0) return null;

  const moodCounts: Record<string, number> = {};
  recentEntries.forEach((e) => {
    moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1;
  });

  const topMoodValue = Object.entries(moodCounts).sort(
    (a, b) => b[1] - a[1]
  )[0][0] as Mood;
  const found = MOODS.find((m) => m.value === topMoodValue);
  if (!found) return null;
  return { mood: found.value, label: found.label, emoji: found.emoji };
}

export function sortEntries(entries: DiaryEntry[]): DiaryEntry[] {
  return [...entries].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

import { DiaryEntry } from "./types";

const STORAGE_KEY = "founder-diary-entries";

export function getEntries(): DiaryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveEntries(entries: DiaryEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function addEntry(entry: DiaryEntry): DiaryEntry[] {
  const entries = getEntries();
  entries.unshift(entry);
  saveEntries(entries);
  return entries;
}

export function deleteEntry(id: string): DiaryEntry[] {
  const entries = getEntries().filter((e) => e.id !== id);
  saveEntries(entries);
  return entries;
}

export function togglePin(id: string): DiaryEntry[] {
  const entries = getEntries().map((e) =>
    e.id === id ? { ...e, pinned: !e.pinned } : e
  );
  saveEntries(entries);
  return entries;
}

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { DiaryEntry, Tag, TAGS } from "./lib/types";
import {
  getEntries,
  addEntry,
  deleteEntry as removeEntry,
  togglePin as toggleEntryPin,
} from "./lib/storage";
import { sortEntries } from "./lib/utils";
import Header from "./components/Header";
import StatsBar from "./components/StatsBar";
import EntryForm from "./components/EntryForm";
import EntryCard from "./components/EntryCard";
import EntryDetail from "./components/EntryDetail";
import Toast from "./components/Toast";
import EmptyState from "./components/EmptyState";

export default function Home() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTag, setFilterTag] = useState<Tag | null>(null);
  const [toast, setToast] = useState({ message: "", visible: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setEntries(getEntries());
    setMounted(true);
  }, []);

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
  }, []);

  const hideToast = useCallback(() => {
    setToast({ message: "", visible: false });
  }, []);

  const handleSave = useCallback(
    (entry: DiaryEntry) => {
      const updated = addEntry(entry);
      setEntries(updated);
      setShowForm(false);
      showToast("Entry saved ✓");
    },
    [showToast]
  );

  const handleDelete = useCallback(
    (id: string) => {
      const updated = removeEntry(id);
      setEntries(updated);
      showToast("Entry deleted");
    },
    [showToast]
  );

  const handlePin = useCallback((id: string) => {
    const updated = toggleEntryPin(id);
    setEntries(updated);
  }, []);

  const filteredEntries = useMemo(() => {
    let result = entries;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.body.toLowerCase().includes(q)
      );
    }

    if (filterTag) {
      result = result.filter((e) => e.tags.includes(filterTag));
    }

    return sortEntries(result);
  }, [entries, searchQuery, filterTag]);

  if (!mounted) {
    return (
      <div className="mx-auto min-h-screen max-w-2xl px-6">
        <div className="py-8">
          <div className="h-8 w-40 animate-pulse rounded bg-[var(--border)]" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-6 pb-20">
      <Header
        onNewEntry={() => setShowForm(!showForm)}
        showForm={showForm}
      />

      <StatsBar entries={entries} />

      {showForm && (
        <EntryForm
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      {entries.length > 0 && (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm text-[var(--text-1)] outline-none transition-colors focus:border-[var(--border-strong)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-3)] hover:text-[var(--text-1)]"
              >
                ✕
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setFilterTag(null)}
              className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
                filterTag === null
                  ? "bg-[var(--hover-bg)] text-[var(--text-1)]"
                  : "text-[var(--text-3)] hover:text-[var(--text-1)]"
              }`}
            >
              All
            </button>
            {TAGS.map((tag) => (
              <button
                key={tag.value}
                onClick={() =>
                  setFilterTag(filterTag === tag.value ? null : tag.value)
                }
                className="rounded-md px-2.5 py-1 text-xs transition-colors"
                style={{
                  backgroundColor:
                    filterTag === tag.value
                      ? `color-mix(in srgb, var(--color-${tag.value}) 20%, transparent)`
                      : "transparent",
                  color:
                    filterTag === tag.value
                      ? `var(--color-${tag.value})`
                      : "var(--text-3)",
                }}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {entries.length === 0 && !showForm ? (
        <EmptyState onNewEntry={() => setShowForm(true)} />
      ) : (
        <div className="flex flex-col gap-3">
          {filteredEntries.length === 0 && entries.length > 0 ? (
            <p className="py-12 text-center text-sm text-[var(--text-3)]">
              No entries match your search.
            </p>
          ) : (
            filteredEntries.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                onPin={handlePin}
                onDelete={handleDelete}
                onClick={setSelectedEntry}
              />
            ))
          )}
        </div>
      )}

      {selectedEntry && (
        <EntryDetail
          entry={
            entries.find((e) => e.id === selectedEntry.id) ?? selectedEntry
          }
          onClose={() => setSelectedEntry(null)}
          onPin={handlePin}
          onDelete={handleDelete}
        />
      )}

      <Toast
        message={toast.message}
        visible={toast.visible}
        onHide={hideToast}
      />
    </div>
  );
}

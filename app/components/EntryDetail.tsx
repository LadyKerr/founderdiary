"use client";

import { DiaryEntry, MOODS, TAGS } from "../lib/types";
import { formatDate } from "../lib/utils";

interface EntryDetailProps {
  entry: DiaryEntry;
  onClose: () => void;
  onPin: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function EntryDetail({
  entry,
  onClose,
  onPin,
  onDelete,
}: EntryDetailProps) {
  const moodInfo = MOODS.find((m) => m.value === entry.mood);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              {entry.pinned && <span className="text-sm">📌</span>}
              <h2 className="text-xl font-bold text-[var(--text-1)]">
                {entry.title}
              </h2>
            </div>
            <div className="flex items-center gap-4 text-sm text-[var(--text-3)]">
              <span>{formatDate(entry.date)}</span>
              {moodInfo && (
                <span className="flex items-center gap-1">
                  {moodInfo.emoji} {moodInfo.label}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[var(--text-3)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--text-1)]"
          >
            ✕
          </button>
        </div>

        {entry.body && (
          <div className="mb-6 whitespace-pre-wrap text-sm leading-relaxed text-[var(--text-2)]">
            {entry.body}
          </div>
        )}

        {entry.tags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {entry.tags.map((tagValue) => {
              const tagInfo = TAGS.find((t) => t.value === tagValue);
              return (
                <span
                  key={tagValue}
                  className="rounded-md px-2.5 py-1 text-xs"
                  style={{
                    backgroundColor: `color-mix(in srgb, var(--color-${tagValue}) 15%, transparent)`,
                    color: `var(--color-${tagValue})`,
                  }}
                >
                  {tagInfo?.label ?? tagValue}
                </span>
              );
            })}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
          <span className="text-xs text-[var(--text-4)]">
            Created {new Date(entry.createdAt).toLocaleString()}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onPin(entry.id)}
              className="rounded-lg border border-[var(--border-strong)] px-3 py-1.5 text-sm text-[var(--text-3)] transition-colors hover:border-[var(--yellow)] hover:text-[var(--yellow)]"
            >
              {entry.pinned ? "Unpin" : "Pin"}
            </button>
            <button
              onClick={() => {
                onDelete(entry.id);
                onClose();
              }}
              className="rounded-lg border border-[var(--border-strong)] px-3 py-1.5 text-sm text-[var(--text-3)] transition-colors hover:border-red-400 hover:text-red-400"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

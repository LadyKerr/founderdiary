"use client";

import { DiaryEntry, MOODS, TAGS } from "../lib/types";
import { formatDate } from "../lib/utils";

interface EntryCardProps {
  entry: DiaryEntry;
  onPin: (id: string) => void;
  onDelete: (id: string) => void;
  onClick: (entry: DiaryEntry) => void;
}

export default function EntryCard({
  entry,
  onPin,
  onDelete,
  onClick,
}: EntryCardProps) {
  const moodInfo = MOODS.find((m) => m.value === entry.mood);

  return (
    <article
      className="group cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all hover:border-[var(--border-strong)]"
      onClick={() => onClick(entry)}
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            {entry.pinned && (
              <span className="text-xs text-[var(--yellow)]" title="Pinned">
                📌
              </span>
            )}
            <h3 className="text-base font-semibold text-[var(--text-1)]">
              {entry.title}
            </h3>
          </div>
          <div className="flex items-center gap-3 text-xs text-[var(--text-3)]">
            <span>{formatDate(entry.date)}</span>
            {moodInfo && (
              <span>
                {moodInfo.emoji} {moodInfo.label}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPin(entry.id);
            }}
            className="rounded-md p-1.5 text-xs text-[var(--text-3)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--yellow)]"
            title={entry.pinned ? "Unpin" : "Pin"}
          >
            {entry.pinned ? "📌" : "📍"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(entry.id);
            }}
            className="rounded-md p-1.5 text-xs text-[var(--text-3)] transition-colors hover:bg-[var(--hover-bg)] hover:text-red-400"
            title="Delete"
          >
            🗑
          </button>
        </div>
      </div>

      {entry.body && (
        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-[var(--text-2)]">
          {entry.body}
        </p>
      )}

      {entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {entry.tags.map((tagValue) => {
            const tagInfo = TAGS.find((t) => t.value === tagValue);
            return (
              <span
                key={tagValue}
                className="rounded-md px-2 py-0.5 text-xs"
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
    </article>
  );
}

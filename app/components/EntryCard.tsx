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
      className="group cursor-pointer rounded-xl border border-neutral-800 bg-[#111111] p-5 transition-all hover:border-neutral-700"
      onClick={() => onClick(entry)}
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            {entry.pinned && (
              <span className="text-xs text-[#ffc947]" title="Pinned">
                📌
              </span>
            )}
            <h3 className="text-base font-semibold text-neutral-100">
              {entry.title}
            </h3>
          </div>
          <div className="flex items-center gap-3 text-xs text-neutral-500">
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
            className="rounded-md p-1.5 text-xs text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-[#ffc947]"
            title={entry.pinned ? "Unpin" : "Pin"}
          >
            {entry.pinned ? "📌" : "📍"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(entry.id);
            }}
            className="rounded-md p-1.5 text-xs text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-red-400"
            title="Delete"
          >
            🗑
          </button>
        </div>
      </div>

      {entry.body && (
        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-neutral-400">
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
                  backgroundColor: `${tagInfo?.color ?? "#666"}15`,
                  color: tagInfo?.color ?? "#666",
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

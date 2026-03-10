"use client";

import { useState } from "react";
import { DiaryEntry, Mood, Tag } from "../lib/types";
import { generateId, getTodayDate } from "../lib/utils";
import MoodSelector from "./MoodSelector";
import TagSelector from "./TagSelector";

interface EntryFormProps {
  onSave: (entry: DiaryEntry) => void;
  onCancel: () => void;
}

export default function EntryForm({ onSave, onCancel }: EntryFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState<Mood | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);

  const toggleTag = (tag: Tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !mood) return;

    const entry: DiaryEntry = {
      id: generateId(),
      title: title.trim(),
      body: body.trim(),
      date: getTodayDate(),
      mood,
      tags,
      pinned: false,
      createdAt: new Date().toISOString(),
    };

    onSave(entry);
    setTitle("");
    setBody("");
    setMood(null);
    setTags([]);
  };

  const isValid = title.trim().length > 0 && mood !== null;

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6"
    >
      <div className="mb-4">
        <input
          type="text"
          placeholder="Entry title..."
          value={title}
          onChange={(e) => setTitle(e.target.value.slice(0, 120))}
          maxLength={120}
          className="w-full bg-transparent text-lg font-semibold text-[var(--text-1)] outline-none"
          autoFocus
        />
        <div className="mt-1 text-right text-xs text-[var(--text-4)]">
          {title.length}/120
        </div>
      </div>

      <div className="mb-5">
        <textarea
          placeholder="What's on your mind? What did you ship, learn, or decide today?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          className="w-full resize-none bg-transparent text-sm leading-relaxed text-[var(--text-2)] outline-none"
        />
      </div>

      <div className="mb-5">
        <MoodSelector selected={mood} onSelect={setMood} />
      </div>

      <div className="mb-6">
        <TagSelector selected={tags} onToggle={toggleTag} />
      </div>

      <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
        <span className="text-xs text-[var(--text-3)]">{getTodayDate()}</span>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm text-[var(--text-3)] transition-colors hover:text-[var(--text-1)]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="rounded-lg px-5 py-2 text-sm font-semibold transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
            style={{ backgroundColor: "var(--mint)", color: "var(--background)" }}
          >
            Save Entry
          </button>
        </div>
      </div>
    </form>
  );
}

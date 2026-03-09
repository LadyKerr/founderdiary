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
      className="mb-8 rounded-xl border border-neutral-800 bg-[#111111] p-6"
    >
      <div className="mb-4">
        <input
          type="text"
          placeholder="Entry title..."
          value={title}
          onChange={(e) => setTitle(e.target.value.slice(0, 120))}
          maxLength={120}
          className="w-full bg-transparent text-lg font-semibold text-neutral-100 placeholder-neutral-600 outline-none"
          autoFocus
        />
        <div className="mt-1 text-right text-xs text-neutral-600">
          {title.length}/120
        </div>
      </div>

      <div className="mb-5">
        <textarea
          placeholder="What's on your mind? What did you ship, learn, or decide today?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          className="w-full resize-none bg-transparent text-sm leading-relaxed text-neutral-300 placeholder-neutral-600 outline-none"
        />
      </div>

      <div className="mb-5">
        <MoodSelector selected={mood} onSelect={setMood} />
      </div>

      <div className="mb-6">
        <TagSelector selected={tags} onToggle={toggleTag} />
      </div>

      <div className="flex items-center justify-between border-t border-neutral-800 pt-4">
        <span className="text-xs text-neutral-500">{getTodayDate()}</span>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm text-neutral-400 transition-colors hover:text-neutral-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="rounded-lg bg-[#adf296] px-5 py-2 text-sm font-semibold text-[#0a0a0a] transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
          >
            Save Entry
          </button>
        </div>
      </div>
    </form>
  );
}

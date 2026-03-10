"use client";

import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  onNewEntry: () => void;
  showForm: boolean;
}

export default function Header({ onNewEntry, showForm }: HeaderProps) {
  return (
    <header className="flex items-center justify-between py-8">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[var(--mint)]">
          founder diary
        </h1>
        <p className="mt-1 text-xs text-[var(--text-3)]">
          capture the pulse of what you&apos;re building
        </p>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={onNewEntry}
          className="rounded-lg px-4 py-2 text-sm font-semibold transition-all hover:brightness-110 active:scale-95"
          style={{ backgroundColor: "var(--mint)", color: "var(--background)" }}
        >
          {showForm ? "✕ Close" : "+ New Entry"}
        </button>
      </div>
    </header>
  );
}

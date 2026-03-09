"use client";

interface HeaderProps {
  onNewEntry: () => void;
  showForm: boolean;
}

export default function Header({ onNewEntry, showForm }: HeaderProps) {
  return (
    <header className="flex items-center justify-between py-8">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[#adf296]">
          founder diary
        </h1>
        <p className="mt-1 text-xs text-neutral-500">
          capture the pulse of what you&apos;re building
        </p>
      </div>
      <button
        onClick={onNewEntry}
        className="rounded-lg bg-[#adf296] px-4 py-2 text-sm font-semibold text-[#0a0a0a] transition-all hover:brightness-110 active:scale-95"
      >
        {showForm ? "✕ Close" : "+ New Entry"}
      </button>
    </header>
  );
}

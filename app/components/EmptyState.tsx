"use client";

interface EmptyStateProps {
  onNewEntry: () => void;
}

export default function EmptyState({ onNewEntry }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 text-4xl">📓</div>
      <h2 className="mb-2 text-lg font-semibold text-neutral-200">
        Your diary is empty
      </h2>
      <p className="mb-6 max-w-sm text-sm leading-relaxed text-neutral-500">
        Start capturing your thoughts, decisions, and progress. The best
        founders reflect as they build.
      </p>
      <button
        onClick={onNewEntry}
        className="rounded-lg bg-[#adf296] px-5 py-2.5 text-sm font-semibold text-[#0a0a0a] transition-all hover:brightness-110 active:scale-95"
      >
        + Write Your First Entry
      </button>
    </div>
  );
}

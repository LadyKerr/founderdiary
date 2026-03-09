export type Mood =
  | "locked-in"
  | "energized"
  | "flowing"
  | "grinding"
  | "thinking"
  | "low-energy";

export type Tag =
  | "product"
  | "marketing"
  | "content"
  | "ops"
  | "collab"
  | "personal";

export interface DiaryEntry {
  id: string;
  title: string;
  body: string;
  date: string;
  mood: Mood;
  tags: Tag[];
  pinned: boolean;
  createdAt: string;
}

export const MOODS: { value: Mood; label: string; emoji: string }[] = [
  { value: "locked-in", label: "Locked In", emoji: "🔒" },
  { value: "energized", label: "Energized", emoji: "⚡" },
  { value: "flowing", label: "Flowing", emoji: "🌊" },
  { value: "grinding", label: "Grinding", emoji: "⚙️" },
  { value: "thinking", label: "Thinking", emoji: "🧠" },
  { value: "low-energy", label: "Low Energy", emoji: "🔋" },
];

export const TAGS: { value: Tag; label: string; color: string }[] = [
  { value: "product", label: "Product", color: "#adf296" },
  { value: "marketing", label: "Marketing", color: "#f396e5" },
  { value: "content", label: "Content", color: "#96c7f2" },
  { value: "ops", label: "Ops", color: "#ffc947" },
  { value: "collab", label: "Collab", color: "#f396e5" },
  { value: "personal", label: "Personal", color: "#96c7f2" },
];

import type { AnalysisResult } from "./schema";

export interface HistoryItem {
  id: string;
  createdAt: string;
  jobPreview: string;
  cvText: string;
  jobDescText: string;
  result: AnalysisResult;
}

const STORAGE_KEY = "cv_matcher_history_v1";
const MAX_HISTORY = 5;

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveHistory(
  entry: Omit<HistoryItem, "id" | "createdAt">
): HistoryItem[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const current = getHistory();
    const newItem: HistoryItem = {
      ...entry,
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      createdAt: new Date().toISOString(),
    };

    const updated = [newItem, ...current.filter((item) => item.id !== newItem.id)].slice(0, MAX_HISTORY);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ponytail: ignore storage removal errors
  }
}

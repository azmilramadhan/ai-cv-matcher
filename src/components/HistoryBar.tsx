"use client";

import { Clock, Trash2 } from "lucide-react";
import type { HistoryItem } from "@/lib/history";

interface HistoryBarProps {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

function getScoreBadge(score: number) {
  if (score > 75) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }
  if (score >= 50) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }
  return "border-rose-200 bg-rose-50 text-rose-700";
}

function formatTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  } catch {
    return "--:--";
  }
}

export default function HistoryBar({ items, onSelect, onClear }: HistoryBarProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-3 shadow-none">
      <div className="mb-2 flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
          <Clock className="h-3.5 w-3.5 text-zinc-400" />
          <span>Riwayat Analisis Terakhir</span>
          <span className="font-mono tabular-nums text-[11px] text-zinc-400">
            ({items.length}/5)
          </span>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1 text-xs text-zinc-400 transition hover:text-rose-600"
          title="Hapus semua riwayat"
        >
          <Trash2 className="h-3 w-3" />
          <span>Hapus Riwayat</span>
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {items.map((item) => {
          const badgeClass = getScoreBadge(item.result.matchScore);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item)}
              className="group flex flex-shrink-0 items-center gap-2.5 rounded-lg border border-zinc-200 bg-zinc-50/50 px-3 py-2 text-left transition hover:border-zinc-300 hover:bg-zinc-100"
            >
              <span
                className={`inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-xs font-semibold tabular-nums ${badgeClass}`}
              >
                {item.result.matchScore}%
              </span>
              <div className="flex flex-col">
                <span className="max-w-[180px] truncate text-xs font-medium text-zinc-800 group-hover:text-zinc-900">
                  {item.jobPreview || "Analisis Lowongan"}
                </span>
                <span className="font-mono text-[10px] tabular-nums text-zinc-400">
                  {formatTime(item.createdAt)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

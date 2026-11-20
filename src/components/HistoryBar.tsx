"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import type { HistoryItem } from "@/lib/history";

interface HistoryBarProps {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

function getScoreBadge(score: number) {
  if (score >= 75) {
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
    return `${hours}:${minutes} WIB`;
  } catch {
    return "--:--";
  }
}

export default function HistoryBar({ items, onSelect, onClear }: HistoryBarProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-amber-100 bg-amber-50/40 p-3.5 transition">
      <div className="mb-2.5 flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700">
          <div className="relative h-4 w-4 overflow-hidden rounded-full border border-amber-300 bg-amber-100">
            <Image
              src="/kang-cek.png"
              alt="Kang Cek"
              width={16}
              height={16}
              className="h-full w-full object-cover"
            />
          </div>
          <span>Riwayat Bedahan CV Terakhir Kamu</span>
          <span className="font-mono tabular-nums text-[11px] font-normal text-zinc-500">
            ({items.length} dari 5 tersimpan)
          </span>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs text-zinc-500 transition hover:bg-rose-50 hover:text-rose-600"
          title="Kosongkan semua riwayat bedahan"
        >
          <Trash2 className="h-3 w-3" />
          <span>Bersihkan Riwayat</span>
        </button>
      </div>

      <div className="flex gap-2.5 overflow-x-auto pb-1">
        {items.map((item) => {
          const badgeClass = getScoreBadge(item.result.matchScore);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item)}
              title="Klik buat buka lagi hasil bedahan ini"
              className="group flex flex-shrink-0 items-center gap-2.5 rounded-xl border border-zinc-200/80 bg-white px-3 py-2 text-left shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50/30"
            >
              <span
                className={`inline-flex items-center rounded-lg border px-2 py-0.5 font-mono text-xs font-bold tabular-nums ${badgeClass}`}
              >
                {item.result.matchScore}%
              </span>
              <div className="flex flex-col">
                <span className="max-w-[200px] truncate text-xs font-semibold text-zinc-800 group-hover:text-emerald-700">
                  {item.jobPreview || "Loker Pilihan"}
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

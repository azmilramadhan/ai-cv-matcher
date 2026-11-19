"use client";

import { useState } from "react";
import { Check, Copy, CheckCircle2, XCircle, ArrowRight, Lightbulb } from "lucide-react";
import type { AnalysisResult } from "@/lib/schema";

interface ResultDashboardProps {
  result: AnalysisResult;
}

export default function ResultDashboard({ result }: ResultDashboardProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // ponytail: fallback clipboard if permission denied
    }
  };

  const getScoreColor = (score: number) => {
    if (score > 75) {
      return {
        text: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-950/40",
        border: "border-emerald-200 dark:border-emerald-900/60",
        badge: "bg-emerald-600",
        status: "Kecocokan Tinggi",
      };
    }
    if (score >= 50) {
      return {
        text: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-50 dark:bg-amber-950/40",
        border: "border-amber-200 dark:border-amber-900/60",
        badge: "bg-amber-600",
        status: "Kecocokan Sedang",
      };
    }
    return {
      text: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-950/40",
      border: "border-rose-200 dark:border-rose-900/60",
      badge: "bg-rose-600",
      status: "Kecocokan Rendah",
    };
  };

  const scoreTheme = getScoreColor(result.matchScore);

  return (
    <div className="w-full space-y-6">
      {/* Kartu Skor & Ringkasan */}
      <div
        className={`rounded-2xl border p-6 shadow-sm transition ${scoreTheme.bg} ${scoreTheme.border}`}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-24 w-24 flex-shrink-0 flex-col items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-zinc-900">
              <span className={`text-3xl font-extrabold ${scoreTheme.text}`}>
                {result.matchScore}%
              </span>
              <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                Skor
              </span>
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white">
                <span className={`h-2 w-2 rounded-full ${scoreTheme.badge}`} />
                <span className={scoreTheme.text}>{scoreTheme.status}</span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Ringkasan Evaluasi
              </h3>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {result.summary}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Skills: Matched vs Missing */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Matched Skills */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Skill Cocok ({result.matchedSkills.length})
            </h4>
          </div>
          {result.matchedSkills.length === 0 ? (
            <p className="text-xs text-zinc-500">Tidak ada skill yang terdeteksi cocok.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {result.matchedSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Missing Skills */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-amber-500" />
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Skill Kurang ({result.missingSkills.length})
            </h4>
          </div>
          {result.missingSkills.length === 0 ? (
            <p className="text-xs text-zinc-500">
              Hebat! Tidak ada skill utama yang terlewat.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {result.missingSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Saran Perbaikan Pengalaman */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-5 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-indigo-500" />
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Saran Perbaikan Pengalaman
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Ubah kalimat pasif/deskriptif menjadi kalimat berbasis aksi dan dampak terukur.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {result.improvements.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-4 transition dark:border-zinc-800 dark:bg-zinc-950/40"
            >
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* Sebelum */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                    Sebelum
                  </div>
                  <p className="rounded-lg border border-zinc-200 bg-white p-3 text-xs leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                    &ldquo;{item.original}&rdquo;
                  </p>
                </div>

                {/* Sesudah */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Sesudah (Rekomendasi)
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.improved, idx)}
                      className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 py-1 text-[11px] font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" />
                          <span className="text-emerald-600">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Salin Teks</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-3 text-xs leading-relaxed font-medium text-zinc-900 dark:border-emerald-950 dark:bg-emerald-950/30 dark:text-zinc-100">
                    &ldquo;{item.improved}&rdquo;
                  </p>
                </div>
              </div>

              {/* Alasan */}
              <div className="mt-3 flex items-start gap-2 border-t border-zinc-200 pt-3 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-indigo-500" />
                <span>
                  <strong className="font-medium text-zinc-800 dark:text-zinc-200">
                    Alasan:
                  </strong>{" "}
                  {item.reason}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

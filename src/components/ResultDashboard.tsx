"use client";

import { useState } from "react";
import { Check, Copy, CheckCircle2, AlertOctagon, ArrowRight, FileCheck2 } from "lucide-react";
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

  const getScoreTheme = (score: number) => {
    if (score > 75) {
      return {
        badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
        barClass: "bg-emerald-600",
        textClass: "text-emerald-700",
        status: "Kecocokan Tinggi",
      };
    }
    if (score >= 50) {
      return {
        badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
        barClass: "bg-amber-500",
        textClass: "text-amber-700",
        status: "Kecocokan Menengah",
      };
    }
    return {
      badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
      barClass: "bg-rose-600",
      textClass: "text-rose-700",
      status: "Kecocokan Rendah",
    };
  };

  const theme = getScoreTheme(result.matchScore);

  return (
    <div className="w-full space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Laporan Audit Kecocokan
        </h2>
        <span className="font-mono text-xs tabular-nums text-zinc-400">
          Status: Selesai Dievaluasi
        </span>
      </div>

      {/* Grid Asimetris: Skor (Kiri) & Ringkasan (Kanan) */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Kartu Skor Kiri */}
        <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 lg:col-span-4">
          <div className="space-y-3">
            <span className="text-xs font-medium text-zinc-500">Skor Keselarasan</span>
            <div className="flex items-baseline gap-2">
              <span className={`font-mono text-5xl font-bold tracking-tight tabular-nums ${theme.textClass}`}>
                {result.matchScore}
              </span>
              <span className="font-mono text-2xl font-medium text-zinc-400">/ 100</span>
            </div>
            <div className="w-full rounded-full bg-zinc-100 p-0.5">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${theme.barClass}`}
                style={{ width: `${Math.min(Math.max(result.matchScore, 0), 100)}%` }}
              />
            </div>
          </div>

          <div className="pt-5">
            <span
              className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${theme.badgeClass}`}
            >
              {theme.status}
            </span>
          </div>
        </div>

        {/* Kartu Ringkasan Kanan */}
        <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 lg:col-span-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileCheck2 className="h-4 w-4 text-zinc-600" />
              <h3 className="text-sm font-semibold text-zinc-900">
                Ringkasan Evaluasi Rekruter
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-zinc-700">
              {result.summary}
            </p>
          </div>
          <div className="border-t border-zinc-100 pt-4">
            <p className="text-[11px] text-zinc-400">
              Evaluasi objektif berbasis perbandingan kata kunci, kedalaman tanggung jawab, dan persyaratan lowongan.
            </p>
          </div>
        </div>
      </div>

      {/* Matriks Skills: Matched vs Missing */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Matched Skills */}
        <div className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between border-b border-zinc-100 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <h4 className="text-sm font-semibold text-zinc-900">
                Skill Teridentifikasi Cocok
              </h4>
            </div>
            <span className="font-mono text-xs font-semibold tabular-nums text-emerald-700">
              {result.matchedSkills.length}
            </span>
          </div>
          {result.matchedSkills.length === 0 ? (
            <p className="text-xs text-zinc-400">Tidak ada skill yang terdeteksi cocok.</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {result.matchedSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-md border border-emerald-200 bg-emerald-50/70 px-2.5 py-1 text-xs font-medium text-emerald-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Missing Skills */}
        <div className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between border-b border-zinc-100 pb-3">
            <div className="flex items-center gap-2">
              <AlertOctagon className="h-4 w-4 text-rose-600" />
              <h4 className="text-sm font-semibold text-zinc-900">
                Skill Belum Terlihat di CV
              </h4>
            </div>
            <span className="font-mono text-xs font-semibold tabular-nums text-rose-700">
              {result.missingSkills.length}
            </span>
          </div>
          {result.missingSkills.length === 0 ? (
            <p className="text-xs text-zinc-500">
              Semua kualifikasi utama lowongan sudah tercakup di CV Anda.
            </p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {result.missingSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-md border border-rose-200 bg-rose-50/70 px-2.5 py-1 text-xs font-medium text-rose-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Saran Perbaikan Pengalaman (Before vs After) */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <div className="mb-5 border-b border-zinc-100 pb-3">
          <h4 className="text-sm font-semibold text-zinc-900">
            Saran Revisi Kalimat Pengalaman
          </h4>
          <p className="mt-0.5 text-xs text-zinc-500">
            Perbandingan kalimat asli CV dengan rumusan berbasis tindakan dan hasil metrik terukur.
          </p>
        </div>

        <div className="space-y-4">
          {result.improvements.map((item, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-zinc-200 bg-zinc-50/50 p-4"
            >
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* Sebelum */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                    Sebelum (Asli dari CV)
                  </div>
                  <p className="rounded-md border border-zinc-200 bg-white p-3 text-xs leading-relaxed text-zinc-600">
                    &ldquo;{item.original}&rdquo;
                  </p>
                </div>

                {/* Sesudah */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                      Sesudah (Rekomendasi Berorientasi Metrik)
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.improved, idx)}
                      className="inline-flex items-center gap-1 rounded border border-zinc-200 bg-white px-2 py-0.5 text-[11px] font-medium text-zinc-700 transition hover:bg-zinc-100"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" />
                          <span className="text-emerald-700 font-medium">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 text-zinc-500" />
                          <span>Salin Teks</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="rounded-md border border-emerald-200 bg-emerald-50/50 p-3 text-xs font-medium leading-relaxed text-zinc-900">
                    &ldquo;{item.improved}&rdquo;
                  </p>
                </div>
              </div>

              {/* Alasan */}
              <div className="mt-3 flex items-start gap-2 border-t border-zinc-200/80 pt-3 text-xs text-zinc-600">
                <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-zinc-400" />
                <span>
                  <strong className="font-medium text-zinc-900">Alasan:</strong> {item.reason}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


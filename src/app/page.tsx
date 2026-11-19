"use client";

import { useState } from "react";
import { FileSearch, ShieldCheck, AlertTriangle } from "lucide-react";
import InputSection from "@/components/InputSection";
import ResultDashboard from "@/components/ResultDashboard";
import type { AnalysisResult } from "@/lib/schema";

export default function Home() {
  const [cvText, setCvText] = useState("");
  const [jobDescText, setJobDescText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText, jobDescText }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Terjadi kesalahan saat menghubungi server.");
      }

      setResult(data as AnalysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan tidak terduga.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <FileSearch className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                AI CV & Job Desc Matcher
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Evaluasi kecocokan CV dengan lowongan secara instan menggunakan AI.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            Data CV Anda tidak disimpan di server.
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="mx-auto max-w-5xl space-y-8 px-5 py-8">
        <InputSection
          cvText={cvText}
          jobDescText={jobDescText}
          setCvText={setCvText}
          setJobDescText={setJobDescText}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
        />

        {/* Error Alert */}
        {error && (
          <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 shadow-sm dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Analisis Gagal</p>
              <p className="mt-0.5 text-xs opacity-80">{error}</p>
            </div>
          </div>
        )}

        {/* Hasil */}
        {result && <ResultDashboard result={result} />}
      </main>
    </div>
  );
}

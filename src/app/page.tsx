"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ShieldCheck, AlertCircle } from "lucide-react";
import InputSection from "@/components/InputSection";
import ResultDashboard from "@/components/ResultDashboard";
import HistoryBar from "@/components/HistoryBar";
import Header from "@/components/Header";
import type { AnalysisResult } from "@/lib/schema";
import { getHistory, saveHistory, clearHistory, type HistoryItem } from "@/lib/history";

export default function Home() {
  const [cvText, setCvText] = useState("");
  const [jobDescText, setJobDescText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  // ponytail: read localStorage only on client mount to avoid React hydration mismatch
  useEffect(() => {
    setHistoryItems(getHistory());
  }, []);

  const handleSelectHistory = (item: HistoryItem) => {
    setCvText(item.cvText);
    setJobDescText(item.jobDescText);
    setResult(item.result);
    setError(null);
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistoryItems([]);
  };

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

      const analysisResult = data as AnalysisResult;
      setResult(analysisResult);

      // Save to localStorage history
      const jobPreview = jobDescText.trim().replace(/\s+/g, " ").slice(0, 50);
      const updatedHistory = saveHistory({
        jobPreview,
        cvText,
        jobDescText,
        result: analysisResult,
      });
      setHistoryItems(updatedHistory);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan tidak terduga.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Top Navbar Minimalis */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-amber-300 bg-amber-100">
              <Image
                src="/kang-cek.png"
                alt="Kang Cek"
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight text-zinc-900">
                Kang Cek <span className="font-normal text-zinc-400">|</span> AI CV Matcher
              </h1>
              <p className="text-[11px] text-zinc-500">
                Bedah keselarasan CV dengan lowongan incaranmu secara instan.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-800">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Client-Side PDF &amp; Zero-Storage Privacy</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-5xl space-y-6 px-5 py-6">
        {/* Banner Hero Kang Cek */}
        <Header />

        {/* Strip Riwayat Analisis */}
        <HistoryBar
          items={historyItems}
          onSelect={handleSelectHistory}
          onClear={handleClearHistory}
        />

        {/* Input Form */}
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
          <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-800">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-600" />
            <div>
              <p className="font-bold text-rose-900">Waduh, Kang Cek Belum Bisa Bedah CV Kamu Nih</p>
              <p className="mt-0.5 text-rose-700">{error}</p>
            </div>
          </div>
        )}

        {/* Dashboard Hasil Analisis */}
        {result && <ResultDashboard result={result} />}
      </main>
    </div>
  );
}


"use client";

import { FileText, Briefcase, Sparkles, RotateCcw, Loader2 } from "lucide-react";
import { SAMPLE_CV, SAMPLE_JOB_DESC } from "@/lib/sample-data";

interface InputSectionProps {
  cvText: string;
  jobDescText: string;
  setCvText: (text: string) => void;
  setJobDescText: (text: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const MAX_CHARS = 10000;

export default function InputSection({
  cvText,
  jobDescText,
  setCvText,
  setJobDescText,
  onAnalyze,
  isLoading,
}: InputSectionProps) {
  const handleLoadSample = () => {
    setCvText(SAMPLE_CV);
    setJobDescText(SAMPLE_JOB_DESC);
  };

  const handleReset = () => {
    setCvText("");
    setJobDescText("");
  };

  const isOverLimit = cvText.length > MAX_CHARS || jobDescText.length > MAX_CHARS;
  const canAnalyze =
    cvText.trim().length > 0 &&
    jobDescText.trim().length > 0 &&
    !isOverLimit &&
    !isLoading;

  return (
    <section className="w-full space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Input Dokumen
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadSample}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            Isi Contoh Data
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading || (!cvText && !jobDescText)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <RotateCcw className="h-3.5 w-3.5 text-zinc-500" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="cv-input"
            className="flex items-center gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-200"
          >
            <FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            Teks CV Anda
          </label>
          <div className="relative">
            <textarea
              id="cv-input"
              rows={12}
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              placeholder="Tempelkan isi CV Anda di sini (teks biasa)..."
              disabled={isLoading}
              className={`w-full resize-y rounded-xl border bg-white p-3.5 text-sm text-zinc-900 shadow-sm transition focus:outline-none focus:ring-2 disabled:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-100 dark:disabled:bg-zinc-950 ${
                cvText.length > MAX_CHARS
                  ? "border-rose-500 focus:ring-rose-500/20"
                  : "border-zinc-200 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-zinc-800"
              }`}
            />
          </div>
          <div className="flex justify-end">
            <span
              className={`text-xs ${
                cvText.length > MAX_CHARS
                  ? "font-semibold text-rose-600"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              {cvText.length} / 10.000 karakter
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="job-desc-input"
            className="flex items-center gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-200"
          >
            <Briefcase className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            Deskripsi Pekerjaan (Job Desc)
          </label>
          <div className="relative">
            <textarea
              id="job-desc-input"
              rows={12}
              value={jobDescText}
              onChange={(e) => setJobDescText(e.target.value)}
              placeholder="Tempelkan lowongan / deskripsi pekerjaan di sini..."
              disabled={isLoading}
              className={`w-full resize-y rounded-xl border bg-white p-3.5 text-sm text-zinc-900 shadow-sm transition focus:outline-none focus:ring-2 disabled:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-100 dark:disabled:bg-zinc-950 ${
                jobDescText.length > MAX_CHARS
                  ? "border-rose-500 focus:ring-rose-500/20"
                  : "border-zinc-200 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-zinc-800"
              }`}
            />
          </div>
          <div className="flex justify-end">
            <span
              className={`text-xs ${
                jobDescText.length > MAX_CHARS
                  ? "font-semibold text-rose-600"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              {jobDescText.length} / 10.000 karakter
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onAnalyze}
          disabled={!canAnalyze}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:bg-zinc-300 dark:disabled:bg-zinc-800 sm:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Menganalisis CV...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Analisis Kecocokan
            </>
          )}
        </button>
      </div>
    </section>
  );
}

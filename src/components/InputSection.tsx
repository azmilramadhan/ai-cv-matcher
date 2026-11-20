"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import MascotImage from "@/components/MascotImage";
import {
  FileText,
  Briefcase,
  RotateCcw,
  Loader2,
  FileCheck,
  AlertCircle,
} from "lucide-react";
import { SAMPLE_CV, SAMPLE_JOB_DESC } from "@/lib/sample-data";
import { extractTextFromPdf } from "@/lib/pdf-parser";

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
  const [isExtractingPdf, setIsExtractingPdf] = useState(false);
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [pdfWarning, setPdfWarning] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLoadSample = () => {
    setCvText(SAMPLE_CV);
    setJobDescText(SAMPLE_JOB_DESC);
    setPdfFileName(null);
    setPdfError(null);
    setPdfWarning(null);
  };

  const handleReset = () => {
    setCvText("");
    setJobDescText("");
    setPdfFileName(null);
    setPdfError(null);
    setPdfWarning(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExtractingPdf(true);
    setPdfError(null);
    setPdfWarning(null);

    try {
      const extracted = await extractTextFromPdf(file);
      setPdfFileName(file.name);

      if (extracted.length > MAX_CHARS) {
        setCvText(extracted.slice(0, MAX_CHARS));
        setPdfWarning(
          `Teks PDF (${extracted.length.toLocaleString("id-ID")} karakter) kepanjangan, otomatis dipotong ke 10.000 karakter ya.`
        );
      } else {
        setCvText(extracted);
      }
    } catch (err) {
      setPdfError(err instanceof Error ? err.message : "Gagal membaca file PDF nih. Coba copy paste teksnya langsung ya.");
    } finally {
      setIsExtractingPdf(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const isOverLimit = cvText.length > MAX_CHARS || jobDescText.length > MAX_CHARS;
  const canAnalyze =
    cvText.trim().length > 0 &&
    jobDescText.trim().length > 0 &&
    !isOverLimit &&
    !isLoading &&
    !isExtractingPdf;

  return (
    <section className="w-full space-y-4">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-zinc-800">
            Data CV &amp; Syarat Loker
          </h2>
          <p className="text-xs text-zinc-500">
            Lengkapi kedua data di bawah ini biar Kang Cek bisa bandingin secara akurat.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadSample}
            disabled={isLoading || isExtractingPdf}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-800 disabled:opacity-50"
          >
            <FileText className="h-3.5 w-3.5 text-emerald-600" />
            Coba Contoh CV
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading || isExtractingPdf || (!cvText && !jobDescText)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 disabled:opacity-50"
          >
            <RotateCcw className="h-3.5 w-3.5 text-zinc-400" />
            Kosongkan Form
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Panel CV */}
        <div className="flex flex-col space-y-2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
            <div>
              <label
                htmlFor="cv-input"
                className="flex items-center gap-2 text-sm font-bold text-zinc-900"
              >
                <FileText className="h-4 w-4 text-emerald-600" />
                Teks CV Kamu
              </label>
              <span className="text-[11px] text-zinc-400">Tempel teks atau unggah file PDF</span>
            </div>

            {/* PDF Uploader Button */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                id="pdf-upload-input"
                onChange={handlePdfUpload}
                disabled={isLoading || isExtractingPdf}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading || isExtractingPdf}
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 transition hover:border-emerald-300 hover:bg-emerald-50/50 disabled:opacity-50"
              >
                {isExtractingPdf ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-600" />
                    <span>Membaca file PDF...</span>
                  </>
                ) : (
                  <>
                    <MascotImage
                      src="/mascots/icon-cv-drop.png"
                      alt="Upload PDF"
                      fallbackEmoji="📄"
                      className="h-4 w-4 object-contain"
                    />
                    <span>Upload File PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* PDF Status / Feedback */}
          {pdfFileName && !pdfError && (
            <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs text-emerald-800 border border-emerald-100">
              <FileCheck className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
              <span className="truncate">Berhasil dibaca dari: <strong>{pdfFileName}</strong></span>
            </div>
          )}

          {pdfWarning && (
            <div className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs text-amber-800 border border-amber-200">
              <AlertCircle className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
              <span>{pdfWarning}</span>
            </div>
          )}

          {pdfError && (
            <div className="flex items-center gap-1.5 rounded-lg bg-rose-50 px-2.5 py-1.5 text-xs text-rose-800 border border-rose-200">
              <AlertCircle className="h-3.5 w-3.5 text-rose-600 flex-shrink-0" />
              <span>{pdfError}</span>
            </div>
          )}

          <div className="relative">
            <textarea
              id="cv-input"
              rows={12}
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              placeholder="Tempelkan isi CV kamu di sini... Mulai dari ringkasan diri, skill teknis, pengalaman kerja, sampai riwayat pendidikan."
              disabled={isLoading || isExtractingPdf}
              className={`w-full resize-y rounded-xl border bg-zinc-50/40 p-3.5 text-sm text-zinc-900 transition focus:bg-white focus:outline-none focus:ring-2 disabled:bg-zinc-50 ${
                cvText.length > MAX_CHARS
                  ? "border-rose-400 focus:ring-rose-400"
                  : "border-zinc-200 focus:border-emerald-500 focus:ring-emerald-500/20"
              }`}
            />
          </div>

          <div className="flex justify-end pt-1">
            <span
              className={`font-mono text-xs tabular-nums ${
                cvText.length > MAX_CHARS ? "font-semibold text-rose-600" : "text-zinc-500"
              }`}
            >
              {cvText.length.toLocaleString("id-ID")} / 10.000 karakter
            </span>
          </div>
        </div>

        {/* Panel Job Description */}
        <div className="flex flex-col space-y-2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <div>
              <label
                htmlFor="job-desc-input"
                className="flex items-center gap-2 text-sm font-bold text-zinc-900"
              >
                <Briefcase className="h-4 w-4 text-emerald-600" />
                Syarat Loker Incaran (Job Desc)
              </label>
              <span className="text-[11px] text-zinc-400">Kriteria dan kualifikasi dari pihak HR</span>
            </div>
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600">
              Target Lowongan
            </span>
          </div>

          <div className="relative">
            <textarea
              id="job-desc-input"
              rows={12}
              value={jobDescText}
              onChange={(e) => setJobDescText(e.target.value)}
              placeholder="Tempelkan syarat kerja atau kualifikasi lowongan incaranmu di sini biar Kang Cek bisa bandingin..."
              disabled={isLoading}
              className={`w-full resize-y rounded-xl border bg-zinc-50/40 p-3.5 text-sm text-zinc-900 transition focus:bg-white focus:outline-none focus:ring-2 disabled:bg-zinc-50 ${
                jobDescText.length > MAX_CHARS
                  ? "border-rose-400 focus:ring-rose-400"
                  : "border-zinc-200 focus:border-emerald-500 focus:ring-emerald-500/20"
              }`}
            />
          </div>

          <div className="flex justify-end pt-1">
            <span
              className={`font-mono text-xs tabular-nums ${
                jobDescText.length > MAX_CHARS ? "font-semibold text-rose-600" : "text-zinc-500"
              }`}
            >
              {jobDescText.length.toLocaleString("id-ID")} / 10.000 karakter
            </span>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="flex justify-end pt-1">
        <button
          type="button"
          onClick={onAnalyze}
          disabled={!canAnalyze}
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-zinc-900 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300 sm:w-auto"
        >
          {isLoading ? (
            <>
              <div className="relative h-5 w-5 overflow-hidden rounded-full border border-amber-300 bg-amber-100 animate-spin flex-shrink-0">
                <Image
                  src="/kang-cek.png"
                  alt="Kang Cek"
                  width={20}
                  height={20}
                  className="h-full w-full object-cover"
                />
              </div>
              <span>Lagi dibedah Kang Cek...</span>
            </>
          ) : (
            <>
              <span>Bedah CV Sekarang</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}


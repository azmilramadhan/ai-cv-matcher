"use client";

import { useState, useEffect } from "react";
import MascotImage from "@/components/MascotImage";

const STATUS_MESSAGES = [
  "Kang Cek lagi baca isi CV kamu pelan-pelan...",
  "Mencocokkan skill kamu sama maunya tim HR...",
  "Mencari kata kunci sakti yang masih ketinggalan...",
  "Meracik saran kalimat biar CV-mu makin nendang...",
  "Dikit lagi kelar, lagi finishing laporan nih!",
];

export default function AnalyzingState() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 2500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return prev;
        const jump = Math.floor(Math.random() * 6) + 3;
        return Math.min(prev + jump, 92);
      });
    }, 800);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-emerald-50/90 p-8 shadow-sm my-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Garis Scanner Hijau Berulang */}
      <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-scanline opacity-75 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />

      <div className="flex flex-col items-center justify-center space-y-5 py-4">
        {/* Gambar Maskot Scan dengan Animasi Float */}
        <div className="relative">
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-amber-100 shadow-md">
            <MascotImage
              src="/mascots/kang-cek-scan.png"
              alt="Kang Cek sedang scanning CV"
              fallbackEmoji="🕵️‍♂️"
              className="h-24 w-24 object-contain animate-float"
            />
          </div>
          <span className="absolute -bottom-2 -right-1 rounded-full border border-emerald-300 bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">
            Scanning
          </span>
        </div>

        {/* Teks Status Dinamis Berganti Setiap 2.5 Detik */}
        <div className="max-w-md space-y-2">
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
            Lagi Dibedah Sama Kang Cek
          </span>
          <h3 className="min-h-[3rem] text-lg sm:text-xl font-extrabold text-zinc-900 transition-all duration-300 flex items-center justify-center">
            {STATUS_MESSAGES[messageIndex]}
          </h3>
          <p className="text-xs text-zinc-500">
            Tenang, Kang Cek kerja cepat dan teliti. Jangan refresh halaman ya!
          </p>
        </div>

        {/* Progress Bar Animasi Halus di Bawah Kartu */}
        <div className="w-full max-w-md space-y-1.5 pt-2">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-emerald-200/60">
            <div
              className="h-full rounded-full bg-emerald-600 transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-emerald-700 font-medium px-1">
            <span>Memproses data...</span>
            <span className="tabular-nums">{progress}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}

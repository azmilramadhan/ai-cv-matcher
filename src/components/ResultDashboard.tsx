'use client';

import { useState } from 'react';
import Image from 'next/image';
import MascotImage from '@/components/MascotImage';
import {
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  Flame,
  ThumbsUp,
  Wrench,
} from 'lucide-react';
import { AnalysisResult } from '@/lib/schema';

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
    } catch (err) {
      console.error('Gagal menyalin teks:', err);
    }
  };

  const getScoreFeedback = (score: number) => {
    if (score >= 75) {
      return {
        badge: 'Gacor! Siap Dilamar',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        barColor: 'bg-emerald-500',
        textColor: 'text-emerald-600',
        icon: <Flame className="w-5 h-5 text-emerald-600" />,
      };
    }
    if (score >= 50) {
      return {
        badge: 'Lumayan, Tinggal Poles Dikit',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        barColor: 'bg-amber-500',
        textColor: 'text-amber-600',
        icon: <ThumbsUp className="w-5 h-5 text-amber-600" />,
      };
    }
    return {
      badge: 'Perlu Rombak Dulu Nih',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      barColor: 'bg-rose-500',
      textColor: 'text-rose-600',
      icon: <Wrench className="w-5 h-5 text-rose-600" />,
    };
  };

  const feedback = getScoreFeedback(result.matchScore);

  return (
    <section className="max-w-5xl mx-auto mt-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-zinc-900">
            Hasil Bedah CV ala Kang Cek
          </h2>
          <p className="text-sm text-zinc-600">
            Ini dia kisi-kisi jujur biar CV-mu makin dilirik tim HR.
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border self-start sm:self-auto ${feedback.badgeColor}`}
        >
          {feedback.icon}
          {feedback.badge}
        </span>
      </div>

      {/* Kartu Skor & Ringkasan */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Kolom Skor */}
        <div className="md:col-span-4 bg-white rounded-3xl p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Skor Kecocokan ATS
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span
                  className={`text-5xl font-black font-mono tabular-nums ${feedback.textColor}`}
                >
                  {result.matchScore}
                </span>
                <span className="text-xl font-bold text-zinc-400">/ 100</span>
              </div>
            </div>
            {result.matchScore >= 75 && (
              <div className="relative flex-shrink-0 flex items-center justify-center">
                <MascotImage
                  src="/mascots/kang-cek-gacor.png"
                  alt="Status Skor Kang Cek"
                  fallbackEmoji="🔥"
                  className="h-16 w-16 object-contain animate-float"
                />
              </div>
            )}
          </div>

          <div className="mt-6 space-y-2">
            <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${feedback.barColor}`}
                style={{ width: `${result.matchScore}%` }}
              />
            </div>
            <p className="text-xs text-zinc-500">
              Target aman lolos seleksi awal HR biasanya di angka <strong>75+</strong>.
            </p>
          </div>
        </div>

        {/* Kolom Kata Kang Cek */}
        <div className="md:col-span-8 bg-emerald-50/70 rounded-3xl p-6 flex flex-col justify-center shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="relative h-7 w-7 flex-shrink-0 flex items-center justify-center">
              <Image
                src="/kang-cek.png"
                alt="Kang Cek"
                width={28}
                height={28}
                className="h-full w-full object-contain"
              />
            </div>
            <h3 className="font-bold text-zinc-900 text-base">
              Catatan Jujur dari Kang Cek:
            </h3>
          </div>
          <p className="text-zinc-700 leading-relaxed text-sm md:text-base">
            {result.summary}
          </p>
        </div>
      </div>

      {/* Matriks Skill Cocok vs Kurang */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <div className="bg-white rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-zinc-900">
                Udah Masuk Radar HR ({result.matchedSkills.length})
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Kata kunci & skill ini udah aman terbaca di CV kamu. Pertahankan!
              </p>
            </div>
          </div>

          {result.matchedSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {result.matchedSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-400 italic">
              Belum ada kata kunci spesifik yang cocok terdeteksi.
            </p>
          )}
        </div>

        {/* Missing Skills */}
        <div className="bg-white rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-zinc-900">
                Belum Kelihatan di CV ({result.missingSkills.length})
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Syarat lowongan minta ini, tapi belum tertulis di CV-mu. Kalau emang bisa, wajib tambahin!
              </p>
            </div>
          </div>

          {result.missingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {result.missingSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold"
                >
                  + {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-emerald-600 font-medium">
              Mantap! Semua syarat utama udah tertulis di CV-mu.
            </p>
          )}
        </div>
      </div>

      {/* Saran Perbaikan Kalimat (Before vs After) */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-extrabold text-zinc-900">
            Biar Kalimat CV-mu Makin Nendang
          </h3>
          <p className="text-xs text-zinc-500">
            Klik tombol salin di bawah, lalu langsung tempel buat ganti kalimat lama di CV kamu.
          </p>
        </div>

        <div className="space-y-4">
          {result.improvements.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 space-y-4 shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center">
                {/* Kalimat Lama */}
                <div className="lg:col-span-5 bg-zinc-50 rounded-2xl p-4 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Kalimat Lama (Masih Biasa)
                  </span>
                  <p className="text-sm text-zinc-600 line-through decoration-rose-300">
                    &ldquo;{item.original}&rdquo;
                  </p>
                </div>

                {/* Panah */}
                <div className="lg:col-span-1 flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center rotate-90 lg:rotate-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Kalimat Baru */}
                <div className="lg:col-span-5 bg-emerald-50/60 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                      Versi Upgrade Kang Cek
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.improved, idx)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Tersalin!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Salin Kalimat
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-sm font-medium text-zinc-900">
                    &ldquo;{item.improved}&rdquo;
                  </p>
                </div>
              </div>

              {/* Alasan */}
              <div className="pt-2 border-t border-zinc-100 flex items-start gap-2 text-xs text-zinc-600">
                <span className="font-bold text-amber-600 shrink-0">💡 Kenapa lebih oke?</span>
                <span>{item.reason}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
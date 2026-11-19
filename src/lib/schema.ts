import { z } from 'zod';

export const analysisSchema = z.object({
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe('Skor kecocokan objektif antara 0 hingga 100 berdasarkan kualifikasi wajib.'),
  summary: z
    .string()
    .describe(
      'Evaluasi komprehensif sepanjang 3 kalimat yang menjelaskan kekuatan utama kandidat, celah terbesar, dan peluang lolos tahap ATS.'
    ),
  matchedSkills: z
    .array(z.string())
    .describe(
      'Daftar lengkap seluruh hard skill, teknologi, dan kata kunci dari Job Description yang sudah terbukti ada di dalam CV.'
    ),
  missingSkills: z
    .array(z.string())
    .describe(
      'Daftar lengkap seluruh kualifikasi, tools, atau kata kunci penting di Job Description yang belum tertulis di CV.'
    ),
  improvements: z
    .array(
      z.object({
        original: z
          .string()
          .describe('Kutipan kalimat asli dari bagian pengalaman atau ringkasan CV yang masih pasif atau kurang terukur.'),
        improved: z
          .string()
          .describe(
            'Versi penulisan ulang yang jauh lebih kuat menggunakan kata kerja aktif, kata kunci Job Description, dan estimasi dampak/metrik.'
          ),
        reason: z
          .string()
          .describe('Penjelasan spesifik (1-2 kalimat) mengapa perubahan ini meningkatkan daya tarik di mata rekruter.'),
      })
    )
    .min(3)
    .describe('Wajib berikan tepat 3 hingga 4 saran perbaikan kalimat pengalaman CV yang paling berdampak.'),
});

export type AnalysisResult = z.infer<typeof analysisSchema>;
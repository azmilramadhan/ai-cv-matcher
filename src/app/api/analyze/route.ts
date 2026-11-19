import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { analysisSchema } from '@/lib/schema';

export const maxDuration = 30;

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function runAnalysis(modelId: string, cvText: string, jobDescText: string) {
  return await generateObject({
    model: google(modelId),
    schema: analysisSchema,
    maxRetries: 0,
    abortSignal: AbortSignal.timeout(15000),
    system:
      'Anda adalah Senior Tech Recruiter yang objektif, teliti, dan analitis. Lakukan audit mendalam antara CV kandidat dan Job Description. Ekstrak semua kata kunci yang cocok maupun yang kurang tanpa terlewat, dan berikan minimal 3 saran penulisan ulang poin CV yang konkret dan berdampak. Gunakan bahasa yang sama dengan bahasa pada input.',
    prompt: `CV KANDIDAT:\n${cvText}\n\nDESKRIPSI PEKERJAAN:\n${jobDescText}`,
  });
}

export async function POST(req: Request) {
  const startTime = Date.now();

  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY belum terbaca di server.' },
        { status: 500 }
      );
    }

    const { cvText, jobDescText } = await req.json();

    if (!cvText?.trim() || !jobDescText?.trim()) {
      return NextResponse.json(
        { error: 'Teks CV dan Job Description tidak boleh kosong.' },
        { status: 400 }
      );
    }

    if (cvText.length > 10000 || jobDescText.length > 10000) {
      return NextResponse.json(
        { error: 'Teks melebihi batas maksimal 10.000 karakter.' },
        { status: 400 }
      );
    }

    try {
      const { object } = await runAnalysis('gemini-3.5-flash-lite', cvText, jobDescText);
      console.log(`[Sukses] Primary (lite) selesai dalam ${(Date.now() - startTime) / 1000} detik`);
      return NextResponse.json(object);
    } catch (primaryError) {
      console.warn(
        `[Fallback] Model lite gagal setelah ${(Date.now() - startTime) / 1000} detik. Beralih ke gemini-3.8-flash...`,
        primaryError instanceof Error ? primaryError.message : primaryError
      );

      const { object } = await runAnalysis('gemini-3.8-flash', cvText, jobDescText);
      console.log(`[Sukses] Fallback (3.8-flash) selesai dalam ${(Date.now() - startTime) / 1000} detik`);
      return NextResponse.json(object);
    }
  } catch (error: unknown) {
    console.error(`[Gagal Total] Setelah ${(Date.now() - startTime) / 1000} detik:`, error);
    return NextResponse.json(
      { error: 'Server AI sedang sibuk. Silakan klik Analisis Kecocokan sekali lagi.' },
      { status: 503 }
    );
  }
}
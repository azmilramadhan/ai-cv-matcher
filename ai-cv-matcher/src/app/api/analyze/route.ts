import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { analysisSchema } from "@/lib/schema";

const MAX_CHARS = 10000;

export async function POST(req: Request) {
  try {
    const { cvText, jobDescText } = await req.json();

    if (
      typeof cvText !== "string" ||
      typeof jobDescText !== "string" ||
      !cvText.trim() ||
      !jobDescText.trim() ||
      cvText.length > MAX_CHARS ||
      jobDescText.length > MAX_CHARS
    ) {
      return NextResponse.json(
        { error: "cvText dan jobDescText wajib diisi dan maksimal 10.000 karakter." },
        { status: 400 }
      );
    }

    const { object } = await generateObject({
      model: google("gemini-3.5-flash-lite"),
      schema: analysisSchema,
      system:
        "Anda adalah Senior Tech Recruiter yang sangat objektif, kritis, dan berbasis data. " +
        "Evaluasi kecocokan kandidat berdasarkan CV dan Job Description yang diberikan. " +
        "Jangan melebih-lebihkan skor atau kualifikasi jika tidak relevan. " +
        "Tulis summary maksimal 3 kalimat dalam bahasa yang sama dengan input. " +
        "Berikan minimal 3 saran perbaikan (improvements) berorientasi metrik dan dampak profesional.",
      prompt: `CV Kandidat:\n${cvText}\n\nJob Description:\n${jobDescText}`,
    });

    return NextResponse.json(object);
  } catch (error) {
    console.error("Analyze error:", error);
    return NextResponse.json(
      { error: "Gagal menganalisis CV dan Job Description." },
      { status: 500 }
    );
  }
}

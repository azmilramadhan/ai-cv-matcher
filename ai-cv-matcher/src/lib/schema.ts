import { z } from "zod";

export const analysisSchema = z.object({
  matchScore: z.number().min(0).max(100),
  summary: z.string().max(500),
  matchedSkills: z.array(z.string()),
  missingSkills: z.array(z.string()),
  improvements: z.array(
    z.object({
      original: z.string(),
      improved: z.string(),
      reason: z.string(),
    })
  ),
});

export type AnalysisResult = z.infer<typeof analysisSchema>;

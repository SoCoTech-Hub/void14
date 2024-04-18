import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type AnalyticsPredictSampleId, analyticsPredictSampleIdSchema, analyticsPredictSamples } from "@/lib/db/schema/analyticsPredictSamples";

export const getAnalyticsPredictSamples = async () => {
  const rows = await db.select().from(analyticsPredictSamples);
  const a = rows
  return { analyticsPredictSamples: a };
};

export const getAnalyticsPredictSampleById = async (id: AnalyticsPredictSampleId) => {
  const { id: analyticsPredictSampleId } = analyticsPredictSampleIdSchema.parse({ id });
  const [row] = await db.select().from(analyticsPredictSamples).where(eq(analyticsPredictSamples.id, analyticsPredictSampleId));
  if (row === undefined) return {};
  const a = row;
  return { analyticsPredictSample: a };
};



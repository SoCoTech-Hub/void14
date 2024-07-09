import type { AnalyticsPredictSampleId } from "@soco/analytics-db/schema/analyticsPredictSamples";
import { db, eq } from "@soco/analytics-db";
import {
  analyticsPredictSampleIdSchema,
  analyticsPredictSamples,
} from "@soco/analytics-db/schema/analyticsPredictSamples";

export const getAnalyticsPredictSamples = async () => {
  const rows = await db.select().from(analyticsPredictSamples);
  const a = rows;
  return { analyticsPredictSamples: a };
};

export const getAnalyticsPredictSampleById = async (
  id: AnalyticsPredictSampleId,
) => {
  const { id: analyticsPredictSampleId } = analyticsPredictSampleIdSchema.parse(
    { id },
  );
  const [row] = await db
    .select()
    .from(analyticsPredictSamples)
    .where(eq(analyticsPredictSamples.id, analyticsPredictSampleId));
  if (row === undefined) return {};
  const a = row;
  return { analyticsPredictSample: a };
};

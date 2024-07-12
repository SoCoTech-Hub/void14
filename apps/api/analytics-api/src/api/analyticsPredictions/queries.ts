import type { AnalyticsPredictionId } from "@soco/analytics-db/schema/analyticsPredictions";
import { eq } from "@soco/analytics-db";
import { db } from "@soco/analytics-db/client";
import {
  analyticsPredictionIdSchema,
  analyticsPredictions,
} from "@soco/analytics-db/schema/analyticsPredictions";

export const getAnalyticsPredictions = async () => {
  const rows = await db.select().from(analyticsPredictions);
  const a = rows;
  return { analyticsPredictions: a };
};

export const getAnalyticsPredictionById = async (id: AnalyticsPredictionId) => {
  const { id: analyticsPredictionId } = analyticsPredictionIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(analyticsPredictions)
    .where(eq(analyticsPredictions.id, analyticsPredictionId));
  if (row === undefined) return {};
  const a = row;
  return { analyticsPrediction: a };
};

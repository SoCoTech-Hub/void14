import type {
  AnalyticsPredictionId,
  NewAnalyticsPredictionParams,
  UpdateAnalyticsPredictionParams,
} from "@soco/analytics-db/schema/analyticsPredictions";
import { eq } from "@soco/analytics-db";
import { db } from "@soco/analytics-db/client";
import {
  analyticsPredictionIdSchema,
  analyticsPredictions,
  insertAnalyticsPredictionSchema,
  updateAnalyticsPredictionSchema,
} from "@soco/analytics-db/schema/analyticsPredictions";

export const createAnalyticsPrediction = async (
  analyticsPrediction: NewAnalyticsPredictionParams,
) => {
  const newAnalyticsPrediction =
    insertAnalyticsPredictionSchema.parse(analyticsPrediction);
  try {
    const [a] = await db
      .insert(analyticsPredictions)
      .values(newAnalyticsPrediction)
      .returning();
    return { analyticsPrediction: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAnalyticsPrediction = async (
  id: AnalyticsPredictionId,
  analyticsPrediction: UpdateAnalyticsPredictionParams,
) => {
  const { id: analyticsPredictionId } = analyticsPredictionIdSchema.parse({
    id,
  });
  const newAnalyticsPrediction =
    updateAnalyticsPredictionSchema.parse(analyticsPrediction);
  try {
    const [a] = await db
      .update(analyticsPredictions)
      .set({ ...newAnalyticsPrediction, updatedAt: new Date() })
      .where(eq(analyticsPredictions.id, analyticsPredictionId!))
      .returning();
    return { analyticsPrediction: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAnalyticsPrediction = async (id: AnalyticsPredictionId) => {
  const { id: analyticsPredictionId } = analyticsPredictionIdSchema.parse({
    id,
  });
  try {
    const [a] = await db
      .delete(analyticsPredictions)
      .where(eq(analyticsPredictions.id, analyticsPredictionId!))
      .returning();
    return { analyticsPrediction: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

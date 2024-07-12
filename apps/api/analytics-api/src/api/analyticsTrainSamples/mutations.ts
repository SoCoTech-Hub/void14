import type {
  AnalyticsTrainSampleId,
  NewAnalyticsTrainSampleParams,
  UpdateAnalyticsTrainSampleParams,
} from "@soco/analytics-db/schema/analyticsTrainSamples";
import { eq } from "@soco/analytics-db";
import { db } from "@soco/analytics-db/client";
import {
  analyticsTrainSampleIdSchema,
  analyticsTrainSamples,
  insertAnalyticsTrainSampleSchema,
  updateAnalyticsTrainSampleSchema,
} from "@soco/analytics-db/schema/analyticsTrainSamples";

export const createAnalyticsTrainSample = async (
  analyticsTrainSample: NewAnalyticsTrainSampleParams,
) => {
  const newAnalyticsTrainSample =
    insertAnalyticsTrainSampleSchema.parse(analyticsTrainSample);
  try {
    const [a] = await db
      .insert(analyticsTrainSamples)
      .values(newAnalyticsTrainSample)
      .returning();
    return { analyticsTrainSample: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAnalyticsTrainSample = async (
  id: AnalyticsTrainSampleId,
  analyticsTrainSample: UpdateAnalyticsTrainSampleParams,
) => {
  const { id: analyticsTrainSampleId } = analyticsTrainSampleIdSchema.parse({
    id,
  });
  const newAnalyticsTrainSample =
    updateAnalyticsTrainSampleSchema.parse(analyticsTrainSample);
  try {
    const [a] = await db
      .update(analyticsTrainSamples)
      .set({ ...newAnalyticsTrainSample, updatedAt: new Date() })
      .where(eq(analyticsTrainSamples.id, analyticsTrainSampleId!))
      .returning();
    return { analyticsTrainSample: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAnalyticsTrainSample = async (
  id: AnalyticsTrainSampleId,
) => {
  const { id: analyticsTrainSampleId } = analyticsTrainSampleIdSchema.parse({
    id,
  });
  try {
    const [a] = await db
      .delete(analyticsTrainSamples)
      .where(eq(analyticsTrainSamples.id, analyticsTrainSampleId!))
      .returning();
    return { analyticsTrainSample: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

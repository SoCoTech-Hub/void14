import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type AnalyticsTrainSampleId, analyticsTrainSampleIdSchema, analyticsTrainSamples } from "@/lib/db/schema/analyticsTrainSamples";

export const getAnalyticsTrainSamples = async () => {
  const rows = await db.select().from(analyticsTrainSamples);
  const a = rows
  return { analyticsTrainSamples: a };
};

export const getAnalyticsTrainSampleById = async (id: AnalyticsTrainSampleId) => {
  const { id: analyticsTrainSampleId } = analyticsTrainSampleIdSchema.parse({ id });
  const [row] = await db.select().from(analyticsTrainSamples).where(eq(analyticsTrainSamples.id, analyticsTrainSampleId));
  if (row === undefined) return {};
  const a = row;
  return { analyticsTrainSample: a };
};



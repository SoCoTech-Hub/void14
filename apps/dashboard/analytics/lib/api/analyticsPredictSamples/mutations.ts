import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type AnalyticsPredictSampleId, 
  type NewAnalyticsPredictSampleParams,
  type UpdateAnalyticsPredictSampleParams, 
  updateAnalyticsPredictSampleSchema,
  insertAnalyticsPredictSampleSchema, 
  analyticsPredictSamples,
  analyticsPredictSampleIdSchema 
} from "@/lib/db/schema/analyticsPredictSamples";

export const createAnalyticsPredictSample = async (analyticsPredictSample: NewAnalyticsPredictSampleParams) => {
  const newAnalyticsPredictSample = insertAnalyticsPredictSampleSchema.parse(analyticsPredictSample);
  try {
    const [a] =  await db.insert(analyticsPredictSamples).values(newAnalyticsPredictSample).returning();
    return { analyticsPredictSample: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAnalyticsPredictSample = async (id: AnalyticsPredictSampleId, analyticsPredictSample: UpdateAnalyticsPredictSampleParams) => {
  const { id: analyticsPredictSampleId } = analyticsPredictSampleIdSchema.parse({ id });
  const newAnalyticsPredictSample = updateAnalyticsPredictSampleSchema.parse(analyticsPredictSample);
  try {
    const [a] =  await db
     .update(analyticsPredictSamples)
     .set({...newAnalyticsPredictSample, updatedAt: new Date() })
     .where(eq(analyticsPredictSamples.id, analyticsPredictSampleId!))
     .returning();
    return { analyticsPredictSample: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAnalyticsPredictSample = async (id: AnalyticsPredictSampleId) => {
  const { id: analyticsPredictSampleId } = analyticsPredictSampleIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(analyticsPredictSamples).where(eq(analyticsPredictSamples.id, analyticsPredictSampleId!))
    .returning();
    return { analyticsPredictSample: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


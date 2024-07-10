import { db } from "@soco/analytics-db/client";
import { eq } from "@soco/analytics-db";
import { 
  AnalyticsIndicatorCalcId, 
  NewAnalyticsIndicatorCalcParams,
  UpdateAnalyticsIndicatorCalcParams, 
  updateAnalyticsIndicatorCalcSchema,
  insertAnalyticsIndicatorCalcSchema, 
  analyticsIndicatorCalcs,
  analyticsIndicatorCalcIdSchema 
} from "@soco/analytics-db/schema/analyticsIndicatorCalcs";

export const createAnalyticsIndicatorCalc = async (analyticsIndicatorCalc: NewAnalyticsIndicatorCalcParams) => {
  const newAnalyticsIndicatorCalc = insertAnalyticsIndicatorCalcSchema.parse(analyticsIndicatorCalc);
  try {
    const [a] =  await db.insert(analyticsIndicatorCalcs).values(newAnalyticsIndicatorCalc).returning();
    return { analyticsIndicatorCalc: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAnalyticsIndicatorCalc = async (id: AnalyticsIndicatorCalcId, analyticsIndicatorCalc: UpdateAnalyticsIndicatorCalcParams) => {
  const { id: analyticsIndicatorCalcId } = analyticsIndicatorCalcIdSchema.parse({ id });
  const newAnalyticsIndicatorCalc = updateAnalyticsIndicatorCalcSchema.parse(analyticsIndicatorCalc);
  try {
    const [a] =  await db
     .update(analyticsIndicatorCalcs)
     .set({...newAnalyticsIndicatorCalc, updatedAt: new Date() })
     .where(eq(analyticsIndicatorCalcs.id, analyticsIndicatorCalcId!))
     .returning();
    return { analyticsIndicatorCalc: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAnalyticsIndicatorCalc = async (id: AnalyticsIndicatorCalcId) => {
  const { id: analyticsIndicatorCalcId } = analyticsIndicatorCalcIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(analyticsIndicatorCalcs).where(eq(analyticsIndicatorCalcs.id, analyticsIndicatorCalcId!))
    .returning();
    return { analyticsIndicatorCalc: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


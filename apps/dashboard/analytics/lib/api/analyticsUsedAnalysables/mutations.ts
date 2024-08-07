import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type AnalyticsUsedAnalysableId, 
  type NewAnalyticsUsedAnalysableParams,
  type UpdateAnalyticsUsedAnalysableParams, 
  updateAnalyticsUsedAnalysableSchema,
  insertAnalyticsUsedAnalysableSchema, 
  analyticsUsedAnalysables,
  analyticsUsedAnalysableIdSchema 
} from "@/lib/db/schema/analyticsUsedAnalysables";

export const createAnalyticsUsedAnalysable = async (analyticsUsedAnalysable: NewAnalyticsUsedAnalysableParams) => {
  const newAnalyticsUsedAnalysable = insertAnalyticsUsedAnalysableSchema.parse(analyticsUsedAnalysable);
  try {
    const [a] =  await db.insert(analyticsUsedAnalysables).values(newAnalyticsUsedAnalysable).returning();
    return { analyticsUsedAnalysable: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAnalyticsUsedAnalysable = async (id: AnalyticsUsedAnalysableId, analyticsUsedAnalysable: UpdateAnalyticsUsedAnalysableParams) => {
  const { id: analyticsUsedAnalysableId } = analyticsUsedAnalysableIdSchema.parse({ id });
  const newAnalyticsUsedAnalysable = updateAnalyticsUsedAnalysableSchema.parse(analyticsUsedAnalysable);
  try {
    const [a] =  await db
     .update(analyticsUsedAnalysables)
     .set({...newAnalyticsUsedAnalysable, updatedAt: new Date() })
     .where(eq(analyticsUsedAnalysables.id, analyticsUsedAnalysableId!))
     .returning();
    return { analyticsUsedAnalysable: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAnalyticsUsedAnalysable = async (id: AnalyticsUsedAnalysableId) => {
  const { id: analyticsUsedAnalysableId } = analyticsUsedAnalysableIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(analyticsUsedAnalysables).where(eq(analyticsUsedAnalysables.id, analyticsUsedAnalysableId!))
    .returning();
    return { analyticsUsedAnalysable: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


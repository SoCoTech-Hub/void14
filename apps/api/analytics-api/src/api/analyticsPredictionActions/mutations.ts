import { db } from "@soco/analytics-db/client";
import { and, eq } from "@soco/analytics-db";
import { 
  type AnalyticsPredictionActionId, 
  type NewAnalyticsPredictionActionParams,
  type UpdateAnalyticsPredictionActionParams, 
  updateAnalyticsPredictionActionSchema,
  insertAnalyticsPredictionActionSchema, 
  analyticsPredictionActions,
  analyticsPredictionActionIdSchema 
} from "@soco/analytics-db/schema/analyticsPredictionActions";
import { getUserAuth } from "@soco/auth-service";

export const createAnalyticsPredictionAction = async (analyticsPredictionAction: NewAnalyticsPredictionActionParams) => {
  const { session } = await getUserAuth();
  const newAnalyticsPredictionAction = insertAnalyticsPredictionActionSchema.parse({ ...analyticsPredictionAction, userId: session?.user.id! });
  try {
    const [a] =  await db.insert(analyticsPredictionActions).values(newAnalyticsPredictionAction).returning();
    return { analyticsPredictionAction: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAnalyticsPredictionAction = async (id: AnalyticsPredictionActionId, analyticsPredictionAction: UpdateAnalyticsPredictionActionParams) => {
  const { session } = await getUserAuth();
  const { id: analyticsPredictionActionId } = analyticsPredictionActionIdSchema.parse({ id });
  const newAnalyticsPredictionAction = updateAnalyticsPredictionActionSchema.parse({ ...analyticsPredictionAction, userId: session?.user.id! });
  try {
    const [a] =  await db
     .update(analyticsPredictionActions)
     .set({...newAnalyticsPredictionAction, updatedAt: new Date() })
     .where(and(eq(analyticsPredictionActions.id, analyticsPredictionActionId!), eq(analyticsPredictionActions.userId, session?.user.id!)))
     .returning();
    return { analyticsPredictionAction: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAnalyticsPredictionAction = async (id: AnalyticsPredictionActionId) => {
  const { session } = await getUserAuth();
  const { id: analyticsPredictionActionId } = analyticsPredictionActionIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(analyticsPredictionActions).where(and(eq(analyticsPredictionActions.id, analyticsPredictionActionId!), eq(analyticsPredictionActions.userId, session?.user.id!)))
    .returning();
    return { analyticsPredictionAction: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


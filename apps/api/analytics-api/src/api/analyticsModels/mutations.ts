import { db } from "@soco/analytics-db/client";
import { and, eq } from "@soco/analytics-db";
import { 
  type AnalyticsModelId, 
  type NewAnalyticsModelParams,
  type UpdateAnalyticsModelParams, 
  updateAnalyticsModelSchema,
  insertAnalyticsModelSchema, 
  analyticsModels,
  analyticsModelIdSchema 
} from "@soco/analytics-db/schema/analyticsModels";
import { getUserAuth } from "@soco/auth-service";

export const createAnalyticsModel = async (analyticsModel: NewAnalyticsModelParams) => {
  const { session } = await getUserAuth();
  const newAnalyticsModel = insertAnalyticsModelSchema.parse({ ...analyticsModel, userId: session?.user.id! });
  try {
    const [a] =  await db.insert(analyticsModels).values(newAnalyticsModel).returning();
    return { analyticsModel: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAnalyticsModel = async (id: AnalyticsModelId, analyticsModel: UpdateAnalyticsModelParams) => {
  const { session } = await getUserAuth();
  const { id: analyticsModelId } = analyticsModelIdSchema.parse({ id });
  const newAnalyticsModel = updateAnalyticsModelSchema.parse({ ...analyticsModel, userId: session?.user.id! });
  try {
    const [a] =  await db
     .update(analyticsModels)
     .set({...newAnalyticsModel, updatedAt: new Date() })
     .where(and(eq(analyticsModels.id, analyticsModelId!), eq(analyticsModels.userId, session?.user.id!)))
     .returning();
    return { analyticsModel: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAnalyticsModel = async (id: AnalyticsModelId) => {
  const { session } = await getUserAuth();
  const { id: analyticsModelId } = analyticsModelIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(analyticsModels).where(and(eq(analyticsModels.id, analyticsModelId!), eq(analyticsModels.userId, session?.user.id!)))
    .returning();
    return { analyticsModel: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  AnalyticsModelsLogId, 
  NewAnalyticsModelsLogParams,
  UpdateAnalyticsModelsLogParams, 
  updateAnalyticsModelsLogSchema,
  insertAnalyticsModelsLogSchema, 
  analyticsModelsLog,
  analyticsModelsLogIdSchema 
} from "@/lib/db/schema/analyticsModelsLog";
import { getUserAuth } from "@/lib/auth/utils";

export const createAnalyticsModelsLog = async (analyticsModelsLog: NewAnalyticsModelsLogParams) => {
  const { session } = await getUserAuth();
  const newAnalyticsModelsLog = insertAnalyticsModelsLogSchema.parse({ ...analyticsModelsLog, userId: session?.user.id! });
  try {
    const [a] =  await db.insert(analyticsModelsLog).values(newAnalyticsModelsLog).returning();
    return { analyticsModelsLog: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAnalyticsModelsLog = async (id: AnalyticsModelsLogId, analyticsModelsLog: UpdateAnalyticsModelsLogParams) => {
  const { session } = await getUserAuth();
  const { id: analyticsModelsLogId } = analyticsModelsLogIdSchema.parse({ id });
  const newAnalyticsModelsLog = updateAnalyticsModelsLogSchema.parse({ ...analyticsModelsLog, userId: session?.user.id! });
  try {
    const [a] =  await db
     .update(analyticsModelsLog)
     .set({...newAnalyticsModelsLog, updatedAt: new Date() })
     .where(and(eq(analyticsModelsLog.id, analyticsModelsLogId!), eq(analyticsModelsLog.userId, session?.user.id!)))
     .returning();
    return { analyticsModelsLog: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAnalyticsModelsLog = async (id: AnalyticsModelsLogId) => {
  const { session } = await getUserAuth();
  const { id: analyticsModelsLogId } = analyticsModelsLogIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(analyticsModelsLog).where(and(eq(analyticsModelsLog.id, analyticsModelsLogId!), eq(analyticsModelsLog.userId, session?.user.id!)))
    .returning();
    return { analyticsModelsLog: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


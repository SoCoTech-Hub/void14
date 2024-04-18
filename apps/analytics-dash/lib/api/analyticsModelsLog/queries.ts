import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type AnalyticsModelsLogId, analyticsModelsLogIdSchema, analyticsModelsLog } from "@/lib/db/schema/analyticsModelsLog";

export const getAnalyticsModelsLogs = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(analyticsModelsLog).where(eq(analyticsModelsLog.userId, session?.user.id!));
  const a = rows
  return { analyticsModelsLog: a };
};

export const getAnalyticsModelsLogById = async (id: AnalyticsModelsLogId) => {
  const { session } = await getUserAuth();
  const { id: analyticsModelsLogId } = analyticsModelsLogIdSchema.parse({ id });
  const [row] = await db.select().from(analyticsModelsLog).where(and(eq(analyticsModelsLog.id, analyticsModelsLogId), eq(analyticsModelsLog.userId, session?.user.id!)));
  if (row === undefined) return {};
  const a = row;
  return { analyticsModelsLog: a };
};



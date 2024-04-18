import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type AnalyticsModelsLogId, analyticsModelsLogIdSchema, analyticsModelsLogs } from "@/lib/db/schema/analyticsModelsLogs";

export const getAnalyticsModelsLogs = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(analyticsModelsLogs).where(eq(analyticsModelsLogs.userId, session?.user.id!));
  const a = rows
  return { analyticsModelsLogs: a };
};

export const getAnalyticsModelsLogById = async (id: AnalyticsModelsLogId) => {
  const { session } = await getUserAuth();
  const { id: analyticsModelsLogId } = analyticsModelsLogIdSchema.parse({ id });
  const [row] = await db.select().from(analyticsModelsLogs).where(and(eq(analyticsModelsLogs.id, analyticsModelsLogId), eq(analyticsModelsLogs.userId, session?.user.id!)));
  if (row === undefined) return {};
  const a = row;
  return { analyticsModelsLog: a };
};



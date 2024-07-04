import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  AnalyticsModelLogId,
  analyticsModelLogIdSchema,
  analyticsModelLogs,
  insertAnalyticsModelLogSchema,
  NewAnalyticsModelLogParams,
  UpdateAnalyticsModelLogParams,
  updateAnalyticsModelLogSchema,
} from "../db/schema/analyticsModelLogs";

export const createAnalyticsModelLog = async (
  analyticsModelLog: NewAnalyticsModelLogParams,
) => {
  const { session } = await getUserAuth();
  const newAnalyticsModelLog = insertAnalyticsModelLogSchema.parse({
    ...analyticsModelLog,
    userId: session?.user.id!,
  });
  try {
    const [a] = await db
      .insert(analyticsModelLogs)
      .values(newAnalyticsModelLog)
      .returning();
    return { analyticsModelLog: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAnalyticsModelLog = async (
  id: AnalyticsModelLogId,
  analyticsModelLog: UpdateAnalyticsModelLogParams,
) => {
  const { session } = await getUserAuth();
  const { id: analyticsModelLogId } = analyticsModelLogIdSchema.parse({ id });
  const newAnalyticsModelLog = updateAnalyticsModelLogSchema.parse({
    ...analyticsModelLog,
    userId: session?.user.id!,
  });
  try {
    const [a] = await db
      .update(analyticsModelLogs)
      .set({ ...newAnalyticsModelLog, updatedAt: new Date() })
      .where(
        and(
          eq(analyticsModelLogs.id, analyticsModelLogId!),
          eq(analyticsModelLogs.userId, session?.user.id!),
        ),
      )
      .returning();
    return { analyticsModelLog: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAnalyticsModelLog = async (id: AnalyticsModelLogId) => {
  const { session } = await getUserAuth();
  const { id: analyticsModelLogId } = analyticsModelLogIdSchema.parse({ id });
  try {
    const [a] = await db
      .delete(analyticsModelLogs)
      .where(
        and(
          eq(analyticsModelLogs.id, analyticsModelLogId!),
          eq(analyticsModelLogs.userId, session?.user.id!),
        ),
      )
      .returning();
    return { analyticsModelLog: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

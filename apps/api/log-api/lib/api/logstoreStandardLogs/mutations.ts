import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  insertLogstoreStandardLogSchema,
  LogstoreStandardLogId,
  logstoreStandardLogIdSchema,
  logstoreStandardLogs,
  NewLogstoreStandardLogParams,
  UpdateLogstoreStandardLogParams,
  updateLogstoreStandardLogSchema,
} from "../db/schema/logstoreStandardLogs";

export const createLogstoreStandardLog = async (
  logstoreStandardLog: NewLogstoreStandardLogParams,
) => {
  const { session } = await getUserAuth();
  const newLogstoreStandardLog = insertLogstoreStandardLogSchema.parse({
    ...logstoreStandardLog,
    userId: session?.user.id!,
  });
  try {
    const [l] = await db
      .insert(logstoreStandardLogs)
      .values(newLogstoreStandardLog)
      .returning();
    return { logstoreStandardLog: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLogstoreStandardLog = async (
  id: LogstoreStandardLogId,
  logstoreStandardLog: UpdateLogstoreStandardLogParams,
) => {
  const { session } = await getUserAuth();
  const { id: logstoreStandardLogId } = logstoreStandardLogIdSchema.parse({
    id,
  });
  const newLogstoreStandardLog = updateLogstoreStandardLogSchema.parse({
    ...logstoreStandardLog,
    userId: session?.user.id!,
  });
  try {
    const [l] = await db
      .update(logstoreStandardLogs)
      .set({ ...newLogstoreStandardLog, updatedAt: new Date() })
      .where(
        and(
          eq(logstoreStandardLogs.id, logstoreStandardLogId!),
          eq(logstoreStandardLogs.userId, session?.user.id!),
        ),
      )
      .returning();
    return { logstoreStandardLog: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLogstoreStandardLog = async (id: LogstoreStandardLogId) => {
  const { session } = await getUserAuth();
  const { id: logstoreStandardLogId } = logstoreStandardLogIdSchema.parse({
    id,
  });
  try {
    const [l] = await db
      .delete(logstoreStandardLogs)
      .where(
        and(
          eq(logstoreStandardLogs.id, logstoreStandardLogId!),
          eq(logstoreStandardLogs.userId, session?.user.id!),
        ),
      )
      .returning();
    return { logstoreStandardLog: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

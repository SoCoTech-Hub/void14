import type {
  LogQueryId,
  NewLogQueryParams,
  UpdateLogQueryParams,
} from "@soco/log-db/schema/logQueries";
import { eq } from "@soco/log-db";
import { db } from "@soco/log-db/client";
import {
  insertLogQuerySchema,
  logQueries,
  logQueryIdSchema,
  updateLogQuerySchema,
} from "@soco/log-db/schema/logQueries";

export const createLogQuery = async (logQuery: NewLogQueryParams) => {
  const newLogQuery = insertLogQuerySchema.parse(logQuery);
  try {
    const [l] = await db.insert(logQueries).values(newLogQuery).returning();
    return { logQuery: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLogQuery = async (
  id: LogQueryId,
  logQuery: UpdateLogQueryParams,
) => {
  const { id: logQueryId } = logQueryIdSchema.parse({ id });
  const newLogQuery = updateLogQuerySchema.parse(logQuery);
  try {
    const [l] = await db
      .update(logQueries)
      .set(newLogQuery)
      .where(eq(logQueries.id, logQueryId!))
      .returning();
    return { logQuery: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLogQuery = async (id: LogQueryId) => {
  const { id: logQueryId } = logQueryIdSchema.parse({ id });
  try {
    const [l] = await db
      .delete(logQueries)
      .where(eq(logQueries.id, logQueryId!))
      .returning();
    return { logQuery: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

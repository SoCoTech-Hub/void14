import type { LogQueryId } from "@soco/log-db/schema/logQueries";
import { eq } from "@soco/log-db";
import { db } from "@soco/log-db/client";
import { logQueries, logQueryIdSchema } from "@soco/log-db/schema/logQueries";

export const getLogQueries = async () => {
  const rows = await db.select().from(logQueries);
  const l = rows;
  return { logQueries: l };
};

export const getLogQueryById = async (id: LogQueryId) => {
  const { id: logQueryId } = logQueryIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(logQueries)
    .where(eq(logQueries.id, logQueryId));
  if (row === undefined) return {};
  const l = row;
  return { logQuery: l };
};

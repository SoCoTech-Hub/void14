import { eq } from "drizzle-orm";

import type { LogQueryId } from "../../db/schema/logQueries";
import { db } from "../../db/index";
import { logQueries, logQueryIdSchema } from "../../db/schema/logQueries";

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

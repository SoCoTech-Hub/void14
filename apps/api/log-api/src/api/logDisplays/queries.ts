import type { LogDisplayId } from "@soco/log-db/schema/logDisplays";
import { eq } from "@soco/log-db";
import { db } from "@soco/log-db/client";
import {
  logDisplayIdSchema,
  logDisplays,
} from "@soco/log-db/schema/logDisplays";

export const getLogDisplays = async () => {
  const rows = await db.select().from(logDisplays);
  const l = rows;
  return { logDisplays: l };
};

export const getLogDisplayById = async (id: LogDisplayId) => {
  const { id: logDisplayId } = logDisplayIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(logDisplays)
    .where(eq(logDisplays.id, logDisplayId));
  if (row === undefined) return {};
  const l = row;
  return { logDisplay: l };
};

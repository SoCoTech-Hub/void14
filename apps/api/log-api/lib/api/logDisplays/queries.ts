import { eq } from "drizzle-orm";

import type { LogDisplayId } from "../db/schema/logDisplays";
import { db } from "../db/index";
import { logDisplayIdSchema, logDisplays } from "../db/schema/logDisplays";

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

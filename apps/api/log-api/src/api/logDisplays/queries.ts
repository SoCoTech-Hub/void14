import { db } from "@soco/log-db/client";
import { eq } from "@soco/log-db";
import { type LogDisplayId, logDisplayIdSchema, logDisplays } from "@soco/log-db/schema/logDisplays";

export const getLogDisplays = async () => {
  const rows = await db.select().from(logDisplays);
  const l = rows
  return { logDisplays: l };
};

export const getLogDisplayById = async (id: LogDisplayId) => {
  const { id: logDisplayId } = logDisplayIdSchema.parse({ id });
  const [row] = await db.select().from(logDisplays).where(eq(logDisplays.id, logDisplayId));
  if (row === undefined) return {};
  const l = row;
  return { logDisplay: l };
};



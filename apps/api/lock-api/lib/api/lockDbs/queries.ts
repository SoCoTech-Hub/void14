import { eq } from "drizzle-orm";

import type { LockDbId } from "../../db/schema/lockDbs";
import { db } from "../../db/index";
import { lockDbIdSchema, lockDbs } from "../../db/schema/lockDbs";

export const getLockDbs = async () => {
  const rows = await db.select().from(lockDbs);
  const l = rows;
  return { lockDbs: l };
};

export const getLockDbById = async (id: LockDbId) => {
  const { id: lockDbId } = lockDbIdSchema.parse({ id });
  const [row] = await db.select().from(lockDbs).where(eq(lockDbs.id, lockDbId));
  if (row === undefined) return {};
  const l = row;
  return { lockDb: l };
};

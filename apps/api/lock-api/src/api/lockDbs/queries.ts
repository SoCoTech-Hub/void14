import type { LockDbId } from "@soco/lock-db/schema/lockDbs";
import { eq } from "@soco/lock-db";
import { db } from "@soco/lock-db/client";
import { lockDbIdSchema, lockDbs } from "@soco/lock-db/schema/lockDbs";

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

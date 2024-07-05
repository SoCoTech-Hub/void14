import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  insertLockDbSchema,
  LockDbId,
  lockDbIdSchema,
  lockDbs,
  NewLockDbParams,
  UpdateLockDbParams,
  updateLockDbSchema,
} from "../../db/schema/lockDbs";

export const createLockDb = async (lockDb: NewLockDbParams) => {
  const newLockDb = insertLockDbSchema.parse(lockDb);
  try {
    const [l] = await db.insert(lockDbs).values(newLockDb).returning();
    return { lockDb: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLockDb = async (
  id: LockDbId,
  lockDb: UpdateLockDbParams,
) => {
  const { id: lockDbId } = lockDbIdSchema.parse({ id });
  const newLockDb = updateLockDbSchema.parse(lockDb);
  try {
    const [l] = await db
      .update(lockDbs)
      .set(newLockDb)
      .where(eq(lockDbs.id, lockDbId!))
      .returning();
    return { lockDb: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLockDb = async (id: LockDbId) => {
  const { id: lockDbId } = lockDbIdSchema.parse({ id });
  try {
    const [l] = await db
      .delete(lockDbs)
      .where(eq(lockDbs.id, lockDbId!))
      .returning();
    return { lockDb: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

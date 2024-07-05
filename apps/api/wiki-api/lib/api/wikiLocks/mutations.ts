import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../../db/index";
import {
  insertWikiLockSchema,
  NewWikiLockParams,
  UpdateWikiLockParams,
  updateWikiLockSchema,
  WikiLockId,
  wikiLockIdSchema,
  wikiLocks,
} from "../../db/schema/wikiLocks";

export const createWikiLock = async (wikiLock: NewWikiLockParams) => {
  const { session } = await getUserAuth();
  const newWikiLock = insertWikiLockSchema.parse({
    ...wikiLock,
    userId: session?.user.id!,
  });
  try {
    const [w] = await db.insert(wikiLocks).values(newWikiLock).returning();
    return { wikiLock: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWikiLock = async (
  id: WikiLockId,
  wikiLock: UpdateWikiLockParams,
) => {
  const { session } = await getUserAuth();
  const { id: wikiLockId } = wikiLockIdSchema.parse({ id });
  const newWikiLock = updateWikiLockSchema.parse({
    ...wikiLock,
    userId: session?.user.id!,
  });
  try {
    const [w] = await db
      .update(wikiLocks)
      .set(newWikiLock)
      .where(
        and(
          eq(wikiLocks.id, wikiLockId!),
          eq(wikiLocks.userId, session?.user.id!),
        ),
      )
      .returning();
    return { wikiLock: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteWikiLock = async (id: WikiLockId) => {
  const { session } = await getUserAuth();
  const { id: wikiLockId } = wikiLockIdSchema.parse({ id });
  try {
    const [w] = await db
      .delete(wikiLocks)
      .where(
        and(
          eq(wikiLocks.id, wikiLockId!),
          eq(wikiLocks.userId, session?.user.id!),
        ),
      )
      .returning();
    return { wikiLock: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

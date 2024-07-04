import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  BlockRecentlyAccessedItemId,
  blockRecentlyAccessedItemIdSchema,
  blockRecentlyAccessedItems,
  insertBlockRecentlyAccessedItemSchema,
  NewBlockRecentlyAccessedItemParams,
  UpdateBlockRecentlyAccessedItemParams,
  updateBlockRecentlyAccessedItemSchema,
} from "../db/schema/blockRecentlyAccessedItems";

export const createBlockRecentlyAccessedItem = async (
  blockRecentlyAccessedItem: NewBlockRecentlyAccessedItemParams,
) => {
  const { session } = await getUserAuth();
  const newBlockRecentlyAccessedItem =
    insertBlockRecentlyAccessedItemSchema.parse({
      ...blockRecentlyAccessedItem,
      userId: session?.user.id!,
    });
  try {
    const [b] = await db
      .insert(blockRecentlyAccessedItems)
      .values(newBlockRecentlyAccessedItem)
      .returning();
    return { blockRecentlyAccessedItem: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBlockRecentlyAccessedItem = async (
  id: BlockRecentlyAccessedItemId,
  blockRecentlyAccessedItem: UpdateBlockRecentlyAccessedItemParams,
) => {
  const { session } = await getUserAuth();
  const { id: blockRecentlyAccessedItemId } =
    blockRecentlyAccessedItemIdSchema.parse({ id });
  const newBlockRecentlyAccessedItem =
    updateBlockRecentlyAccessedItemSchema.parse({
      ...blockRecentlyAccessedItem,
      userId: session?.user.id!,
    });
  try {
    const [b] = await db
      .update(blockRecentlyAccessedItems)
      .set({ ...newBlockRecentlyAccessedItem, updatedAt: new Date() })
      .where(
        and(
          eq(blockRecentlyAccessedItems.id, blockRecentlyAccessedItemId!),
          eq(blockRecentlyAccessedItems.userId, session?.user.id!),
        ),
      )
      .returning();
    return { blockRecentlyAccessedItem: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBlockRecentlyAccessedItem = async (
  id: BlockRecentlyAccessedItemId,
) => {
  const { session } = await getUserAuth();
  const { id: blockRecentlyAccessedItemId } =
    blockRecentlyAccessedItemIdSchema.parse({ id });
  try {
    const [b] = await db
      .delete(blockRecentlyAccessedItems)
      .where(
        and(
          eq(blockRecentlyAccessedItems.id, blockRecentlyAccessedItemId!),
          eq(blockRecentlyAccessedItems.userId, session?.user.id!),
        ),
      )
      .returning();
    return { blockRecentlyAccessedItem: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

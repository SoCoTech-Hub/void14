import type {
  BlockRecentActivityId,
  NewBlockRecentActivityParams,
  UpdateBlockRecentActivityParams,
} from "@soco/block-db/schema/blockRecentActivities";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/block-db";
import { db } from "@soco/block-db/client";
import {
  blockRecentActivities,
  blockRecentActivityIdSchema,
  insertBlockRecentActivitySchema,
  updateBlockRecentActivitySchema,
} from "@soco/block-db/schema/blockRecentActivities";

export const createBlockRecentActivity = async (
  blockRecentActivity: NewBlockRecentActivityParams,
) => {
  const { session } = await getUserAuth();
  const newBlockRecentActivity = insertBlockRecentActivitySchema.parse({
    ...blockRecentActivity,
    userId: session?.user.id!,
  });
  try {
    const [b] = await db
      .insert(blockRecentActivities)
      .values(newBlockRecentActivity)
      .returning();
    return { blockRecentActivity: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBlockRecentActivity = async (
  id: BlockRecentActivityId,
  blockRecentActivity: UpdateBlockRecentActivityParams,
) => {
  const { session } = await getUserAuth();
  const { id: blockRecentActivityId } = blockRecentActivityIdSchema.parse({
    id,
  });
  const newBlockRecentActivity = updateBlockRecentActivitySchema.parse({
    ...blockRecentActivity,
    userId: session?.user.id!,
  });
  try {
    const [b] = await db
      .update(blockRecentActivities)
      .set({ ...newBlockRecentActivity, updatedAt: new Date() })
      .where(
        and(
          eq(blockRecentActivities.id, blockRecentActivityId!),
          eq(blockRecentActivities.userId, session?.user.id!),
        ),
      )
      .returning();
    return { blockRecentActivity: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBlockRecentActivity = async (id: BlockRecentActivityId) => {
  const { session } = await getUserAuth();
  const { id: blockRecentActivityId } = blockRecentActivityIdSchema.parse({
    id,
  });
  try {
    const [b] = await db
      .delete(blockRecentActivities)
      .where(
        and(
          eq(blockRecentActivities.id, blockRecentActivityId!),
          eq(blockRecentActivities.userId, session?.user.id!),
        ),
      )
      .returning();
    return { blockRecentActivity: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  BlockInstanceId,
  blockInstanceIdSchema,
  blockInstances,
  insertBlockInstanceSchema,
  NewBlockInstanceParams,
  UpdateBlockInstanceParams,
  updateBlockInstanceSchema,
} from "../db/schema/blockInstances";

export const createBlockInstance = async (
  blockInstance: NewBlockInstanceParams,
) => {
  const newBlockInstance = insertBlockInstanceSchema.parse(blockInstance);
  try {
    const [b] = await db
      .insert(blockInstances)
      .values(newBlockInstance)
      .returning();
    return { blockInstance: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBlockInstance = async (
  id: BlockInstanceId,
  blockInstance: UpdateBlockInstanceParams,
) => {
  const { id: blockInstanceId } = blockInstanceIdSchema.parse({ id });
  const newBlockInstance = updateBlockInstanceSchema.parse(blockInstance);
  try {
    const [b] = await db
      .update(blockInstances)
      .set({ ...newBlockInstance, updatedAt: new Date() })
      .where(eq(blockInstances.id, blockInstanceId!))
      .returning();
    return { blockInstance: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBlockInstance = async (id: BlockInstanceId) => {
  const { id: blockInstanceId } = blockInstanceIdSchema.parse({ id });
  try {
    const [b] = await db
      .delete(blockInstances)
      .where(eq(blockInstances.id, blockInstanceId!))
      .returning();
    return { blockInstance: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

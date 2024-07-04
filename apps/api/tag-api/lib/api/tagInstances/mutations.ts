import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  insertTagInstanceSchema,
  NewTagInstanceParams,
  TagInstanceId,
  tagInstanceIdSchema,
  tagInstances,
  UpdateTagInstanceParams,
  updateTagInstanceSchema,
} from "../db/schema/tagInstances";

export const createTagInstance = async (tagInstance: NewTagInstanceParams) => {
  const { session } = await getUserAuth();
  const newTagInstance = insertTagInstanceSchema.parse({
    ...tagInstance,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .insert(tagInstances)
      .values(newTagInstance)
      .returning();
    return { tagInstance: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateTagInstance = async (
  id: TagInstanceId,
  tagInstance: UpdateTagInstanceParams,
) => {
  const { session } = await getUserAuth();
  const { id: tagInstanceId } = tagInstanceIdSchema.parse({ id });
  const newTagInstance = updateTagInstanceSchema.parse({
    ...tagInstance,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .update(tagInstances)
      .set({ ...newTagInstance, updatedAt: new Date() })
      .where(
        and(
          eq(tagInstances.id, tagInstanceId!),
          eq(tagInstances.userId, session?.user.id!),
        ),
      )
      .returning();
    return { tagInstance: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteTagInstance = async (id: TagInstanceId) => {
  const { session } = await getUserAuth();
  const { id: tagInstanceId } = tagInstanceIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(tagInstances)
      .where(
        and(
          eq(tagInstances.id, tagInstanceId!),
          eq(tagInstances.userId, session?.user.id!),
        ),
      )
      .returning();
    return { tagInstance: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

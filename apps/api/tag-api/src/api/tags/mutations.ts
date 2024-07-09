import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/tag-db/index";
import {
  insertTagSchema,
  NewTagParams,
  TagId,
  tagIdSchema,
  tags,
  UpdateTagParams,
  updateTagSchema,
} from "@soco/tag-db/schema/tags";

export const createTag = async (tag: NewTagParams) => {
  const { session } = await getUserAuth();
  const newTag = insertTagSchema.parse({ ...tag, userId: session?.user.id! });
  try {
    const [t] = await db.insert(tags).values(newTag).returning();
    return { tag: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateTag = async (id: TagId, tag: UpdateTagParams) => {
  const { session } = await getUserAuth();
  const { id: tagId } = tagIdSchema.parse({ id });
  const newTag = updateTagSchema.parse({ ...tag, userId: session?.user.id! });
  try {
    const [t] = await db
      .update(tags)
      .set({ ...newTag, updatedAt: new Date() })
      .where(and(eq(tags.id, tagId!), eq(tags.userId, session?.user.id!)))
      .returning();
    return { tag: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteTag = async (id: TagId) => {
  const { session } = await getUserAuth();
  const { id: tagId } = tagIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(tags)
      .where(and(eq(tags.id, tagId!), eq(tags.userId, session?.user.id!)))
      .returning();
    return { tag: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
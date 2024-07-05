import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../../db/index";
import {
  ForumReadId,
  forumReadIdSchema,
  forumReads,
  insertForumReadSchema,
  NewForumReadParams,
  UpdateForumReadParams,
  updateForumReadSchema,
} from "../../db/schema/forumReads";

export const createForumRead = async (forumRead: NewForumReadParams) => {
  const { session } = await getUserAuth();
  const newForumRead = insertForumReadSchema.parse({
    ...forumRead,
    userId: session?.user.id!,
  });
  try {
    const [f] = await db.insert(forumReads).values(newForumRead).returning();
    return { forumRead: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateForumRead = async (
  id: ForumReadId,
  forumRead: UpdateForumReadParams,
) => {
  const { session } = await getUserAuth();
  const { id: forumReadId } = forumReadIdSchema.parse({ id });
  const newForumRead = updateForumReadSchema.parse({
    ...forumRead,
    userId: session?.user.id!,
  });
  try {
    const [f] = await db
      .update(forumReads)
      .set(newForumRead)
      .where(
        and(
          eq(forumReads.id, forumReadId!),
          eq(forumReads.userId, session?.user.id!),
        ),
      )
      .returning();
    return { forumRead: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteForumRead = async (id: ForumReadId) => {
  const { session } = await getUserAuth();
  const { id: forumReadId } = forumReadIdSchema.parse({ id });
  try {
    const [f] = await db
      .delete(forumReads)
      .where(
        and(
          eq(forumReads.id, forumReadId!),
          eq(forumReads.userId, session?.user.id!),
        ),
      )
      .returning();
    return { forumRead: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

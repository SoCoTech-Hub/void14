import type {
  ForumPostId,
  NewForumPostParams,
  UpdateForumPostParams,
} from "@soco/forum-db/schema/forumPosts";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/forum-db";
import { db } from "@soco/forum-db/client";
import {
  forumPostIdSchema,
  forumPosts,
  insertForumPostSchema,
  updateForumPostSchema,
} from "@soco/forum-db/schema/forumPosts";

export const createForumPost = async (forumPost: NewForumPostParams) => {
  const { session } = await getUserAuth();
  const newForumPost = insertForumPostSchema.parse({
    ...forumPost,
    userId: session?.user.id!,
  });
  try {
    const [f] = await db.insert(forumPosts).values(newForumPost).returning();
    return { forumPost: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateForumPost = async (
  id: ForumPostId,
  forumPost: UpdateForumPostParams,
) => {
  const { session } = await getUserAuth();
  const { id: forumPostId } = forumPostIdSchema.parse({ id });
  const newForumPost = updateForumPostSchema.parse({
    ...forumPost,
    userId: session?.user.id!,
  });
  try {
    const [f] = await db
      .update(forumPosts)
      .set({ ...newForumPost, updatedAt: new Date() })
      .where(
        and(
          eq(forumPosts.id, forumPostId!),
          eq(forumPosts.userId, session?.user.id!),
        ),
      )
      .returning();
    return { forumPost: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteForumPost = async (id: ForumPostId) => {
  const { session } = await getUserAuth();
  const { id: forumPostId } = forumPostIdSchema.parse({ id });
  try {
    const [f] = await db
      .delete(forumPosts)
      .where(
        and(
          eq(forumPosts.id, forumPostId!),
          eq(forumPosts.userId, session?.user.id!),
        ),
      )
      .returning();
    return { forumPost: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

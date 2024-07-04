import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  ForumDigestId,
  forumDigestIdSchema,
  forumDigests,
  insertForumDigestSchema,
  NewForumDigestParams,
  UpdateForumDigestParams,
  updateForumDigestSchema,
} from "../db/schema/forumDigests";

export const createForumDigest = async (forumDigest: NewForumDigestParams) => {
  const { session } = await getUserAuth();
  const newForumDigest = insertForumDigestSchema.parse({
    ...forumDigest,
    userId: session?.user.id!,
  });
  try {
    const [f] = await db
      .insert(forumDigests)
      .values(newForumDigest)
      .returning();
    return { forumDigest: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateForumDigest = async (
  id: ForumDigestId,
  forumDigest: UpdateForumDigestParams,
) => {
  const { session } = await getUserAuth();
  const { id: forumDigestId } = forumDigestIdSchema.parse({ id });
  const newForumDigest = updateForumDigestSchema.parse({
    ...forumDigest,
    userId: session?.user.id!,
  });
  try {
    const [f] = await db
      .update(forumDigests)
      .set(newForumDigest)
      .where(
        and(
          eq(forumDigests.id, forumDigestId!),
          eq(forumDigests.userId, session?.user.id!),
        ),
      )
      .returning();
    return { forumDigest: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteForumDigest = async (id: ForumDigestId) => {
  const { session } = await getUserAuth();
  const { id: forumDigestId } = forumDigestIdSchema.parse({ id });
  try {
    const [f] = await db
      .delete(forumDigests)
      .where(
        and(
          eq(forumDigests.id, forumDigestId!),
          eq(forumDigests.userId, session?.user.id!),
        ),
      )
      .returning();
    return { forumDigest: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

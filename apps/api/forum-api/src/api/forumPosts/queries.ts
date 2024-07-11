import type { ForumPostId } from "@soco/forum-db/schema/forumPosts";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/forum-db";
import { db } from "@soco/forum-db/client";
import {
  forumPostIdSchema,
  forumPosts,
} from "@soco/forum-db/schema/forumPosts";

export const getForumPosts = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(forumPosts)
    .where(eq(forumPosts.userId, session?.user.id!));
  const f = rows;
  return { forumPosts: f };
};

export const getForumPostById = async (id: ForumPostId) => {
  const { session } = await getUserAuth();
  const { id: forumPostId } = forumPostIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(forumPosts)
    .where(
      and(
        eq(forumPosts.id, forumPostId),
        eq(forumPosts.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const f = row;
  return { forumPost: f };
};

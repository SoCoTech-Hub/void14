import { db } from "@soco/forum-db/client";
import { eq, and } from "@soco/forum-db";
import { getUserAuth } from "@soco/auth-service";
import { type ForumDiscussionId, forumDiscussionIdSchema, forumDiscussions } from "@soco/forum-db/schema/forumDiscussions";

export const getForumDiscussions = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(forumDiscussions).where(eq(forumDiscussions.userId, session?.user.id!));
  const f = rows
  return { forumDiscussions: f };
};

export const getForumDiscussionById = async (id: ForumDiscussionId) => {
  const { session } = await getUserAuth();
  const { id: forumDiscussionId } = forumDiscussionIdSchema.parse({ id });
  const [row] = await db.select().from(forumDiscussions).where(and(eq(forumDiscussions.id, forumDiscussionId), eq(forumDiscussions.userId, session?.user.id!)));
  if (row === undefined) return {};
  const f = row;
  return { forumDiscussion: f };
};



import type { ForumDiscussionSubId } from "@soco/forum-db/schema/forumDiscussionSubs";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/forum-db";
import { db } from "@soco/forum-db/client";
import {
  forumDiscussionSubIdSchema,
  forumDiscussionSubs,
} from "@soco/forum-db/schema/forumDiscussionSubs";

export const getForumDiscussionSubs = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(forumDiscussionSubs)
    .where(eq(forumDiscussionSubs.userId, session?.user.id!));
  const f = rows;
  return { forumDiscussionSubs: f };
};

export const getForumDiscussionSubById = async (id: ForumDiscussionSubId) => {
  const { session } = await getUserAuth();
  const { id: forumDiscussionSubId } = forumDiscussionSubIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(forumDiscussionSubs)
    .where(
      and(
        eq(forumDiscussionSubs.id, forumDiscussionSubId),
        eq(forumDiscussionSubs.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const f = row;
  return { forumDiscussionSub: f };
};

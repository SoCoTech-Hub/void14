import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { ForumDiscussionSubId } from "../db/schema/forumDiscussionSubs";
import { db } from "../db/index";
import {
  forumDiscussionSubIdSchema,
  forumDiscussionSubs,
} from "../db/schema/forumDiscussionSubs";

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
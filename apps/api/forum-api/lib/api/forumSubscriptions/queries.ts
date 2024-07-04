import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { ForumSubscriptionId } from "../db/schema/forumSubscriptions";
import { db } from "../db/index";
import { forums } from "../db/schema/forums";
import {
  forumSubscriptionIdSchema,
  forumSubscriptions,
} from "../db/schema/forumSubscriptions";

export const getForumSubscriptions = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ forumSubscription: forumSubscriptions, forum: forums })
    .from(forumSubscriptions)
    .leftJoin(forums, eq(forumSubscriptions.forumId, forums.id))
    .where(eq(forumSubscriptions.userId, session?.user.id!));
  const f = rows.map((r) => ({ ...r.forumSubscription, forum: r.forum }));
  return { forumSubscriptions: f };
};

export const getForumSubscriptionById = async (id: ForumSubscriptionId) => {
  const { session } = await getUserAuth();
  const { id: forumSubscriptionId } = forumSubscriptionIdSchema.parse({ id });
  const [row] = await db
    .select({ forumSubscription: forumSubscriptions, forum: forums })
    .from(forumSubscriptions)
    .where(
      and(
        eq(forumSubscriptions.id, forumSubscriptionId),
        eq(forumSubscriptions.userId, session?.user.id!),
      ),
    )
    .leftJoin(forums, eq(forumSubscriptions.forumId, forums.id));
  if (row === undefined) return {};
  const f = { ...row.forumSubscription, forum: row.forum };
  return { forumSubscription: f };
};

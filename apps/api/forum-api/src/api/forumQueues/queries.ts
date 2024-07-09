import { and, eq } from "drizzle-orm";

import type { ForumQueueId } from "@soco/forum-db/schema/forumQueues";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/forum-db/index";
import {
  forumQueueIdSchema,
  forumQueues,
} from "@soco/forum-db/schema/forumQueues";

export const getForumQueues = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(forumQueues)
    .where(eq(forumQueues.userId, session?.user.id!));
  const f = rows;
  return { forumQueues: f };
};

export const getForumQueueById = async (id: ForumQueueId) => {
  const { session } = await getUserAuth();
  const { id: forumQueueId } = forumQueueIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(forumQueues)
    .where(
      and(
        eq(forumQueues.id, forumQueueId),
        eq(forumQueues.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const f = row;
  return { forumQueue: f };
};

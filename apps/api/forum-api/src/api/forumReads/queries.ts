import type { ForumReadId } from "@soco/forum-db/schema/forumReads";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/forum-db";
import { db } from "@soco/forum-db/client";
import {
  forumReadIdSchema,
  forumReads,
} from "@soco/forum-db/schema/forumReads";

export const getForumReads = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(forumReads)
    .where(eq(forumReads.userId, session?.user.id!));
  const f = rows;
  return { forumReads: f };
};

export const getForumReadById = async (id: ForumReadId) => {
  const { session } = await getUserAuth();
  const { id: forumReadId } = forumReadIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(forumReads)
    .where(
      and(
        eq(forumReads.id, forumReadId),
        eq(forumReads.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const f = row;
  return { forumRead: f };
};

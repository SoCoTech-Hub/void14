import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { ForumReadId } from "../../db/schema/forumReads";
import { db } from "../../db/index";
import { forumReadIdSchema, forumReads } from "../../db/schema/forumReads";

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

import type { ForumId } from "@soco/forum-db/schema/forums";
import { eq } from "@soco/forum-db";
import { db } from "@soco/forum-db/client";
import { forumIdSchema, forums } from "@soco/forum-db/schema/forums";

export const getForums = async () => {
  const rows = await db.select().from(forums);
  const f = rows;
  return { forums: f };
};

export const getForumById = async (id: ForumId) => {
  const { id: forumId } = forumIdSchema.parse({ id });
  const [row] = await db.select().from(forums).where(eq(forums.id, forumId));
  if (row === undefined) return {};
  const f = row;
  return { forum: f };
};

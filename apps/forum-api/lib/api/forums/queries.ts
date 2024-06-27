import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type ForumId, forumIdSchema, forums } from "@/lib/db/schema/forums";

export const getForums = async () => {
  const rows = await db.select().from(forums);
  const f = rows
  return { forums: f };
};

export const getForumById = async (id: ForumId) => {
  const { id: forumId } = forumIdSchema.parse({ id });
  const [row] = await db.select().from(forums).where(eq(forums.id, forumId));
  if (row === undefined) return {};
  const f = row;
  return { forum: f };
};



import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type ForumId, forumIdSchema, forums } from "@/lib/db/schema/forums";

export const getForums = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(forums).where(eq(forums.userId, session?.user.id!));
  const f = rows
  return { forums: f };
};

export const getForumById = async (id: ForumId) => {
  const { session } = await getUserAuth();
  const { id: forumId } = forumIdSchema.parse({ id });
  const [row] = await db.select().from(forums).where(and(eq(forums.id, forumId), eq(forums.userId, session?.user.id!)));
  if (row === undefined) return {};
  const f = row;
  return { forum: f };
};



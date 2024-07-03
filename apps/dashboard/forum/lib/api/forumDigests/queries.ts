import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type ForumDigestId, forumDigestIdSchema, forumDigests } from "@/lib/db/schema/forumDigests";

export const getForumDigests = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(forumDigests).where(eq(forumDigests.userId, session?.user.id!));
  const f = rows
  return { forumDigests: f };
};

export const getForumDigestById = async (id: ForumDigestId) => {
  const { session } = await getUserAuth();
  const { id: forumDigestId } = forumDigestIdSchema.parse({ id });
  const [row] = await db.select().from(forumDigests).where(and(eq(forumDigests.id, forumDigestId), eq(forumDigests.userId, session?.user.id!)));
  if (row === undefined) return {};
  const f = row;
  return { forumDigest: f };
};



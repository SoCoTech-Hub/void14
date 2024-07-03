import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type ForumTrackPrefId, forumTrackPrefIdSchema, forumTrackPrefs } from "@/lib/db/schema/forumTrackPrefs";
import { forums } from "@/lib/db/schema/forums";

export const getForumTrackPrefs = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ forumTrackPref: forumTrackPrefs, forum: forums }).from(forumTrackPrefs).leftJoin(forums, eq(forumTrackPrefs.forumId, forums.id)).where(eq(forumTrackPrefs.userId, session?.user.id!));
  const f = rows .map((r) => ({ ...r.forumTrackPref, forum: r.forum})); 
  return { forumTrackPrefs: f };
};

export const getForumTrackPrefById = async (id: ForumTrackPrefId) => {
  const { session } = await getUserAuth();
  const { id: forumTrackPrefId } = forumTrackPrefIdSchema.parse({ id });
  const [row] = await db.select({ forumTrackPref: forumTrackPrefs, forum: forums }).from(forumTrackPrefs).where(and(eq(forumTrackPrefs.id, forumTrackPrefId), eq(forumTrackPrefs.userId, session?.user.id!))).leftJoin(forums, eq(forumTrackPrefs.forumId, forums.id));
  if (row === undefined) return {};
  const f =  { ...row.forumTrackPref, forum: row.forum } ;
  return { forumTrackPref: f };
};



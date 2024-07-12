import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type ForumTrackPrefId, 
  type NewForumTrackPrefParams,
  type UpdateForumTrackPrefParams, 
  updateForumTrackPrefSchema,
  insertForumTrackPrefSchema, 
  forumTrackPrefs,
  forumTrackPrefIdSchema 
} from "@/lib/db/schema/forumTrackPrefs";
import { getUserAuth } from "@/lib/auth/utils";

export const createForumTrackPref = async (forumTrackPref: NewForumTrackPrefParams) => {
  const { session } = await getUserAuth();
  const newForumTrackPref = insertForumTrackPrefSchema.parse({ ...forumTrackPref, userId: session?.user.id! });
  try {
    const [f] =  await db.insert(forumTrackPrefs).values(newForumTrackPref).returning();
    return { forumTrackPref: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateForumTrackPref = async (id: ForumTrackPrefId, forumTrackPref: UpdateForumTrackPrefParams) => {
  const { session } = await getUserAuth();
  const { id: forumTrackPrefId } = forumTrackPrefIdSchema.parse({ id });
  const newForumTrackPref = updateForumTrackPrefSchema.parse({ ...forumTrackPref, userId: session?.user.id! });
  try {
    const [f] =  await db
     .update(forumTrackPrefs)
     .set(newForumTrackPref)
     .where(and(eq(forumTrackPrefs.id, forumTrackPrefId!), eq(forumTrackPrefs.userId, session?.user.id!)))
     .returning();
    return { forumTrackPref: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteForumTrackPref = async (id: ForumTrackPrefId) => {
  const { session } = await getUserAuth();
  const { id: forumTrackPrefId } = forumTrackPrefIdSchema.parse({ id });
  try {
    const [f] =  await db.delete(forumTrackPrefs).where(and(eq(forumTrackPrefs.id, forumTrackPrefId!), eq(forumTrackPrefs.userId, session?.user.id!)))
    .returning();
    return { forumTrackPref: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


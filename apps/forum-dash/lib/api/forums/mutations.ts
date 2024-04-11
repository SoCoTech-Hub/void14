import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  ForumId, 
  NewForumParams,
  UpdateForumParams, 
  updateForumSchema,
  insertForumSchema, 
  forums,
  forumIdSchema 
} from "@/lib/db/schema/forums";
import { getUserAuth } from "@/lib/auth/utils";

export const createForum = async (forum: NewForumParams) => {
  const { session } = await getUserAuth();
  const newForum = insertForumSchema.parse({ ...forum, userId: session?.user.id! });
  try {
    const [f] =  await db.insert(forums).values(newForum).returning();
    return { forum: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateForum = async (id: ForumId, forum: UpdateForumParams) => {
  const { session } = await getUserAuth();
  const { id: forumId } = forumIdSchema.parse({ id });
  const newForum = updateForumSchema.parse({ ...forum, userId: session?.user.id! });
  try {
    const [f] =  await db
     .update(forums)
     .set({...newForum, updatedAt: new Date() })
     .where(and(eq(forums.id, forumId!), eq(forums.userId, session?.user.id!)))
     .returning();
    return { forum: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteForum = async (id: ForumId) => {
  const { session } = await getUserAuth();
  const { id: forumId } = forumIdSchema.parse({ id });
  try {
    const [f] =  await db.delete(forums).where(and(eq(forums.id, forumId!), eq(forums.userId, session?.user.id!)))
    .returning();
    return { forum: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


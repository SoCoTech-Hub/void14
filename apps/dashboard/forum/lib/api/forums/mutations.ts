import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type ForumId, 
  type NewForumParams,
  type UpdateForumParams, 
  updateForumSchema,
  insertForumSchema, 
  forums,
  forumIdSchema 
} from "@/lib/db/schema/forums";

export const createForum = async (forum: NewForumParams) => {
  const newForum = insertForumSchema.parse(forum);
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
  const { id: forumId } = forumIdSchema.parse({ id });
  const newForum = updateForumSchema.parse(forum);
  try {
    const [f] =  await db
     .update(forums)
     .set({...newForum, updatedAt: new Date() })
     .where(eq(forums.id, forumId!))
     .returning();
    return { forum: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteForum = async (id: ForumId) => {
  const { id: forumId } = forumIdSchema.parse({ id });
  try {
    const [f] =  await db.delete(forums).where(eq(forums.id, forumId!))
    .returning();
    return { forum: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


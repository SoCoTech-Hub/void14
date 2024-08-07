import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type ForumDiscussionId, 
  type NewForumDiscussionParams,
  type UpdateForumDiscussionParams, 
  updateForumDiscussionSchema,
  insertForumDiscussionSchema, 
  forumDiscussions,
  forumDiscussionIdSchema 
} from "@/lib/db/schema/forumDiscussions";
import { getUserAuth } from "@/lib/auth/utils";

export const createForumDiscussion = async (forumDiscussion: NewForumDiscussionParams) => {
  const { session } = await getUserAuth();
  const newForumDiscussion = insertForumDiscussionSchema.parse({ ...forumDiscussion, userId: session?.user.id! });
  try {
    const [f] =  await db.insert(forumDiscussions).values(newForumDiscussion).returning();
    return { forumDiscussion: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateForumDiscussion = async (id: ForumDiscussionId, forumDiscussion: UpdateForumDiscussionParams) => {
  const { session } = await getUserAuth();
  const { id: forumDiscussionId } = forumDiscussionIdSchema.parse({ id });
  const newForumDiscussion = updateForumDiscussionSchema.parse({ ...forumDiscussion, userId: session?.user.id! });
  try {
    const [f] =  await db
     .update(forumDiscussions)
     .set({...newForumDiscussion, updatedAt: new Date() })
     .where(and(eq(forumDiscussions.id, forumDiscussionId!), eq(forumDiscussions.userId, session?.user.id!)))
     .returning();
    return { forumDiscussion: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteForumDiscussion = async (id: ForumDiscussionId) => {
  const { session } = await getUserAuth();
  const { id: forumDiscussionId } = forumDiscussionIdSchema.parse({ id });
  try {
    const [f] =  await db.delete(forumDiscussions).where(and(eq(forumDiscussions.id, forumDiscussionId!), eq(forumDiscussions.userId, session?.user.id!)))
    .returning();
    return { forumDiscussion: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


import { db } from "@soco/forum-db/client";
import { and, eq } from "@soco/forum-db";
import { 
  type ForumDiscussionSubId, 
  type NewForumDiscussionSubParams,
  type UpdateForumDiscussionSubParams, 
  updateForumDiscussionSubSchema,
  insertForumDiscussionSubSchema, 
  forumDiscussionSubs,
  forumDiscussionSubIdSchema 
} from "@soco/forum-db/schema/forumDiscussionSubs";
import { getUserAuth } from "@soco/auth-service";

export const createForumDiscussionSub = async (forumDiscussionSub: NewForumDiscussionSubParams) => {
  const { session } = await getUserAuth();
  const newForumDiscussionSub = insertForumDiscussionSubSchema.parse({ ...forumDiscussionSub, userId: session?.user.id! });
  try {
    const [f] =  await db.insert(forumDiscussionSubs).values(newForumDiscussionSub).returning();
    return { forumDiscussionSub: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateForumDiscussionSub = async (id: ForumDiscussionSubId, forumDiscussionSub: UpdateForumDiscussionSubParams) => {
  const { session } = await getUserAuth();
  const { id: forumDiscussionSubId } = forumDiscussionSubIdSchema.parse({ id });
  const newForumDiscussionSub = updateForumDiscussionSubSchema.parse({ ...forumDiscussionSub, userId: session?.user.id! });
  try {
    const [f] =  await db
     .update(forumDiscussionSubs)
     .set(newForumDiscussionSub)
     .where(and(eq(forumDiscussionSubs.id, forumDiscussionSubId!), eq(forumDiscussionSubs.userId, session?.user.id!)))
     .returning();
    return { forumDiscussionSub: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteForumDiscussionSub = async (id: ForumDiscussionSubId) => {
  const { session } = await getUserAuth();
  const { id: forumDiscussionSubId } = forumDiscussionSubIdSchema.parse({ id });
  try {
    const [f] =  await db.delete(forumDiscussionSubs).where(and(eq(forumDiscussionSubs.id, forumDiscussionSubId!), eq(forumDiscussionSubs.userId, session?.user.id!)))
    .returning();
    return { forumDiscussionSub: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


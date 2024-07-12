import { db } from "@soco/forum-db/client";
import { and, eq } from "@soco/forum-db";
import { 
  type ForumSubscriptionId, 
  type NewForumSubscriptionParams,
  type UpdateForumSubscriptionParams, 
  updateForumSubscriptionSchema,
  insertForumSubscriptionSchema, 
  forumSubscriptions,
  forumSubscriptionIdSchema 
} from "@soco/forum-db/schema/forumSubscriptions";
import { getUserAuth } from "@soco/auth-service";

export const createForumSubscription = async (forumSubscription: NewForumSubscriptionParams) => {
  const { session } = await getUserAuth();
  const newForumSubscription = insertForumSubscriptionSchema.parse({ ...forumSubscription, userId: session?.user.id! });
  try {
    const [f] =  await db.insert(forumSubscriptions).values(newForumSubscription).returning();
    return { forumSubscription: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateForumSubscription = async (id: ForumSubscriptionId, forumSubscription: UpdateForumSubscriptionParams) => {
  const { session } = await getUserAuth();
  const { id: forumSubscriptionId } = forumSubscriptionIdSchema.parse({ id });
  const newForumSubscription = updateForumSubscriptionSchema.parse({ ...forumSubscription, userId: session?.user.id! });
  try {
    const [f] =  await db
     .update(forumSubscriptions)
     .set(newForumSubscription)
     .where(and(eq(forumSubscriptions.id, forumSubscriptionId!), eq(forumSubscriptions.userId, session?.user.id!)))
     .returning();
    return { forumSubscription: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteForumSubscription = async (id: ForumSubscriptionId) => {
  const { session } = await getUserAuth();
  const { id: forumSubscriptionId } = forumSubscriptionIdSchema.parse({ id });
  try {
    const [f] =  await db.delete(forumSubscriptions).where(and(eq(forumSubscriptions.id, forumSubscriptionId!), eq(forumSubscriptions.userId, session?.user.id!)))
    .returning();
    return { forumSubscription: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


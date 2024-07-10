import { db } from "@soco/forum-db/client";
import { and, eq } from "@soco/forum-db";
import { 
  ForumQueueId, 
  NewForumQueueParams,
  UpdateForumQueueParams, 
  updateForumQueueSchema,
  insertForumQueueSchema, 
  forumQueues,
  forumQueueIdSchema 
} from "@soco/forum-db/schema/forumQueues";
import { getUserAuth } from "@/lib/auth/utils";

export const createForumQueue = async (forumQueue: NewForumQueueParams) => {
  const { session } = await getUserAuth();
  const newForumQueue = insertForumQueueSchema.parse({ ...forumQueue, userId: session?.user.id! });
  try {
    const [f] =  await db.insert(forumQueues).values(newForumQueue).returning();
    return { forumQueue: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateForumQueue = async (id: ForumQueueId, forumQueue: UpdateForumQueueParams) => {
  const { session } = await getUserAuth();
  const { id: forumQueueId } = forumQueueIdSchema.parse({ id });
  const newForumQueue = updateForumQueueSchema.parse({ ...forumQueue, userId: session?.user.id! });
  try {
    const [f] =  await db
     .update(forumQueues)
     .set({...newForumQueue, updatedAt: new Date() })
     .where(and(eq(forumQueues.id, forumQueueId!), eq(forumQueues.userId, session?.user.id!)))
     .returning();
    return { forumQueue: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteForumQueue = async (id: ForumQueueId) => {
  const { session } = await getUserAuth();
  const { id: forumQueueId } = forumQueueIdSchema.parse({ id });
  try {
    const [f] =  await db.delete(forumQueues).where(and(eq(forumQueues.id, forumQueueId!), eq(forumQueues.userId, session?.user.id!)))
    .returning();
    return { forumQueue: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


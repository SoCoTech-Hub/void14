import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type ForumQueueId, 
  type NewForumQueueParams,
  type UpdateForumQueueParams, 
  updateForumQueueSchema,
  insertForumQueueSchema, 
  forumQueues,
  forumQueueIdSchema 
} from "@/lib/db/schema/forumQueues";
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


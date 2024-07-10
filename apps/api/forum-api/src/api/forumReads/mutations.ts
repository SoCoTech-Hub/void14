import { db } from "@soco/forum-db/client";
import { and, eq } from "@soco/forum-db";
import { 
  ForumReadId, 
  NewForumReadParams,
  UpdateForumReadParams, 
  updateForumReadSchema,
  insertForumReadSchema, 
  forumReads,
  forumReadIdSchema 
} from "@soco/forum-db/schema/forumReads";
import { getUserAuth } from "@/lib/auth/utils";

export const createForumRead = async (forumRead: NewForumReadParams) => {
  const { session } = await getUserAuth();
  const newForumRead = insertForumReadSchema.parse({ ...forumRead, userId: session?.user.id! });
  try {
    const [f] =  await db.insert(forumReads).values(newForumRead).returning();
    return { forumRead: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateForumRead = async (id: ForumReadId, forumRead: UpdateForumReadParams) => {
  const { session } = await getUserAuth();
  const { id: forumReadId } = forumReadIdSchema.parse({ id });
  const newForumRead = updateForumReadSchema.parse({ ...forumRead, userId: session?.user.id! });
  try {
    const [f] =  await db
     .update(forumReads)
     .set(newForumRead)
     .where(and(eq(forumReads.id, forumReadId!), eq(forumReads.userId, session?.user.id!)))
     .returning();
    return { forumRead: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteForumRead = async (id: ForumReadId) => {
  const { session } = await getUserAuth();
  const { id: forumReadId } = forumReadIdSchema.parse({ id });
  try {
    const [f] =  await db.delete(forumReads).where(and(eq(forumReads.id, forumReadId!), eq(forumReads.userId, session?.user.id!)))
    .returning();
    return { forumRead: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


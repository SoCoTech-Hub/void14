import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type SupportCommentId, 
  type NewSupportCommentParams,
  type UpdateSupportCommentParams, 
  updateSupportCommentSchema,
  insertSupportCommentSchema, 
  supportComments,
  supportCommentIdSchema 
} from "@/lib/db/schema/supportComments";
import { getUserAuth } from "@/lib/auth/utils";

export const createSupportComment = async (supportComment: NewSupportCommentParams) => {
  const { session } = await getUserAuth();
  const newSupportComment = insertSupportCommentSchema.parse({ ...supportComment, userId: session?.user.id! });
  try {
    const [s] =  await db.insert(supportComments).values(newSupportComment).returning();
    return { supportComment: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSupportComment = async (id: SupportCommentId, supportComment: UpdateSupportCommentParams) => {
  const { session } = await getUserAuth();
  const { id: supportCommentId } = supportCommentIdSchema.parse({ id });
  const newSupportComment = updateSupportCommentSchema.parse({ ...supportComment, userId: session?.user.id! });
  try {
    const [s] =  await db
     .update(supportComments)
     .set(newSupportComment)
     .where(and(eq(supportComments.id, supportCommentId!), eq(supportComments.userId, session?.user.id!)))
     .returning();
    return { supportComment: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSupportComment = async (id: SupportCommentId) => {
  const { session } = await getUserAuth();
  const { id: supportCommentId } = supportCommentIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(supportComments).where(and(eq(supportComments.id, supportCommentId!), eq(supportComments.userId, session?.user.id!)))
    .returning();
    return { supportComment: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


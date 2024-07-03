import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  ContentId, 
  NewContentParams,
  UpdateContentParams, 
  updateContentSchema,
  insertContentSchema, 
  contents,
  contentIdSchema 
} from "@/lib/db/schema/contents";
import { getUserAuth } from "@/lib/auth/utils";

export const createContent = async (content: NewContentParams) => {
  const { session } = await getUserAuth();
  const newContent = insertContentSchema.parse({ ...content, userId: session?.user.id! });
  try {
    const [c] =  await db.insert(contents).values(newContent).returning();
    return { content: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateContent = async (id: ContentId, content: UpdateContentParams) => {
  const { session } = await getUserAuth();
  const { id: contentId } = contentIdSchema.parse({ id });
  const newContent = updateContentSchema.parse({ ...content, userId: session?.user.id! });
  try {
    const [c] =  await db
     .update(contents)
     .set({...newContent, updatedAt: new Date() })
     .where(and(eq(contents.id, contentId!), eq(contents.userId, session?.user.id!)))
     .returning();
    return { content: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteContent = async (id: ContentId) => {
  const { session } = await getUserAuth();
  const { id: contentId } = contentIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(contents).where(and(eq(contents.id, contentId!), eq(contents.userId, session?.user.id!)))
    .returning();
    return { content: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type TagCollId, 
  type NewTagCollParams,
  type UpdateTagCollParams, 
  updateTagCollSchema,
  insertTagCollSchema, 
  tagColls,
  tagCollIdSchema 
} from "@/lib/db/schema/tagColls";

export const createTagColl = async (tagColl: NewTagCollParams) => {
  const newTagColl = insertTagCollSchema.parse(tagColl);
  try {
    const [t] =  await db.insert(tagColls).values(newTagColl).returning();
    return { tagColl: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateTagColl = async (id: TagCollId, tagColl: UpdateTagCollParams) => {
  const { id: tagCollId } = tagCollIdSchema.parse({ id });
  const newTagColl = updateTagCollSchema.parse(tagColl);
  try {
    const [t] =  await db
     .update(tagColls)
     .set(newTagColl)
     .where(eq(tagColls.id, tagCollId!))
     .returning();
    return { tagColl: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteTagColl = async (id: TagCollId) => {
  const { id: tagCollId } = tagCollIdSchema.parse({ id });
  try {
    const [t] =  await db.delete(tagColls).where(eq(tagColls.id, tagCollId!))
    .returning();
    return { tagColl: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


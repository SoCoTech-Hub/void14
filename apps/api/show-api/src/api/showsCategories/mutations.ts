import { db } from "@soco/show-db/client";
import { eq } from "@soco/show-db";
import { 
  ShowsCategoryId, 
  NewShowsCategoryParams,
  UpdateShowsCategoryParams, 
  updateShowsCategorySchema,
  insertShowsCategorySchema, 
  showsCategories,
  showsCategoryIdSchema 
} from "@soco/show-db/schema/showsCategories";

export const createShowsCategory = async (showsCategory: NewShowsCategoryParams) => {
  const newShowsCategory = insertShowsCategorySchema.parse(showsCategory);
  try {
    const [s] =  await db.insert(showsCategories).values(newShowsCategory).returning();
    return { showsCategory: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateShowsCategory = async (id: ShowsCategoryId, showsCategory: UpdateShowsCategoryParams) => {
  const { id: showsCategoryId } = showsCategoryIdSchema.parse({ id });
  const newShowsCategory = updateShowsCategorySchema.parse(showsCategory);
  try {
    const [s] =  await db
     .update(showsCategories)
     .set(newShowsCategory)
     .where(eq(showsCategories.id, showsCategoryId!))
     .returning();
    return { showsCategory: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteShowsCategory = async (id: ShowsCategoryId) => {
  const { id: showsCategoryId } = showsCategoryIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(showsCategories).where(eq(showsCategories.id, showsCategoryId!))
    .returning();
    return { showsCategory: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


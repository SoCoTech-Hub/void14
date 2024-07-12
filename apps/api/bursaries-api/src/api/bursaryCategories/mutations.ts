import { db } from "@soco/bursaries-db/client";
import { eq } from "@soco/bursaries-db";
import { 
  type BursaryCategoryId, 
  type NewBursaryCategoryParams,
  type UpdateBursaryCategoryParams, 
  updateBursaryCategorySchema,
  insertBursaryCategorySchema, 
  bursaryCategories,
  bursaryCategoryIdSchema 
} from "@soco/bursaries-db/schema/bursaryCategories";

export const createBursaryCategory = async (bursaryCategory: NewBursaryCategoryParams) => {
  const newBursaryCategory = insertBursaryCategorySchema.parse(bursaryCategory);
  try {
    const [b] =  await db.insert(bursaryCategories).values(newBursaryCategory).returning();
    return { bursaryCategory: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBursaryCategory = async (id: BursaryCategoryId, bursaryCategory: UpdateBursaryCategoryParams) => {
  const { id: bursaryCategoryId } = bursaryCategoryIdSchema.parse({ id });
  const newBursaryCategory = updateBursaryCategorySchema.parse(bursaryCategory);
  try {
    const [b] =  await db
     .update(bursaryCategories)
     .set(newBursaryCategory)
     .where(eq(bursaryCategories.id, bursaryCategoryId!))
     .returning();
    return { bursaryCategory: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBursaryCategory = async (id: BursaryCategoryId) => {
  const { id: bursaryCategoryId } = bursaryCategoryIdSchema.parse({ id });
  try {
    const [b] =  await db.delete(bursaryCategories).where(eq(bursaryCategories.id, bursaryCategoryId!))
    .returning();
    return { bursaryCategory: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


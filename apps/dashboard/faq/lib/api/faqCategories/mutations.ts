import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type FaqCategoryId, 
  type NewFaqCategoryParams,
  type UpdateFaqCategoryParams, 
  updateFaqCategorySchema,
  insertFaqCategorySchema, 
  faqCategories,
  faqCategoryIdSchema 
} from "@/lib/db/schema/faqCategories";

export const createFaqCategory = async (faqCategory: NewFaqCategoryParams) => {
  const newFaqCategory = insertFaqCategorySchema.parse(faqCategory);
  try {
    const [f] =  await db.insert(faqCategories).values(newFaqCategory).returning();
    return { faqCategory: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFaqCategory = async (id: FaqCategoryId, faqCategory: UpdateFaqCategoryParams) => {
  const { id: faqCategoryId } = faqCategoryIdSchema.parse({ id });
  const newFaqCategory = updateFaqCategorySchema.parse(faqCategory);
  try {
    const [f] =  await db
     .update(faqCategories)
     .set(newFaqCategory)
     .where(eq(faqCategories.id, faqCategoryId!))
     .returning();
    return { faqCategory: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFaqCategory = async (id: FaqCategoryId) => {
  const { id: faqCategoryId } = faqCategoryIdSchema.parse({ id });
  try {
    const [f] =  await db.delete(faqCategories).where(eq(faqCategories.id, faqCategoryId!))
    .returning();
    return { faqCategory: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


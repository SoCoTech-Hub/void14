import { db } from "@soco/faq-db/client";
import { eq } from "@soco/faq-db";
import { 
  FaqFaqsCategoryId, 
  NewFaqFaqsCategoryParams,
  UpdateFaqFaqsCategoryParams, 
  updateFaqFaqsCategorySchema,
  insertFaqFaqsCategorySchema, 
  faqFaqsCategories,
  faqFaqsCategoryIdSchema 
} from "@soco/faq-db/schema/faqFaqsCategories";

export const createFaqFaqsCategory = async (faqFaqsCategory: NewFaqFaqsCategoryParams) => {
  const newFaqFaqsCategory = insertFaqFaqsCategorySchema.parse(faqFaqsCategory);
  try {
    const [f] =  await db.insert(faqFaqsCategories).values(newFaqFaqsCategory).returning();
    return { faqFaqsCategory: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFaqFaqsCategory = async (id: FaqFaqsCategoryId, faqFaqsCategory: UpdateFaqFaqsCategoryParams) => {
  const { id: faqFaqsCategoryId } = faqFaqsCategoryIdSchema.parse({ id });
  const newFaqFaqsCategory = updateFaqFaqsCategorySchema.parse(faqFaqsCategory);
  try {
    const [f] =  await db
     .update(faqFaqsCategories)
     .set(newFaqFaqsCategory)
     .where(eq(faqFaqsCategories.id, faqFaqsCategoryId!))
     .returning();
    return { faqFaqsCategory: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFaqFaqsCategory = async (id: FaqFaqsCategoryId) => {
  const { id: faqFaqsCategoryId } = faqFaqsCategoryIdSchema.parse({ id });
  try {
    const [f] =  await db.delete(faqFaqsCategories).where(eq(faqFaqsCategories.id, faqFaqsCategoryId!))
    .returning();
    return { faqFaqsCategory: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


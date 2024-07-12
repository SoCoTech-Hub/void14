import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type FaqId, 
  type NewFaqParams,
  type UpdateFaqParams, 
  updateFaqSchema,
  insertFaqSchema, 
  faqs,
  faqIdSchema 
} from "@/lib/db/schema/faqs";

export const createFaq = async (faq: NewFaqParams) => {
  const newFaq = insertFaqSchema.parse(faq);
  try {
    const [f] =  await db.insert(faqs).values(newFaq).returning();
    return { faq: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFaq = async (id: FaqId, faq: UpdateFaqParams) => {
  const { id: faqId } = faqIdSchema.parse({ id });
  const newFaq = updateFaqSchema.parse(faq);
  try {
    const [f] =  await db
     .update(faqs)
     .set(newFaq)
     .where(eq(faqs.id, faqId!))
     .returning();
    return { faq: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFaq = async (id: FaqId) => {
  const { id: faqId } = faqIdSchema.parse({ id });
  try {
    const [f] =  await db.delete(faqs).where(eq(faqs.id, faqId!))
    .returning();
    return { faq: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


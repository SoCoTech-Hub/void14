import type {
  FaqId,
  NewFaqParams,
  UpdateFaqParams,
} from "@soco/faq-db/schema/faqs";
import { eq } from "@soco/faq-db";
import { db } from "@soco/faq-db/client";
import {
  faqIdSchema,
  faqs,
  insertFaqSchema,
  updateFaqSchema,
} from "@soco/faq-db/schema/faqs";

export const createFaq = async (faq: NewFaqParams) => {
  const newFaq = insertFaqSchema.parse(faq);
  try {
    const [f] = await db.insert(faqs).values(newFaq).returning();
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
    const [f] = await db
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
    const [f] = await db.delete(faqs).where(eq(faqs.id, faqId!)).returning();
    return { faq: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

import { db } from "@soco/faq-db/client";
import { eq } from "@soco/faq-db";
import { type FaqCategoryId, faqCategoryIdSchema, faqCategories } from "@soco/faq-db/schema/faqCategories";

export const getFaqCategories = async () => {
  const rows = await db.select().from(faqCategories);
  const f = rows
  return { faqCategories: f };
};

export const getFaqCategoryById = async (id: FaqCategoryId) => {
  const { id: faqCategoryId } = faqCategoryIdSchema.parse({ id });
  const [row] = await db.select().from(faqCategories).where(eq(faqCategories.id, faqCategoryId));
  if (row === undefined) return {};
  const f = row;
  return { faqCategory: f };
};



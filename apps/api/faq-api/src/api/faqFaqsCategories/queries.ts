import { db } from "@soco/faq-db/client";
import { eq } from "@soco/faq-db";
import { type FaqFaqsCategoryId, faqFaqsCategoryIdSchema, faqFaqsCategories } from "@soco/faq-db/schema/faqFaqsCategories";
import { faqCategories } from "@soco/faq-db/schema/faqCategories";
import { faqs } from "@soco/faq-db/schema/faqs";

export const getFaqFaqsCategories = async () => {
  const rows = await db.select({ faqFaqsCategory: faqFaqsCategories, faqCategory: faqCategories, faq: faqs }).from(faqFaqsCategories).leftJoin(faqCategories, eq(faqFaqsCategories.faqCategoryId, faqCategories.id)).leftJoin(faqs, eq(faqFaqsCategories.faqId, faqs.id));
  const f = rows .map((r) => ({ ...r.faqFaqsCategory, faqCategory: r.faqCategory, faq: r.faq})); 
  return { faqFaqsCategories: f };
};

export const getFaqFaqsCategoryById = async (id: FaqFaqsCategoryId) => {
  const { id: faqFaqsCategoryId } = faqFaqsCategoryIdSchema.parse({ id });
  const [row] = await db.select({ faqFaqsCategory: faqFaqsCategories, faqCategory: faqCategories, faq: faqs }).from(faqFaqsCategories).where(eq(faqFaqsCategories.id, faqFaqsCategoryId)).leftJoin(faqCategories, eq(faqFaqsCategories.faqCategoryId, faqCategories.id)).leftJoin(faqs, eq(faqFaqsCategories.faqId, faqs.id));
  if (row === undefined) return {};
  const f =  { ...row.faqFaqsCategory, faqCategory: row.faqCategory, faq: row.faq } ;
  return { faqFaqsCategory: f };
};



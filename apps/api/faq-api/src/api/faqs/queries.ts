import { db } from "@soco/faq-db/index";
import { eq } from "drizzle-orm";
import { type FaqId, faqIdSchema, faqs } from "@soco/faq-db/schema/faqs";

export const getFaqs = async () => {
  const rows = await db.select().from(faqs);
  const f = rows
  return { faqs: f };
};

export const getFaqById = async (id: FaqId) => {
  const { id: faqId } = faqIdSchema.parse({ id });
  const [row] = await db.select().from(faqs).where(eq(faqs.id, faqId));
  if (row === undefined) return {};
  const f = row;
  return { faq: f };
};



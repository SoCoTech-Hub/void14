import { eq } from "drizzle-orm";

import type { FaqId } from "../../db/schema/faqs";
import { db } from "../../db/index";
import { faqIdSchema, faqs } from "../../db/schema/faqs";

export const getFaqs = async () => {
  const rows = await db.select().from(faqs);
  const f = rows;
  return { faqs: f };
};

export const getFaqById = async (id: FaqId) => {
  const { id: faqId } = faqIdSchema.parse({ id });
  const [row] = await db.select().from(faqs).where(eq(faqs.id, faqId));
  if (row === undefined) return {};
  const f = row;
  return { faq: f };
};

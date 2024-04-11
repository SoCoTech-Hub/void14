import { varchar, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { faqCategories } from "./faqCategories"
import { faqs } from "./faqs"
import { type getFaqFaqsCategories } from "@/lib/api/faqFaqsCategories/queries";

import { nanoid } from "@/lib/utils";


export const faqFaqsCategories = pgTable('faq_faqs_categories', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  faqCategoryId: varchar("faq_category_id", { length: 256 }).references(() => faqCategories.id, { onDelete: "cascade" }).notNull(),
  faqId: varchar("faq_id", { length: 256 }).references(() => faqs.id, { onDelete: "cascade" }).notNull()
});


// Schema for faqFaqsCategories - used to validate API requests
const baseSchema = createSelectSchema(faqFaqsCategories)

export const insertFaqFaqsCategorySchema = createInsertSchema(faqFaqsCategories);
export const insertFaqFaqsCategoryParams = baseSchema.extend({
  faqCategoryId: z.coerce.string().min(1),
  faqId: z.coerce.string().min(1)
}).omit({ 
  id: true
});

export const updateFaqFaqsCategorySchema = baseSchema;
export const updateFaqFaqsCategoryParams = baseSchema.extend({
  faqCategoryId: z.coerce.string().min(1),
  faqId: z.coerce.string().min(1)
})
export const faqFaqsCategoryIdSchema = baseSchema.pick({ id: true });

// Types for faqFaqsCategories - used to type API request params and within Components
export type FaqFaqsCategory = typeof faqFaqsCategories.$inferSelect;
export type NewFaqFaqsCategory = z.infer<typeof insertFaqFaqsCategorySchema>;
export type NewFaqFaqsCategoryParams = z.infer<typeof insertFaqFaqsCategoryParams>;
export type UpdateFaqFaqsCategoryParams = z.infer<typeof updateFaqFaqsCategoryParams>;
export type FaqFaqsCategoryId = z.infer<typeof faqFaqsCategoryIdSchema>["id"];
    
// this type infers the return from getFaqFaqsCategories() - meaning it will include any joins
export type CompleteFaqFaqsCategory = Awaited<ReturnType<typeof getFaqFaqsCategories>>["faqFaqsCategories"][number];


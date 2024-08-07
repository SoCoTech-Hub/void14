import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

export const faqs = pgTable("faqs", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  question: text("question"),
  answer: text("answer"),
});

// Schema for faqs - used to validate API requests
const baseSchema = createSelectSchema(faqs);

export const insertFaqSchema = createInsertSchema(faqs);
export const insertFaqParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateFaqSchema = baseSchema;
export const updateFaqParams = baseSchema.extend({});
export const faqIdSchema = baseSchema.pick({ id: true });

// Types for faqs - used to type API request params and within Components
export type Faq = typeof faqs.$inferSelect;
export type NewFaq = z.infer<typeof insertFaqSchema>;
export type NewFaqParams = z.infer<typeof insertFaqParams>;
export type UpdateFaqParams = z.infer<typeof updateFaqParams>;
export type FaqId = z.infer<typeof faqIdSchema>["id"];

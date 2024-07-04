import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getFeedbackTemplates } from "../../api/feedbackTemplates/queries";

export const feedbackTemplates = pgTable("feedback_templates", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  course: varchar("course", { length: 256 }),
  isPublic: boolean("is_public"),
  name: varchar("name", { length: 256 }),
});

// Schema for feedbackTemplates - used to validate API requests
const baseSchema = createSelectSchema(feedbackTemplates);

export const insertFeedbackTemplateSchema =
  createInsertSchema(feedbackTemplates);
export const insertFeedbackTemplateParams = baseSchema
  .extend({
    isPublic: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateFeedbackTemplateSchema = baseSchema;
export const updateFeedbackTemplateParams = baseSchema.extend({
  isPublic: z.coerce.boolean(),
});
export const feedbackTemplateIdSchema = baseSchema.pick({ id: true });

// Types for feedbackTemplates - used to type API request params and within Components
export type FeedbackTemplate = typeof feedbackTemplates.$inferSelect;
export type NewFeedbackTemplate = z.infer<typeof insertFeedbackTemplateSchema>;
export type NewFeedbackTemplateParams = z.infer<
  typeof insertFeedbackTemplateParams
>;
export type UpdateFeedbackTemplateParams = z.infer<
  typeof updateFeedbackTemplateParams
>;
export type FeedbackTemplateId = z.infer<typeof feedbackTemplateIdSchema>["id"];

// this type infers the return from getFeedbackTemplates() - meaning it will include any joins
export type CompleteFeedbackTemplate = Awaited<
  ReturnType<typeof getFeedbackTemplates>
>["feedbackTemplates"][number];

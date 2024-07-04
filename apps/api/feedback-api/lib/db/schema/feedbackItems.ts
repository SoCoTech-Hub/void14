import { boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getFeedbackItems } from "../api/feedbackItems/queries";

export const feedbackItems = pgTable("feedback_items", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  dependItem: varchar("depend_item", { length: 256 }),
  dependValue: varchar("depend_value", { length: 256 }),
  feedback: varchar("feedback", { length: 256 }),
  hasValue: boolean("has_value"),
  label: varchar("label", { length: 256 }),
  name: varchar("name", { length: 256 }),
  options: varchar("options", { length: 256 }),
  position: integer("position"),
  presentation: text("presentation"),
  required: boolean("required"),
  template: varchar("template", { length: 256 }),
  type: varchar("type", { length: 256 }),
});

// Schema for feedbackItems - used to validate API requests
const baseSchema = createSelectSchema(feedbackItems);

export const insertFeedbackItemSchema = createInsertSchema(feedbackItems);
export const insertFeedbackItemParams = baseSchema
  .extend({
    hasValue: z.coerce.boolean(),
    position: z.coerce.number(),
    required: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateFeedbackItemSchema = baseSchema;
export const updateFeedbackItemParams = baseSchema.extend({
  hasValue: z.coerce.boolean(),
  position: z.coerce.number(),
  required: z.coerce.boolean(),
});
export const feedbackItemIdSchema = baseSchema.pick({ id: true });

// Types for feedbackItems - used to type API request params and within Components
export type FeedbackItem = typeof feedbackItems.$inferSelect;
export type NewFeedbackItem = z.infer<typeof insertFeedbackItemSchema>;
export type NewFeedbackItemParams = z.infer<typeof insertFeedbackItemParams>;
export type UpdateFeedbackItemParams = z.infer<typeof updateFeedbackItemParams>;
export type FeedbackItemId = z.infer<typeof feedbackItemIdSchema>["id"];

// this type infers the return from getFeedbackItems() - meaning it will include any joins
export type CompleteFeedbackItem = Awaited<
  ReturnType<typeof getFeedbackItems>
>["feedbackItems"][number];

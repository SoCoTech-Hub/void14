import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

export const feedbackValues = pgTable("feedback_values", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  completed: varchar("completed", { length: 256 }),
  courseId: varchar("course_id", { length: 256 }),
  item: varchar("item", { length: 256 }),
  tmpCompleted: varchar("tmp_completed", { length: 256 }),
  value: text("value"),
});

// Schema for feedbackValues - used to validate API requests
const baseSchema = createSelectSchema(feedbackValues);

export const insertFeedbackValueSchema = createInsertSchema(feedbackValues);
export const insertFeedbackValueParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateFeedbackValueSchema = baseSchema;
export const updateFeedbackValueParams = baseSchema.extend({});
export const feedbackValueIdSchema = baseSchema.pick({ id: true });

// Types for feedbackValues - used to type API request params and within Components
export type FeedbackValue = typeof feedbackValues.$inferSelect;
export type NewFeedbackValue = z.infer<typeof insertFeedbackValueSchema>;
export type NewFeedbackValueParams = z.infer<typeof insertFeedbackValueParams>;
export type UpdateFeedbackValueParams = z.infer<
  typeof updateFeedbackValueParams
>;
export type FeedbackValueId = z.infer<typeof feedbackValueIdSchema>["id"];

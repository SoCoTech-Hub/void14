import { type getFeedbackCompleteds } from "@/lib/api/feedbackCompleteds/queries";
import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const feedbackCompleteds = pgTable("feedback_completeds", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  anonymousResponse: boolean("anonymous_response"),
  courseId: varchar("course_id", { length: 256 }),
  feedback: varchar("feedback", { length: 256 }),
  randomResponse: integer("random_response"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for feedbackCompleteds - used to validate API requests
const baseSchema = createSelectSchema(feedbackCompleteds).omit(timestamps);

export const insertFeedbackCompletedSchema =
  createInsertSchema(feedbackCompleteds).omit(timestamps);
export const insertFeedbackCompletedParams = baseSchema
  .extend({
    anonymousResponse: z.coerce.boolean(),
    randomResponse: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateFeedbackCompletedSchema = baseSchema;
export const updateFeedbackCompletedParams = baseSchema
  .extend({
    anonymousResponse: z.coerce.boolean(),
    randomResponse: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const feedbackCompletedIdSchema = baseSchema.pick({ id: true });

// Types for feedbackCompleteds - used to type API request params and within Components
export type FeedbackCompleted = typeof feedbackCompleteds.$inferSelect;
export type NewFeedbackCompleted = z.infer<
  typeof insertFeedbackCompletedSchema
>;
export type NewFeedbackCompletedParams = z.infer<
  typeof insertFeedbackCompletedParams
>;
export type UpdateFeedbackCompletedParams = z.infer<
  typeof updateFeedbackCompletedParams
>;
export type FeedbackCompletedId = z.infer<
  typeof feedbackCompletedIdSchema
>["id"];

// this type infers the return from getFeedbackCompleteds() - meaning it will include any joins
export type CompleteFeedbackCompleted = Awaited<
  ReturnType<typeof getFeedbackCompleteds>
>["feedbackCompleteds"][number];

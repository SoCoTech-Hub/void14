
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

export const feedbackCompletedtmps = pgTable("feedback_completedtmps", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  anonymousResponse: boolean("anonymous_response"),
  courseId: varchar("course_id", { length: 256 }),
  feedback: varchar("feedback", { length: 256 }),
  guestId: varchar("guest_id", { length: 256 }),
  randomResponse: integer("random_response"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for feedbackCompletedtmps - used to validate API requests
const baseSchema = createSelectSchema(feedbackCompletedtmps).omit(timestamps);

export const insertFeedbackCompletedtmpSchema = createInsertSchema(
  feedbackCompletedtmps,
).omit(timestamps);
export const insertFeedbackCompletedtmpParams = baseSchema
  .extend({
    anonymousResponse: z.coerce.boolean(),
    randomResponse: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateFeedbackCompletedtmpSchema = baseSchema;
export const updateFeedbackCompletedtmpParams = baseSchema
  .extend({
    anonymousResponse: z.coerce.boolean(),
    randomResponse: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const feedbackCompletedtmpIdSchema = baseSchema.pick({ id: true });

// Types for feedbackCompletedtmps - used to type API request params and within Components
export type FeedbackCompletedtmp = typeof feedbackCompletedtmps.$inferSelect;
export type NewFeedbackCompletedtmp = z.infer<
  typeof insertFeedbackCompletedtmpSchema
>;
export type NewFeedbackCompletedtmpParams = z.infer<
  typeof insertFeedbackCompletedtmpParams
>;
export type UpdateFeedbackCompletedtmpParams = z.infer<
  typeof updateFeedbackCompletedtmpParams
>;
export type FeedbackCompletedtmpId = z.infer<
  typeof feedbackCompletedtmpIdSchema
>["id"];



import { type getFeedbacks } from "@/lib/api/feedbacks/queries";
import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const feedbacks = pgTable("feedbacks", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  anonymous: boolean("anonymous"),
  autoNumbering: boolean("auto_numbering"),
  completionSubmit: boolean("completion_submit"),
  course: integer("course"),
  emailNotification: boolean("email_notification"),
  intro: text("intro"),
  introformat: integer("introformat"),
  multipleSubmit: boolean("multiple_submit"),
  name: varchar("name", { length: 256 }),
  pageAfterSubmit: text("page_after_submit"),
  pageAfterSubmitFormat: integer("page_after_submit_format"),
  publishStats: boolean("publish_stats"),
  siteAfterSubmit: varchar("site_after_submit", { length: 256 }),
  timeClose: timestamp("time_close"),
  timeOpen: timestamp("time_open"),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for feedbacks - used to validate API requests
const baseSchema = createSelectSchema(feedbacks).omit(timestamps);

export const insertFeedbackSchema =
  createInsertSchema(feedbacks).omit(timestamps);
export const insertFeedbackParams = baseSchema
  .extend({
    anonymous: z.coerce.boolean(),
    autoNumbering: z.coerce.boolean(),
    completionSubmit: z.coerce.boolean(),
    course: z.coerce.number(),
    emailNotification: z.coerce.boolean(),
    introformat: z.coerce.number(),
    multipleSubmit: z.coerce.boolean(),
    pageAfterSubmitFormat: z.coerce.number(),
    publishStats: z.coerce.boolean(),
    timeClose: z.coerce.string().min(1),
    timeOpen: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateFeedbackSchema = baseSchema;
export const updateFeedbackParams = baseSchema.extend({
  anonymous: z.coerce.boolean(),
  autoNumbering: z.coerce.boolean(),
  completionSubmit: z.coerce.boolean(),
  course: z.coerce.number(),
  emailNotification: z.coerce.boolean(),
  introformat: z.coerce.number(),
  multipleSubmit: z.coerce.boolean(),
  pageAfterSubmitFormat: z.coerce.number(),
  publishStats: z.coerce.boolean(),
  timeClose: z.coerce.string().min(1),
  timeOpen: z.coerce.string().min(1),
});
export const feedbackIdSchema = baseSchema.pick({ id: true });

// Types for feedbacks - used to type API request params and within Components
export type Feedback = typeof feedbacks.$inferSelect;
export type NewFeedback = z.infer<typeof insertFeedbackSchema>;
export type NewFeedbackParams = z.infer<typeof insertFeedbackParams>;
export type UpdateFeedbackParams = z.infer<typeof updateFeedbackParams>;
export type FeedbackId = z.infer<typeof feedbackIdSchema>["id"];

// this type infers the return from getFeedbacks() - meaning it will include any joins
export type CompleteFeedback = Awaited<
  ReturnType<typeof getFeedbacks>
>["feedbacks"][number];

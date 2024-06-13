import { varchar, text, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getFeedbackValuetmps } from "@/lib/api/feedbackValuetmps/queries";

import { nanoid } from "@/lib/utils";


export const feedbackValuetmps = pgTable('feedback_valuetmps', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  completed: varchar("completed", { length: 256 }),
  courseId: varchar("course_id", { length: 256 }),
  item: varchar("item", { length: 256 }),
  tmpCompleted: varchar("tmp_completed", { length: 256 }),
  value: text("value")
});


// Schema for feedbackValuetmps - used to validate API requests
const baseSchema = createSelectSchema(feedbackValuetmps)

export const insertFeedbackValuetmpSchema = createInsertSchema(feedbackValuetmps);
export const insertFeedbackValuetmpParams = baseSchema.extend({}).omit({ 
  id: true
});

export const updateFeedbackValuetmpSchema = baseSchema;
export const updateFeedbackValuetmpParams = baseSchema.extend({})
export const feedbackValuetmpIdSchema = baseSchema.pick({ id: true });

// Types for feedbackValuetmps - used to type API request params and within Components
export type FeedbackValuetmp = typeof feedbackValuetmps.$inferSelect;
export type NewFeedbackValuetmp = z.infer<typeof insertFeedbackValuetmpSchema>;
export type NewFeedbackValuetmpParams = z.infer<typeof insertFeedbackValuetmpParams>;
export type UpdateFeedbackValuetmpParams = z.infer<typeof updateFeedbackValuetmpParams>;
export type FeedbackValuetmpId = z.infer<typeof feedbackValuetmpIdSchema>["id"];
    
// this type infers the return from getFeedbackValuetmps() - meaning it will include any joins
export type CompleteFeedbackValuetmp = Awaited<ReturnType<typeof getFeedbackValuetmps>>["feedbackValuetmps"][number];


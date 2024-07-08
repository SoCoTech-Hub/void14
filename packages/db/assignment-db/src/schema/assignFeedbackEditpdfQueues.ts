
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const assignFeedbackEditpdfQueues = pgTable(
  "assign_feedback_editpdf_queues",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    attemptedConversions: varchar("attempted_conversions", { length: 256 }),
    submissionAttempt: integer("submission_attempt"),
    submissionId: varchar("submission_id", { length: 256 }),
  },
);

// Schema for assignFeedbackEditpdfQueues - used to validate API requests
const baseSchema = createSelectSchema(assignFeedbackEditpdfQueues);

export const insertAssignFeedbackEditpdfQueueSchema = createInsertSchema(
  assignFeedbackEditpdfQueues,
);
export const insertAssignFeedbackEditpdfQueueParams = baseSchema
  .extend({
    submissionAttempt: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateAssignFeedbackEditpdfQueueSchema = baseSchema;
export const updateAssignFeedbackEditpdfQueueParams = baseSchema.extend({
  submissionAttempt: z.coerce.number(),
});
export const assignFeedbackEditpdfQueueIdSchema = baseSchema.pick({ id: true });

// Types for assignFeedbackEditpdfQueues - used to type API request params and within Components
export type AssignFeedbackEditpdfQueue =
  typeof assignFeedbackEditpdfQueues.$inferSelect;
export type NewAssignFeedbackEditpdfQueue = z.infer<
  typeof insertAssignFeedbackEditpdfQueueSchema
>;
export type NewAssignFeedbackEditpdfQueueParams = z.infer<
  typeof insertAssignFeedbackEditpdfQueueParams
>;
export type UpdateAssignFeedbackEditpdfQueueParams = z.infer<
  typeof updateAssignFeedbackEditpdfQueueParams
>;
export type AssignFeedbackEditpdfQueueId = z.infer<
  typeof assignFeedbackEditpdfQueueIdSchema
>["id"];


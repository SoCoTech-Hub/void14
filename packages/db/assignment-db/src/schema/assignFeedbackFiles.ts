
import { integer, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { assignments } from "./assignments";

export const assignFeedbackFiles = pgTable(
  "assign_feedback_files",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    assignmentId: varchar("assignment_id", { length: 256 })
      .references(() => assignments.id)
      .notNull(),
    gradeId: varchar("grade_id", { length: 256 }),
    numFiles: integer("num_files"),
  },
  (assignFeedbackFiles) => {
    return {
      assignmentIdIndex: uniqueIndex("aff_assignment_id_idx").on(
        assignFeedbackFiles.assignmentId,
      ),
    };
  },
);

// Schema for assignFeedbackFiles - used to validate API requests
const baseSchema = createSelectSchema(assignFeedbackFiles);

export const insertAssignFeedbackFileSchema =
  createInsertSchema(assignFeedbackFiles);
export const insertAssignFeedbackFileParams = baseSchema
  .extend({
    assignmentId: z.coerce.string().min(1),
    numFiles: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateAssignFeedbackFileSchema = baseSchema;
export const updateAssignFeedbackFileParams = baseSchema.extend({
  assignmentId: z.coerce.string().min(1),
  numFiles: z.coerce.number(),
});
export const assignFeedbackFileIdSchema = baseSchema.pick({ id: true });

// Types for assignFeedbackFiles - used to type API request params and within Components
export type AssignFeedbackFile = typeof assignFeedbackFiles.$inferSelect;
export type NewAssignFeedbackFile = z.infer<
  typeof insertAssignFeedbackFileSchema
>;
export type NewAssignFeedbackFileParams = z.infer<
  typeof insertAssignFeedbackFileParams
>;
export type UpdateAssignFeedbackFileParams = z.infer<
  typeof updateAssignFeedbackFileParams
>;
export type AssignFeedbackFileId = z.infer<
  typeof assignFeedbackFileIdSchema
>["id"];



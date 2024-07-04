import { type getAssignSubmissionFiles } from "@/lib/api/assignSubmissionFiles/queries";
import { integer, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { assignments } from "./assignments";

export const assignSubmissionFiles = pgTable(
  "assign_submission_files",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    assignmentId: varchar("assignment_id", { length: 256 })
      .references(() => assignments.id)
      .notNull(),
    numFiles: integer("num_files"),
    submission: integer("submission"),
  },
  (assignSubmissionFiles) => {
    return {
      assignmentIdIndex: uniqueIndex("asf_assignment_id_idx").on(
        assignSubmissionFiles.assignmentId,
      ),
    };
  },
);

// Schema for assignSubmissionFiles - used to validate API requests
const baseSchema = createSelectSchema(assignSubmissionFiles);

export const insertAssignSubmissionFileSchema = createInsertSchema(
  assignSubmissionFiles,
);
export const insertAssignSubmissionFileParams = baseSchema
  .extend({
    assignmentId: z.coerce.string().min(1),
    numFiles: z.coerce.number(),
    submission: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateAssignSubmissionFileSchema = baseSchema;
export const updateAssignSubmissionFileParams = baseSchema.extend({
  assignmentId: z.coerce.string().min(1),
  numFiles: z.coerce.number(),
  submission: z.coerce.number(),
});
export const assignSubmissionFileIdSchema = baseSchema.pick({ id: true });

// Types for assignSubmissionFiles - used to type API request params and within Components
export type AssignSubmissionFile = typeof assignSubmissionFiles.$inferSelect;
export type NewAssignSubmissionFile = z.infer<
  typeof insertAssignSubmissionFileSchema
>;
export type NewAssignSubmissionFileParams = z.infer<
  typeof insertAssignSubmissionFileParams
>;
export type UpdateAssignSubmissionFileParams = z.infer<
  typeof updateAssignSubmissionFileParams
>;
export type AssignSubmissionFileId = z.infer<
  typeof assignSubmissionFileIdSchema
>["id"];

// this type infers the return from getAssignSubmissionFiles() - meaning it will include any joins
export type CompleteAssignSubmissionFile = Awaited<
  ReturnType<typeof getAssignSubmissionFiles>
>["assignSubmissionFiles"][number];

import {
  integer,
  pgTable,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getAssignSubmissionOnlineTexts } from "../api/assignSubmissionOnlineTexts/queries";
import { assignments } from "./assignments";

export const assignSubmissionOnlineTexts = pgTable(
  "assign_submission_online_texts",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    assignmentId: varchar("assignment_id", { length: 256 })
      .references(() => assignments.id)
      .notNull(),
    onlineFormat: integer("online_format"),
    onlineText: text("online_text"),
    submission: integer("submission"),
  },
  (assignSubmissionOnlineTexts) => {
    return {
      assignmentIdIndex: uniqueIndex("asot_assignment_id_idx").on(
        assignSubmissionOnlineTexts.assignmentId,
      ),
    };
  },
);

// Schema for assignSubmissionOnlineTexts - used to validate API requests
const baseSchema = createSelectSchema(assignSubmissionOnlineTexts);

export const insertAssignSubmissionOnlineTextSchema = createInsertSchema(
  assignSubmissionOnlineTexts,
);
export const insertAssignSubmissionOnlineTextParams = baseSchema
  .extend({
    assignmentId: z.coerce.string().min(1),
    onlineFormat: z.coerce.number(),
    submission: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateAssignSubmissionOnlineTextSchema = baseSchema;
export const updateAssignSubmissionOnlineTextParams = baseSchema.extend({
  assignmentId: z.coerce.string().min(1),
  onlineFormat: z.coerce.number(),
  submission: z.coerce.number(),
});
export const assignSubmissionOnlineTextIdSchema = baseSchema.pick({ id: true });

// Types for assignSubmissionOnlineTexts - used to type API request params and within Components
export type AssignSubmissionOnlineText =
  typeof assignSubmissionOnlineTexts.$inferSelect;
export type NewAssignSubmissionOnlineText = z.infer<
  typeof insertAssignSubmissionOnlineTextSchema
>;
export type NewAssignSubmissionOnlineTextParams = z.infer<
  typeof insertAssignSubmissionOnlineTextParams
>;
export type UpdateAssignSubmissionOnlineTextParams = z.infer<
  typeof updateAssignSubmissionOnlineTextParams
>;
export type AssignSubmissionOnlineTextId = z.infer<
  typeof assignSubmissionOnlineTextIdSchema
>["id"];

// this type infers the return from getAssignSubmissionOnlineTexts() - meaning it will include any joins
export type CompleteAssignSubmissionOnlineText = Awaited<
  ReturnType<typeof getAssignSubmissionOnlineTexts>
>["assignSubmissionOnlineTexts"][number];

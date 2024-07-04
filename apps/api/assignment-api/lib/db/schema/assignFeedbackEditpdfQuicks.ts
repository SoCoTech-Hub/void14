import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getAssignFeedbackEditpdfQuicks } from "../../api/assignFeedbackEditpdfQuicks/queries";

export const assignFeedbackEditpdfQuicks = pgTable(
  "assign_feedback_editpdf_quicks",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    color: varchar("color", { length: 256 }),
    rawText: text("raw_text"),
    width: integer("width"),
    userId: varchar("user_id", { length: 256 }).notNull(),
  },
);

// Schema for assignFeedbackEditpdfQuicks - used to validate API requests
const baseSchema = createSelectSchema(assignFeedbackEditpdfQuicks);

export const insertAssignFeedbackEditpdfQuickSchema = createInsertSchema(
  assignFeedbackEditpdfQuicks,
);
export const insertAssignFeedbackEditpdfQuickParams = baseSchema
  .extend({
    width: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateAssignFeedbackEditpdfQuickSchema = baseSchema;
export const updateAssignFeedbackEditpdfQuickParams = baseSchema
  .extend({
    width: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const assignFeedbackEditpdfQuickIdSchema = baseSchema.pick({ id: true });

// Types for assignFeedbackEditpdfQuicks - used to type API request params and within Components
export type AssignFeedbackEditpdfQuick =
  typeof assignFeedbackEditpdfQuicks.$inferSelect;
export type NewAssignFeedbackEditpdfQuick = z.infer<
  typeof insertAssignFeedbackEditpdfQuickSchema
>;
export type NewAssignFeedbackEditpdfQuickParams = z.infer<
  typeof insertAssignFeedbackEditpdfQuickParams
>;
export type UpdateAssignFeedbackEditpdfQuickParams = z.infer<
  typeof updateAssignFeedbackEditpdfQuickParams
>;
export type AssignFeedbackEditpdfQuickId = z.infer<
  typeof assignFeedbackEditpdfQuickIdSchema
>["id"];

// this type infers the return from getAssignFeedbackEditpdfQuicks() - meaning it will include any joins
export type CompleteAssignFeedbackEditpdfQuick = Awaited<
  ReturnType<typeof getAssignFeedbackEditpdfQuicks>
>["assignFeedbackEditpdfQuicks"][number];

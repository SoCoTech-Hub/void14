import { boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const assignFeedbackEditpdfCmnts = pgTable(
  "assign_feedback_editpdf_cmnts",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    color: varchar("color", { length: 256 }),
    draft: boolean("draft"),
    gradeId: varchar("grade_id", { length: 256 }),
    pageNo: integer("page_no"),
    rawText: text("raw_text"),
    width: integer("width"),
    x: integer("x"),
    y: integer("y"),
  },
);

// Schema for assignFeedbackEditpdfCmnts - used to validate API requests
const baseSchema = createSelectSchema(assignFeedbackEditpdfCmnts);

export const insertAssignFeedbackEditpdfCmntSchema = createInsertSchema(
  assignFeedbackEditpdfCmnts,
);
export const insertAssignFeedbackEditpdfCmntParams = baseSchema
  .extend({
    draft: z.coerce.boolean(),
    pageNo: z.coerce.number(),
    width: z.coerce.number(),
    x: z.coerce.number(),
    y: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateAssignFeedbackEditpdfCmntSchema = baseSchema;
export const updateAssignFeedbackEditpdfCmntParams = baseSchema.extend({
  draft: z.coerce.boolean(),
  pageNo: z.coerce.number(),
  width: z.coerce.number(),
  x: z.coerce.number(),
  y: z.coerce.number(),
});
export const assignFeedbackEditpdfCmntIdSchema = baseSchema.pick({ id: true });

// Types for assignFeedbackEditpdfCmnts - used to type API request params and within Components
export type AssignFeedbackEditpdfCmnt =
  typeof assignFeedbackEditpdfCmnts.$inferSelect;
export type NewAssignFeedbackEditpdfCmnt = z.infer<
  typeof insertAssignFeedbackEditpdfCmntSchema
>;
export type NewAssignFeedbackEditpdfCmntParams = z.infer<
  typeof insertAssignFeedbackEditpdfCmntParams
>;
export type UpdateAssignFeedbackEditpdfCmntParams = z.infer<
  typeof updateAssignFeedbackEditpdfCmntParams
>;
export type AssignFeedbackEditpdfCmntId = z.infer<
  typeof assignFeedbackEditpdfCmntIdSchema
>["id"];


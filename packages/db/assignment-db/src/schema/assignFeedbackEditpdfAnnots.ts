import { boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const assignFeedbackEditpdfAnnots = pgTable(
  "assign_feedback_editpdf_annots",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    color: varchar("color", { length: 256 }),
    draft: boolean("draft"),
    endX: integer("end_x"),
    endY: integer("end_y"),
    gradeId: varchar("grade_id", { length: 256 }),
    pageNo: integer("page_no"),
    path: text("path"),
    type: varchar("type", { length: 256 }),
    x: integer("x"),
    y: integer("y"),
  },
);

// Schema for assignFeedbackEditpdfAnnots - used to validate API requests
const baseSchema = createSelectSchema(assignFeedbackEditpdfAnnots);

export const insertAssignFeedbackEditpdfAnnotSchema = createInsertSchema(
  assignFeedbackEditpdfAnnots,
);
export const insertAssignFeedbackEditpdfAnnotParams = baseSchema
  .extend({
    draft: z.coerce.boolean(),
    endX: z.coerce.number(),
    endY: z.coerce.number(),
    pageNo: z.coerce.number(),
    x: z.coerce.number(),
    y: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateAssignFeedbackEditpdfAnnotSchema = baseSchema;
export const updateAssignFeedbackEditpdfAnnotParams = baseSchema.extend({
  draft: z.coerce.boolean(),
  endX: z.coerce.number(),
  endY: z.coerce.number(),
  pageNo: z.coerce.number(),
  x: z.coerce.number(),
  y: z.coerce.number(),
});
export const assignFeedbackEditpdfAnnotIdSchema = baseSchema.pick({ id: true });

// Types for assignFeedbackEditpdfAnnots - used to type API request params and within Components
export type AssignFeedbackEditpdfAnnot =
  typeof assignFeedbackEditpdfAnnots.$inferSelect;
export type NewAssignFeedbackEditpdfAnnot = z.infer<
  typeof insertAssignFeedbackEditpdfAnnotSchema
>;
export type NewAssignFeedbackEditpdfAnnotParams = z.infer<
  typeof insertAssignFeedbackEditpdfAnnotParams
>;
export type UpdateAssignFeedbackEditpdfAnnotParams = z.infer<
  typeof updateAssignFeedbackEditpdfAnnotParams
>;
export type AssignFeedbackEditpdfAnnotId = z.infer<
  typeof assignFeedbackEditpdfAnnotIdSchema
>["id"];


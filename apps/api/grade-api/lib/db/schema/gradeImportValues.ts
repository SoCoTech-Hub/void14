import { boolean, pgTable, real, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getGradeImportValues } from "../api/gradeImportValues/queries";

export const gradeImportValues = pgTable("grade_import_values", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  feedback: text("feedback"),
  finalGrade: real("final_grade"),
  importCode: varchar("import_code", { length: 256 }),
  importer: varchar("importer", { length: 256 }),
  importOnlyFeedback: boolean("import_only_feedback"),
  itemId: varchar("item_id", { length: 256 }),
  newGradeItem: varchar("new_grade_item", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for gradeImportValues - used to validate API requests
const baseSchema = createSelectSchema(gradeImportValues);

export const insertGradeImportValueSchema =
  createInsertSchema(gradeImportValues);
export const insertGradeImportValueParams = baseSchema
  .extend({
    finalGrade: z.coerce.number(),
    importOnlyFeedback: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateGradeImportValueSchema = baseSchema;
export const updateGradeImportValueParams = baseSchema
  .extend({
    finalGrade: z.coerce.number(),
    importOnlyFeedback: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const gradeImportValueIdSchema = baseSchema.pick({ id: true });

// Types for gradeImportValues - used to type API request params and within Components
export type GradeImportValue = typeof gradeImportValues.$inferSelect;
export type NewGradeImportValue = z.infer<typeof insertGradeImportValueSchema>;
export type NewGradeImportValueParams = z.infer<
  typeof insertGradeImportValueParams
>;
export type UpdateGradeImportValueParams = z.infer<
  typeof updateGradeImportValueParams
>;
export type GradeImportValueId = z.infer<typeof gradeImportValueIdSchema>["id"];

// this type infers the return from getGradeImportValues() - meaning it will include any joins
export type CompleteGradeImportValue = Awaited<
  ReturnType<typeof getGradeImportValues>
>["gradeImportValues"][number];

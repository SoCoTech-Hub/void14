import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getGradeImportNewitems } from "../api/gradeImportNewitems/queries";

export const gradeImportNewitems = pgTable("grade_import_newitems", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  importCode: varchar("import_code", { length: 256 }),
  importer: varchar("importer", { length: 256 }),
  itemName: varchar("item_name", { length: 256 }),
});

// Schema for gradeImportNewitems - used to validate API requests
const baseSchema = createSelectSchema(gradeImportNewitems);

export const insertGradeImportNewitemSchema =
  createInsertSchema(gradeImportNewitems);
export const insertGradeImportNewitemParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateGradeImportNewitemSchema = baseSchema;
export const updateGradeImportNewitemParams = baseSchema.extend({});
export const gradeImportNewitemIdSchema = baseSchema.pick({ id: true });

// Types for gradeImportNewitems - used to type API request params and within Components
export type GradeImportNewitem = typeof gradeImportNewitems.$inferSelect;
export type NewGradeImportNewitem = z.infer<
  typeof insertGradeImportNewitemSchema
>;
export type NewGradeImportNewitemParams = z.infer<
  typeof insertGradeImportNewitemParams
>;
export type UpdateGradeImportNewitemParams = z.infer<
  typeof updateGradeImportNewitemParams
>;
export type GradeImportNewitemId = z.infer<
  typeof gradeImportNewitemIdSchema
>["id"];

// this type infers the return from getGradeImportNewitems() - meaning it will include any joins
export type CompleteGradeImportNewitem = Awaited<
  ReturnType<typeof getGradeImportNewitems>
>["gradeImportNewitems"][number];

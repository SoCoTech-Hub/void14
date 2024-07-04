import { type getSubjectsSubjectCategories } from "@/lib/api/subjectsSubjectCategories/queries";
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { subjectCategories } from "./subjectCategories";
import { subjects } from "./subjects";

export const subjectsSubjectCategories = pgTable(
  "subjects_subject_categories",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    subjectCategoryId: varchar("subject_category_id", { length: 191 })
      .references(() => subjectCategories.id, { onDelete: "cascade" })
      .notNull(),
    subjectId: varchar("subject_id", { length: 191 })
      .references(() => subjects.id, { onDelete: "cascade" })
      .notNull(),
  },
);

// Schema for subjectsSubjectCategories - used to validate API requests
const baseSchema = createSelectSchema(subjectsSubjectCategories);

export const insertSubjectsSubjectCategorySchema = createInsertSchema(
  subjectsSubjectCategories,
);
export const insertSubjectsSubjectCategoryParams = baseSchema
  .extend({
    subjectCategoryId: z.coerce.string().min(1),
    subjectId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateSubjectsSubjectCategorySchema = baseSchema;
export const updateSubjectsSubjectCategoryParams = baseSchema.extend({
  subjectCategoryId: z.coerce.string().min(1),
  subjectId: z.coerce.string().min(1),
});
export const subjectsSubjectCategoryIdSchema = baseSchema.pick({ id: true });

// Types for subjectsSubjectCategories - used to type API request params and within Components
export type SubjectsSubjectCategory =
  typeof subjectsSubjectCategories.$inferSelect;
export type NewSubjectsSubjectCategory = z.infer<
  typeof insertSubjectsSubjectCategorySchema
>;
export type NewSubjectsSubjectCategoryParams = z.infer<
  typeof insertSubjectsSubjectCategoryParams
>;
export type UpdateSubjectsSubjectCategoryParams = z.infer<
  typeof updateSubjectsSubjectCategoryParams
>;
export type SubjectsSubjectCategoryId = z.infer<
  typeof subjectsSubjectCategoryIdSchema
>["id"];

// this type infers the return from getSubjectsSubjectCategories() - meaning it will include any joins
export type CompleteSubjectsSubjectCategory = Awaited<
  ReturnType<typeof getSubjectsSubjectCategories>
>["subjectsSubjectCategories"][number];

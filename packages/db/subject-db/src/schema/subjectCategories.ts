import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const subjectCategories = pgTable("subject_categories", {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  image: varchar("image", { length: 256 }),
});

// Schema for subjectCategories - used to validate API requests
const baseSchema = createSelectSchema(subjectCategories);

export const insertSubjectCategorySchema =
  createInsertSchema(subjectCategories);
export const insertSubjectCategoryParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateSubjectCategorySchema = baseSchema;
export const updateSubjectCategoryParams = baseSchema.extend({});
export const subjectCategoryIdSchema = baseSchema.pick({ id: true });

// Types for subjectCategories - used to type API request params and within Components
export type SubjectCategory = typeof subjectCategories.$inferSelect;
export type NewSubjectCategory = z.infer<typeof insertSubjectCategorySchema>;
export type NewSubjectCategoryParams = z.infer<
  typeof insertSubjectCategoryParams
>;
export type UpdateSubjectCategoryParams = z.infer<
  typeof updateSubjectCategoryParams
>;
export type SubjectCategoryId = z.infer<typeof subjectCategoryIdSchema>["id"];


import { sql } from "drizzle-orm";
import { integer, varchar, boolean, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getCourseCategories } from "@/lib/api/courseCategories/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const courseCategories = pgTable('course_categories', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  courseCount: integer("course_count"),
  depth: integer("depth"),
  parentId: varchar("parent_id", { length: 256 }),
  sortOrder: integer("sort_order"),
  visible: boolean("visible"),
  description: text("description"),
  idNumber: varchar("id_number", { length: 256 }),
  name: varchar("name", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

}, (courseCategories) => {
  return {
    nameIndex: uniqueIndex('name_idx').on(courseCategories.name),
  }
});


// Schema for courseCategories - used to validate API requests
const baseSchema = createSelectSchema(courseCategories).omit(timestamps)

export const insertCourseCategorySchema = createInsertSchema(courseCategories).omit(timestamps);
export const insertCourseCategoryParams = baseSchema.extend({
  courseCount: z.coerce.number(),
  depth: z.coerce.number(),
  sortOrder: z.coerce.number(),
  visible: z.coerce.boolean()
}).omit({ 
  id: true
});

export const updateCourseCategorySchema = baseSchema;
export const updateCourseCategoryParams = baseSchema.extend({
  courseCount: z.coerce.number(),
  depth: z.coerce.number(),
  sortOrder: z.coerce.number(),
  visible: z.coerce.boolean()
})
export const courseCategoryIdSchema = baseSchema.pick({ id: true });

// Types for courseCategories - used to type API request params and within Components
export type CourseCategory = typeof courseCategories.$inferSelect;
export type NewCourseCategory = z.infer<typeof insertCourseCategorySchema>;
export type NewCourseCategoryParams = z.infer<typeof insertCourseCategoryParams>;
export type UpdateCourseCategoryParams = z.infer<typeof updateCourseCategoryParams>;
export type CourseCategoryId = z.infer<typeof courseCategoryIdSchema>["id"];
    
// this type infers the return from getCourseCategories() - meaning it will include any joins
export type CompleteCourseCategory = Awaited<ReturnType<typeof getCourseCategories>>["courseCategories"][number];


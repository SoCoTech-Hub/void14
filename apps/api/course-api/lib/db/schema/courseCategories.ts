import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getCourseCategories } from "../api/courseCategories/queries";

export const courseCategories = pgTable("course_categories", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  courseCount: integer("course_count"),
  depth: integer("depth"),
  description: text("description"),
  descriptionFormat: integer("description_format"),
  idNumber: varchar("id_number", { length: 256 }),
  name: varchar("name", { length: 256 }),
  parent: integer("parent"),
  path: varchar("path", { length: 256 }),
  sortOrder: integer("sort_order"),
  theme: varchar("theme", { length: 256 }),
  visible: boolean("visible"),
  visibleOld: boolean("visible_old"),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for courseCategories - used to validate API requests
const baseSchema = createSelectSchema(courseCategories).omit(timestamps);

export const insertCourseCategorySchema =
  createInsertSchema(courseCategories).omit(timestamps);
export const insertCourseCategoryParams = baseSchema
  .extend({
    courseCount: z.coerce.number(),
    depth: z.coerce.number(),
    descriptionFormat: z.coerce.number(),
    parent: z.coerce.number(),
    sortOrder: z.coerce.number(),
    visible: z.coerce.boolean(),
    visibleOld: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateCourseCategorySchema = baseSchema;
export const updateCourseCategoryParams = baseSchema.extend({
  courseCount: z.coerce.number(),
  depth: z.coerce.number(),
  descriptionFormat: z.coerce.number(),
  parent: z.coerce.number(),
  sortOrder: z.coerce.number(),
  visible: z.coerce.boolean(),
  visibleOld: z.coerce.boolean(),
});
export const courseCategoryIdSchema = baseSchema.pick({ id: true });

// Types for courseCategories - used to type API request params and within Components
export type CourseCategory = typeof courseCategories.$inferSelect;
export type NewCourseCategory = z.infer<typeof insertCourseCategorySchema>;
export type NewCourseCategoryParams = z.infer<
  typeof insertCourseCategoryParams
>;
export type UpdateCourseCategoryParams = z.infer<
  typeof updateCourseCategoryParams
>;
export type CourseCategoryId = z.infer<typeof courseCategoryIdSchema>["id"];

// this type infers the return from getCourseCategories() - meaning it will include any joins
export type CompleteCourseCategory = Awaited<
  ReturnType<typeof getCourseCategories>
>["courseCategories"][number];

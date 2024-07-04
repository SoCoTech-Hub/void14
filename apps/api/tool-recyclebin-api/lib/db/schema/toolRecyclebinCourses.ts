import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getToolRecyclebinCourses } from "../../api/toolRecyclebinCourses/queries";

export const toolRecyclebinCourses = pgTable("tool_recyclebin_courses", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  courseId: varchar("course_id", { length: 256 }),
  moduleId: varchar("module_id", { length: 256 }),
  name: varchar("name", { length: 256 }),
  sectionId: varchar("section_id", { length: 256 }),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for toolRecyclebinCourses - used to validate API requests
const baseSchema = createSelectSchema(toolRecyclebinCourses).omit(timestamps);

export const insertToolRecyclebinCourseSchema = createInsertSchema(
  toolRecyclebinCourses,
).omit(timestamps);
export const insertToolRecyclebinCourseParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateToolRecyclebinCourseSchema = baseSchema;
export const updateToolRecyclebinCourseParams = baseSchema.extend({});
export const toolRecyclebinCourseIdSchema = baseSchema.pick({ id: true });

// Types for toolRecyclebinCourses - used to type API request params and within Components
export type ToolRecyclebinCourse = typeof toolRecyclebinCourses.$inferSelect;
export type NewToolRecyclebinCourse = z.infer<
  typeof insertToolRecyclebinCourseSchema
>;
export type NewToolRecyclebinCourseParams = z.infer<
  typeof insertToolRecyclebinCourseParams
>;
export type UpdateToolRecyclebinCourseParams = z.infer<
  typeof updateToolRecyclebinCourseParams
>;
export type ToolRecyclebinCourseId = z.infer<
  typeof toolRecyclebinCourseIdSchema
>["id"];

// this type infers the return from getToolRecyclebinCourses() - meaning it will include any joins
export type CompleteToolRecyclebinCourse = Awaited<
  ReturnType<typeof getToolRecyclebinCourses>
>["toolRecyclebinCourses"][number];

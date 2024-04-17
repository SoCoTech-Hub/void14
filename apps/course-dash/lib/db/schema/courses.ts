import { sql } from "drizzle-orm";
import { integer, varchar, timestamp, boolean, text, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { courseCategories } from "./courseCategories"
import { type getCourses } from "@/lib/api/courses/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const courses = pgTable('courses', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  revId: integer("rev_id"),
  courseCategoryId: varchar("course_category_id", { length: 256 }).references(() => courseCategories.id).notNull(),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  marker: integer("marker"),
  originalCourseId: varchar("original_course_id", { length: 256 }),
  sortOrder: integer("sort_order"),
  completionNotify: boolean("completion_notify"),
  downloadContent: boolean("download_content"),
  enableCompletion: boolean("enable_completion"),
  showActivityDates: boolean("show_activity_dates"),
  visible: boolean("visible"),
  summary: text("summary"),
  groupMode: integer("group_mode"),
  groupModeForce: integer("group_mode_force"),
  showReports: integer("show_reports"),
  showGrades: integer("show_grades"),
  fullName: varchar("full_name", { length: 256 }),
  idNumber: varchar("id_number", { length: 256 }),
  lang: varchar("lang", { length: 256 }),
  shortName: varchar("short_name", { length: 256 }),
  theme: varchar("theme", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

}, (courses) => {
  return {
    fullNameIndex: uniqueIndex('full_name_idx').on(courses.fullName),
  }
});


// Schema for courses - used to validate API requests
const baseSchema = createSelectSchema(courses).omit(timestamps)

export const insertCourseSchema = createInsertSchema(courses).omit(timestamps);
export const insertCourseParams = baseSchema.extend({
  revId: z.coerce.number(),
  courseCategoryId: z.coerce.string().min(1),
  startDate: z.coerce.string().min(1),
  endDate: z.coerce.string().min(1),
  marker: z.coerce.number(),
  sortOrder: z.coerce.number(),
  completionNotify: z.coerce.boolean(),
  downloadContent: z.coerce.boolean(),
  enableCompletion: z.coerce.boolean(),
  showActivityDates: z.coerce.boolean(),
  visible: z.coerce.boolean(),
  groupMode: z.coerce.number(),
  groupModeForce: z.coerce.number(),
  showReports: z.coerce.number(),
  showGrades: z.coerce.number()
}).omit({ 
  id: true
});

export const updateCourseSchema = baseSchema;
export const updateCourseParams = baseSchema.extend({
  revId: z.coerce.number(),
  courseCategoryId: z.coerce.string().min(1),
  startDate: z.coerce.string().min(1),
  endDate: z.coerce.string().min(1),
  marker: z.coerce.number(),
  sortOrder: z.coerce.number(),
  completionNotify: z.coerce.boolean(),
  downloadContent: z.coerce.boolean(),
  enableCompletion: z.coerce.boolean(),
  showActivityDates: z.coerce.boolean(),
  visible: z.coerce.boolean(),
  groupMode: z.coerce.number(),
  groupModeForce: z.coerce.number(),
  showReports: z.coerce.number(),
  showGrades: z.coerce.number()
})
export const courseIdSchema = baseSchema.pick({ id: true });

// Types for courses - used to type API request params and within Components
export type Course = typeof courses.$inferSelect;
export type NewCourse = z.infer<typeof insertCourseSchema>;
export type NewCourseParams = z.infer<typeof insertCourseParams>;
export type UpdateCourseParams = z.infer<typeof updateCourseParams>;
export type CourseId = z.infer<typeof courseIdSchema>["id"];
    
// this type infers the return from getCourses() - meaning it will include any joins
export type CompleteCourse = Awaited<ReturnType<typeof getCourses>>["courses"][number];


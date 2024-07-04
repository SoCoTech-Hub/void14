import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getCourses } from "../api/courses/queries";

export const courses = pgTable("courses", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  cacheRev: integer("cache_rev"),
  calendarType: varchar("calendar_type", { length: 256 }),
  category: integer("category"),
  completionNotify: boolean("completion_notify"),
  defaultGroupingId: varchar("default_grouping_id", { length: 191 }),
  downloadContent: boolean("download_content"),
  enableCompletion: boolean("enable_completion"),
  endDate: date("end_date"),
  format: varchar("format", { length: 256 }),
  fullName: varchar("full_name", { length: 256 }),
  groupMode: integer("group_mode"),
  groupModeForce: integer("group_mode_force"),
  idNumber: varchar("id_number", { length: 256 }),
  lang: varchar("lang", { length: 256 }),
  legacyFiles: integer("legacy_files"),
  marker: integer("marker"),
  maxBytes: integer("max_bytes"),
  newsItems: integer("news_items"),
  originalCourseId: varchar("original_course_id", { length: 256 }),
  relativeDatesMode: boolean("relative_dates_mode"),
  requested: boolean("requested"),
  shortName: varchar("short_name", { length: 256 }),
  showActivityDates: boolean("show_activity_dates"),
  showCompletionConditions: boolean("show_completion_conditions"),
  showGrades: integer("show_grades"),
  showReports: integer("show_reports"),
  sortOrder: integer("sort_order"),
  startDate: integer("start_date"),
  summary: text("summary"),
  summaryFormat: integer("summary_format"),
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

// Schema for courses - used to validate API requests
const baseSchema = createSelectSchema(courses).omit(timestamps);

export const insertCourseSchema = createInsertSchema(courses).omit(timestamps);
export const insertCourseParams = baseSchema
  .extend({
    cacheRev: z.coerce.number(),
    category: z.coerce.number(),
    completionNotify: z.coerce.boolean(),
    defaultGroupingId: z.coerce.number(),
    downloadContent: z.coerce.boolean(),
    enableCompletion: z.coerce.boolean(),
    endDate: z.coerce.string().min(1),
    groupMode: z.coerce.number(),
    groupModeForce: z.coerce.number(),
    legacyFiles: z.coerce.number(),
    marker: z.coerce.number(),
    maxBytes: z.coerce.number(),
    newsItems: z.coerce.number(),
    relativeDatesMode: z.coerce.boolean(),
    requested: z.coerce.boolean(),
    showActivityDates: z.coerce.boolean(),
    showCompletionConditions: z.coerce.boolean(),
    showGrades: z.coerce.number(),
    showReports: z.coerce.number(),
    sortOrder: z.coerce.number(),
    startDate: z.coerce.number(),
    summaryFormat: z.coerce.number(),
    visible: z.coerce.boolean(),
    visibleOld: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateCourseSchema = baseSchema;
export const updateCourseParams = baseSchema.extend({
  cacheRev: z.coerce.number(),
  category: z.coerce.number(),
  completionNotify: z.coerce.boolean(),
  defaultGroupingId: z.coerce.number(),
  downloadContent: z.coerce.boolean(),
  enableCompletion: z.coerce.boolean(),
  endDate: z.coerce.string().min(1),
  groupMode: z.coerce.number(),
  groupModeForce: z.coerce.number(),
  legacyFiles: z.coerce.number(),
  marker: z.coerce.number(),
  maxBytes: z.coerce.number(),
  newsItems: z.coerce.number(),
  relativeDatesMode: z.coerce.boolean(),
  requested: z.coerce.boolean(),
  showActivityDates: z.coerce.boolean(),
  showCompletionConditions: z.coerce.boolean(),
  showGrades: z.coerce.number(),
  showReports: z.coerce.number(),
  sortOrder: z.coerce.number(),
  startDate: z.coerce.number(),
  summaryFormat: z.coerce.number(),
  visible: z.coerce.boolean(),
  visibleOld: z.coerce.boolean(),
});
export const courseIdSchema = baseSchema.pick({ id: true });

// Types for courses - used to type API request params and within Components
export type Course = typeof courses.$inferSelect;
export type NewCourse = z.infer<typeof insertCourseSchema>;
export type NewCourseParams = z.infer<typeof insertCourseParams>;
export type UpdateCourseParams = z.infer<typeof updateCourseParams>;
export type CourseId = z.infer<typeof courseIdSchema>["id"];

// this type infers the return from getCourses() - meaning it will include any joins
export type CompleteCourse = Awaited<
  ReturnType<typeof getCourses>
>["courses"][number];

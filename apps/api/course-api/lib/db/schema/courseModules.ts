import { type getCourseModules } from "@/lib/api/courseModules/queries";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { courses } from "./courses";

export const courseModules = pgTable(
  "course_modules",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    added: varchar("added", { length: 256 }),
    completionExpected: timestamp("completion_expected"),
    completionGradeItemNumber: varchar("completion_grade_item_number", {
      length: 256,
    }),
    courseId: varchar("course_id", { length: 256 })
      .references(() => courses.id)
      .notNull(),
    groupingId: varchar("grouping_id", { length: 256 }),
    instance: varchar("instance", { length: 256 }),
    moduleId: varchar("module_id", { length: 256 }),
    sectionId: varchar("section_id", { length: 256 }),
    completionPassGrade: boolean("completion_pass_grade"),
    completionView: boolean("completion_view"),
    groupMode: integer("group_mode"),
    score: integer("score"),
    idNumber: varchar("id_number", { length: 256 }),
    availabilityRestrictions: text("availability_restrictions"),
    deletionInProgress: boolean("deletion_in_progress"),
    downloadContent: boolean("download_content"),
    showDescription: boolean("show_description"),
    visible: boolean("visible"),
    visibleOnCoursePage: boolean("visible_on_course_page"),
    completion: varchar("completion", { length: 256 }),
  },
  (courseModules) => {
    return {
      courseIdIndex: uniqueIndex("course_modules_course_id_idx").on(
        courseModules.courseId,
      ),
    };
  },
);

// Schema for courseModules - used to validate API requests
const baseSchema = createSelectSchema(courseModules);

export const insertCourseModuleSchema = createInsertSchema(courseModules);
export const insertCourseModuleParams = baseSchema
  .extend({
    completionExpected: z.coerce.string().min(1),
    courseId: z.coerce.string().min(1),
    completionPassGrade: z.coerce.boolean(),
    completionView: z.coerce.boolean(),
    groupMode: z.coerce.number(),
    score: z.coerce.number(),
    deletionInProgress: z.coerce.boolean(),
    downloadContent: z.coerce.boolean(),
    showDescription: z.coerce.boolean(),
    visible: z.coerce.boolean(),
    visibleOnCoursePage: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateCourseModuleSchema = baseSchema;
export const updateCourseModuleParams = baseSchema.extend({
  completionExpected: z.coerce.string().min(1),
  courseId: z.coerce.string().min(1),
  completionPassGrade: z.coerce.boolean(),
  completionView: z.coerce.boolean(),
  groupMode: z.coerce.number(),
  score: z.coerce.number(),
  deletionInProgress: z.coerce.boolean(),
  downloadContent: z.coerce.boolean(),
  showDescription: z.coerce.boolean(),
  visible: z.coerce.boolean(),
  visibleOnCoursePage: z.coerce.boolean(),
});
export const courseModuleIdSchema = baseSchema.pick({ id: true });

// Types for courseModules - used to type API request params and within Components
export type CourseModule = typeof courseModules.$inferSelect;
export type NewCourseModule = z.infer<typeof insertCourseModuleSchema>;
export type NewCourseModuleParams = z.infer<typeof insertCourseModuleParams>;
export type UpdateCourseModuleParams = z.infer<typeof updateCourseModuleParams>;
export type CourseModuleId = z.infer<typeof courseModuleIdSchema>["id"];

// this type infers the return from getCourseModules() - meaning it will include any joins
export type CompleteCourseModule = Awaited<
  ReturnType<typeof getCourseModules>
>["courseModules"][number];

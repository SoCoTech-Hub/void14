import { pgTable, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getCourseCompletions } from "../../api/courseCompletions/queries";
import { courses } from "./courses";

export const courseCompletions = pgTable(
  "course_completions",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    courseId: varchar("course_id", { length: 256 })
      .references(() => courses.id)
      .notNull(),
    timeCompleted: timestamp("time_completed"),
    timeEnrolled: timestamp("time_enrolled"),
    timeStarted: timestamp("time_started"),
    userId: varchar("user_id", { length: 256 }).notNull(),
  },
  (courseCompletions) => {
    return {
      courseIdIndex: uniqueIndex("course_completions_course_id_idx").on(
        courseCompletions.courseId,
      ),
    };
  },
);

// Schema for courseCompletions - used to validate API requests
const baseSchema = createSelectSchema(courseCompletions);

export const insertCourseCompletionSchema =
  createInsertSchema(courseCompletions);
export const insertCourseCompletionParams = baseSchema
  .extend({
    courseId: z.coerce.string().min(1),
    timeCompleted: z.coerce.string().min(1),
    timeEnrolled: z.coerce.string().min(1),
    timeStarted: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateCourseCompletionSchema = baseSchema;
export const updateCourseCompletionParams = baseSchema
  .extend({
    courseId: z.coerce.string().min(1),
    timeCompleted: z.coerce.string().min(1),
    timeEnrolled: z.coerce.string().min(1),
    timeStarted: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const courseCompletionIdSchema = baseSchema.pick({ id: true });

// Types for courseCompletions - used to type API request params and within Components
export type CourseCompletion = typeof courseCompletions.$inferSelect;
export type NewCourseCompletion = z.infer<typeof insertCourseCompletionSchema>;
export type NewCourseCompletionParams = z.infer<
  typeof insertCourseCompletionParams
>;
export type UpdateCourseCompletionParams = z.infer<
  typeof updateCourseCompletionParams
>;
export type CourseCompletionId = z.infer<typeof courseCompletionIdSchema>["id"];

// this type infers the return from getCourseCompletions() - meaning it will include any joins
export type CompleteCourseCompletion = Awaited<
  ReturnType<typeof getCourseCompletions>
>["courseCompletions"][number];

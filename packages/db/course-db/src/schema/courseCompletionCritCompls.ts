import {
  pgTable,
  real,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

import { courses } from "./courses";

export const courseCompletionCritCompls = pgTable(
  "course_completion_crit_compls",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    courseId: varchar("course_id", { length: 256 })
      .references(() => courses.id)
      .notNull(),
    timeCompleted: timestamp("time_completed"),
    timeUnenrolled: timestamp("time_unenrolled"),
    gradeFinal: real("grade_final"),
    userId: varchar("user_id", { length: 256 }).notNull(),
  },
  (courseCompletionCritCompls) => {
    return {
      courseIdIndex: uniqueIndex("course_id_idx").on(
        courseCompletionCritCompls.courseId,
      ),
    };
  },
);

// Schema for courseCompletionCritCompls - used to validate API requests
const baseSchema = createSelectSchema(courseCompletionCritCompls);

export const insertCourseCompletionCritComplSchema = createInsertSchema(
  courseCompletionCritCompls,
);
export const insertCourseCompletionCritComplParams = baseSchema
  .extend({
    courseId: z.coerce.string().min(1),
    timeCompleted: z.coerce.string().min(1),
    timeUnenrolled: z.coerce.string().min(1),
    gradeFinal: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateCourseCompletionCritComplSchema = baseSchema;
export const updateCourseCompletionCritComplParams = baseSchema
  .extend({
    courseId: z.coerce.string().min(1),
    timeCompleted: z.coerce.string().min(1),
    timeUnenrolled: z.coerce.string().min(1),
    gradeFinal: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const courseCompletionCritComplIdSchema = baseSchema.pick({ id: true });

// Types for courseCompletionCritCompls - used to type API request params and within Components
export type CourseCompletionCritCompl =
  typeof courseCompletionCritCompls.$inferSelect;
export type NewCourseCompletionCritCompl = z.infer<
  typeof insertCourseCompletionCritComplSchema
>;
export type NewCourseCompletionCritComplParams = z.infer<
  typeof insertCourseCompletionCritComplParams
>;
export type UpdateCourseCompletionCritComplParams = z.infer<
  typeof updateCourseCompletionCritComplParams
>;
export type CourseCompletionCritComplId = z.infer<
  typeof courseCompletionCritComplIdSchema
>["id"];

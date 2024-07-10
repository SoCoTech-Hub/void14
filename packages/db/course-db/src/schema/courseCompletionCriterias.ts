import {
  integer,
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

export const courseCompletionCriterias = pgTable(
  "course_completion_criterias",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    courseId: varchar("course_id", { length: 256 })
      .references(() => courses.id)
      .notNull(),
    courseInstanceId: varchar("course_instance_id", { length: 256 }),
    criteriaType: varchar("criteria_type", { length: 256 }),
    enrolPeriodDays: integer("enrol_period_days"),
    roleId: varchar("role_id", { length: 256 }),
    timeStart: timestamp("time_start"),
    timeEnd: timestamp("time_end"),
    gradePass: real("grade_pass"),
    moduleType: varchar("module_type", { length: 256 }),
    completionExpectedDate: timestamp("completion_expected_date"),
    removeThisField: varchar("remove_this_field", { length: 256 }),
  },
  (courseCompletionCriterias) => {
    return {
      courseIdIndex: uniqueIndex("course_id_idx").on(
        courseCompletionCriterias.courseId,
      ),
    };
  },
);

// Schema for courseCompletionCriterias - used to validate API requests
const baseSchema = createSelectSchema(courseCompletionCriterias);

export const insertCourseCompletionCriteriaSchema = createInsertSchema(
  courseCompletionCriterias,
);
export const insertCourseCompletionCriteriaParams = baseSchema
  .extend({
    courseId: z.coerce.string().min(1),
    enrolPeriodDays: z.coerce.number(),
    timeStart: z.coerce.string().min(1),
    timeEnd: z.coerce.string().min(1),
    gradePass: z.coerce.number(),
    completionExpectedDate: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateCourseCompletionCriteriaSchema = baseSchema;
export const updateCourseCompletionCriteriaParams = baseSchema.extend({
  courseId: z.coerce.string().min(1),
  enrolPeriodDays: z.coerce.number(),
  timeStart: z.coerce.string().min(1),
  timeEnd: z.coerce.string().min(1),
  gradePass: z.coerce.number(),
  completionExpectedDate: z.coerce.string().min(1),
});
export const courseCompletionCriteriaIdSchema = baseSchema.pick({ id: true });

// Types for courseCompletionCriterias - used to type API request params and within Components
export type CourseCompletionCriteria =
  typeof courseCompletionCriterias.$inferSelect;
export type NewCourseCompletionCriteria = z.infer<
  typeof insertCourseCompletionCriteriaSchema
>;
export type NewCourseCompletionCriteriaParams = z.infer<
  typeof insertCourseCompletionCriteriaParams
>;
export type UpdateCourseCompletionCriteriaParams = z.infer<
  typeof updateCourseCompletionCriteriaParams
>;
export type CourseCompletionCriteriaId = z.infer<
  typeof courseCompletionCriteriaIdSchema
>["id"];

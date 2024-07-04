import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getCourseModulesCompletions } from "../../api/courseModulesCompletions/queries";

export const courseModulesCompletions = pgTable(
  "course_modules_completions",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    courseModuleId: varchar("course_module_id", { length: 256 }),
    completionState: varchar("completion_state", { length: 256 }),
    viewed: boolean("viewed"),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (courseModulesCompletions) => {
    return {
      courseModuleIdIndex: uniqueIndex(
        "course_modules_completions_course_module_id_idx",
      ).on(courseModulesCompletions.courseModuleId),
    };
  },
);

// Schema for courseModulesCompletions - used to validate API requests
const baseSchema = createSelectSchema(courseModulesCompletions).omit(
  timestamps,
);

export const insertCourseModulesCompletionSchema = createInsertSchema(
  courseModulesCompletions,
).omit(timestamps);
export const insertCourseModulesCompletionParams = baseSchema
  .extend({
    viewed: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateCourseModulesCompletionSchema = baseSchema;
export const updateCourseModulesCompletionParams = baseSchema
  .extend({
    viewed: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const courseModulesCompletionIdSchema = baseSchema.pick({ id: true });

// Types for courseModulesCompletions - used to type API request params and within Components
export type CourseModulesCompletion =
  typeof courseModulesCompletions.$inferSelect;
export type NewCourseModulesCompletion = z.infer<
  typeof insertCourseModulesCompletionSchema
>;
export type NewCourseModulesCompletionParams = z.infer<
  typeof insertCourseModulesCompletionParams
>;
export type UpdateCourseModulesCompletionParams = z.infer<
  typeof updateCourseModulesCompletionParams
>;
export type CourseModulesCompletionId = z.infer<
  typeof courseModulesCompletionIdSchema
>["id"];

// this type infers the return from getCourseModulesCompletions() - meaning it will include any joins
export type CompleteCourseModulesCompletion = Awaited<
  ReturnType<typeof getCourseModulesCompletions>
>["courseModulesCompletions"][number];

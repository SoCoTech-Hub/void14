import { pgTable, text, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getCourseFormatOptions } from "../../api/courseFormatOptions/queries";
import { courses } from "./courses";

export const courseFormatOptions = pgTable(
  "course_format_options",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    courseId: varchar("course_id", { length: 256 })
      .references(() => courses.id)
      .notNull(),
    sectionId: varchar("section_id", { length: 256 }),
    value: text("value"),
    format: varchar("format", { length: 256 }),
    name: varchar("name", { length: 256 }),
  },
  (courseFormatOptions) => {
    return {
      courseIdIndex: uniqueIndex("course_format_options_course_id_idx").on(
        courseFormatOptions.courseId,
      ),
    };
  },
);

// Schema for courseFormatOptions - used to validate API requests
const baseSchema = createSelectSchema(courseFormatOptions);

export const insertCourseFormatOptionSchema =
  createInsertSchema(courseFormatOptions);
export const insertCourseFormatOptionParams = baseSchema
  .extend({
    courseId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateCourseFormatOptionSchema = baseSchema;
export const updateCourseFormatOptionParams = baseSchema.extend({
  courseId: z.coerce.string().min(1),
});
export const courseFormatOptionIdSchema = baseSchema.pick({ id: true });

// Types for courseFormatOptions - used to type API request params and within Components
export type CourseFormatOption = typeof courseFormatOptions.$inferSelect;
export type NewCourseFormatOption = z.infer<
  typeof insertCourseFormatOptionSchema
>;
export type NewCourseFormatOptionParams = z.infer<
  typeof insertCourseFormatOptionParams
>;
export type UpdateCourseFormatOptionParams = z.infer<
  typeof updateCourseFormatOptionParams
>;
export type CourseFormatOptionId = z.infer<
  typeof courseFormatOptionIdSchema
>["id"];

// this type infers the return from getCourseFormatOptions() - meaning it will include any joins
export type CompleteCourseFormatOption = Awaited<
  ReturnType<typeof getCourseFormatOptions>
>["courseFormatOptions"][number];

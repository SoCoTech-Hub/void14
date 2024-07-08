import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { courses } from "./courses";

export const courseSections = pgTable(
  "course_sections",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    courseId: varchar("course_id", { length: 256 })
      .references(() => courses.id)
      .notNull(),
    sectionId: varchar("section_id", { length: 256 }),
    visible: boolean("visible"),
    availability: text("availability"),
    sequence: text("sequence"),
    summary: text("summary"),
    name: varchar("name", { length: 256 }),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (courseSections) => {
    return {
      courseIdIndex: uniqueIndex("course_id_idx").on(courseSections.courseId),
    };
  },
);

// Schema for courseSections - used to validate API requests
const baseSchema = createSelectSchema(courseSections).omit(timestamps);

export const insertCourseSectionSchema =
  createInsertSchema(courseSections).omit(timestamps);
export const insertCourseSectionParams = baseSchema
  .extend({
    courseId: z.coerce.string().min(1),
    visible: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateCourseSectionSchema = baseSchema;
export const updateCourseSectionParams = baseSchema.extend({
  courseId: z.coerce.string().min(1),
  visible: z.coerce.boolean(),
});
export const courseSectionIdSchema = baseSchema.pick({ id: true });

// Types for courseSections - used to type API request params and within Components
export type CourseSection = typeof courseSections.$inferSelect;
export type NewCourseSection = z.infer<typeof insertCourseSectionSchema>;
export type NewCourseSectionParams = z.infer<typeof insertCourseSectionParams>;
export type UpdateCourseSectionParams = z.infer<
  typeof updateCourseSectionParams
>;
export type CourseSectionId = z.infer<typeof courseSectionIdSchema>["id"];


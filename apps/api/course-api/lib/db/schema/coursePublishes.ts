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

import { type getCoursePublishes } from "../../api/coursePublishes/queries";
import { courses } from "./courses";

export const coursePublishes = pgTable(
  "course_publishes",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    courseId: varchar("course_id", { length: 256 })
      .references(() => courses.id)
      .notNull(),
    hubCourseId: varchar("hub_course_id", { length: 256 }),
    timeChecked: timestamp("time_checked"),
    timePublished: timestamp("time_published"),
    enrollable: boolean("enrollable"),
    published: boolean("published"),
    hubUrl: varchar("hub_url", { length: 256 }),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (coursePublishes) => {
    return {
      courseIdIndex: uniqueIndex("course_publishes_course_id_idx").on(
        coursePublishes.courseId,
      ),
    };
  },
);

// Schema for coursePublishes - used to validate API requests
const baseSchema = createSelectSchema(coursePublishes).omit(timestamps);

export const insertCoursePublishSchema =
  createInsertSchema(coursePublishes).omit(timestamps);
export const insertCoursePublishParams = baseSchema
  .extend({
    courseId: z.coerce.string().min(1),
    timeChecked: z.coerce.string().min(1),
    timePublished: z.coerce.string().min(1),
    enrollable: z.coerce.boolean(),
    published: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateCoursePublishSchema = baseSchema;
export const updateCoursePublishParams = baseSchema.extend({
  courseId: z.coerce.string().min(1),
  timeChecked: z.coerce.string().min(1),
  timePublished: z.coerce.string().min(1),
  enrollable: z.coerce.boolean(),
  published: z.coerce.boolean(),
});
export const coursePublishIdSchema = baseSchema.pick({ id: true });

// Types for coursePublishes - used to type API request params and within Components
export type CoursePublish = typeof coursePublishes.$inferSelect;
export type NewCoursePublish = z.infer<typeof insertCoursePublishSchema>;
export type NewCoursePublishParams = z.infer<typeof insertCoursePublishParams>;
export type UpdateCoursePublishParams = z.infer<
  typeof updateCoursePublishParams
>;
export type CoursePublishId = z.infer<typeof coursePublishIdSchema>["id"];

// this type infers the return from getCoursePublishes() - meaning it will include any joins
export type CompleteCoursePublish = Awaited<
  ReturnType<typeof getCoursePublishes>
>["coursePublishes"][number];

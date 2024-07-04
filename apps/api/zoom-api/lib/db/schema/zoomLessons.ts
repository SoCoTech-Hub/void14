import { type getZoomLessons } from "@/lib/api/zoomLessons/queries";
import { boolean, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const zoomLessons = pgTable(
  "zoom_lessons",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    active: boolean("active"),
    courseId: varchar("course_id", { length: 256 }).notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
  },
  (zoomLessons) => {
    return {
      courseIdIndex: uniqueIndex("course_id_idx").on(zoomLessons.courseId),
    };
  },
);

// Schema for zoomLessons - used to validate API requests
const baseSchema = createSelectSchema(zoomLessons);

export const insertZoomLessonSchema = createInsertSchema(zoomLessons);
export const insertZoomLessonParams = baseSchema
  .extend({
    active: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateZoomLessonSchema = baseSchema;
export const updateZoomLessonParams = baseSchema
  .extend({
    active: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const zoomLessonIdSchema = baseSchema.pick({ id: true });

// Types for zoomLessons - used to type API request params and within Components
export type ZoomLesson = typeof zoomLessons.$inferSelect;
export type NewZoomLesson = z.infer<typeof insertZoomLessonSchema>;
export type NewZoomLessonParams = z.infer<typeof insertZoomLessonParams>;
export type UpdateZoomLessonParams = z.infer<typeof updateZoomLessonParams>;
export type ZoomLessonId = z.infer<typeof zoomLessonIdSchema>["id"];

// this type infers the return from getZoomLessons() - meaning it will include any joins
export type CompleteZoomLesson = Awaited<
  ReturnType<typeof getZoomLessons>
>["zoomLessons"][number];

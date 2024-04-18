import { sql } from "drizzle-orm";
import { varchar, boolean, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { courses } from "./courses"
import { type getCourseSections } from "@/lib/api/courseSections/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const courseSections = pgTable('course_sections', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  courseId: varchar("course_id", { length: 256 }).references(() => courses.id).notNull(),
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

}, (courseSections) => {
  return {
    courseIdIndex: uniqueIndex('course_id_idx').on(courseSections.courseId),
  }
});


// Schema for courseSections - used to validate API requests
const baseSchema = createSelectSchema(courseSections).omit(timestamps)

export const insertCourseSectionSchema = createInsertSchema(courseSections).omit(timestamps);
export const insertCourseSectionParams = baseSchema.extend({
  courseId: z.coerce.string().min(1),
  visible: z.coerce.boolean()
}).omit({ 
  id: true
});

export const updateCourseSectionSchema = baseSchema;
export const updateCourseSectionParams = baseSchema.extend({
  courseId: z.coerce.string().min(1),
  visible: z.coerce.boolean()
})
export const courseSectionIdSchema = baseSchema.pick({ id: true });

// Types for courseSections - used to type API request params and within Components
export type CourseSection = typeof courseSections.$inferSelect;
export type NewCourseSection = z.infer<typeof insertCourseSectionSchema>;
export type NewCourseSectionParams = z.infer<typeof insertCourseSectionParams>;
export type UpdateCourseSectionParams = z.infer<typeof updateCourseSectionParams>;
export type CourseSectionId = z.infer<typeof courseSectionIdSchema>["id"];
    
// this type infers the return from getCourseSections() - meaning it will include any joins
export type CompleteCourseSection = Awaited<ReturnType<typeof getCourseSections>>["courseSections"][number];


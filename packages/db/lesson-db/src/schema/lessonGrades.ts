import {
  boolean,
  pgTable,
  real,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

import { lessons } from "./lessons";

export const lessonGrades = pgTable("lesson_grades", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  completed: timestamp("completed"),
  grade: real("grade"),
  late: boolean("late"),
  lessonId: varchar("lesson_id", { length: 256 })
    .references(() => lessons.id, { onDelete: "cascade" })
    .notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for lessonGrades - used to validate API requests
const baseSchema = createSelectSchema(lessonGrades);

export const insertLessonGradeSchema = createInsertSchema(lessonGrades);
export const insertLessonGradeParams = baseSchema
  .extend({
    completed: z.coerce.string().min(1),
    grade: z.coerce.number(),
    late: z.coerce.boolean(),
    lessonId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateLessonGradeSchema = baseSchema;
export const updateLessonGradeParams = baseSchema
  .extend({
    completed: z.coerce.string().min(1),
    grade: z.coerce.number(),
    late: z.coerce.boolean(),
    lessonId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const lessonGradeIdSchema = baseSchema.pick({ id: true });

// Types for lessonGrades - used to type API request params and within Components
export type LessonGrade = typeof lessonGrades.$inferSelect;
export type NewLessonGrade = z.infer<typeof insertLessonGradeSchema>;
export type NewLessonGradeParams = z.infer<typeof insertLessonGradeParams>;
export type UpdateLessonGradeParams = z.infer<typeof updateLessonGradeParams>;
export type LessonGradeId = z.infer<typeof lessonGradeIdSchema>["id"];

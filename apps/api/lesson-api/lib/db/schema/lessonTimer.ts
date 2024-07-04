import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getLessonTimer } from "../../api/lessonTimer/queries";
import { lessons } from "./lessons";

export const lessonTimer = pgTable("lesson_timer", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  completed: boolean("completed"),
  lessonId: varchar("lesson_id", { length: 256 })
    .references(() => lessons.id, { onDelete: "cascade" })
    .notNull(),
  lessonTime: integer("lesson_time"),
  startTime: timestamp("start_time"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for lessonTimer - used to validate API requests
const baseSchema = createSelectSchema(lessonTimer).omit(timestamps);

export const insertLessonTimerSchema =
  createInsertSchema(lessonTimer).omit(timestamps);
export const insertLessonTimerParams = baseSchema
  .extend({
    completed: z.coerce.boolean(),
    lessonId: z.coerce.string().min(1),
    lessonTime: z.coerce.number(),
    startTime: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateLessonTimerSchema = baseSchema;
export const updateLessonTimerParams = baseSchema
  .extend({
    completed: z.coerce.boolean(),
    lessonId: z.coerce.string().min(1),
    lessonTime: z.coerce.number(),
    startTime: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const lessonTimerIdSchema = baseSchema.pick({ id: true });

// Types for lessonTimer - used to type API request params and within Components
export type LessonTimer = typeof lessonTimer.$inferSelect;
export type NewLessonTimer = z.infer<typeof insertLessonTimerSchema>;
export type NewLessonTimerParams = z.infer<typeof insertLessonTimerParams>;
export type UpdateLessonTimerParams = z.infer<typeof updateLessonTimerParams>;
export type LessonTimerId = z.infer<typeof lessonTimerIdSchema>["id"];

// this type infers the return from getLessonTimer() - meaning it will include any joins
export type CompleteLessonTimer = Awaited<
  ReturnType<typeof getLessonTimer>
>["lessonTimer"][number];

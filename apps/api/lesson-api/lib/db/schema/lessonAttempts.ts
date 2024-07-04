import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getLessonAttempts } from "../../api/lessonAttempts/queries";
import { lessonAnswers } from "./lessonAnswers";
import { lessonPages } from "./lessonPages";
import { lessons } from "./lessons";

export const lessonAttempts = pgTable("lesson_attempts", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  lessonAnswerId: varchar("lesson_answer_id", { length: 256 })
    .references(() => lessonAnswers.id, { onDelete: "cascade" })
    .notNull(),
  lessonPageId: varchar("lesson_page_id", { length: 256 })
    .references(() => lessonPages.id, { onDelete: "cascade" })
    .notNull(),
  lessonId: varchar("lesson_id", { length: 256 })
    .references(() => lessons.id, { onDelete: "cascade" })
    .notNull(),
  correct: boolean("correct"),
  retry: integer("retry"),
  userAnswer: text("user_answer"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for lessonAttempts - used to validate API requests
const baseSchema = createSelectSchema(lessonAttempts).omit(timestamps);

export const insertLessonAttemptSchema =
  createInsertSchema(lessonAttempts).omit(timestamps);
export const insertLessonAttemptParams = baseSchema
  .extend({
    lessonAnswerId: z.coerce.string().min(1),
    lessonPageId: z.coerce.string().min(1),
    lessonId: z.coerce.string().min(1),
    correct: z.coerce.boolean(),
    retry: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateLessonAttemptSchema = baseSchema;
export const updateLessonAttemptParams = baseSchema
  .extend({
    lessonAnswerId: z.coerce.string().min(1),
    lessonPageId: z.coerce.string().min(1),
    lessonId: z.coerce.string().min(1),
    correct: z.coerce.boolean(),
    retry: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const lessonAttemptIdSchema = baseSchema.pick({ id: true });

// Types for lessonAttempts - used to type API request params and within Components
export type LessonAttempt = typeof lessonAttempts.$inferSelect;
export type NewLessonAttempt = z.infer<typeof insertLessonAttemptSchema>;
export type NewLessonAttemptParams = z.infer<typeof insertLessonAttemptParams>;
export type UpdateLessonAttemptParams = z.infer<
  typeof updateLessonAttemptParams
>;
export type LessonAttemptId = z.infer<typeof lessonAttemptIdSchema>["id"];

// this type infers the return from getLessonAttempts() - meaning it will include any joins
export type CompleteLessonAttempt = Awaited<
  ReturnType<typeof getLessonAttempts>
>["lessonAttempts"][number];

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

import { lessonPages } from "./lessonPages";
import { lessons } from "./lessons";

export const lessonAnswers = pgTable("lesson_answers", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  answer: text("answer"),
  answerFormat: integer("answer_format"),
  flags: boolean("flags"),
  grade: integer("grade"),
  jumpTo: varchar("jump_to", { length: 256 }),
  lessonId: varchar("lesson_id", { length: 256 })
    .references(() => lessons.id, { onDelete: "cascade" })
    .notNull(),
  lessonPageId: varchar("lesson_page_id", { length: 256 })
    .references(() => lessonPages.id, { onDelete: "cascade" })
    .notNull(),
  response: text("response"),
  responseFormat: integer("response_format"),
  score: integer("score"),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for lessonAnswers - used to validate API requests
const baseSchema = createSelectSchema(lessonAnswers).omit(timestamps);

export const insertLessonAnswerSchema =
  createInsertSchema(lessonAnswers).omit(timestamps);
export const insertLessonAnswerParams = baseSchema
  .extend({
    answerFormat: z.coerce.number(),
    flags: z.coerce.boolean(),
    grade: z.coerce.number(),
    lessonId: z.coerce.string().min(1),
    lessonPageId: z.coerce.string().min(1),
    responseFormat: z.coerce.number(),
    score: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateLessonAnswerSchema = baseSchema;
export const updateLessonAnswerParams = baseSchema.extend({
  answerFormat: z.coerce.number(),
  flags: z.coerce.boolean(),
  grade: z.coerce.number(),
  lessonId: z.coerce.string().min(1),
  lessonPageId: z.coerce.string().min(1),
  responseFormat: z.coerce.number(),
  score: z.coerce.number(),
});
export const lessonAnswerIdSchema = baseSchema.pick({ id: true });

// Types for lessonAnswers - used to type API request params and within Components
export type LessonAnswer = typeof lessonAnswers.$inferSelect;
export type NewLessonAnswer = z.infer<typeof insertLessonAnswerSchema>;
export type NewLessonAnswerParams = z.infer<typeof insertLessonAnswerParams>;
export type UpdateLessonAnswerParams = z.infer<typeof updateLessonAnswerParams>;
export type LessonAnswerId = z.infer<typeof lessonAnswerIdSchema>["id"];


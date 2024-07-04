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

import { type getLessons } from "../api/lessons/queries";

export const lessons = pgTable("lessons", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  activityLink: varchar("activity_link", { length: 256 }),
  allowOfflineAttempts: boolean("allow_offline_attempts"),
  available: timestamp("available"),
  bgColor: varchar("bg_color", { length: 256 }),
  completionEndReached: boolean("completion_end_reached"),
  completionTimeSpent: integer("completion_time_spent"),
  conditions: text("conditions"),
  course: varchar("course", { length: 256 }),
  custom: integer("custom"),
  deadline: timestamp("deadline"),
  dependency: integer("dependency"),
  displayLeft: boolean("display_left"),
  displayLeftIf: boolean("display_left_if"),
  feedback: boolean("feedback"),
  grade: varchar("grade", { length: 256 }),
  height: integer("height"),
  intro: text("intro"),
  introFormat: integer("intro_format"),
  maxAnswers: integer("max_answers"),
  maxAttempts: integer("max_attempts"),
  maxPages: integer("max_pages"),
  mediaClose: integer("media_close"),
  mediaFile: varchar("media_file", { length: 256 }),
  mediaHeight: integer("media_height"),
  mediaWidth: integer("media_width"),
  minQuestions: integer("min_questions"),
  modAttempts: integer("mod_attempts"),
  name: varchar("name", { length: 256 }),
  nextPageDefault: integer("next_page_default"),
  ongoing: integer("ongoing"),
  password: varchar("password", { length: 256 }),
  practice: boolean("practice"),
  progressbar: boolean("progressbar"),
  retake: boolean("retake"),
  review: boolean("review"),
  slideshow: boolean("slideshow"),
  timeLimit: integer("time_limit"),
  useMaxGrade: boolean("use_max_grade"),
  usePassword: boolean("use_password"),
  width: integer("width"),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for lessons - used to validate API requests
const baseSchema = createSelectSchema(lessons).omit(timestamps);

export const insertLessonSchema = createInsertSchema(lessons).omit(timestamps);
export const insertLessonParams = baseSchema
  .extend({
    allowOfflineAttempts: z.coerce.boolean(),
    available: z.coerce.string().min(1),
    completionEndReached: z.coerce.boolean(),
    completionTimeSpent: z.coerce.number(),
    custom: z.coerce.number(),
    deadline: z.coerce.string().min(1),
    dependency: z.coerce.number(),
    displayLeft: z.coerce.boolean(),
    displayLeftIf: z.coerce.boolean(),
    feedback: z.coerce.boolean(),
    height: z.coerce.number(),
    introFormat: z.coerce.number(),
    maxAnswers: z.coerce.number(),
    maxAttempts: z.coerce.number(),
    maxPages: z.coerce.number(),
    mediaClose: z.coerce.number(),
    mediaHeight: z.coerce.number(),
    mediaWidth: z.coerce.number(),
    minQuestions: z.coerce.number(),
    modAttempts: z.coerce.number(),
    nextPageDefault: z.coerce.number(),
    ongoing: z.coerce.number(),
    practice: z.coerce.boolean(),
    progressbar: z.coerce.boolean(),
    retake: z.coerce.boolean(),
    review: z.coerce.boolean(),
    slideshow: z.coerce.boolean(),
    timeLimit: z.coerce.number(),
    useMaxGrade: z.coerce.boolean(),
    usePassword: z.coerce.boolean(),
    width: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateLessonSchema = baseSchema;
export const updateLessonParams = baseSchema.extend({
  allowOfflineAttempts: z.coerce.boolean(),
  available: z.coerce.string().min(1),
  completionEndReached: z.coerce.boolean(),
  completionTimeSpent: z.coerce.number(),
  custom: z.coerce.number(),
  deadline: z.coerce.string().min(1),
  dependency: z.coerce.number(),
  displayLeft: z.coerce.boolean(),
  displayLeftIf: z.coerce.boolean(),
  feedback: z.coerce.boolean(),
  height: z.coerce.number(),
  introFormat: z.coerce.number(),
  maxAnswers: z.coerce.number(),
  maxAttempts: z.coerce.number(),
  maxPages: z.coerce.number(),
  mediaClose: z.coerce.number(),
  mediaHeight: z.coerce.number(),
  mediaWidth: z.coerce.number(),
  minQuestions: z.coerce.number(),
  modAttempts: z.coerce.number(),
  nextPageDefault: z.coerce.number(),
  ongoing: z.coerce.number(),
  practice: z.coerce.boolean(),
  progressbar: z.coerce.boolean(),
  retake: z.coerce.boolean(),
  review: z.coerce.boolean(),
  slideshow: z.coerce.boolean(),
  timeLimit: z.coerce.number(),
  useMaxGrade: z.coerce.boolean(),
  usePassword: z.coerce.boolean(),
  width: z.coerce.number(),
});
export const lessonIdSchema = baseSchema.pick({ id: true });

// Types for lessons - used to type API request params and within Components
export type Lesson = typeof lessons.$inferSelect;
export type NewLesson = z.infer<typeof insertLessonSchema>;
export type NewLessonParams = z.infer<typeof insertLessonParams>;
export type UpdateLessonParams = z.infer<typeof updateLessonParams>;
export type LessonId = z.infer<typeof lessonIdSchema>["id"];

// this type infers the return from getLessons() - meaning it will include any joins
export type CompleteLesson = Awaited<
  ReturnType<typeof getLessons>
>["lessons"][number];

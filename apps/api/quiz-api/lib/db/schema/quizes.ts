import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  real,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getQuizes } from "../../api/quizes/queries";

export const quizes = pgTable(
  "quizes",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    allowOfflineAttempts: boolean("allow_offline_attempts").default(false),
    attemptOnLast: boolean("attempt_on_last").default(false),
    attempts: integer("attempts").notNull(),
    browserSecurity: varchar("browser_security", { length: 256 }),
    canRedoQuestions: boolean("can_redo_questions").notNull().default(false),
    completionAttemptsExhausted: boolean("completion_attempts_exhausted")
      .notNull()
      .default(false),
    completionMinAttempts: integer("completion_min_attempts").notNull(),
    courseId: varchar("course_id", { length: 256 }).notNull(),
    decimalPoints: integer("decimal_points").notNull(),
    delay1: integer("delay_1"),
    delay2: integer("delay_2"),
    gracePeriod: integer("grace_period"),
    grade: real("grade"),
    gradeMethod: integer("grade_method").notNull(),
    intro: text("intro"),
    introFormat: integer("intro_format").notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    navMethod: varchar("nav_method", { length: 256 }),
    overDueHandling: varchar("over_due_handling", { length: 256 }),
    password: varchar("password", { length: 256 }),
    preferredBehaviour: varchar("preferred_behaviour", { length: 256 }),
    questionDecimalPoints: integer("question_decimal_points").notNull(),
    questionsPerPage: integer("questions_per_page"),
    reviewAttempt: integer("review_attempt"),
    reviewCorrectness: integer("review_correctness"),
    showBlocks: boolean("show_blocks").notNull().default(false),
    reviewGeneralFeedback: integer("review_general_feedback").notNull(),
    reviewMarks: integer("review_marks").notNull(),
    reviewOverallFeedback: integer("review_overall_feedback").notNull(),
    reviewRightAnswer: integer("review_right_answer").notNull(),
    reviewSpecificFeedback: integer("review_specific_feedback").notNull(),
    showUserPicture: boolean("show_user_picture").notNull().default(false),
    shuffleAnswers: boolean("shuffle_answers").notNull().default(false),
    subNet: varchar("sub_net", { length: 256 }),
    sumGrades: real("sum_grades").notNull(),
    timeClose: integer("time_close"),
    timeLimit: integer("time_limit"),
    timeOpen: integer("time_open"),
    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (quizes) => {
    return {
      courseIdIndex: uniqueIndex("quizes_course_id_idx").on(quizes.courseId),
    };
  },
);

// Schema for quizes - used to validate API requests
const baseSchema = createSelectSchema(quizes).omit(timestamps);

export const insertQuizeSchema = createInsertSchema(quizes).omit(timestamps);
export const insertQuizeParams = baseSchema
  .extend({
    allowOfflineAttempts: z.coerce.boolean(),
    attemptOnLast: z.coerce.boolean(),
    attempts: z.coerce.number(),
    canRedoQuestions: z.coerce.boolean(),
    completionAttemptsExhausted: z.coerce.boolean(),
    completionMinAttempts: z.coerce.number(),
    decimalPoints: z.coerce.number(),
    delay1: z.coerce.number(),
    delay2: z.coerce.number(),
    gracePeriod: z.coerce.number(),
    grade: z.coerce.number(),
    gradeMethod: z.coerce.number(),
    introFormat: z.coerce.number(),
    questionDecimalPoints: z.coerce.number(),
    questionsPerPage: z.coerce.number(),
    reviewAttempt: z.coerce.number(),
    reviewCorrectness: z.coerce.number(),
    showBlocks: z.coerce.boolean(),
    reviewGeneralFeedback: z.coerce.number(),
    reviewMarks: z.coerce.number(),
    reviewOverallFeedback: z.coerce.number(),
    reviewRightAnswer: z.coerce.number(),
    reviewSpecificFeedback: z.coerce.number(),
    showUserPicture: z.coerce.boolean(),
    shuffleAnswers: z.coerce.boolean(),
    sumGrades: z.coerce.number(),
    timeClose: z.coerce.number(),
    timeLimit: z.coerce.number(),
    timeOpen: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateQuizeSchema = baseSchema;
export const updateQuizeParams = baseSchema.extend({
  allowOfflineAttempts: z.coerce.boolean(),
  attemptOnLast: z.coerce.boolean(),
  attempts: z.coerce.number(),
  canRedoQuestions: z.coerce.boolean(),
  completionAttemptsExhausted: z.coerce.boolean(),
  completionMinAttempts: z.coerce.number(),
  decimalPoints: z.coerce.number(),
  delay1: z.coerce.number(),
  delay2: z.coerce.number(),
  gracePeriod: z.coerce.number(),
  grade: z.coerce.number(),
  gradeMethod: z.coerce.number(),
  introFormat: z.coerce.number(),
  questionDecimalPoints: z.coerce.number(),
  questionsPerPage: z.coerce.number(),
  reviewAttempt: z.coerce.number(),
  reviewCorrectness: z.coerce.number(),
  showBlocks: z.coerce.boolean(),
  reviewGeneralFeedback: z.coerce.number(),
  reviewMarks: z.coerce.number(),
  reviewOverallFeedback: z.coerce.number(),
  reviewRightAnswer: z.coerce.number(),
  reviewSpecificFeedback: z.coerce.number(),
  showUserPicture: z.coerce.boolean(),
  shuffleAnswers: z.coerce.boolean(),
  sumGrades: z.coerce.number(),
  timeClose: z.coerce.number(),
  timeLimit: z.coerce.number(),
  timeOpen: z.coerce.number(),
});
export const quizIdSchema = baseSchema.pick({ id: true });

// Types for quizes - used to type API request params and within Components
export type Quize = typeof quizes.$inferSelect;
export type NewQuize = z.infer<typeof insertQuizeSchema>;
export type NewQuizeParams = z.infer<typeof insertQuizeParams>;
export type UpdateQuizeParams = z.infer<typeof updateQuizeParams>;
export type QuizId = z.infer<typeof quizIdSchema>["id"];

// this type infers the return from getQuizes() - meaning it will include any joins
export type CompleteQuize = Awaited<
  ReturnType<typeof getQuizes>
>["quizes"][number];

import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getSurveyAnswers } from "../../api/surveyAnswers/queries";
import { surveyQuestions } from "./surveyQuestions";
import { surveys } from "./surveys";

export const surveyAnswers = pgTable("survey_answers", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  answer1: text("answer1"),
  answer2: text("answer2"),
  surveyQuestionId: varchar("survey_question_id", { length: 256 })
    .references(() => surveyQuestions.id)
    .notNull(),
  surveyId: varchar("survey_id", { length: 256 })
    .references(() => surveys.id)
    .notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for surveyAnswers - used to validate API requests
const baseSchema = createSelectSchema(surveyAnswers).omit(timestamps);

export const insertSurveyAnswerSchema =
  createInsertSchema(surveyAnswers).omit(timestamps);
export const insertSurveyAnswerParams = baseSchema
  .extend({
    surveyQuestionId: z.coerce.string().min(1),
    surveyId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateSurveyAnswerSchema = baseSchema;
export const updateSurveyAnswerParams = baseSchema
  .extend({
    surveyQuestionId: z.coerce.string().min(1),
    surveyId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const surveyAnswerIdSchema = baseSchema.pick({ id: true });

// Types for surveyAnswers - used to type API request params and within Components
export type SurveyAnswer = typeof surveyAnswers.$inferSelect;
export type NewSurveyAnswer = z.infer<typeof insertSurveyAnswerSchema>;
export type NewSurveyAnswerParams = z.infer<typeof insertSurveyAnswerParams>;
export type UpdateSurveyAnswerParams = z.infer<typeof updateSurveyAnswerParams>;
export type SurveyAnswerId = z.infer<typeof surveyAnswerIdSchema>["id"];

// this type infers the return from getSurveyAnswers() - meaning it will include any joins
export type CompleteSurveyAnswer = Awaited<
  ReturnType<typeof getSurveyAnswers>
>["surveyAnswers"][number];

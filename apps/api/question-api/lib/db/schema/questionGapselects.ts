import {
  boolean,
  integer,
  pgTable,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getQuestionGapselects } from "../../api/questionGapselects/queries";
import { questions } from "./questions";

export const questionGapselects = pgTable(
  "question_gapselects",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    correctFeedback: text("correct_feedback"),
    correctFeedbackFormat: integer("correct_feedback_format"),
    incorrectFeedback: text("incorrect_feedback"),
    incorrectFeedbackFormat: integer("incorrect_feedback_format"),
    partiallycorrectFeedback: text("partiallycorrect_feedback"),
    partiallycorrectFeedbackFormat: integer("partiallycorrect_feedback_format"),
    showNumCorrect: boolean("show_num_correct"),
    shuffleAnswers: boolean("shuffle_answers").notNull(),
    questionId: varchar("question_id", { length: 256 })
      .references(() => questions.id, { onDelete: "cascade" })
      .notNull(),
  },
  (questionGapselects) => {
    return {
      questionIdIndex: uniqueIndex("question_gapselects_question_id_idx").on(
        questionGapselects.questionId,
      ),
    };
  },
);

// Schema for questionGapselects - used to validate API requests
const baseSchema = createSelectSchema(questionGapselects);

export const insertQuestionGapselectSchema =
  createInsertSchema(questionGapselects);
export const insertQuestionGapselectParams = baseSchema
  .extend({
    correctFeedbackFormat: z.coerce.number(),
    incorrectFeedbackFormat: z.coerce.number(),
    partiallycorrectFeedbackFormat: z.coerce.number(),
    showNumCorrect: z.coerce.boolean(),
    shuffleAnswers: z.coerce.boolean(),
    questionId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateQuestionGapselectSchema = baseSchema;
export const updateQuestionGapselectParams = baseSchema.extend({
  correctFeedbackFormat: z.coerce.number(),
  incorrectFeedbackFormat: z.coerce.number(),
  partiallycorrectFeedbackFormat: z.coerce.number(),
  showNumCorrect: z.coerce.boolean(),
  shuffleAnswers: z.coerce.boolean(),
  questionId: z.coerce.string().min(1),
});
export const questionGapselectIdSchema = baseSchema.pick({ id: true });

// Types for questionGapselects - used to type API request params and within Components
export type QuestionGapselect = typeof questionGapselects.$inferSelect;
export type NewQuestionGapselect = z.infer<
  typeof insertQuestionGapselectSchema
>;
export type NewQuestionGapselectParams = z.infer<
  typeof insertQuestionGapselectParams
>;
export type UpdateQuestionGapselectParams = z.infer<
  typeof updateQuestionGapselectParams
>;
export type QuestionGapselectId = z.infer<
  typeof questionGapselectIdSchema
>["id"];

// this type infers the return from getQuestionGapselects() - meaning it will include any joins
export type CompleteQuestionGapselect = Awaited<
  ReturnType<typeof getQuestionGapselects>
>["questionGapselects"][number];

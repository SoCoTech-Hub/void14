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

import { type getQuestionDdwtos } from "../api/questionDdwtos/queries";
import { questions } from "./questions";

export const questionDdwtos = pgTable(
  "question_ddwtos",
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
    showNumCorrect: boolean("show_num_correct").notNull(),
    shuffleAnswers: boolean("shuffle_answers").notNull(),
    questionId: varchar("question_id", { length: 256 })
      .references(() => questions.id, { onDelete: "cascade" })
      .notNull(),
  },
  (questionDdwtos) => {
    return {
      questionIdIndex: uniqueIndex("question_ddwtos_question_id_idx").on(
        questionDdwtos.questionId,
      ),
    };
  },
);

// Schema for questionDdwtos - used to validate API requests
const baseSchema = createSelectSchema(questionDdwtos);

export const insertQuestionDdwtoSchema = createInsertSchema(questionDdwtos);
export const insertQuestionDdwtoParams = baseSchema
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

export const updateQuestionDdwtoSchema = baseSchema;
export const updateQuestionDdwtoParams = baseSchema.extend({
  correctFeedbackFormat: z.coerce.number(),
  incorrectFeedbackFormat: z.coerce.number(),
  partiallycorrectFeedbackFormat: z.coerce.number(),
  showNumCorrect: z.coerce.boolean(),
  shuffleAnswers: z.coerce.boolean(),
  questionId: z.coerce.string().min(1),
});
export const questionDdwtoIdSchema = baseSchema.pick({ id: true });

// Types for questionDdwtos - used to type API request params and within Components
export type QuestionDdwto = typeof questionDdwtos.$inferSelect;
export type NewQuestionDdwto = z.infer<typeof insertQuestionDdwtoSchema>;
export type NewQuestionDdwtoParams = z.infer<typeof insertQuestionDdwtoParams>;
export type UpdateQuestionDdwtoParams = z.infer<
  typeof updateQuestionDdwtoParams
>;
export type QuestionDdwtoId = z.infer<typeof questionDdwtoIdSchema>["id"];

// this type infers the return from getQuestionDdwtos() - meaning it will include any joins
export type CompleteQuestionDdwto = Awaited<
  ReturnType<typeof getQuestionDdwtos>
>["questionDdwtos"][number];
